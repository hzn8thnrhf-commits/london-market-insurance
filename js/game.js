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
      guided: true, reads: { n: 0, c: 0 },
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
      benchRate: benchRate, estELR: estELR, benchDelta: rate / benchRate - 1,
      hist: hist, histLR: histLR, mkt: market, exp: 0,
      writtenQ: 0, share: 0, earnedQtrs: 0, resv: 0, closed: false
    };
  }

  // A renewal of one of the player's own expiring policies: same risk, new terms.
  // The broker's offer reflects the market and the risk's experience — and the
  // player knows that experience first-hand.
  function genRenewal(p) {
    var cls = CLASSES.filter(function (c) { return c.id === p.classId; })[0];
    var mkt = G.market;
    var hadLoss = (p.exp || 0) > 0;
    var rateNew = p.rate * (mkt / (p.mkt || 1)) * (hadLoss ? rnd(1.08, 1.30) : rnd(0.93, 1.06));
    var premium = Math.round(p.limit * rateNew / 1000) * 1000;
    var ratio = p.rate / rateNew;
    var midRate = (cls.rateOnLimit[0] + cls.rateOnLimit[1]) / 2;
    var hist = p.hist.slice(1).concat([hadLoss ? Math.round(p.exp / 50000) * 50000 : 0]);
    var histLoss = hist.reduce(function (a, b) { return a + b; }, 0);
    return {
      id: G.nextId++, classId: p.classId, name: p.name,
      limit: p.limit, tiv: p.tiv, attach: p.attach, premium: premium,
      rate: rateNew, acq: p.acq, zone: p.zone, dmg: p.dmg,
      trueELR: Math.min(1.6, p.trueELR * ratio * rnd(0.95, 1.10)),
      tail: p.tail,
      benchRate: midRate * mkt,
      estELR: Math.min(1.5, p.estELR * ratio),
      hist: hist, histLR: histLoss / (premium * 5), mkt: mkt, exp: 0,
      benchDelta: rateNew / (midRate * mkt) - 1,
      renewalOf: p.id, prevRate: p.rate, prevExp: p.exp || 0,
      writtenQ: 0, share: 0, earnedQtrs: 0, resv: 0, closed: false
    };
  }

  function genSubmissions() {
    G.submissions = [];
    // your expiring policies come back to you first — the renewal book
    var renewals = G.policies.filter(function (p) {
      return p.share > 0 && p.writtenQ > 0 && (G.q - p.writtenQ) === 4 && !p.renewalOffered;
    }).slice(0, 4);
    renewals.forEach(function (p) {
      p.renewalOffered = true;
      G.submissions.push(genRenewal(p));
    });
    while (G.submissions.length < 10) G.submissions.push(genRisk());
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

  // a zone's gross PML netted through the current quota share and cat layer
  function netOfRi(gross) {
    var n = gross * (1 - G.ri.qs);
    return n - Math.min(G.ri.catL || 0, Math.max(0, n - (G.ri.catA || 0)));
  }

  // gross → net PML impact lines for a slip's zone, with explicit labelling
  function pmlImpactLines(r, share) {
    if (!r.zone) return '<div class="gline"><span>Catastrophe zones</span><span>none — no accumulation added</span></div>';
    var g0 = zonePML(r.zone, null);
    var g1 = zonePML(r.zone, { zone: r.zone, limit: r.limit, dmg: r.dmg, share: share });
    return '<div class="gline"><span>' + esc(ZONES[r.zone].name) + ' PML (gross)</span><span>' + money(g0) + ' → ' + money(g1) + '</span></div>' +
      '<div class="gline"><span>Same, net of your reinsurance</span><span>' + money(netOfRi(g0)) + ' → ' + money(netOfRi(g1)) + '</span></div>' +
      '<div class="d-caption">Gross = before any reinsurance (the raw pile you are building). Net = after your quota share and cat layer — this is the figure your capital requirement stands behind. If the net line barely moves, your current cat layer is absorbing the addition; but note the gross line still grew, and protections renew at next year’s prices.</div>';
  }

  // requirement under a hypothetical reinsurance setting (restores state afterwards)
  function reqWithRi(qs, catA, catL) {
    var s = G.ri, old = { qs: s.qs, catA: s.catA, catL: s.catL };
    s.qs = qs; s.catA = catA; s.catL = catL;
    var v = requiredCapital(null);
    s.qs = old.qs; s.catA = old.catA; s.catL = old.catL;
    return v;
  }

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
          p.exp = (p.exp || 0) + sev;
          events.push({ icon: '🔥', text: 'Large loss: ' + p.name + ' — gross ' + money(sev) + ' to your line.' +
            ((p.benchDelta || 0) <= -0.05 ? ' <em>You wrote this ' + Math.abs(100 * p.benchDelta).toFixed(0) + '% below benchmark — cheap business hurts twice when it burns.</em>' : '') });
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
            p.exp = (p.exp || 0) + sev;
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
          var fullRec = catRecovery(net);
          var rec = Math.min(fullRec, annualRemaining);
          G.ri.catUsed = (G.ri.catUsed || 0) + rec;
          if (rec > 0 && G.ri.catL > 0) {
            reinstatement += (rec / G.ri.catL) * riCatPremium;
          }
          catNet += net - rec;
          G.records.catsSurvived++;
          events.push({ icon: '🌀', text: zn.peril + ' hits ' + zn.name + '! Gross event loss ' + money(gross) +
            (G.ri.qs ? ' · quota share takes ' + money(gross * G.ri.qs) : '') +
            (rec > 0 ? ' · cat layer recovers ' + money(rec) + ' (reinstatement ' + money((rec / G.ri.catL) * riCatPremium) + ')' : (G.ri.catL ? ' · below your attachment' : ' · no cat cover in place')) +
            (rec < fullRec - 1000 ? ' · <strong>annual limit exhausted — you are bare for further events this year</strong>' : '') });
          // the counterfactual: what protection would have done here
          if (rec === 0 && G.ri.catL === 0 && net > 500000) {
            var hypoA = Math.round(net * 0.35 / 5e5) * 5e5;
            var hypoL = Math.round(net * 0.6 / 5e5) * 5e5;
            var hypoRec = Math.min(hypoL, Math.max(0, net - hypoA));
            if (hypoRec > 250000) {
              events.push({ icon: '💡', text: 'Lesson: a layer of ' + money(hypoL) + ' xs ' + money(hypoA) +
                ' would have recovered about ' + money(hypoRec) + ' of this event. Cover is cheapest before the storm — and dearest after it.' });
            }
          }
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
    report.mb = G.market;
    if (catGross > 0) G.market = Math.min(1.6, G.market + rnd(0.08, 0.2));
    else G.market = Math.max(0.72, G.market - rnd(0.01, 0.04));
    report.ma = G.market;

    if (G.capital <= 0) { G.gameOver = true; }

    G.phase = 'report';
    save();
    if (window.LMA_CHECK_AWARDS) window.LMA_CHECK_AWARDS();
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

  function stepperBar(cur) {
    var steps = [
      { id: 'uw', label: '1 · Underwrite (10 slips)' },
      { id: 'ri', label: '2 · Protect & capital' },
      { id: 'report', label: '3 · Results' }
    ];
    var idx = steps.map(function (s) { return s.id; }).indexOf(cur);
    return '<div class="gstep-bar">' + steps.map(function (s, i) {
      return '<div class="gstep' + (i < idx ? ' done' : i === idx ? ' now' : '') + '">' + (i < idx ? '✓ ' : '') + s.label + '</div>';
    }).join('') + '</div>';
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
      '<div class="gline"><span>US Gulf — windstorm PML (gross)</span><span>$8.28m → $9.64m</span></div>' +
      '<div class="gline"><span>Same, net of your reinsurance</span><span>$4.63m → $5.72m</span></div>' +
      '</div></div>' +
      note(7,
        'The same risk is a <strong>different decision depending on your existing book</strong>. Here it would push your Gulf PML from $8.28m to $9.64m and your required capital up $410k, leaving solvency at a comfortable 324%. If your Gulf pile were already at your limit, this identical slip would deserve a decline. Tap <em>“Show the capital calculation”</em> on any real slip to see the full arithmetic: premium risk + catastrophe risk + reserve risk, combined through squares so the biggest one dominates.',
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

  /* ----- Capital & PML Lab: a consequence-free sandbox ----- */

  var LAB = { p1: 2e6, p2: 1e6, p3: 1e6, zA: 3e6, zB: 1e6, ibnr: 1e6, qs: 0, catA: 1e6, catL: 2e6 };
  var LAB_CAPITAL = 10e6;

  function labCalc(v) {
    var prems = [[v.p1, 0.38], [v.p2, 0.45], [v.p3, 0.34]];
    var tot = v.p1 + v.p2 + v.p3, raw = 0, hhi = 0;
    prems.forEach(function (p) {
      raw += p[0] * p[1];
      if (tot > 0) { var s = p[0] / tot; hhi += s * s; }
    });
    var mix = tot > 0 ? (0.65 + 0.35 * hhi) : 1;
    var premRisk = raw * mix * (1 - v.qs * 0.8);
    function netZone(g) {
      var n = g * (1 - v.qs);
      return n - Math.min(v.catL, Math.max(0, n - v.catA));
    }
    var nA = netZone(v.zA), nB = netZone(v.zB);
    var catRisk = Math.max(nA, nB);
    var resRisk = 0.35 * v.ibnr;
    var sum = premRisk + catRisk + resRisk;
    var req = Math.max(2e6, 1.15 * Math.sqrt(premRisk * premRisk + catRisk * catRisk + resRisk * resRisk));
    return { premRisk: premRisk, catRisk: catRisk, resRisk: resRisk, sum: sum, req: req,
      mix: mix, hhi: hhi, nA: nA, nB: nB, div: Math.max(0, sum - req), sol: LAB_CAPITAL / req };
  }

  var LAB_DRILLS = [
    function () {
      var g = (8 + Math.floor(Math.random() * 9)) * 5e5;
      var q = [0, 0.1, 0.2, 0.3][Math.floor(Math.random() * 4)];
      var A = (2 + Math.floor(Math.random() * 4)) * 5e5;
      var L = (4 + Math.floor(Math.random() * 5)) * 5e5;
      var n = g * (1 - q);
      var ans = n - Math.min(L, Math.max(0, n - A));
      return { q: 'A zone has a gross PML of ' + money(g) + '. You have a ' + pct(q) + ' quota share and a cat layer of ' + money(L) + ' xs ' + money(A) + '. What is the <strong>net PML</strong>, in $ millions?',
        answer: Math.round(ans / 1e4) / 100, tol: 0.03, unit: '$ millions',
        explain: 'Net = gross × (1 − quota share) = ' + money(n) + ', then subtract the layer’s bite: min(limit, anything above the attachment). The layer only helps between its attachment and its top.' };
    },
    function () {
      var cap = (16 + Math.floor(Math.random() * 17)) * 5e5;
      var req = (8 + Math.floor(Math.random() * 13)) * 5e5;
      return { q: 'You hold capital of ' + money(cap) + ' and your required capital is ' + money(req) + '. What is your <strong>solvency ratio</strong>, in %?',
        answer: Math.round(1000 * cap / req) / 10, tol: 2, unit: '%',
        explain: 'Solvency = capital ÷ requirement. Below 100% means suspension; comfortable books run 130%+ so one bad event doesn’t immediately breach.' };
    },
    function () {
      var n = 2 + Math.floor(Math.random() * 3);
      var hhi = n * Math.pow(1 / n, 2);
      var ans = Math.round(100 * (0.65 + 0.35 * hhi)) / 100;
      return { q: 'Your book has <strong>' + n + ' classes with equal premium</strong>. The concentration score is ' + n + ' × (1/' + n + ')² = ' + hhi.toFixed(2) + ', and the mix factor is 0.65 + 0.35 × that score. What is the mix factor? (2 decimal places)',
        answer: ans, tol: 0.015, unit: '(factor)',
        explain: 'One class alone scores 1.0 (no credit); spreading equally over ' + n + ' classes cuts premium risk to ' + Math.round(100 * ans) + '% of its raw value. This is the game’s class-mix diversification credit, made explicit.' };
    }
  ];

  function renderLab() {
    var drill = null, drillDone = false;

    var sliders = [
      { k: 'p1', label: '🏭 Property premium (cat-exposed)', max: 6e6, step: 25e4 },
      { k: 'p2', label: '⚖️ Casualty premium (long-tail)', max: 6e6, step: 25e4 },
      { k: 'p3', label: '🚢 Cargo premium (attritional)', max: 6e6, step: 25e4 },
      { k: 'zA', label: '🌀 Zone A gross PML (Gulf wind)', max: 8e6, step: 25e4 },
      { k: 'zB', label: '🌍 Zone B gross PML (quake)', max: 8e6, step: 25e4 },
      { k: 'ibnr', label: '📊 IBNR reserves held', max: 5e6, step: 25e4 },
      { k: 'qs', label: '🤝 Quota share ceded', max: 0.4, step: 0.05, isPct: true },
      { k: 'catA', label: '🛡️ Cat layer attachment', max: 6e6, step: 25e4 },
      { k: 'catL', label: '🛡️ Cat layer limit', max: 8e6, step: 25e4 }
    ];

    var presets = [
      { name: '⚖️ Balanced', v: { p1: 1.5e6, p2: 1.5e6, p3: 1.5e6, zA: 2e6, zB: 2e6, ibnr: 1.5e6, qs: 0.2, catA: 1e6, catL: 2e6 },
        note: 'Everything spread, everything protected: watch how big the two diversification lines are, and how far the requirement sits below the simple sum.' },
      { name: '🌀 Concentrated', v: { p1: 4e6, p2: 0, p3: 0, zA: 6e6, zB: 0, ibnr: 0, qs: 0, catA: 0, catL: 0 },
        note: 'One class, one zone, no protection: the requirement is essentially your PML with a loading. Concentration gets no credit from anyone.' },
      { name: '🐌 Long-tail heavy', v: { p1: 0.5e6, p2: 4e6, p3: 0.5e6, zA: 0.5e6, zB: 0, ibnr: 4e6, qs: 0, catA: 0, catL: 0 },
        note: 'Little catastrophe risk, but premium risk (casualty factor 45%) and reserve risk now carry the requirement — capital stays tied up long after the premium is earned.' },
      { name: '🛡️ Reinsured', v: { p1: 4e6, p2: 0, p3: 0, zA: 6e6, zB: 0, ibnr: 0, qs: 0.3, catA: 1.5e6, catL: 3e6 },
        note: 'Same concentrated book as before — but a 30% quota share plus a layer chop the net PML down. Compare the requirement with the Concentrated preset: that difference is what reinsurance buys.' }
    ];
    var presetNote = '';

    function fmt(v, isPct) { return isPct ? pct(v) : money(v); }

    function outputs() {
      var c = labCalc(LAB);
      var worst = Math.max(c.nA, c.nB);
      var worstGross = c.nA >= c.nB ? LAB.zA : LAB.zB;
      var stressNet = worst;
      return '<div class="gline"><span>Premium risk (after mix credit ×' + c.mix.toFixed(2) + ')</span><span>' + money(c.premRisk) + '</span></div>' +
        '<div class="gline"><span>Catastrophe risk (worst net zone PML)</span><span>' + money(c.catRisk) + '</span></div>' +
        '<div class="gline"><span>Reserve risk (35% of IBNR)</span><span>' + money(c.resRisk) + '</span></div>' +
        '<div class="gline"><span>Simple sum</span><span>' + money(c.sum) + '</span></div>' +
        '<div class="gline"><span>Diversification between risk types</span><span class="gpos">−' + money(c.div).replace('−', '') + '</span></div>' +
        '<div class="gline gtotal"><span>Required capital</span><span>' + money(c.req) + '</span></div>' +
        '<div class="gline"><span>Solvency (with $10m of capital)</span><span class="' + (c.sol >= 1.3 ? 'gpos' : c.sol >= 1 ? '' : 'gneg') + '">' + pct(c.sol) + '</span></div>' +
        '<div class="gline"><span>Zone A net / Zone B net</span><span>' + money(c.nA) + ' / ' + money(c.nB) + '</span></div>' +
        '<div class="d-caption" style="margin-top:8px">Stress test: if the worst zone’s full PML event (' + money(worstGross) + ' gross) struck now, your net loss would be ' + money(stressNet) + ', leaving capital of ' + money(LAB_CAPITAL - stressNet) + '. ' +
        (c.hhi > 0.6 && c.premRisk > 0 ? 'Notice: your premium is concentrated (mix factor ×' + c.mix.toFixed(2) + ' — little credit). ' : '') +
        (c.catRisk > c.premRisk * 2 ? 'Catastrophe risk dominates: the requirement will move almost one-for-one with your net PML — try the layer sliders. ' :
          c.premRisk > c.catRisk * 2 ? 'Premium risk dominates: zone and layer changes will barely move the requirement — the square-root swallows the smaller components. ' :
          'No single component dominates — this is where the √-of-squares diversification credit is largest. ') + '</div>';
    }

    var html = '<button class="backlink" data-ggo="#/game">‹ Back to the game</button>' +
      '<h1>🧪 Capital & PML Lab</h1>' +
      '<p class="sub">A sandbox with no consequences: drag the levers and watch the capital requirement respond, using exactly the game’s formula. Two minutes here teaches more intuition than an hour of reading.</p>' +
      '<div class="chip-label">Try a scenario</div><div class="preset-row">' +
      presets.map(function (p, i) { return '<button class="gopt" data-preset="' + i + '">' + p.name + '</button>'; }).join('') +
      '</div><div class="d-caption" id="preset-note" style="margin-bottom:12px"></div>' +
      '<div class="card">' +
      sliders.map(function (s) {
        return '<div class="lab-row"><div class="lr-head"><span>' + s.label + '</span><span id="lv-' + s.k + '">' + fmt(LAB[s.k], s.isPct) + '</span></div>' +
          '<input type="range" data-lab="' + s.k + '" min="0" max="' + s.max + '" step="' + s.step + '" value="' + LAB[s.k] + '"></div>';
      }).join('') + '</div>' +
      '<h2>What the model says</h2><div class="card" id="lab-out">' + outputs() + '</div>' +
      '<h2>Test yourself</h2><div class="card" id="lab-drill">' +
      '<p class="sub">Three question types: net PML after reinsurance, solvency ratios, and the mix factor. The quiz calculator logic applies — a phone calculator is fair game.</p>' +
      '<button class="btn secondary" id="drill-new">Give me a question</button>' +
      '<div id="drill-area"></div></div>';

    app().innerHTML = html;
    bindCommon();

    document.querySelectorAll('[data-lab]').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var k = inp.getAttribute('data-lab');
        LAB[k] = Number(inp.value);
        var s = sliders.filter(function (x) { return x.k === k; })[0];
        document.getElementById('lv-' + k).textContent = fmt(LAB[k], s.isPct);
        document.getElementById('lab-out').innerHTML = outputs();
      });
    });
    document.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = presets[Number(b.getAttribute('data-preset'))];
        Object.keys(p.v).forEach(function (k) { LAB[k] = p.v[k]; });
        renderLab();
        document.getElementById('preset-note').textContent = p.note;
        window.scrollTo(0, 0);
      });
    });
    document.getElementById('drill-new').addEventListener('click', function () {
      drill = LAB_DRILLS[Math.floor(Math.random() * LAB_DRILLS.length)]();
      drillDone = false;
      var area = document.getElementById('drill-area');
      area.innerHTML = '<div class="q-text" style="margin-top:12px">' + drill.q + '</div>' +
        '<input class="num-input" id="drill-in" type="text" inputmode="decimal" placeholder="Your answer">' +
        '<div class="num-unit">Answer in ' + esc(drill.unit) + '</div>' +
        '<div id="drill-fb"></div>' +
        '<button class="btn" id="drill-check" style="margin-top:4px">Check</button>';
      var inp = document.getElementById('drill-in');
      inp.focus();
      document.getElementById('drill-check').addEventListener('click', function () {
        if (drillDone) { document.getElementById('drill-new').click(); return; }
        var raw = inp.value.replace(/[,\s%$]/g, '');
        if (raw === '' || isNaN(Number(raw))) { inp.focus(); return; }
        var right = Math.abs(Number(raw) - drill.answer) <= drill.tol + 1e-9;
        drillDone = true;
        document.getElementById('drill-fb').innerHTML = '<div class="feedback ' + (right ? 'good' : 'bad') + '"><b>' +
          (right ? 'Correct.' : 'Not quite — the answer is ' + drill.answer + ' ' + esc(drill.unit) + '.') + '</b>' + drill.explain + '</div>';
        document.getElementById('drill-check').textContent = 'Another question';
      });
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
    var html = header() +
      '<div class="d-caption" style="margin:-4px 4px 14px">💰 <strong>Capital</strong> = your own money standing behind every promise · <strong>Solvency</strong> = capital ÷ required capital (below 100% suspends writing) · <strong>Market</strong> = the price level (1.00 is average; higher = hard market = better rates on offer) · <strong>All-time P&L</strong> = every quarter’s result added up.</div>';
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
      '<span style="font-size:1.2rem">📖</span><div class="grow"><div class="mod-meta" style="margin:0">How to read a slip — the guided tour, any time you need it.</div></div><div class="chev">›</div></div></div>' +
      '<div class="card tappable" data-ggo="#/game/lab" style="padding:11px 15px"><div class="row">' +
      '<span style="font-size:1.2rem">🧪</span><div class="grow"><div class="mod-meta" style="margin:0">Capital & PML Lab — drag the levers, build the intuition. No consequences.</div></div><div class="chev">›</div></div></div>';

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
      html += '<div class="d-caption">“In force” = still providing cover (each policy runs four quarters). Premium in force is the annualised total you would earn if nothing changed. IBNR held is money already set aside for long-tail claims that have not yet surfaced — it belongs to future claimants, not to you, but it earns investment income while it waits.</div>';
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
      '<div class="d-caption">Risks that don’t go wrong together need less combined capital: spreading across classes shrinks premium risk, and premium, catastrophe and reserve risks combine sub-additively. Concentrate — in one class or one zone — and the credit disappears. ' +
      '<span class="review-link" data-ggo="#/game/lab">Play with these levers in the Capital Lab ›</span></div>' +
      '</div>';

    // stress test: the worst zone's full PML event, on the live portfolio
    var stWorst = null, stG = 0;
    Object.keys(ZONES).forEach(function (z) {
      var g0 = zonePML(z, null);
      if (g0 > stG) { stG = g0; stWorst = z; }
    });
    if (stWorst) {
      var stQs = stG * G.ri.qs;
      var stAfterQs = stG - stQs;
      var stRemaining = Math.max(0, 2 * (G.ri.catL || 0) - (G.ri.catUsed || 0));
      var stRec = Math.min(Math.min(G.ri.catL || 0, Math.max(0, stAfterQs - (G.ri.catA || 0))), stRemaining);
      var stReinst = (G.ri.catL > 0 && stRec > 0) ? (stRec / G.ri.catL) * catRiPrice(G.ri.catA, G.ri.catL) * catSeasonWeight() : 0;
      var stNet = stAfterQs - stRec + stReinst;
      var stCapAfter = G.capital - stNet;
      var stSolAfter = stCapAfter / requiredCapital(null);
      html += '<h2>Stress test — the market’s exam question</h2><div class="card">' +
        '<p class="sub">Like Lloyd’s realistic disaster scenarios: assume your worst zone’s full PML event happens <em>tomorrow</em>, and trace it gross to net.</p>' +
        '<button class="btn secondary" id="g-stress">🌀 Run it: full PML event in ' + esc(ZONES[stWorst].name) + '</button>' +
        '<div id="stress-out" hidden style="margin-top:12px">' +
        '<div class="gline"><span>Gross event loss (zone PML)</span><span class="gneg">−' + money(stG).replace('−', '') + '</span></div>' +
        (stQs > 0 ? '<div class="gline"><span>Quota share takes</span><span class="gpos">+' + money(stQs) + '</span></div>' : '') +
        (stRec > 0 ? '<div class="gline"><span>Cat layer recovers</span><span class="gpos">+' + money(stRec) + '</span></div>' :
          '<div class="gline"><span>Cat layer recovers</span><span>' + (G.ri.catL ? 'nothing — event below attachment or limit exhausted' : 'nothing — no layer in place') + '</span></div>') +
        (stReinst > 0 ? '<div class="gline"><span>Reinstatement premium due</span><span class="gneg">−' + money(stReinst).replace('−', '') + '</span></div>' : '') +
        '<div class="gline gtotal"><span>Net cost to you</span><span class="gneg">' + money(-stNet) + '</span></div>' +
        '<div class="gline"><span>Capital after</span><span>' + money(stCapAfter) + '</span></div>' +
        '<div class="gline"><span>Solvency after</span><span class="' + (stSolAfter >= 1 ? 'gpos' : 'gneg') + '">' + pct(Math.max(0, stSolAfter)) + '</span></div>' +
        '<div class="d-caption" style="margin-top:6px">' +
        (stCapAfter <= 0 ? '💀 This event would make you insolvent. Shed aggregate or buy protection — today.' :
          stSolAfter < 1 ? '⚠️ You would survive, but below required capital: suspended and raising money in a hardening market. Consider more cover while it is cheap.' :
          stSolAfter < 1.3 ? '😬 Survivable but bruising — one more event in the same season would be the real test (remember: the layer only reinstates once).' :
          '✅ Comfortably absorbed. Your protections and capital are doing their job — the question is whether you are paying too much for safety you don’t need.') +
        ' Real severity varies: an actual event could be half this PML or half as much again.</div>' +
        '</div></div>';
    }

    // PML by zone — with an explicit reinsurance waterfall on the worst zone
    html += '<h2>Aggregations (PML by zone)</h2><div class="card">';
    var any = false, worstZ = null, worstG = 0;
    Object.keys(ZONES).forEach(function (z) {
      var g0 = zonePML(z, null);
      if (g0 > worstG) { worstG = g0; worstZ = z; }
    });
    Object.keys(ZONES).forEach(function (z) {
      var g = zonePML(z, null);
      if (g <= 0) return;
      any = true;
      var qsAmt = g * G.ri.qs;
      var afterQs = g - qsAmt;
      var layerRec = Math.min(G.ri.catL || 0, Math.max(0, afterQs - (G.ri.catA || 0)));
      var net = afterQs - layerRec;
      var w = Math.min(100, 100 * net / Math.max(G.capital, 1));
      html += '<div class="gline"><span>' + esc(ZONES[z].name) + '</span><span>gross ' + money(g) + ' · net ' + money(net) + '</span></div>' +
        '<div class="progress-track" style="margin:4px 0 ' + (z === worstZ ? '4' : '10') + 'px"><div class="progress-fill' + (net > G.capital * 0.6 ? '' : ' done') + '" style="width:' + w + '%"></div></div>';
      if (z === worstZ) {
        html += '<div class="d-caption" style="margin:0 0 10px">Your peak zone, through the protections: gross ' + money(g) +
          (qsAmt > 0 ? ' − quota share ' + money(qsAmt) : '') +
          (layerRec > 0 ? ' − cat layer ' + money(layerRec) : (G.ri.catL ? ' (layer attaches above this level)' : ' (no cat layer)')) +
          ' = <strong>net ' + money(net) + '</strong> — the number your capital requirement stands behind.</div>';
      }
    });
    if (!any) html += '<p class="sub" style="margin:0">No catastrophe aggregation yet.</p>';
    html += '<div class="d-caption">Net PML shown after your quota share and cat layer. Bars measure net PML against capital — a full bar means one event could take most of it.</div></div>';

    // reinsurance in force
    html += '<h2>Outwards reinsurance</h2><div class="card">' +
      '<div class="gline"><span>Quota share</span><span>' + (G.ri.qs ? pct(G.ri.qs) + ' ceded · ' + pct(QS_CEDING_COMM) + ' commission' : 'none') + '</span></div>' +
      '<div class="gline"><span>Cat excess of loss</span><span>' + (G.ri.catL ? money(G.ri.catL) + ' xs ' + money(G.ri.catA) + ' · ' + money(Math.max(0, 2 * G.ri.catL - (G.ri.catUsed || 0))) + ' annual limit left' : 'none') + '</span></div>' +
      '<div class="d-caption">The quota share cedes a slice of everything (premium and losses alike, commission back). The cat layer pays the part of any single event above the attachment, up to the limit — twice a year at most. Together they turn your gross book into your net one.</div></div>';

    // results history
    if (G.history.length) {
      html += '<h2>Results</h2><div class="card">';
      var yr = yearOf(G.q);
      html += '<div class="gstat-row" style="margin-bottom:10px">' +
        statCard('Year ' + yr + ' P&L', money(G.yearProfits[yr] || 0), (G.yearProfits[yr] || 0) >= 0 ? 'good' : 'bad') +
        statCard('Best quarter', G.records.bestQuarter !== null ? money(G.records.bestQuarter) : '—') +
        statCard('Cats endured', G.records.catsSurvived) +
        '</div>';
      if (G.reads && G.reads.n >= 6) {
        html += '<div class="gline"><span>Slip-reading accuracy (your price & record calls)</span><span>' + Math.round(100 * G.reads.c / G.reads.n) + '% over ' + G.reads.n + ' reads</span></div>' +
          '<div class="d-caption">How often your guided-mode judgements matched the data. Above ~80% and you are genuinely reading slips — consider fast mode.</div>';
      }
      G.history.slice(-8).reverse().forEach(function (h) {
        html += '<div class="gline"><span>Y' + yearOf(h.q) + ' Q' + qInYear(h.q) + '</span><span class="' + (h.profit >= 0 ? 'gpos' : 'gneg') + '">' + money(h.profit) + ' · CR ' + (100 * h.cr).toFixed(0) + '%</span></div>';
      });
      html += '<div class="d-caption">CR = net combined ratio: losses plus expenses as a share of net earned premium. Below 100% the underwriting made money that quarter. Judge a volatile book on the run of quarters, never on one — a string of 85%s can be one event away from a 300%.</div></div>';
    }

    app().innerHTML = html;
    bindCommon();
    var stB = document.getElementById('g-stress');
    if (stB) {
      var stLabel = stB.textContent;
      stB.addEventListener('click', function () {
        var o = document.getElementById('stress-out');
        o.hidden = !o.hidden;
        stB.textContent = o.hidden ? stLabel : 'Hide the stress test';
      });
    }
  }

  function renderSlip() {
    if (G.guided !== false) return renderSlipGuided();
    return renderSlipFast();
  }

  // shared decision handler for both slip modes
  function decideSlip(r, share) {
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

  function modeToggle() {
    return '<button class="mode-toggle" id="g-mode">' +
      (G.guided !== false ? '⚡ Confident? Switch to fast mode (everything on one screen)' : '🧭 Switch back to guided step-by-step mode') + '</button>';
  }
  function bindModeToggle() {
    var m = document.getElementById('g-mode');
    if (m) m.addEventListener('click', function () {
      G.guided = (G.guided === false);
      save(); renderSlip();
    });
  }

  /* ----- guided mode: underwrite each slip in four mentored steps ----- */

  var gWalk = { idx: -1 };

  function renderSlipGuided() {
    if (G.phase !== 'uw' || G.subIndex >= G.submissions.length) { go('#/game'); return; }
    var r = G.submissions[G.subIndex];
    var cls = CLASSES.filter(function (c) { return c.id === r.classId; })[0];
    if (gWalk.idx !== G.subIndex) gWalk = { idx: G.subIndex, step: 1, priceRead: null, recordRead: null };

    var rateDelta = r.rate / r.benchRate - 1;
    var priceBucket = rateDelta >= 0.05 ? 0 : rateDelta <= -0.05 ? 2 : 1;   // strong / fair / cheap
    var recordBucket = r.histLR < 0.3 ? 0 : r.histLR <= 0.6 ? 1 : 2;        // clean / mixed / poor
    var priceLabels = ['Strong — above benchmark', 'Fair — around benchmark', 'Cheap — below benchmark'];
    var recordLabels = ['Good — a clean record', 'Mixed — some losses', 'Poor — heavy losses'];

    var dots = '<div class="quiz-progress">' + G.submissions.map(function (s, i) {
      var c = 'quiz-dot';
      if (i < G.subIndex) c += s.share > 0 ? ' right' : ' wrong';
      else if (i === G.subIndex) c += ' current';
      return '<div class="' + c + '"></div>';
    }).join('') + '</div>';

    var head = '<div class="slip-head"><span class="slip-class">' + cls.icon + ' ' + esc(cls.name) + '</span>' +
      '<span class="slip-prem">' + money(r.premium) + ' <small>annual premium</small></span></div>' +
      '<div class="slip-name">' + esc(r.name) + '</div>' +
      (r.renewalOf ? '<div class="renewal-pill">🔁 <strong>Renewal of your expiring line</strong> · rate change ' +
        ((r.rate / r.prevRate - 1) >= 0 ? '+' : '') + (100 * (r.rate / r.prevRate - 1)).toFixed(0) + '% · ' +
        (r.prevExp > 0 ? 'your year on it: losses of ' + money(r.prevExp) : 'your year on it: clean') + '</div>' : '');

    var html = header() + stepperBar('uw') +
      '<button class="backlink" data-ggo="#/game">‹ Dashboard <span style="font-weight:500">(your place is saved)</span></button>' +
      dots + '<div class="card slip">' + head +
      '<span class="q-tag">Slip ' + (G.subIndex + 1) + ' of 10 · Step ' + gWalk.step + ' of 4</span>';

    if (gWalk.step === 1) {
      html += '<h3 style="margin:10px 0 6px">Step 1 — Judge the price</h3>' +
        '<table class="slip-table">' +
        (r.tiv ? '<tr><td>Total insured value</td><td>' + money(r.tiv) + '</td></tr>' : '') +
        '<tr><td>' + (r.attach ? 'Layer' : 'Limit') + '</td><td>' + money(r.limit) + (r.attach ? ' xs ' + money(r.attach) : '') + '</td></tr>' +
        '<tr><td>Rate on ' + (r.tiv ? 'limit' : 'line') + '</td><td>' + (100 * r.rate).toFixed(2) + '%</td></tr>' +
        '<tr><td>Class benchmark rate</td><td>' + (100 * r.benchRate).toFixed(2) + '%</td></tr>' +
        '</table>' +
        '<p class="sub">The rate is the price per unit of risk; the benchmark is what the market currently charges for this class. Compare them — <strong>how does this price look to you?</strong></p>';
      if (gWalk.priceRead === null) {
        html += '<div class="btn-row">' +
          '<button class="btn secondary" data-read="0">Strong</button>' +
          '<button class="btn secondary" data-read="1">Fair</button>' +
          '<button class="btn secondary" data-read="2">Cheap</button></div>';
      } else {
        var priceRight = gWalk.priceRead === priceBucket;
        html += '<div class="feedback ' + (priceRight ? 'good' : 'bad') + '"><b>' + (priceRight ? 'Good read.' : 'Look again.') + '</b>' +
          'This risk is priced <strong>' + (rateDelta >= 0 ? '+' : '') + (100 * rateDelta).toFixed(0) + '% versus benchmark</strong> — ' + priceLabels[priceBucket].toLowerCase() + '. ' +
          (priceBucket === 2 ? 'When a price is below benchmark, always ask why the market let it go cheap.' :
            priceBucket === 0 ? 'A price cushion above benchmark is margin you can lose and still break even.' :
            'At benchmark, the risk’s own quality decides everything — which is the next step.') + '</div>' +
          '<button class="btn" id="g-next-step">Next: the loss record ›</button>';
      }
    } else if (gWalk.step === 2) {
      html += '<h3 style="margin:10px 0 6px">Step 2 — Judge the risk itself</h3>' +
        '<table class="slip-table">' +
        '<tr><td>Perils</td><td>' + cls.perils + '</td></tr>' +
        (r.tail ? '<tr><td>Tail</td><td>Claims may emerge up to ' + r.tail + ' quarters after expiry</td></tr>' : '') +
        '<tr><td>5-year record</td><td><div class="ghist-row">' + r.hist.map(function (h, i) {
          return '<span class="ghist' + (h ? ' loss' : '') + '">Yr−' + (5 - i) + ': ' + (h ? money(h) : 'clean') + '</span>';
        }).join('') + '</div>5-yr loss ratio ≈ ' + (100 * r.histLR).toFixed(0) + '%</td></tr>' +
        '</table>' +
        '<p class="sub">The price told you what the market thinks. The record hints at the <strong>hidden quality</strong> of the risk itself — something the rate cannot show. <strong>Your read?</strong></p>';
      if (gWalk.recordRead === null) {
        html += '<div class="btn-row">' +
          '<button class="btn secondary" data-read="0">Good</button>' +
          '<button class="btn secondary" data-read="1">Mixed</button>' +
          '<button class="btn secondary" data-read="2">Poor</button></div>';
      } else {
        var recRight = gWalk.recordRead === recordBucket;
        html += '<div class="feedback ' + (recRight ? 'good' : 'bad') + '"><b>' + (recRight ? 'Agreed.' : 'Hmm — look again.') + '</b>' +
          'A ' + (100 * r.histLR).toFixed(0) + '% five-year loss ratio reads as <strong>' + recordLabels[recordBucket].toLowerCase() + '</strong>. ' +
          (r.zone || r.limit > 8e6 ? 'Caveat for a severity risk like this: five clean years prove little — the big loss simply may not have happened yet. Weight the price and perils more than a short clean record.' :
            'For an attritional class like this the record is genuinely informative — frequency shows up quickly.') + '</div>' +
          '<button class="btn" id="g-next-step">Next: portfolio fit ›</button>';
      }
    } else if (gWalk.step === 3) {
      var bdN = capitalBreakdown(null);
      var bdF = capitalBreakdown({ premium: r.premium, limit: r.limit, dmg: r.dmg, zone: r.zone, share: 1, classId: r.classId });
      var mc = bdF.total - bdN.total;
      html += '<h3 style="margin:10px 0 6px">Step 3 — Does it fit your book?</h3>' +
        '<p class="sub">A good risk can still be a bad decision if it stacks on your peak. This is what writing the full line does to <em>your</em> portfolio:</p>' +
        '<div class="slip-impact">' +
        '<div class="gline"><span>Required capital</span><span>' + money(bdN.total) + ' → ' + money(bdF.total) + '</span></div>' +
        '<div class="gline"><span>Solvency after</span><span>' + pct(G.capital / bdF.total) + '</span></div>' +
        pmlImpactLines(r, 1) +
        '</div>' +
        '<div class="d-caption" style="margin-top:8px">' +
        (mc < 60000 ? 'Almost no extra capital: its bad years are unlikely to coincide with your existing peaks — diversification absorbs it.' :
          (bdF.catRisk - bdN.catRisk) > mc * 0.5 ? 'The capital moves mainly because this grows your <strong>peak accumulation</strong> — one event there could now take more of your money.' :
          'The capital moves through <strong>premium risk</strong>: simply more business that can go wrong in an ordinary bad year.') + '</div>' +
        '<button class="btn" id="g-next-step" style="margin-top:10px">Next: the decision ›</button>';
    } else {
      var bdN2 = capitalBreakdown(null);
      var extraFull = { premium: r.premium, limit: r.limit, dmg: r.dmg, zone: r.zone, share: 1, classId: r.classId };
      var bdF2 = capitalBreakdown(extraFull);
      var mc2 = bdF2.total - bdN2.total;
      var suspended = solvency() < 1;
      var canFull = (G.capital / bdF2.total >= 1) && !suspended;
      var canHalf = (G.capital / requiredCapital({ premium: r.premium, limit: r.limit, dmg: r.dmg, zone: r.zone, share: 0.5, classId: r.classId }) >= 1) && !suspended;
      var estProfit = r.premium * (1 - r.estELR - r.acq);
      var rocTxt = mc2 < 60000 ? (estProfit > 0 ? 'exceptional — profit with negligible extra capital' : 'no capital needed, but the deal itself looks loss-making')
        : ((100 * estProfit / mc2).toFixed(0) + '% on the extra capital' + (estProfit / mc2 >= 0.15 ? ' — clears the 15% hurdle' : estProfit / mc2 >= 0 ? ' — thin against a 15% hurdle' : ' — expected to destroy value'));
      var fitIcon = suspended ? '🚫' : mc2 < 60000 ? '✅' : (bdF2.catRisk - bdN2.catRisk) > mc2 * 0.5 ? '⚠️' : '✅';

      html += '<h3 style="margin:10px 0 6px">Step 4 — Decide</h3>' +
        '<p class="sub">Your three reads, side by side — this is the whole judgement:</p>' +
        '<div class="slip-impact">' +
        '<div class="dial"><span class="dico">' + (priceBucket === 0 ? '✅' : priceBucket === 1 ? '➖' : '⚠️') + '</span><span><strong>Price:</strong> ' + priceLabels[priceBucket] + ' (' + (rateDelta >= 0 ? '+' : '') + (100 * rateDelta).toFixed(0) + '%)' + (gWalk.priceRead === priceBucket ? '' : ' — you read it as “' + ['strong', 'fair', 'cheap'][gWalk.priceRead] + '”') + '</span></div>' +
        '<div class="dial"><span class="dico">' + (recordBucket === 0 ? '✅' : recordBucket === 1 ? '➖' : '⚠️') + '</span><span><strong>Record:</strong> ' + recordLabels[recordBucket] + ' (' + (100 * r.histLR).toFixed(0) + '% five-year loss ratio)</span></div>' +
        '<div class="dial"><span class="dico">' + fitIcon + '</span><span><strong>Fit:</strong> extra capital ' + money(mc2) + ' · return on it: ' + rocTxt + '</span></div>' +
        '</div>' +
        '<p class="sub" style="margin-top:8px">Estimated annual profit ' + money(estProfit) + ' = premium × (100% − est. loss ratio ' + (100 * r.estELR).toFixed(0) + '% − acquisition ' + (100 * r.acq).toFixed(0) + '%). Two or three green ticks with a healthy return usually deserves a line; a warning on price <em>and</em> record rarely does; a fit warning alone is what half-lines are for.</p>' +
        '<div class="btn-row">' +
        '<button class="btn" id="g-full"' + (canFull ? '' : ' disabled') + '>Write 100%</button>' +
        '<button class="btn secondary" id="g-half"' + (canHalf ? '' : ' disabled') + '>Write 50%</button>' +
        '<button class="btn ghost" id="g-decline">Decline</button></div>' +
        (suspended ? '<div class="d-caption" style="margin-top:8px">🚫 Below required capital — you can only decline until capital is restored.</div>' :
          !canFull ? '<div class="d-caption" style="margin-top:8px">⚠️ Not enough headroom for the full line — half it or decline.</div>' : '');
    }

    html += '</div>' + modeToggle() +
      (G.subIndex > 0 && gWalk.step === 1 ? '<br><button class="backlink" id="g-undo">↩︎ Undo previous decision</button>' : '');

    app().innerHTML = html;
    bindCommon();
    bindModeToggle();

    document.querySelectorAll('[data-read]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = Number(b.getAttribute('data-read'));
        G.reads = G.reads || { n: 0, c: 0 };
        G.reads.n++;
        if (gWalk.step === 1) { gWalk.priceRead = v; if (v === priceBucket) G.reads.c++; }
        else { gWalk.recordRead = v; if (v === recordBucket) G.reads.c++; }
        save();
        renderSlipGuided();
      });
    });
    var ns = document.getElementById('g-next-step');
    if (ns) ns.addEventListener('click', function () { gWalk.step++; renderSlipGuided(); window.scrollTo(0, 0); });
    var bf = document.getElementById('g-full');
    var bh = document.getElementById('g-half');
    var bd = document.getElementById('g-decline');
    if (bf && !bf.disabled) bf.addEventListener('click', function () { decideSlip(r, 1); });
    if (bh && !bh.disabled) bh.addEventListener('click', function () { decideSlip(r, 0.5); });
    if (bd) bd.addEventListener('click', function () { decideSlip(r, 0); });
    var gu = document.getElementById('g-undo');
    if (gu) gu.addEventListener('click', function () { undoLast(); gWalk.idx = -1; renderSlipGuided(); });
  }

  /* ----- fast mode: the whole slip on one screen ----- */

  function renderSlipFast() {
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

    var renewalHtml = '';
    if (r.renewalOf) {
      var rc = r.rate / r.prevRate - 1;
      renewalHtml = '<div class="renewal-pill">🔁 <strong>Renewal of your expiring line</strong> · rate change ' +
        (rc >= 0 ? '+' : '') + (100 * rc).toFixed(0) + '% · ' +
        (r.prevExp > 0 ? 'your year on it: losses of ' + money(r.prevExp) : 'your year on it: clean') + '</div>';
    }

    var html = header() + stepperBar('uw') +
      '<button class="backlink" data-ggo="#/game">‹ Dashboard <span style="font-weight:500">(your place is saved)</span></button>' +
      '<div class="quiz-progress">' + G.submissions.map(function (s, i) {
        var c = 'quiz-dot';
        if (i < G.subIndex) c += s.share > 0 ? ' right' : ' wrong';
        else if (i === G.subIndex) c += ' current';
        return '<div class="' + c + '"></div>';
      }).join('') + '</div>' +
      '<div class="card slip">' +
      '<div class="slip-head"><span class="slip-class">' + cls.icon + ' ' + esc(cls.name) + '</span>' +
      '<span class="slip-prem">' + money(r.premium) + ' <small>annual premium</small></span></div>' +
      '<div class="slip-name">' + esc(r.name) + '</div>' + renewalHtml +
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
      '<div class="d-caption" style="margin-top:6px">How the estimate is built: premium ' + money(r.premium) + ' × (100% − estimated loss ratio ' + (100 * r.estELR).toFixed(0) + '% − acquisition ' + (100 * r.acq).toFixed(0) + '%). The loss-ratio estimate comes from the rate versus benchmark only — it cannot see the risk’s hidden quality, which is why the loss record above deserves your own judgement.</div>' +
      '</div>' +
      '<div class="slip-impact"><div class="d-title">Portfolio impact (full line)</div>' +
      '<div class="gline"><span>Required capital</span><span>' + money(reqNow) + ' → ' + money(reqFull) + '</span></div>' +
      '<div class="gline"><span>Solvency after</span><span class="' + (solAfter >= 1.2 ? 'gpos' : solAfter >= 1 ? '' : 'gneg') + '">' + pct(solAfter) + '</span></div>' +
      pmlImpactLines(r, 1) +
      '<div class="d-caption" style="margin-top:6px">' + capDriver + '</div>' +
      '<button class="calc-toggle" id="cap-how" type="button" style="padding-top:8px">🧮 Show the capital calculation</button>' +
      '<div id="cap-detail" hidden>' +
      '<div class="gline"><span>Premium risk (mix-diversified)</span><span>' + money(bdNow.premRisk) + ' → ' + money(bdFull.premRisk) + '</span></div>' +
      '<div class="gline"><span>Catastrophe risk (worst net zone PML)</span><span>' + money(bdNow.catRisk) + ' → ' + money(bdFull.catRisk) + '</span></div>' +
      '<div class="gline"><span>Reserve risk (on IBNR held)</span><span>' + money(bdNow.resRisk) + ' → ' + money(bdFull.resRisk) + '</span></div>' +
      '<div class="gline"><span>Simple sum of the three</span><span>' + money(bdNow.premRisk + bdNow.catRisk + bdNow.resRisk) + ' → ' + money(bdFull.premRisk + bdFull.catRisk + bdFull.resRisk) + '</span></div>' +
      '<div class="gline gtotal"><span>Requirement = 1.15 × √(prem² + cat² + res²)</span><span>' + money(reqNow) + ' → ' + money(reqFull) + '</span></div>' +
      '<div class="gline"><span>Extra capital = the difference</span><span><strong>' + money(margCap) + '</strong></span></div>' +
      '<div class="d-caption" style="margin-top:6px">Two diversification credits are at work: premium risk is already reduced for how spread your class mix is, and the three risk types then combine through squares rather than adding — so the <em>largest</em> component dominates. Grow your biggest risk (usually the peak cat zone) and the requirement moves almost one-for-one; grow anything else and the square-root largely swallows it. A floor of $2m always applies.</div>' +
      '</div>' +
      '</div>' +
      '<div class="btn-row">' +
      '<button class="btn" id="g-full"' + (canFull ? '' : ' disabled') + '>Write 100%</button>' +
      '<button class="btn secondary" id="g-half"' + (canHalf ? '' : ' disabled') + '>Write 50%</button>' +
      '<button class="btn ghost" id="g-decline">Decline</button>' +
      '</div>' +
      (suspended ? '<div class="d-caption" style="margin-top:8px">🚫 <strong>Regulatory suspension:</strong> you are below required capital. You cannot bind new business — decline the rest, then raise capital or buy reinsurance.</div>' :
        !canFull ? '<div class="d-caption" style="margin-top:8px">⚠️ Capital headroom is too tight for the full line — half it, decline, or buy more reinsurance next phase.</div>' : '') +
      '<div class="d-caption" style="margin-top:8px">Unsure what any field means? <span class="review-link" data-ggo="#/game/guide">Open the guided tour ›</span></div>' +
      '</div>' + modeToggle() +
      (G.subIndex > 0 ? '<br><button class="backlink" id="g-undo">↩︎ Undo previous decision</button>' : '');

    app().innerHTML = html;
    bindCommon();
    bindModeToggle();
    var gu = document.getElementById('g-undo');
    if (gu) gu.addEventListener('click', function () { undoLast(); renderSlip(); });
    var ch = document.getElementById('cap-how');
    if (ch) ch.addEventListener('click', function () {
      var d = document.getElementById('cap-detail');
      d.hidden = !d.hidden;
      ch.textContent = d.hidden ? '🧮 Show the capital calculation' : '🧮 Hide the capital calculation';
    });

    function decide(share) { decideSlip(r, share); }
    var bf = document.getElementById('g-full');
    var bh = document.getElementById('g-half');
    if (canFull) bf.addEventListener('click', function () { decide(1); });
    if (canHalf) bh.addEventListener('click', function () { decide(0.5); });
    document.getElementById('g-decline').addEventListener('click', function () { decide(0); });
  }

  function undoLast() {
    if (G.subIndex <= 0) return;
    G.subIndex--;
    var prev = G.submissions[G.subIndex];
    if (prev.share > 0) {
      G.policies = G.policies.filter(function (x) { return x.id !== prev.id; });
      G.records.writtenCount--;
    }
    prev.share = 0; prev.writtenQ = 0; prev.earnedQtrs = 0; prev.resv = 0;
    save();
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
    var html = header() + stepperBar('ri') +
      '<button class="backlink" id="g-reopen">↩︎ Reopen the last slip</button>' +
      '<h2>Portfolio decisions — Y' + yearOf(G.q) + ' Q' + qInYear(G.q) + '</h2>' +
      '<div class="card"><h3 style="margin-top:0">Quota share — an annual treaty</h3>' +
      '<p class="sub">Cede a fixed share of every premium and every loss; receive a ' + pct(QS_CEDING_COMM) + ' ceding commission. Cuts required capital — and profit. ' +
      (qsLocked ? '<strong>Treaties are annual: your ' + (G.ri.qs ? pct(G.ri.qs) : 'nil') + ' cession is locked until 1 January.</strong>' : 'Set it now for the year ahead.') + '</p>' +
      '<div class="gopt-row">' + qsOpts.map(function (q) {
        return '<button class="gopt' + (G.ri.qs === q ? ' active' : '') + '" data-qs="' + q + '"' + (qsLocked ? ' disabled' : '') + '>' + (q ? pct(q) : 'None') + '</button>';
      }).join('') + '</div>' +
      (G.ri.qs > 0 ? '<div class="d-caption" style="margin-top:8px">Effect: cedes ~' + money(annualPremiumInForce() * G.ri.qs) + ' of annual premium (with ' + money(annualPremiumInForce() * G.ri.qs * QS_CEDING_COMM) + ' commission back) and frees ~' + money(Math.max(0, reqWithRi(0, G.ri.catA, G.ri.catL) - requiredCapital(null))) + ' of required capital.</div>' : '') +
      '</div>' +
      '<div class="card"><h3 style="margin-top:0">Catastrophe excess of loss</h3>' +
      '<p class="sub">Per-event protection above an attachment, one reinstatement (annual limit = 2× the layer). Your worst net zone PML is <strong>' + money(worst * (1 - G.ri.qs)) + '</strong>. ' +
      'Pricing is seasonal — this quarter carries ' + pct(seasonW) + ' of the year’s hazard, so cover costs accordingly. No cheap wind cover bought only for Q3.</p>' +
      (G.ri.catUsed ? '<p class="sub">⚠️ ' + money(G.ri.catUsed) + ' of this year’s ' + money(2 * G.ri.catL) + ' recoverable limit already used.</p>' : '') +
      '<div id="cat-opts">' + catOpts.map(function (o, i) {
        var price = o.L ? catRiPrice(o.A, o.L) * seasonW : 0;
        var sel = G.ri.catA === o.A && G.ri.catL === o.L;
        var freed = o.L ? Math.max(0, reqWithRi(G.ri.qs, 0, 0) - reqWithRi(G.ri.qs, o.A, o.L)) : 0;
        return '<button class="gopt wide' + (sel ? ' active' : '') + '" data-cat="' + i + '">' +
          (o.L ? money(o.L) + ' xs ' + money(o.A) + ' — ' + money(price) + ' this quarter · frees ' + money(freed) + ' of capital' : 'No cat cover') + '</button>';
      }).join('') + '</div>' +
      '<div class="d-caption">“Frees capital” = the fall in your requirement versus holding no cat cover: the layer chops the top off your worst zone’s net PML, which is usually your dominant capital component. Reading the options: a <strong>lower attachment</strong> means protection starts sooner (dearer, frees more); a <strong>bigger limit</strong> caps more of the tail. The best buy is usually the layer whose capital freed is largest relative to its premium — divide one by the other before choosing.</div>' +
      '</div>' +
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
    document.getElementById('g-reopen').addEventListener('click', function () {
      G.phase = 'uw';
      undoLast();
      save();
      go('#/game/slip');
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
    var html = header() + (G.gameOver ? '' : stepperBar('report'));

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

    if (r.mb && r.ma) {
      var mchg = r.ma - r.mb;
      html += '<div class="d-caption" style="margin:0 4px 14px">📉 Market index ' + r.mb.toFixed(2) + ' → ' + r.ma.toFixed(2) + ' — ' +
        (mchg > 0.01 ? 'the losses harden the market: next quarter’s submissions and renewals will price higher. Hard markets are when discipline pays you back.'
          : 'another quarter of competition softens rates. Watch new business adequacy — the benchmark itself is drifting down.') + '</div>';
    }

    if (!G.gameOver && solvency() < 1) {
      html += '<div class="card" style="border-color:var(--amber)"><h3 style="margin-top:0">⚠️ Below required capital — writing suspended</h3>' +
        '<p class="sub" style="margin:0">Your capital of ' + money(G.capital) + ' no longer covers the ' + money(requiredCapital(null)) + ' requirement. Three ways back: ' +
        '<strong>raise capital</strong> (next decisions screen — expensive but fast), <strong>buy reinsurance</strong> (a cat layer or, at 1 January, a bigger quota share frees capital), or <strong>shrink</strong> — decline everything and let premium earn off until the requirement falls. This is “coming into line”, the hard way.</p></div>';
    }

    function line(label, val, sign, exp) {
      var cls = sign === '+' ? 'gpos' : sign === '-' ? 'gneg' : '';
      return '<div class="gline"><span>' + label + '</span><span class="' + cls + '">' + (sign === '-' ? '−' : sign === '+' ? '+' : '') + money(Math.abs(val)).replace('−', '') + '</span></div>' +
        (exp ? '<div class="gexp">' + exp + '</div>' : '');
    }

    html += '<div class="card" id="pnl-card">' +
      '<button class="calc-toggle" id="rep-explain" type="button" style="padding:0 0 8px">ⓘ Explain every line</button>' +
      line('Premium earned', r.earned, '+',
        'One quarter’s slice of each in-force policy’s annual premium — you only “earn” premium as you actually provide the cover, so a policy written today contributes for four quarters.') +
      (r.qsCededPrem ? line('Quota share ceded', r.qsCededPrem, '-',
        'Your quota share partner takes this fixed share of every premium — and stands behind the same share of every loss below.') +
        line('Ceding commission', r.qsCommission, '+',
        'The reinsurer hands back ' + pct(QS_CEDING_COMM) + ' of what it took, to cover the acquisition costs you already paid on that business.') : '') +
      line('Attritional & large losses (net)', (r.attr + r.large) * (1 - G.ri.qs), '-',
        'The routine claims every book produces (attritional) plus any single big losses this quarter — after the quota share has taken its share. This is the “cost of goods sold” of insurance.') +
      (r.catGross ? line('Catastrophe losses (net of all reinsurance)', r.catNet, '-',
        'Event losses after the quota share’s slice and your cat layer’s recovery. Compare this with the gross figures in the event log above to see your protections working.') : '') +
      (r.ibnrProv ? line('IBNR provisioned for long-tail business', r.ibnrProv, '-',
        'Money set aside now for casualty-style claims that will only surface years from today. It reduces this quarter’s profit but it is not lost — clean years hand it back later as releases.') : '') +
      (r.strengthening ? line('Reserve strengthening (claims above IBNR held)', r.strengthening, '-',
        'Late claims came in bigger than the reserves held for them — old underwriting years reaching forward to hurt today’s result. Persistent strengthening is the classic sign of past underpricing.') : '') +
      (r.releases ? line('Reserve releases (clean years closed)', r.releases, '+',
        'Long-tail policies whose claims window closed without using their reserves — the IBNR comes back to profit. The delayed reward for disciplined casualty underwriting.') : '') +
      line('Acquisition costs', r.acqCost, '-',
        'Brokerage and commissions, spread over each policy’s life in step with the premium earning — matching the cost to the revenue it bought.') +
      line('Operating expenses', r.opex, '-',
        'Staff, systems and running costs: a fixed base plus roughly 7% of earned premium. Fixed costs are why a too-small book struggles to break even.') +
      (r.riCatPremium ? line('Cat reinsurance premium', r.riCatPremium, '-',
        'This quarter’s cost of your catastrophe layer — weighted by how much of the year’s hazard falls in this quarter, so hurricane-season cover costs the most.') : '') +
      (r.reinstatement ? line('Reinstatement premium', r.reinstatement, '-',
        'The price of restoring layer limit your recoveries consumed — premium that falls due precisely because you were hit.') : '') +
      line('Investment income', r.invIncome, '+',
        'About ' + (100 * INV_YIELD_QTR).toFixed(1) + '% a quarter earned on your capital plus the “float” — premium received but not yet paid out, and reserves held. The longer the tail, the harder the float works.') +
      '<div class="gline gtotal"><span>Quarter result</span><span class="' + (r.profit >= 0 ? 'gpos' : 'gneg') + '">' + money(r.profit) + '</span></div>' +
      '<div class="gexp">Everything above, netted. The result flows straight into capital — there is no separate pot: this quarter’s profit is next quarter’s risk-bearing capacity.</div>' +
      '<div class="gline"><span>Net combined ratio</span><span>' + (100 * r.cr).toFixed(0) + '%</span></div>' +
      '<div class="gexp">(All losses + expenses − commissions) ÷ net earned premium. Below 100% the underwriting itself made money; above 100% you relied on investment income — or lost outright.</div>' +
      '<div class="gline"><span>Capital</span><span>' + money(r.capitalAfter) + '</span></div>' +
      '<div class="gexp">Your buffer against the next bad quarter. The solvency ratio in the header compares it with what the book requires.</div>' +
      '</div>';

    var yr = yearOf(r.q);
    html += '<div class="gstat-row" style="margin-bottom:12px">' +
      statCard('Year ' + yr + ' P&L', money(G.yearProfits[yr] || 0), (G.yearProfits[yr] || 0) >= 0 ? 'good' : 'bad') +
      statCard('All-time P&L', money(G.allTime), G.allTime >= 0 ? 'good' : 'bad') +
      statCard('Solvency', pct(solvency())) +
      '</div>';

    // Q4: the year in review, with a Lloyd's-style verdict
    if (qInYear(r.q) === 4 && !G.gameOver) {
      var yrRows = G.history.filter(function (h) { return yearOf(h.q) === yr; });
      var yrProfit = G.yearProfits[yr] || 0;
      var crAvg = yrRows.length ? yrRows.reduce(function (a, h) { return a + h.cr; }, 0) / yrRows.length : 0;
      var capStart = Math.max(1e6, r.capitalAfter - yrProfit);
      var roe = yrProfit / capStart;
      var grade, verdict;
      if (roe >= 0.15) { grade = 'A'; verdict = 'Outstanding. Lloyd’s waves your plan through and brokers queue at your box. Beware: this is when discipline usually slips.'; }
      else if (roe >= 0.08) { grade = 'B'; verdict = 'Solid. You are covering your cost of capital. Push rate where you can and protect the peak zones.'; }
      else if (roe >= 0) { grade = 'C'; verdict = 'Marginal. Profitable, but capital would nearly have done as well in bonds. Re-underwrite the worst segment.'; }
      else if (roe >= -0.10) { grade = 'D'; verdict = 'A losing year. Expect hard questions on your plan — shrink, re-price, or restructure the reinsurance.'; }
      else { grade = 'E'; verdict = 'Severe loss. In the real market this means capital loading, plan cuts and a very uncomfortable performance review.'; }
      html += '<h2>Year ' + yr + ' in review</h2><div class="card">' +
        '<div class="gstat-row" style="margin-bottom:10px">' +
        statCard('Return on capital', (100 * roe).toFixed(1) + '%', roe >= 0.08 ? 'good' : roe >= 0 ? 'warn' : 'bad') +
        statCard('Avg combined ratio', (100 * crAvg).toFixed(0) + '%', crAvg <= 0.95 ? 'good' : crAvg <= 1.05 ? 'warn' : 'bad') +
        statCard('Grade', grade, roe >= 0.08 ? 'good' : roe >= 0 ? 'warn' : 'bad') +
        '</div>' +
        '<p class="sub" style="margin:0">' + verdict + '</p></div>';
    }

    if (!G.gameOver) html += '<button class="btn" id="g-next">Start Y' + yearOf(G.q + 1) + ' Q' + qInYear(G.q + 1) + ' — 10 new submissions</button>';

    app().innerHTML = html;
    bindCommon();
    var re = document.getElementById('rep-explain');
    if (re) re.addEventListener('click', function () {
      var card = document.getElementById('pnl-card');
      card.classList.toggle('explain-on');
      re.textContent = card.classList.contains('explain-on') ? 'ⓘ Hide the explanations' : 'ⓘ Explain every line';
    });
    var n = document.getElementById('g-next');
    if (n) n.addEventListener('click', function () { nextQuarter(); go('#/game'); });
    var r2 = document.getElementById('g-restart2');
    if (r2) r2.addEventListener('click', function () { newGame(); go('#/game'); });
  }

  /* ---------- router entry ---------- */

  function render(sub) {
    load();
    if (sub === 'guide') return renderGuide();
    if (sub === 'lab') return renderLab();
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
