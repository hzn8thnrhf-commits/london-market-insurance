/* London Market Academy — "Syndicate": the underwriting simulation game */
(function () {
  'use strict';

  var KEY = 'lma-game-v1';
  var START_CAPITAL = 10e6;
  var OPEX_PER_QTR = 120000;
  var INV_YIELD_QTR = 0.011;   // ~4.5% a year on capital + float
  var QS_CEDING_COMM = 0.27;

  /* ---------- class definitions ---------- */

  var ZONES = {
    gulf: { name: 'US Gulf — windstorm', peril: 'Hurricane', probQ: [0.015, 0.025, 0.10, 0.035] },
    quake: { name: 'US West — earthquake', peril: 'Earthquake', probQ: [0.020, 0.020, 0.020, 0.020] },
    ports: { name: 'Global ports — accumulation', peril: 'Port explosion', probQ: [0.020, 0.020, 0.020, 0.020] },
    cloud: { name: 'Cloud systemic — cyber', peril: 'Cloud outage', probQ: [0.025, 0.025, 0.025, 0.025] },
    fincrisis: { name: 'Financial crisis — economy', peril: 'Market crash', probQ: [0.012, 0.012, 0.012, 0.012] },
    cbd: { name: 'Capital city — terrorism', peril: 'Terror attack', probQ: [0.010, 0.010, 0.010, 0.010] }
  };

  var CLASSES = [
    { id: 'pdf', name: 'Property D&F', icon: '🏭', zone: 'gulf', altZone: 'quake',
      baseELR: 0.50, acq: [0.16, 0.26], dmg: [0.12, 0.22],
      limits: [4e6, 15e6], rateOnLimit: [0.035, 0.070], tail: 0,
      perils: 'All risks of physical damage & business interruption incl. named windstorm / earthquake' },
    { id: 'energy', name: 'Upstream energy', icon: '🛢️', zone: 'gulf', altZone: null,
      baseELR: 0.48, acq: [0.14, 0.22], dmg: [0.20, 0.35],
      limits: [6e6, 18e6], rateOnLimit: [0.050, 0.090], tail: 0,
      perils: 'Physical damage, operators’ extra expense (control of well), Gulf windstorm' },
    { id: 'cargo', name: 'Marine cargo', icon: '🚢', zone: 'ports', altZone: null,
      baseELR: 0.58, acq: [0.18, 0.28], dmg: [0.10, 0.20],
      limits: [3e6, 10e6], rateOnLimit: [0.030, 0.060], tail: 0,
      perils: 'All risks warehouse-to-warehouse incl. general average; port accumulation exposure' },
    { id: 'casualty', name: 'US excess casualty', icon: '⚖️', zone: null, altZone: null,
      baseELR: 0.60, acq: [0.15, 0.24], dmg: [0, 0],
      limits: [5e6, 15e6], rateOnLimit: [0.025, 0.050], tail: 8,
      perils: 'Occurrence-basis bodily injury & property damage liability, US jurisdiction' },
    { id: 'cyber', name: 'Cyber', icon: '💻', zone: 'cloud', altZone: null,
      baseELR: 0.52, acq: [0.16, 0.25], dmg: [0.15, 0.30],
      limits: [3e6, 9e6], rateOnLimit: [0.035, 0.070], tail: 2,
      perils: 'Ransomware response, systems business interruption, privacy liability; cloud dependency' },
    { id: 'dno', name: 'Directors’ & officers’', icon: '🏢', zone: 'fincrisis', altZone: null,
      baseELR: 0.55, acq: [0.14, 0.22], dmg: [0.18, 0.35],
      limits: [4e6, 12e6], rateOnLimit: [0.020, 0.045], tail: 4,
      perils: 'Claims-made management liability; securities class actions, defence costs in the limit' },
    { id: 'terror', name: 'Terrorism / PV', icon: '💥', zone: 'cbd', altZone: null,
      baseELR: 0.14, acq: [0.15, 0.23], dmg: [0.30, 0.55],
      limits: [6e6, 20e6], rateOnLimit: [0.012, 0.030], tail: 0,
      perils: 'Physical damage & BI from acts of terrorism / political violence; city-block accumulation' },
    { id: 'aviation', name: 'Airline', icon: '✈️', zone: null, altZone: null,
      baseELR: 0.56, acq: [0.13, 0.20], dmg: [0, 0],
      limits: [6e6, 16e6], rateOnLimit: [0.015, 0.035], tail: 2,
      perils: 'Hull & liability line on a scheduled airline; severity-driven, litigation tail' }
  ];

  var NAMES = {
    pdf: ['Bayshore Resorts Group', 'Cordillera Mining Corp', 'Palmetto Distribution Centres', 'Gulf Coast Hotels', 'Sierra Foods Processing', 'Redwood Data Campuses'],
    energy: ['Deepwater Horizon-Free Ltd', 'Pelican Offshore Platform', 'Gulfstream Production Co', 'Trident Drilling Venture', 'Blue Water Energy'],
    cargo: ['Meridian Commodity Traders', 'TransPacific Shipping Line', 'Atlas Grain Exports', 'Orient Electronics Logistics', 'Southern Cross Metals'],
    casualty: ['Keystone Industrial Corp', 'American Machinery Group', 'Liberty Construction Inc', 'Great Lakes Chemicals', 'Frontier Consumer Products'],
    cyber: ['Northwind Retail Group', 'MedFirst Health Systems', 'Apex Payment Services', 'CloudNine SaaS Inc', 'Beacon Logistics Tech'],
    dno: ['Ventura Biotech plc', 'Summit Capital Holdings', 'Nova Semiconductor Corp', 'Meridian Bank Group', 'Zephyr Airlines Holdings'],
    terror: ['Landmark Tower REIT', 'Grand Central Hotels', 'Financial District Properties', 'Embassy Quarter Estates'],
    aviation: ['Condor International Airways', 'Pacific Star Airlines', 'EuroRegional Express', 'Meridian Cargo Air']
  };

  /* ---------- state ---------- */

  var G = null;

  function load() {
    try { G = JSON.parse(localStorage.getItem(KEY)); } catch (e) { G = null; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(G)); } catch (e) {} }

  function newGame() {
    G = {
      q: 1, capital: START_CAPITAL, allTime: 0, yearProfits: {}, history: [],
      policies: [], nextId: 1,
      submissions: [], subIndex: 0, phase: 'uw',   // uw -> ri -> report
      ri: { qs: 0, catA: 0, catL: 0, catUsed: 0 },
      market: 1.0, gameOver: false, lastReport: null, dividends: 0, raised: 0,
      records: { catsSurvived: 0, bestQuarter: null, worstQuarter: null, writtenCount: 0 }
    };
    genSubmissions();
    save();
  }

  /* ---------- helpers ---------- */

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function yearOf(q) { return Math.ceil(q / 4); }
  function qInYear(q) { return ((q - 1) % 4) + 1; }
  function money(x) {
    var neg = x < 0; x = Math.abs(x);
    var s = x >= 1e6 ? '$' + (x / 1e6).toFixed(2) + 'm' : '$' + Math.round(x / 1000) + 'k';
    return (neg ? '−' : '') + s;
  }
  function pct(x) { return (100 * x).toFixed(0) + '%'; }
  function app() { return document.getElementById('app'); }
  function go(h) { location.hash = h; }

  /* ---------- risk generation ---------- */

  function genRisk() {
    var cls = pick(CLASSES);
    var market = G.market;
    // Two independent, hidden drivers:
    //  - priceAdq: how well-priced the deal is vs benchmark (visible via the rate)
    //  - quality: how good the underlying risk is (only hinted at by the loss record)
    var priceAdq = rnd(0.72, 1.32);
    var quality = rnd(0.82, 1.22);
    var limit = Math.round(rnd(cls.limits[0], cls.limits[1]) / 250000) * 250000;
    var midRate = (cls.rateOnLimit[0] + cls.rateOnLimit[1]) / 2;
    var rate = midRate * market * priceAdq * rnd(0.99, 1.01);
    var premium = Math.round(limit * rate / 1000) * 1000;
    var acq = rnd(cls.acq[0], cls.acq[1]);
    var zone = cls.zone ? (cls.altZone && Math.random() < 0.4 ? cls.altZone : cls.zone) : null;
    var dmg = zone ? rnd(cls.dmg[0], cls.dmg[1]) : 0;
    var trueELR = Math.min(1.6, cls.baseELR * quality / priceAdq);
    var tiv = null, attach = 0;
    if (cls.id === 'pdf') tiv = Math.round(limit * rnd(2.5, 6) / 1e6) * 1e6;
    if (cls.id === 'energy') tiv = Math.round(limit * rnd(8, 20) / 1e6) * 1e6;
    if (cls.id === 'terror') tiv = Math.round(limit * rnd(1.5, 3) / 1e6) * 1e6;
    if (cls.id === 'casualty' || cls.id === 'dno') attach = Math.round(limit * rnd(1, 3) / 1e6) * 1e6;

    // 5-year loss history driven by the hidden risk QUALITY (not the price):
    // this is the signal the rate alone cannot give you
    var hist = [], histLoss = 0;
    for (var y = 0; y < 5; y++) {
      var p = 0.08 + Math.max(0, quality - 0.92) * 0.75;
      if (Math.random() < p) {
        var amt = Math.round(premium * rnd(0.3, 2.6) / 50000) * 50000;
        hist.push(amt); histLoss += amt;
      } else hist.push(0);
    }
    var histLR = histLoss / (premium * 5);

    // the underwriter's estimate: knows the price vs benchmark, does NOT know the
    // hidden risk quality — that judgement must come from reading the loss record
    var benchRate = midRate * market;
    var estELR = Math.min(1.5, cls.baseELR / (rate / benchRate)) * rnd(0.95, 1.05);

    return {
      id: G.nextId++, classId: cls.id, name: pick(NAMES[cls.id]),
      limit: limit, tiv: tiv, attach: attach, premium: premium,
      rate: rate, acq: acq, zone: zone, dmg: dmg,
      trueELR: trueELR, tail: cls.tail,
      benchRate: benchRate, estELR: estELR,
      hist: hist, histLR: histLR,
      writtenQ: 0, share: 0, earnedQtrs: 0, resv: 0, closed: false
    };
  }

  function genSubmissions() {
    G.submissions = [];
    for (var i = 0; i < 10; i++) G.submissions.push(genRisk());
    G.subIndex = 0;
  }

  /* ---------- portfolio maths ---------- */

  function inForce() {
    return G.policies.filter(function (p) { return p.earnedQtrs < 4; });
  }
  function annualPremiumInForce() {
    return inForce().reduce(function (a, p) { return a + p.premium * p.share; }, 0);
  }
  function zonePML(zoneId, extra) {
    var s = 0;
    inForce().forEach(function (p) { if (p.zone === zoneId) s += p.limit * p.dmg * p.share; });
    if (extra && extra.zone === zoneId) s += extra.limit * extra.dmg * (extra.share || 1);
    return s;
  }
  function totalReserves() {
    return G.policies.reduce(function (a, p) { return a + (p.resv || 0); }, 0);
  }
  function catRecovery(netEventLoss) {
    var ri = G.ri;
    if (!ri.catL) return 0;
    return Math.min(ri.catL, Math.max(0, netEventLoss - ri.catA));
  }
  function maxNetZonePML(extra) {
    var worst = 0;
    Object.keys(ZONES).forEach(function (z) {
      var gross = zonePML(z, extra);
      var net = gross * (1 - G.ri.qs);
      net = net - catRecovery(net);
      if (net > worst) worst = net;
    });
    return worst;
  }
  // Class volatility factors for premium risk (long-tail and severity classes carry more)
  var PREM_FACTOR = { pdf: 0.38, energy: 0.40, cargo: 0.34, casualty: 0.45, cyber: 0.40, dno: 0.42, terror: 0.30, aviation: 0.42 };

  // Diversified capital requirement, with a breakdown for display.
  // Premium risk diversifies across classes (mix credit); premium, catastrophe and
  // reserve risks then combine sub-additively (they rarely all go wrong at once).
  function capitalBreakdown(extra) {
    var byClass = {};
    inForce().forEach(function (p) {
      byClass[p.classId] = (byClass[p.classId] || 0) + p.premium * p.share;
    });
    if (extra && extra.classId) byClass[extra.classId] = (byClass[extra.classId] || 0) + extra.premium * (extra.share || 1);

    var totPrem = 0, rawPremRisk = 0, hhi = 0;
    Object.keys(byClass).forEach(function (c) { totPrem += byClass[c]; });
    Object.keys(byClass).forEach(function (c) {
      rawPremRisk += byClass[c] * (PREM_FACTOR[c] || 0.4);
      if (totPrem > 0) { var s = byClass[c] / totPrem; hhi += s * s; }
    });
    var mixFactor = totPrem > 0 ? (0.65 + 0.35 * hhi) : 1;   // 1 class → ×1.0; well spread → ×~0.70
    var premRisk = rawPremRisk * mixFactor * (1 - G.ri.qs * 0.8);
    var catRisk = maxNetZonePML(extra);
    var resRisk = 0.35 * totalReserves();
    var undiversified = premRisk + catRisk + resRisk;
    var combined = 1.15 * Math.sqrt(premRisk * premRisk + catRisk * catRisk + resRisk * resRisk);
    var total = Math.max(2e6, combined);
    return {
      premRisk: premRisk, catRisk: catRisk, resRisk: resRisk,
      mixBenefit: rawPremRisk * (1 - G.ri.qs * 0.8) - premRisk,
      divBenefit: Math.max(0, undiversified - combined),
      total: total
    };
  }
  function requiredCapital(extra) { return capitalBreakdown(extra).total; }
  function solvency() { return G.capital / requiredCapital(null); }

  // Share of the year's catastrophe hazard sitting in this quarter, for the
  // portfolio's dominant zone — so cover during hurricane season costs
  // proportionally more, and season-only buying earns no free lunch.
  function catSeasonWeight() {
    var worstZ = null, worstV = 0;
    Object.keys(ZONES).forEach(function (z) {
      var g = zonePML(z, null) * (1 - G.ri.qs);
      if (g > worstV) { worstV = g; worstZ = z; }
    });
    if (!worstZ) return 0.25;
    var pq = ZONES[worstZ].probQ;
    var tot = pq[0] + pq[1] + pq[2] + pq[3];
    return tot > 0 ? pq[qInYear(G.q) - 1] / tot : 0.25;
  }

  function catRiPrice(A, L) {
    // annual rate on line rises as the layer sits closer to the portfolio PML
    var worst = 0;
    Object.keys(ZONES).forEach(function (z) {
      var g = zonePML(z, null) * (1 - G.ri.qs);
      if (g > worst) worst = g;
    });
    if (!L || !worst) return 0;
    var mid = A + L / 2;
    var remoteness = Math.max(0.15, Math.min(1, mid / (worst * 1.2)));
    var rol = 0.28 * (1 - remoteness) + 0.035;
    return L * rol * G.market;
  }

  /* ---------- quarter resolution ---------- */

  function resolveQuarter() {
    var events = [];
    var qy = qInYear(G.q);
    var earned = 0, acqCost = 0, attr = 0, large = 0, catGross = 0, catNet = 0;
    var ibnrProv = 0, strengthening = 0, releases = 0;
    var riCatPremium = catRiPrice(G.ri.catA, G.ri.catL) * catSeasonWeight();
    var reinstatement = 0, qsCommission = 0, qsCededPrem = 0, qsRecovered = 0;
    var CLS = {};
    CLASSES.forEach(function (c) { CLS[c.id] = c; });

    // earning + attritional + large per policy
    // Loss budgets (of true expected loss ratio): ~50% attritional, ~15% single large
    // losses (self-calibrating Bernoulli), remainder catastrophe / tail emergence.
    inForce().forEach(function (p) {
      var e = (p.premium / 4) * p.share;
      earned += e;
      acqCost += (p.premium * p.share * p.acq) / 4;   // acquisition amortised with earning
      attr += e * p.trueELR * (p.classId === 'terror' ? 0.15 : 0.5) * rnd(0.4, 1.7);
      if (p.tail === 0) {
        var largeProb = 0.1 * p.trueELR * p.premium / p.limit;
        if (Math.random() < largeProb) {
          var sev = p.limit * p.share * rnd(0.25, 1);
          large += sev;
          events.push({ icon: '🔥', text: 'Large loss: ' + p.name + ' — gross ' + money(sev) + ' to your line.' });
        }
      } else {
        // provision IBNR for the tail as premium earns, at the class benchmark loss ratio
        var prov = e * 0.35 * CLS[p.classId].baseELR;
        p.resv = (p.resv || 0) + prov;
        ibnrProv += prov;
      }
      p.earnedQtrs++;
    });

    // long-tail emergence: claims draw down the policy's IBNR first;
    // any excess is reserve strengthening (P&L pain years after the premium)
    G.policies.forEach(function (p) {
      if (p.tail > 0 && p.writtenQ > 0 && !p.closed) {
        var age = G.q - p.writtenQ;
        if (age >= 2 && age < (4 + p.tail)) {
          var emergeProb = 0.35 * p.trueELR * p.premium / ((2 + p.tail) * 0.65 * p.limit);
          if (Math.random() < emergeProb) {
            var sev = p.limit * p.share * rnd(0.3, 1);
            var drawn = Math.min(p.resv || 0, sev);
            p.resv = (p.resv || 0) - drawn;
            var extraCharge = sev - drawn;
            strengthening += extraCharge;
            events.push({ icon: '⚖️', text: 'Late claim: ' + p.name + ' (written Y' + yearOf(p.writtenQ) + 'Q' + qInYear(p.writtenQ) + ') — ' + money(sev) +
              (extraCharge > 0 ? '. IBNR covered ' + money(drawn) + '; the rest is reserve strengthening.' : ', absorbed by IBNR held.') });
          }
        }
        // tail expires: release whatever IBNR was never needed
        if (age >= 4 + p.tail) {
          p.closed = true;
          if ((p.resv || 0) > 0) {
            releases += p.resv;
            events.push({ icon: '🎉', text: 'Reserve release: ' + p.name + ' closed clean — ' + money(p.resv) + ' of IBNR released to profit.' });
            p.resv = 0;
          }
        }
      }
    });

    // catastrophes by zone
    Object.keys(ZONES).forEach(function (z) {
      var zn = ZONES[z];
      if (Math.random() < zn.probQ[qy - 1]) {
        var agg = zonePML(z, null);
        if (agg > 0) {
          var sevF = 0.15 + 1.0 * Math.pow(Math.random(), 3);
          var gross = agg * sevF;
          catGross += gross;
          var net = gross * (1 - G.ri.qs);
          qsRecovered += gross * G.ri.qs;
          // one reinstatement: at most 2× the limit recoverable in a year
          var annualRemaining = Math.max(0, 2 * G.ri.catL - (G.ri.catUsed || 0));
          var rec = Math.min(catRecovery(net), annualRemaining);
          G.ri.catUsed = (G.ri.catUsed || 0) + rec;
          if (rec > 0 && G.ri.catL > 0) {
            reinstatement += (rec / G.ri.catL) * riCatPremium;
          }
          catNet += net - rec;
          G.records.catsSurvived++;
          events.push({ icon: '🌀', text: zn.peril + ' hits ' + zn.name + '! Gross event loss ' + money(gross) +
            (G.ri.qs ? ' · quota share takes ' + money(gross * G.ri.qs) : '') +
            (rec > 0 ? ' · cat layer recovers ' + money(rec) + ' (reinstatement ' + money((rec / G.ri.catL) * riCatPremium) + ')' : (G.ri.catL ? ' · below your attachment' : ' · no cat cover in place')) });
        }
      }
    });

    // casualty catastrophe: a social-inflation shock deteriorates the whole long-tail book
    var openResv = totalReserves();
    if (openResv > 500000 && Math.random() < 0.015) {
      var shock = openResv * rnd(0.2, 0.35);
      strengthening += shock;
      G.policies.forEach(function (p) {
        if (p.tail > 0 && !p.closed) p.trueELR = Math.min(1.8, p.trueELR * 1.12);
      });
      events.push({ icon: '📈', text: 'Social inflation shock: record jury awards ripple through the market. Reserve strengthening of ' + money(shock) + ' across your long-tail book — and open years just got worse.' });
    }

    // quota share on premium and non-cat losses
    var qs = G.ri.qs;
    qsCededPrem = earned * qs;
    qsCommission = qsCededPrem * QS_CEDING_COMM;
    var netAttrLarge = (attr + large) * (1 - qs);
    qsRecovered += (attr + large) * qs;

    var float_ = G.capital + annualPremiumInForce() * 0.5 + totalReserves();
    var invIncome = float_ * INV_YIELD_QTR;
    var opex = OPEX_PER_QTR + 0.07 * earned;   // fixed base + costs that grow with the book

    var profit = earned - qsCededPrem + qsCommission
      - netAttrLarge - catNet
      - ibnrProv - strengthening + releases
      - acqCost - opex - riCatPremium - reinstatement
      + invIncome;

    G.capital += profit;
    G.allTime += profit;
    var yr = yearOf(G.q);
    G.yearProfits[yr] = (G.yearProfits[yr] || 0) + profit;

    var netEarned = earned - qsCededPrem;
    var netLosses = netAttrLarge + catNet + ibnrProv + strengthening - releases;
    var cr = netEarned > 0 ? (netLosses + acqCost + opex - qsCommission) / netEarned : 0;

    var report = {
      q: G.q, earned: earned, acqCost: acqCost, opex: opex,
      attr: attr, large: large, catGross: catGross, catNet: catNet,
      ibnrProv: ibnrProv, strengthening: strengthening, releases: releases,
      qsCededPrem: qsCededPrem, qsCommission: qsCommission, qsRecovered: qsRecovered,
      riCatPremium: riCatPremium, reinstatement: reinstatement,
      invIncome: invIncome, profit: profit, cr: cr, events: events,
      capitalAfter: G.capital
    };
    G.history.push({ q: G.q, profit: profit, cr: cr, capital: G.capital });
    G.lastReport = report;

    if (!G.records.bestQuarter || profit > G.records.bestQuarter) G.records.bestQuarter = profit;
    if (!G.records.worstQuarter || profit < G.records.worstQuarter) G.records.worstQuarter = profit;

    // market cycle: softens slowly, hardens after cats
    if (catGross > 0) G.market = Math.min(1.6, G.market + rnd(0.08, 0.2));
    else G.market = Math.max(0.72, G.market - rnd(0.01, 0.04));

    if (G.capital <= 0) { G.gameOver = true; }

    G.phase = 'report';
    save();
  }

  function nextQuarter() {
    G.q++;
    if (qInYear(G.q) === 1) G.ri.catUsed = 0;   // cat layer limit (incl. reinstatement) resets annually
    genSubmissions();
    G.phase = 'uw';
    save();
  }

  /* ---------- views ---------- */

  function statCard(label, value, tone) {
    return '<div class="gstat' + (tone ? ' ' + tone : '') + '"><b>' + value + '</b><span>' + label + '</span></div>';
  }

  function header() {
    var sol = solvency();
    var solTone = sol >= 1.4 ? 'good' : sol >= 1.0 ? 'warn' : 'bad';
    return '<div class="game-head">' +
      '<div class="gh-row"><div class="gh-title">🎮 Syndicate <span>Year ' + yearOf(G.q) + ' · Q' + qInYear(G.q) + '</span></div>' +
      '<button class="gh-reset" id="g-reset">Restart</button></div>' +
      '<div class="gstat-row">' +
      statCard('Capital', money(G.capital)) +
      statCard('Solvency', pct(sol), solTone) +
      statCard('Market', G.market >= 1.05 ? 'Hard ' + G.market.toFixed(2) : G.market <= 0.9 ? 'Soft ' + G.market.toFixed(2) : 'Flat ' + G.market.toFixed(2)) +
      statCard('All-time P&L', money(G.allTime), G.allTime >= 0 ? 'good' : 'bad') +
      '</div></div>';
  }

  function bindCommon() {
    var r = document.getElementById('g-reset');
    if (r) r.addEventListener('click', function () {
      if (confirm('Restart the game? Your company and history will be wiped.')) { newGame(); render(); }
    });
    document.querySelectorAll('[data-ggo]').forEach(function (el) {
      el.addEventListener('click', function () { go(el.getAttribute('data-ggo')); });
    });
  }

  function renderGuide() {
    function note(n, body, sowhat) {
      return '<div class="tut-note"><div class="tut-num">' + n + '</div><div class="tut-body">' + body +
        (sowhat ? '<span class="sowhat">' + sowhat + '</span>' : '') + '</div></div>';
    }

    var html = '<button class="backlink" data-ggo="#/game">‹ Back</button>' +
      '<h1>📖 How to read a slip</h1>' +
      '<p class="sub">Below is a practice submission — nothing binds. Each part of the slip is explained in turn: what it shows, and the “so what” for your decision.</p>' +

      '<div class="card slip">' +

      '<div class="tut-frag"><div class="slip-head"><span class="slip-class">🏭 PROPERTY D&F</span>' +
      '<span class="slip-prem">$448k <small>annual premium</small></span></div>' +
      '<div class="slip-name">Bayshore Resorts Group</div></div>' +
      note(1,
        'The <strong>class</strong> tells you what kind of trouble to expect: property is short-tail (claims known fast) but catastrophe-exposed; casualty is the opposite — quiet for years, then late claims. The <strong>premium</strong> is annual and earns into your results a quarter at a time.',
        'Premium is your upside. Before admiring it, find your downside — that comes next.') +

      '<div class="tut-frag"><table class="slip-table">' +
      '<tr><td>Total insured value</td><td>$30.00m</td></tr>' +
      '<tr><td>Limit</td><td>$8.00m</td></tr>' +
      '</table></div>' +
      note(2,
        'The <strong>total insured value</strong> is everything the client owns at the site; the <strong>limit</strong> ($8m) is the most this policy can pay you out of it. Notice the asymmetry: you collect $448k a year — and stand to pay up to $8m.',
        'You are selling an 18-to-1 payout. One total loss consumes eighteen years of this premium — so risk selection, not volume, is the job.') +

      '<div class="tut-frag"><table class="slip-table">' +
      '<tr><td>Rate on limit</td><td>5.60% <span class="gpos">(+12% vs class benchmark)</span></td></tr>' +
      '<tr><td>Acquisition cost</td><td>22.0%</td></tr>' +
      '</table></div>' +
      note(3,
        'The <strong>rate</strong> is premium ÷ limit — the price per unit of risk. The comparison to the <strong>class benchmark</strong> is your rate-adequacy signal: +12% means this deal is priced 12% above the going market level. The <strong>acquisition cost</strong> (brokerage and commissions) never reaches you: of the $448k, about $99k is gone on day one.',
        'Above benchmark = margin cushion. Below benchmark = ask WHY it is cheap — in this market, cheap usually knows something you don’t.') +

      '<div class="tut-frag"><table class="slip-table">' +
      '<tr><td>Perils</td><td>All risks of physical damage & business interruption incl. named windstorm</td></tr>' +
      '<tr><td>Cat zone</td><td>US Gulf — windstorm · PML $1.36m</td></tr>' +
      '</table></div>' +
      note(4,
        'The <strong>perils</strong> define what can hurt you; the <strong>cat zone</strong> tells you this risk stacks with every other Gulf risk you hold. Its <strong>PML</strong> (probable maximum loss, $1.36m) is the modelled slice of the limit a major hurricane would claim.',
        'The question is never “what is THIS risk’s PML?” — it is “what does it add to MY pile?”. One hurricane hits your whole Gulf book at once. That is why the portfolio impact panel below matters more than anything above it.') +

      '<div class="tut-frag"><table class="slip-table">' +
      '<tr><td>5-year record</td><td><div class="ghist-row">' +
      '<span class="ghist">Yr−5: clean</span><span class="ghist">Yr−4: clean</span><span class="ghist loss">Yr−3: $650k</span><span class="ghist">Yr−2: clean</span><span class="ghist">Yr−1: clean</span>' +
      '</div>5-yr loss ratio ≈ 29%</td></tr></table></div>' +
      note(5,
        'The <strong>loss record</strong> is your window into the risk’s underlying quality — how well the client runs its operations — which the rate alone cannot tell you. One loss in five years at a 29% loss ratio is a decent record for this class.',
        'Read price and record TOGETHER: a strong rate on a dirty risk can still lose; a fair rate on a clean risk can be a gem. And beware: for severity classes, five clean years prove very little — the big one simply hasn’t happened yet.') +

      '<div class="tut-frag"><div class="slip-impact"><div class="d-title">The underwriter’s view</div>' +
      '<div class="gline"><span>Est. annual profit (your estimate)</span><span class="gpos">$76k</span></div>' +
      '<div class="gline"><span>Extra capital required</span><span>$410k</span></div>' +
      '<div class="gline"><span>Return on marginal capital</span><span>19% — clears a 15% hurdle</span></div>' +
      '</div></div>' +
      note(6,
        'The <strong>estimate</strong> is built from the rate versus benchmark — it does NOT know the hidden quality of the risk (that judgement is yours, from the record). The <strong>extra capital</strong> is what this risk adds to your requirement, and the <strong>return on marginal capital</strong> divides one by the other.',
        'Capital is your scarce resource. A modest profit needing almost no extra capital (a diversifying risk) can beat a big profit that grows your peak zone. 15% is your hurdle — below it, the risk is renting your capital too cheaply.') +

      '<div class="tut-frag"><div class="slip-impact"><div class="d-title">Portfolio impact (full line)</div>' +
      '<div class="gline"><span>Required capital</span><span>$2.68m → $3.09m</span></div>' +
      '<div class="gline"><span>Solvency after</span><span class="gpos">324%</span></div>' +
      '<div class="gline"><span>US Gulf — windstorm PML</span><span>$8.28m → $9.64m</span></div>' +
      '</div></div>' +
      note(7,
        'The same risk is a <strong>different decision depending on your existing book</strong>. Here it would push your Gulf PML from $8.28m to $9.64m and your required capital up $410k, leaving solvency at a comfortable 324%. If your Gulf pile were already at your limit, this identical slip would deserve a decline.',
        'This is the heart of portfolio underwriting: you are never pricing a risk in isolation — you are pricing its marginal effect on everything you already wrote.') +

      '<div class="tut-frag"><div class="btn-row">' +
      '<button class="btn" disabled>Write 100%</button>' +
      '<button class="btn secondary" disabled>Write 50%</button>' +
      '<button class="btn ghost" disabled>Decline</button>' +
      '</div></div>' +
      note(8,
        'Three answers, all legitimate. <strong>100%</strong> when price, quality and portfolio fit all agree. <strong>50%</strong> when you like the risk but not the concentration — half-lines are how real underwriters manage aggregation while keeping the relationship. <strong>Decline</strong> when any leg fails.',
        'Declining is a position, not a failure. In soft markets the decline button is the most profitable one on the screen.') +
      '</div>' +

      '<h2>The quarterly rhythm</h2><div class="card"><div class="lesson-body">' +
      '<p><strong>1 · Review 10 slips</strong> — decisions as above, one at a time.</p>' +
      '<p><strong>2 · Portfolio decisions</strong> — set the quota share (annual, Q1 only), the catastrophe layer (seasonally priced, 2× limit per year), and any capital actions (raise when thin, dividend when fat).</p>' +
      '<p><strong>3 · Close the quarter</strong> — the dice roll: attritional losses, large losses, catastrophes by zone, late casualty claims drawing on the IBNR you provisioned. Then read the report the way the Regulation module taught: decompose it.</p>' +
      '<p style="margin-bottom:0"><strong>Watch two numbers above all:</strong> your <strong>solvency ratio</strong> (below 100% = regulatory suspension) and your <strong>worst zone PML against capital</strong> (a full bar means one event takes most of your money).</p>' +
      '</div></div>' +

      '<h2>The six questions to ask every slip</h2><div class="card"><div class="lesson-body"><ol style="margin-bottom:0">' +
      '<li>What is the rate <strong>versus benchmark</strong> — and if it’s cheap, why?</li>' +
      '<li>What does the <strong>loss record</strong> say about the risk’s quality?</li>' +
      '<li>What is my <strong>downside</strong> — limit, perils, tail?</li>' +
      '<li>What does it add to my <strong>peak accumulation</strong>?</li>' +
      '<li>What is the <strong>return on the marginal capital</strong> it consumes?</li>' +
      '<li>Would <strong>half a line</strong> get most of the profit with less concentration?</li>' +
      '</ol></div></div>' +

      '<button class="btn" id="tut-cta" style="margin-bottom:8px">' + (G && G.q ? 'Back to the game' : 'Found your syndicate — $10m capital') + '</button>';

    app().innerHTML = html;
    bindCommon();
    document.getElementById('tut-cta').addEventListener('click', function () {
      if (G && G.q) go('#/game');
      else { newGame(); go('#/game'); }
    });
  }

  function renderIntro() {
    app().innerHTML = '<div class="hero"><div class="kicker">Simulation</div>' +
      '<h1>🎮 Syndicate</h1>' +
      '<p>Run your own London market insurer. Start with $10m of capital, review ten submissions a quarter, build a portfolio, buy reinsurance — and survive whatever the perils throw at you.</p></div>' +
      '<div class="card"><h3 style="margin-top:0">How it works</h3><ul class="lesson-body" style="margin-left:18px">' +
      '<li>Each turn is a <strong>quarter</strong>. Review 10 slips: write the full line, half the line, or decline. Every slip shows the rate versus benchmark, the loss record, and the <strong>return on the extra capital</strong> the risk consumes.</li>' +
      '<li>Your capital requirement is <strong>diversified</strong>: spreading across classes and zones earns real credit; concentrating destroys it. The dashboard shows exactly where the requirement comes from.</li>' +
      '<li>Long-tail classes <strong>provision IBNR</strong> as they earn — clean years release reserves years later; bad books strengthen. The tail is where casualty fortunes are decided.</li>' +
      '<li>Before closing each quarter: set <strong>outwards reinsurance</strong> (quota share + catastrophe layer) and take <strong>capital actions</strong> — raise when thin, pay dividends when fat.</li>' +
      '<li>Then the dice roll: attritional losses, large losses, zone catastrophes — with a market that softens quarter by quarter and hardens after events.</li>' +
      '<li>Below required capital: <strong>regulatory suspension</strong> — no new business until restored. Below zero: insolvency.</li></ul>' +
      '<button class="btn secondary" id="g-guide" style="margin:6px 0 10px">📖 First: how to read a slip — guided tour</button>' +
      '<button class="btn" id="g-start">Found your syndicate — $10m capital</button></div>';
    document.getElementById('g-guide').addEventListener('click', function () { go('#/game/guide'); });
    document.getElementById('g-start').addEventListener('click', function () { newGame(); render(); });
  }

  function renderDashboard() {
    var html = header();
    var subsLeft = G.submissions.length - G.subIndex;

    if (G.phase === 'uw') {
      html += '<div class="card tappable" data-ggo="#/game/slip"><div class="row"><div class="mod-icon">📥</div>' +
        '<div class="grow"><div class="mod-title">Review submissions</div>' +
        '<div class="mod-meta">' + subsLeft + ' of 10 slips waiting for your decision</div></div><div class="chev">›</div></div></div>';
    }
    if (G.phase === 'ri') {
      html += '<div class="card tappable" data-ggo="#/game/ri"><div class="row"><div class="mod-icon">🛡️</div>' +
        '<div class="grow"><div class="mod-title">Set reinsurance &amp; close the quarter</div>' +
        '<div class="mod-meta">Quota share, catastrophe layer — then roll the dice</div></div><div class="chev">›</div></div></div>';
    }
    if (G.phase === 'report' && G.lastReport) {
      html += '<div class="card tappable" data-ggo="#/game/report"><div class="row"><div class="mod-icon">📊</div>' +
        '<div class="grow"><div class="mod-title">Quarter report ready</div>' +
        '<div class="mod-meta">See the result and move to the next quarter</div></div><div class="chev">›</div></div></div>';
    }

    html += '<div class="card tappable" data-ggo="#/game/guide" style="padding:11px 15px"><div class="row">' +
      '<span style="font-size:1.2rem">📖</span><div class="grow"><div class="mod-meta" style="margin:0">How to read a slip — the guided tour, any time you need it.</div></div><div class="chev">›</div></div></div>';

    // portfolio summary
    var inf = inForce();
    var prem = annualPremiumInForce();
    html += '<h2>Portfolio</h2><div class="card">';
    if (!inf.length) {
      html += '<p class="sub" style="margin:0">No policies in force yet. Go write something (carefully).</p>';
    } else {
      var byClass = {};
      inf.forEach(function (p) {
        byClass[p.classId] = byClass[p.classId] || { n: 0, prem: 0 };
        byClass[p.classId].n++; byClass[p.classId].prem += p.premium * p.share;
      });
      html += '<div class="gstat-row" style="margin-bottom:12px">' +
        statCard('Policies in force', inf.length) +
        statCard('Premium in force', money(prem)) +
        statCard('IBNR held', money(totalReserves())) +
        '</div>';
      CLASSES.forEach(function (c) {
        var b = byClass[c.id];
        if (!b) return;
        html += '<div class="gline"><span>' + c.icon + ' ' + esc(c.name) + '</span><span>' + b.n + ' · ' + money(b.prem) + '</span></div>';
      });
    }
    html += '</div>';

    // capital requirement breakdown — the diversification lesson made visible
    var bd = capitalBreakdown(null);
    html += '<h2>Where your capital requirement comes from</h2><div class="card">' +
      '<div class="gline"><span>Premium risk (after class-mix diversification)</span><span>' + money(bd.premRisk) + '</span></div>' +
      '<div class="gline"><span>Catastrophe risk (worst net zone PML)</span><span>' + money(bd.catRisk) + '</span></div>' +
      '<div class="gline"><span>Reserve risk (on IBNR held)</span><span>' + money(bd.resRisk) + '</span></div>' +
      '<div class="gline"><span>Diversification between the three</span><span class="gpos">−' + money(bd.divBenefit).replace('−', '') + '</span></div>' +
      '<div class="gline gtotal"><span>Required capital</span><span>' + money(bd.total) + '</span></div>' +
      '<div class="d-caption">Risks that don’t go wrong together need less combined capital: spreading across classes shrinks premium risk, and premium, catastrophe and reserve risks combine sub-additively. Concentrate — in one class or one zone — and the credit disappears.</div>' +
      '</div>';

    // PML by zone
    html += '<h2>Aggregations (PML by zone)</h2><div class="card">';
    var any = false;
    Object.keys(ZONES).forEach(function (z) {
      var g = zonePML(z, null);
      if (g <= 0) return;
      any = true;
      var net = g * (1 - G.ri.qs); net = net - catRecovery(net);
      var w = Math.min(100, 100 * net / Math.max(G.capital, 1));
      html += '<div class="gline"><span>' + esc(ZONES[z].name) + '</span><span>gross ' + money(g) + ' · net ' + money(net) + '</span></div>' +
        '<div class="progress-track" style="margin:4px 0 10px"><div class="progress-fill' + (net > G.capital * 0.6 ? '' : ' done') + '" style="width:' + w + '%"></div></div>';
    });
    if (!any) html += '<p class="sub" style="margin:0">No catastrophe aggregation yet.</p>';
    html += '<div class="d-caption">Net PML shown after your quota share and cat layer. Bars measure net PML against capital — a full bar means one event could take most of it.</div></div>';

    // reinsurance in force
    html += '<h2>Outwards reinsurance</h2><div class="card">' +
      '<div class="gline"><span>Quota share</span><span>' + (G.ri.qs ? pct(G.ri.qs) + ' ceded · ' + pct(QS_CEDING_COMM) + ' commission' : 'none') + '</span></div>' +
      '<div class="gline"><span>Cat excess of loss</span><span>' + (G.ri.catL ? money(G.ri.catL) + ' xs ' + money(G.ri.catA) + ' · ' + money(Math.max(0, 2 * G.ri.catL - (G.ri.catUsed || 0))) + ' annual limit left' : 'none') + '</span></div></div>';

    // results history
    if (G.history.length) {
      html += '<h2>Results</h2><div class="card">';
      var yr = yearOf(G.q);
      html += '<div class="gstat-row" style="margin-bottom:10px">' +
        statCard('Year ' + yr + ' P&L', money(G.yearProfits[yr] || 0), (G.yearProfits[yr] || 0) >= 0 ? 'good' : 'bad') +
        statCard('Best quarter', G.records.bestQuarter !== null ? money(G.records.bestQuarter) : '—') +
        statCard('Cats endured', G.records.catsSurvived) +
        '</div>';
      G.history.slice(-8).reverse().forEach(function (h) {
        html += '<div class="gline"><span>Y' + yearOf(h.q) + ' Q' + qInYear(h.q) + '</span><span class="' + (h.profit >= 0 ? 'gpos' : 'gneg') + '">' + money(h.profit) + ' · CR ' + (100 * h.cr).toFixed(0) + '%</span></div>';
      });
      html += '</div>';
    }

    app().innerHTML = html;
    bindCommon();
  }

  function renderSlip() {
    if (G.phase !== 'uw' || G.subIndex >= G.submissions.length) { go('#/game'); return; }
    var r = G.submissions[G.subIndex];
    var cls = CLASSES.filter(function (c) { return c.id === r.classId; })[0];

    var histHtml = r.hist.map(function (h, i) {
      var y = 'Yr−' + (5 - i);
      return '<span class="ghist' + (h ? ' loss' : '') + '">' + y + ': ' + (h ? money(h) : 'clean') + '</span>';
    }).join('');

    var extraFull = { premium: r.premium, limit: r.limit, dmg: r.dmg, zone: r.zone, share: 1, classId: r.classId };
    var extraHalf = { premium: r.premium, limit: r.limit, dmg: r.dmg, zone: r.zone, share: 0.5, classId: r.classId };
    var bdNow = capitalBreakdown(null);
    var bdFull = capitalBreakdown(extraFull);
    var reqNow = bdNow.total, reqFull = bdFull.total;
    var solAfter = G.capital / reqFull;
    var suspended = solvency() < 1;
    var canFull = solAfter >= 1 && !suspended;
    var canHalf = (G.capital / requiredCapital(extraHalf) >= 1) && !suspended;

    // what drives the marginal capital?
    var margCap = reqFull - reqNow;
    var catDelta = bdFull.catRisk - bdNow.catRisk;
    var capDriver;
    if (margCap < 60000) {
      capDriver = 'Almost no extra capital: this risk diversifies your book — its bad years are unlikely to coincide with your existing peaks.';
    } else if (catDelta > margCap * 0.5) {
      capDriver = 'Capital moves mainly because this risk grows your <strong>peak accumulation</strong> (' + (r.zone ? esc(ZONES[r.zone].name) : 'catastrophe zone') + '). One event there could now take more of your money, so more capital must stand behind it.';
    } else {
      capDriver = 'Capital moves mainly through <strong>premium risk</strong> — more business means more that can go wrong in an ordinary bad year. Diversification across your classes absorbs part of it.';
    }

    // underwriter's economics (estimate — can be wrong!)
    var rateDelta = r.rate / r.benchRate - 1;
    var estMargin = 1 - r.estELR - r.acq;
    var estProfit = r.premium * estMargin;
    var rocTxt;
    if (margCap < 60000) rocTxt = estProfit > 0 ? 'exceptional — profit with negligible extra capital' : 'no capital needed, but the deal itself looks loss-making';
    else {
      var roc = estProfit / margCap;
      rocTxt = (100 * roc).toFixed(0) + '% expected return on the extra capital' + (roc >= 0.15 ? ' — clears a 15% hurdle' : roc >= 0 ? ' — thin against a 15% hurdle' : ' — expected to destroy value');
    }

    var html = header() +
      '<div class="quiz-progress">' + G.submissions.map(function (s, i) {
        var c = 'quiz-dot';
        if (i < G.subIndex) c += s.share > 0 ? ' right' : ' wrong';
        else if (i === G.subIndex) c += ' current';
        return '<div class="' + c + '"></div>';
      }).join('') + '</div>' +
      '<div class="card slip">' +
      '<div class="slip-head"><span class="slip-class">' + cls.icon + ' ' + esc(cls.name) + '</span>' +
      '<span class="slip-prem">' + money(r.premium) + ' <small>annual premium</small></span></div>' +
      '<div class="slip-name">' + esc(r.name) + '</div>' +
      '<table class="slip-table">' +
      (r.tiv ? '<tr><td>Total insured value</td><td>' + money(r.tiv) + '</td></tr>' : '') +
      '<tr><td>' + (r.attach ? 'Layer' : 'Limit') + '</td><td>' + money(r.limit) + (r.attach ? ' xs ' + money(r.attach) : '') + '</td></tr>' +
      '<tr><td>Rate on ' + (r.tiv ? 'limit' : 'line') + '</td><td>' + (100 * r.rate).toFixed(2) + '% <span class="' + (rateDelta >= 0.05 ? 'gpos' : rateDelta <= -0.05 ? 'gneg' : '') + '">(' + (rateDelta >= 0 ? '+' : '') + (100 * rateDelta).toFixed(0) + '% vs class benchmark)</span></td></tr>' +
      '<tr><td>Acquisition cost</td><td>' + (100 * r.acq).toFixed(1) + '%</td></tr>' +
      '<tr><td>Perils</td><td>' + cls.perils + '</td></tr>' +
      (r.zone ? '<tr><td>Cat zone</td><td>' + esc(ZONES[r.zone].name) + ' · PML ' + money(r.limit * r.dmg) + '</td></tr>' : '') +
      (r.tail ? '<tr><td>Tail</td><td>Claims may emerge up to ' + r.tail + ' quarters after expiry</td></tr>' : '') +
      '<tr><td>5-year record</td><td><div class="ghist-row">' + histHtml + '</div>5-yr loss ratio ≈ ' + (100 * r.histLR).toFixed(0) + '%</td></tr>' +
      '</table>' +
      '<div class="slip-impact"><div class="d-title">The underwriter’s view</div>' +
      '<div class="map-desc" style="margin-bottom:8px">' +
      (rateDelta >= 0.1 ? '💪 Priced <strong>' + (100 * rateDelta).toFixed(0) + '% above</strong> the class benchmark — a strong rate.' :
        rateDelta <= -0.1 ? '⚠️ Priced <strong>' + (100 * Math.abs(rateDelta)).toFixed(0) + '% below</strong> the class benchmark — someone is buying this cheap.' :
        '➖ Priced close to the class benchmark.') + ' ' +
      (r.histLR > 0.6 ? 'The 5-year record is poor (' + (100 * r.histLR).toFixed(0) + '% loss ratio) — is the rate change enough to fix it?' :
        r.histLR > 0.3 ? 'The record is mixed — read it against the rate.' :
        'The record is clean — but remember: for severity classes a clean history proves little.') +
      '</div>' +
      '<div class="gline"><span>Est. annual profit (your estimate)</span><span class="' + (estProfit >= 0 ? 'gpos' : 'gneg') + '">' + money(estProfit) + '</span></div>' +
      '<div class="gline"><span>Extra capital required</span><span>' + money(margCap) + '</span></div>' +
      '<div class="gline"><span>Return on marginal capital</span><span>' + rocTxt + '</span></div>' +
      '</div>' +
      '<div class="slip-impact"><div class="d-title">Portfolio impact (full line)</div>' +
      '<div class="gline"><span>Required capital</span><span>' + money(reqNow) + ' → ' + money(reqFull) + '</span></div>' +
      '<div class="gline"><span>Solvency after</span><span class="' + (solAfter >= 1.2 ? 'gpos' : solAfter >= 1 ? '' : 'gneg') + '">' + pct(solAfter) + '</span></div>' +
      (r.zone ? '<div class="gline"><span>' + esc(ZONES[r.zone].name) + ' PML</span><span>' + money(zonePML(r.zone, null)) + ' → ' + money(zonePML(r.zone, { zone: r.zone, limit: r.limit, dmg: r.dmg, share: 1 })) + '</span></div>' : '') +
      '<div class="d-caption" style="margin-top:6px">' + capDriver + '</div>' +
      '</div>' +
      '<div class="btn-row">' +
      '<button class="btn" id="g-full"' + (canFull ? '' : ' disabled') + '>Write 100%</button>' +
      '<button class="btn secondary" id="g-half"' + (canHalf ? '' : ' disabled') + '>Write 50%</button>' +
      '<button class="btn ghost" id="g-decline">Decline</button>' +
      '</div>' +
      (suspended ? '<div class="d-caption" style="margin-top:8px">🚫 <strong>Regulatory suspension:</strong> you are below required capital. You cannot bind new business — decline the rest, then raise capital or buy reinsurance.</div>' :
        !canFull ? '<div class="d-caption" style="margin-top:8px">⚠️ Capital headroom is too tight for the full line — half it, decline, or buy more reinsurance next phase.</div>' : '') +
      '</div>';

    app().innerHTML = html;
    bindCommon();

    function decide(share) {
      if (share > 0) {
        r.share = share; r.writtenQ = G.q; r.earnedQtrs = 0;
        G.policies.push(r);
        G.records.writtenCount++;
      } else r.share = 0;
      G.subIndex++;
      if (G.subIndex >= G.submissions.length) { G.phase = 'ri'; save(); go('#/game/ri'); }
      else { save(); renderSlip(); }
      window.scrollTo(0, 0);
    }
    var bf = document.getElementById('g-full');
    var bh = document.getElementById('g-half');
    if (canFull) bf.addEventListener('click', function () { decide(1); });
    if (canHalf) bh.addEventListener('click', function () { decide(0.5); });
    document.getElementById('g-decline').addEventListener('click', function () { decide(0); });
  }

  function renderRi() {
    if (G.phase !== 'ri') { go('#/game'); return; }
    var qsOpts = [0, 0.1, 0.2, 0.3, 0.4];
    var worst = 0;
    Object.keys(ZONES).forEach(function (z) { var g = zonePML(z, null); if (g > worst) worst = g; });

    var catOpts = [{ A: 0, L: 0 }];
    if (worst > 1e6) {
      var a1 = Math.round(worst * 0.25 / 5e5) * 5e5;
      var a2 = Math.round(worst * 0.5 / 5e5) * 5e5;
      catOpts.push({ A: a1, L: Math.round(worst * 0.75 / 5e5) * 5e5 });
      catOpts.push({ A: a2, L: Math.round(worst * 0.6 / 5e5) * 5e5 });
      catOpts.push({ A: Math.round(worst * 0.15 / 5e5) * 5e5, L: Math.round(worst * 1.1 / 5e5) * 5e5 });
    }

    var qsLocked = qInYear(G.q) !== 1;
    var seasonW = catSeasonWeight();
    var html = header() +
      '<h2>Portfolio decisions — Y' + yearOf(G.q) + ' Q' + qInYear(G.q) + '</h2>' +
      '<div class="card"><h3 style="margin-top:0">Quota share — an annual treaty</h3>' +
      '<p class="sub">Cede a fixed share of every premium and every loss; receive a ' + pct(QS_CEDING_COMM) + ' ceding commission. Cuts required capital — and profit. ' +
      (qsLocked ? '<strong>Treaties are annual: your ' + (G.ri.qs ? pct(G.ri.qs) : 'nil') + ' cession is locked until 1 January.</strong>' : 'Set it now for the year ahead.') + '</p>' +
      '<div class="gopt-row">' + qsOpts.map(function (q) {
        return '<button class="gopt' + (G.ri.qs === q ? ' active' : '') + '" data-qs="' + q + '"' + (qsLocked ? ' disabled' : '') + '>' + (q ? pct(q) : 'None') + '</button>';
      }).join('') + '</div></div>' +
      '<div class="card"><h3 style="margin-top:0">Catastrophe excess of loss</h3>' +
      '<p class="sub">Per-event protection above an attachment, one reinstatement (annual limit = 2× the layer). Your worst net zone PML is <strong>' + money(worst * (1 - G.ri.qs)) + '</strong>. ' +
      'Pricing is seasonal — this quarter carries ' + pct(seasonW) + ' of the year’s hazard, so cover costs accordingly. No cheap wind cover bought only for Q3.</p>' +
      (G.ri.catUsed ? '<p class="sub">⚠️ ' + money(G.ri.catUsed) + ' of this year’s ' + money(2 * G.ri.catL) + ' recoverable limit already used.</p>' : '') +
      '<div id="cat-opts">' + catOpts.map(function (o, i) {
        var price = o.L ? catRiPrice(o.A, o.L) * seasonW : 0;
        var sel = G.ri.catA === o.A && G.ri.catL === o.L;
        return '<button class="gopt wide' + (sel ? ' active' : '') + '" data-cat="' + i + '">' +
          (o.L ? money(o.L) + ' xs ' + money(o.A) + ' — ' + money(price) + ' this quarter' : 'No cat cover') + '</button>';
      }).join('') + '</div></div>' +
      '<div class="card"><h3 style="margin-top:0">Capital actions</h3>' +
      '<p class="sub">A real board manages capital both ways: raise it when thin (costly — investors charge for rescue money), return it when fat (idle capital drags your return).</p>' +
      '<div class="btn-row">' +
      '<button class="btn secondary" id="g-raise">Raise $2.5m<br><small>12% issue cost</small></button>' +
      '<button class="btn secondary" id="g-div"' + ((G.capital - 1e6) / requiredCapital(null) >= 1.6 ? '' : ' disabled') + '>Pay $1m dividend<br><small>needs solvency ≥ 160% after</small></button>' +
      '</div>' +
      ((G.dividends || G.raised) ? '<div class="gline" style="margin-top:8px"><span>Dividends paid / capital raised to date</span><span>' + money(G.dividends) + ' / ' + money(G.raised) + '</span></div>' : '') +
      '</div>' +
      '<div class="card"><div class="gline"><span>Solvency with these choices</span><span id="ri-sol"><strong>' + pct(solvency()) + '</strong></span></div>' +
      '<button class="btn" id="g-close" style="margin-top:10px">Close the quarter — roll the dice 🎲</button></div>';

    app().innerHTML = html;
    bindCommon();

    document.querySelectorAll('[data-qs]').forEach(function (b) {
      if (b.disabled) return;
      b.addEventListener('click', function () {
        G.ri.qs = Number(b.getAttribute('data-qs')); save(); renderRi();
      });
    });
    document.querySelectorAll('[data-cat]').forEach(function (b) {
      b.addEventListener('click', function () {
        var o = catOpts[Number(b.getAttribute('data-cat'))];
        G.ri.catA = o.A; G.ri.catL = o.L; save(); renderRi();
      });
    });
    document.getElementById('g-raise').addEventListener('click', function () {
      G.capital += 2.5e6 * 0.88;
      G.raised = (G.raised || 0) + 2.5e6;
      save(); renderRi();
    });
    var gd = document.getElementById('g-div');
    if (!gd.disabled) gd.addEventListener('click', function () {
      G.capital -= 1e6;
      G.dividends = (G.dividends || 0) + 1e6;
      save(); renderRi();
    });
    document.getElementById('g-close').addEventListener('click', function () {
      resolveQuarter(); go('#/game/report');
    });
  }

  function renderReport() {
    var r = G.lastReport;
    if (!r) { go('#/game'); return; }
    var html = header();

    if (G.gameOver) {
      html += '<div class="card" style="border-color:var(--red)"><h2 style="margin-top:0">💀 Insolvent</h2>' +
        '<p class="sub">Your capital is exhausted. The market’s chain of security pays your policyholders — but your syndicate is done. ' +
        'You survived ' + (G.q) + ' quarters, wrote ' + G.records.writtenCount + ' risks and endured ' + G.records.catsSurvived + ' catastrophes. All-time result: ' + money(G.allTime) + '.</p>' +
        '<button class="btn" id="g-restart2">Found a new syndicate</button></div>';
    }

    html += '<h2>Y' + yearOf(r.q) + ' Q' + qInYear(r.q) + ' report</h2>';

    if (r.events.length) {
      html += '<div class="card">';
      r.events.forEach(function (e) {
        html += '<div class="gevent"><span>' + e.icon + '</span><span>' + e.text + '</span></div>';
      });
      html += '</div>';
    } else {
      html += '<div class="card"><p class="sub" style="margin:0">😌 A quiet quarter — no large losses or catastrophes.</p></div>';
    }

    function line(label, val, sign) {
      var cls = sign === '+' ? 'gpos' : sign === '-' ? 'gneg' : '';
      return '<div class="gline"><span>' + label + '</span><span class="' + cls + '">' + (sign === '-' ? '−' : sign === '+' ? '+' : '') + money(Math.abs(val)).replace('−', '') + '</span></div>';
    }

    html += '<div class="card">' +
      line('Premium earned', r.earned, '+') +
      (r.qsCededPrem ? line('Quota share ceded', r.qsCededPrem, '-') + line('Ceding commission', r.qsCommission, '+') : '') +
      line('Attritional & large losses (net)', (r.attr + r.large) * (1 - G.ri.qs), '-') +
      (r.catGross ? line('Catastrophe losses (net of all reinsurance)', r.catNet, '-') : '') +
      (r.ibnrProv ? line('IBNR provisioned for long-tail business', r.ibnrProv, '-') : '') +
      (r.strengthening ? line('Reserve strengthening (claims above IBNR held)', r.strengthening, '-') : '') +
      (r.releases ? line('Reserve releases (clean years closed)', r.releases, '+') : '') +
      line('Acquisition costs', r.acqCost, '-') +
      line('Operating expenses', r.opex, '-') +
      (r.riCatPremium ? line('Cat reinsurance premium', r.riCatPremium, '-') : '') +
      (r.reinstatement ? line('Reinstatement premium', r.reinstatement, '-') : '') +
      line('Investment income', r.invIncome, '+') +
      '<div class="gline gtotal"><span>Quarter result</span><span class="' + (r.profit >= 0 ? 'gpos' : 'gneg') + '">' + money(r.profit) + '</span></div>' +
      '<div class="gline"><span>Net combined ratio</span><span>' + (100 * r.cr).toFixed(0) + '%</span></div>' +
      '<div class="gline"><span>Capital</span><span>' + money(r.capitalAfter) + '</span></div>' +
      '</div>';

    var yr = yearOf(r.q);
    html += '<div class="gstat-row" style="margin-bottom:12px">' +
      statCard('Year ' + yr + ' P&L', money(G.yearProfits[yr] || 0), (G.yearProfits[yr] || 0) >= 0 ? 'good' : 'bad') +
      statCard('All-time P&L', money(G.allTime), G.allTime >= 0 ? 'good' : 'bad') +
      statCard('Solvency', pct(solvency())) +
      '</div>';

    if (!G.gameOver) html += '<button class="btn" id="g-next">Start Y' + yearOf(G.q + 1) + ' Q' + qInYear(G.q + 1) + ' — 10 new submissions</button>';

    app().innerHTML = html;
    bindCommon();
    var n = document.getElementById('g-next');
    if (n) n.addEventListener('click', function () { nextQuarter(); go('#/game'); });
    var r2 = document.getElementById('g-restart2');
    if (r2) r2.addEventListener('click', function () { newGame(); go('#/game'); });
  }

  /* ---------- router entry ---------- */

  function render(sub) {
    load();
    if (sub === 'guide') return renderGuide();
    if (!G || !G.q) { renderIntro(); return; }
    if (G.gameOver && sub !== 'report') { renderReport(); return; }
    if (sub === 'slip') return renderSlip();
    if (sub === 'ri') return renderRi();
    if (sub === 'report') return renderReport();
    renderDashboard();
  }

  window.LMA_GAME = {
    render: function (sub) { render(sub); }
  };
})();
