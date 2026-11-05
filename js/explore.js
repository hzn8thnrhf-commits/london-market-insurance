/* The Slip — "Try it" models. Each model has sliders (inputs) and a compute function that
   returns a chart (any figure type the app draws), a few headline numbers and a short
   explanation of cause and effect. Figures in £m unless a model says otherwise. */
window.SLIP_DATA = window.SLIP_DATA || {};
(() => {
  const seq = (n, f) => Array.from({ length: n }, (_, i) => f(i));
  const r1 = (v) => Math.round(v * 10) / 10;
  const r2 = (v) => Math.round(v * 100) / 100;
  const pc = (v) => `${r1(v)}%`;

  const X = {};

  /* ---------------------------------------------------------------- m01 */
  X.subscription = {
    title: "How many insurers does one risk need?",
    blurb: "Grow the risk or shrink the lines, and count the insurers on the slip.",
    ask: "A broker is placing a large refinery. Make the risk bigger, or make each insurer more cautious, and watch how many insurers the slip needs.",
    inputs: [
      { k: "size", label: "Sum insured", min: 100, max: 3000, step: 100, value: 1000, unit: "m" },
      { k: "line", label: "Line each insurer would like to write", min: 2.5, max: 25, step: 2.5, value: 5, unit: "pct" },
      { k: "cap", label: "Most any one insurer will lose on one risk", min: 10, max: 200, step: 10, value: 50, unit: "m" }
    ],
    presets: [
      { label: "Mid-size factory", v: { size: 200, line: 20, cap: 50 } },
      { label: "Refinery", v: { size: 1000, line: 5, cap: 50 } },
      { label: "Mega-risk", v: { size: 3000, line: 10, cap: 60 } }
    ],
    compute(v, H) {
      const capLine = (v.cap / v.size) * 100;
      const capped = capLine < v.line;
      const line = Math.min(v.line, capLine);
      const n = Math.ceil(100 / line - 1e-9);
      const last = r2(100 - line * (n - 1));
      const segs = seq(n, (i) => [i === n - 1 ? last : line, n <= 10 ? pc(i === n - 1 ? last : line) : "", i % 2 ? "c1m" : "c1"]);
      const each = (line / 100) * v.size;
      const insight = capped
        ? `Each insurer would happily write ${pc(v.line)}, but ${pc(v.line)} of ${H.fmtM(v.size)} is ${H.fmtM((v.line / 100) * v.size)}, more than any of them will lose on one risk. So each line is cut to ${pc(line)} (${H.fmtM(each)}), and the broker needs **${n} insurers**.\n\nNotice the cause and effect: a bigger risk with the same appetite means smaller lines and a longer slip.`
        : `With ${pc(line)} lines the broker needs **${n} insurers**, and none of them can lose more than ${H.fmtM(each)} if the whole risk is destroyed.\n\nHalve the line and you double the number of insurers. That is the subscription market at work: no single balance sheet takes the full hit.`;
      return {
        readouts: [["Insurers needed", String(n), capped ? "bad" : ""], ["Each line", pc(line)], ["Worst loss each", H.fmtM(each)]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{ label: "The slip, 100% of the risk", total: `${n} lines`, segs }],
          legend: [["c1", "One insurer’s line"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m02 */
  const k0 = (x) => `£${Math.round(x).toLocaleString("en-GB")}k`;
  X["premium-flow"] = {
    title: "Who gets the client’s premium?",
    blurb: "Change the brokerage and see what the client pays for the same cover.",
    ask: "The insurer needs a set net premium to cover its claims, costs and profit. Change the brokerage and how the two brokers share it, and watch what the client pays.",
    inputs: [
      { k: "net", label: "Net premium the insurer needs", min: 100, max: 1000, step: 25, value: 400, unit: "k" },
      { k: "brk", label: "Brokerage, as a share of gross premium", min: 0, max: 35, step: 2.5, value: 20, unit: "pct" },
      { k: "ret", label: "Retail broker’s share of the brokerage", min: 0, max: 80, step: 5, value: 50, unit: "pct" }
    ],
    presets: [
      { label: "One broker, 15%", v: { brk: 15, ret: 0 } },
      { label: "Two brokers, 25%", v: { brk: 25, ret: 50 } }
    ],
    compute(v) {
      const gross = v.net / (1 - v.brk / 100);
      const brokerage = gross - v.net;
      const retail = (brokerage * v.ret) / 100;
      const london = brokerage - retail;
      const p = (x) => (x / gross) * 100;
      const uplift = (gross / v.net - 1) * 100;
      const insight = v.brk === 0
        ? `With no brokerage the client pays exactly the ${k0(v.net)} the insurer needs. In practice the broker would then charge the client a fee instead: distribution is never free, only paid differently.`
        : `Brokerage of ${pc(v.brk)} is a share of the **gross** premium, so for the insurer to keep ${k0(v.net)} it must charge ${k0(gross)}. That is ${r1(uplift)}% on top of the net, more than the headline ${pc(v.brk)}.\n\n${v.ret > 0 ? `The two brokers share ${k0(brokerage)}: ${k0(london)} to London and ${k0(retail)} to the retail broker. Notice that changing the split doesn’t change what the client pays; only the rate does.` : `One broker keeps all ${k0(brokerage)}. Add a retail broker and the same brokerage is shared, unless the rate rises to pay both.`}`;
      return {
        readouts: [["Client pays", k0(gross)], ["Brokerage", k0(brokerage)], ["Above the net", `+${r1(uplift)}%`, uplift > 30 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{
            label: "The client’s gross premium",
            total: k0(gross),
            segs: [[p(v.net), "Insurer", "c1"], [p(london), p(london) >= 15 ? "London" : "", "c2"], [p(retail), p(retail) >= 15 ? "Retail" : "", "c3"]]
          }],
          legend: [["c1", `Insurer ${k0(v.net)}`], ["c2", `London broker ${k0(london)}`], ["c3", `Retail broker ${k0(retail)}`]]
        },
        insight
      };
    }
  };

  const usd = (v) => (v >= 1000 ? `US$${r2(v / 1000)}bn` : `US$${Math.round(v)}m`);
  X["pi-claim"] = {
    title: "Where does a P&I claim land?",
    blurb: "Grow a shipowner’s liability claim and watch it climb from one club to the whole market.",
    ask: "A member’s ship causes a liability claim. Make the claim bigger and see who pays each part. (Illustrative layers: each club keeps the first US$10m, the pool shares claims to US$100m, and the clubs’ joint reinsurance runs to US$3.1bn.)",
    inputs: [
      { k: "claim", label: "Size of the claim", values: [1, 3, 5, 8, 10, 15, 25, 50, 75, 100, 150, 300, 500, 1000, 2000, 3100, 4000, 5000], value: 50, unit: "usd" }
    ],
    presets: [
      { label: "Crew injury", v: { claim: 3 } },
      { label: "Cargo dispute", v: { claim: 15 } },
      { label: "Major spill", v: { claim: 1000 } },
      { label: "Beyond the programme", v: { claim: 4000 } }
    ],
    compute(v) {
      const c = v.claim;
      const club = Math.min(c, 10);
      const pool = Math.min(Math.max(c - 10, 0), 90);
      const gxl = Math.min(Math.max(c - 100, 0), 3000);
      const over = Math.max(c - 3100, 0);
      const row = (label, used, size, tone) => ({ label, total: usd(used), segs: [[(used / size) * 100, used ? usd(used) : "", tone]] });
      let insight;
      if (c <= 10) insight = `A ${usd(c)} claim stays entirely with the member’s own club. Most P&I claims, a crew injury or a cargo dispute, never leave the club.`;
      else if (c <= 100) insight = `The club pays the first US$10m and the other ${usd(pool)} is shared among the International Group’s clubs through the pool.\n\nEvery club bears a slice, so one club’s bad year is cushioned by the others. It is the subscription idea again, between mutuals.`;
      else if (c <= 3100) insight = `This is a very large casualty, such as a major oil spill or wreck removal. The club pays US$10m, the pool US$90m and the Group’s reinsurers ${usd(gxl)}.\n\nNotice what has happened: the mutuals have passed their catastrophe risk to the commercial reinsurance market.`;
      else insight = `The claim has exhausted the reinsurance programme. The overspill of ${usd(over)} falls back on all the clubs, and through them on their members.\n\nIn a mutual, the members are always the last line.`;
      return {
        readouts: [["Own club", usd(club)], ["Pool", usd(pool)], ["Reinsurers", usd(gxl)], ["Overspill", usd(over), over ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 50, 100],
          suffix: "%",
          rows: [
            row("Own club · first US$10m", club, 10, "neutral"),
            row("Pool · to US$100m", pool, 90, "c1"),
            row("Reinsurance · to US$3.1bn", gxl, 3000, "c2"),
            row("Overspill · above that", over, 1900, "c3")
          ]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m03 */
  X.fal = {
    title: "How much capital does a plan need?",
    blurb: "Shift the book towards catastrophe risk, or cut the reinsurance, and watch the capital climb.",
    ask: "A syndicate is planning its year. Change its premium, how much of the book is exposed to catastrophes, and how much of that it reinsures. (An illustrative model, not Lloyd’s actual formula.)",
    inputs: [
      { k: "prem", label: "Capacity, the planned premium", min: 100, max: 1000, step: 50, value: 500, unit: "m" },
      { k: "cat", label: "Share of the book exposed to catastrophes", min: 0, max: 80, step: 5, value: 30, unit: "pct" },
      { k: "ri", label: "Catastrophe risk passed to reinsurers", min: 0, max: 80, step: 5, value: 50, unit: "pct" }
    ],
    presets: [
      { label: "Steady casualty book", v: { cat: 0, ri: 0 } },
      { label: "Catastrophe specialist", v: { cat: 70, ri: 30 } }
    ],
    compute(v, H) {
      const steady = v.prem * (1 - v.cat / 100) * 0.32;
      const perCat = 1.1 * (1 - (0.7 * v.ri) / 100);
      const cat = v.prem * (v.cat / 100) * perCat;
      const scr = Math.sqrt(steady * steady + cat * cat + 0.5 * steady * cat);
      const div = scr - steady - cat;
      const fal = scr * 1.35;
      const pence = Math.round((fal / v.prem) * 100);
      let insight = `The plan needs ${H.fmtM(fal)} of members’ capital: **${pence}p for every £1 of capacity**.`;
      if (v.cat >= 50) insight += `\n\nThis is a catastrophe-heavy book. One bad hurricane season could cost several years of premium, so each £1 of catastrophe premium needs about ${Math.round(perCat * 100)}p of capital before diversification, against 32p for steady business.`;
      else if (v.cat > 0) insight += `\n\nNotice the difference in weight: each £1 of catastrophe premium needs about ${Math.round(perCat * 100)}p of capital before diversification, against 32p for steady business.`;
      else insight += `\n\nWith no catastrophe exposure, the book is made of many independent risks whose bad years are mild, so capital per pound is low.`;
      if (v.cat > 0 && v.ri <= 20) insight += ` With so little reinsurance, the members’ own capital must absorb the catastrophe. Buy more and the requirement falls, at the cost of reinsurance premium.`;
      if (div < -1) insight += `\n\nDiversification saves ${H.fmtM(-div)}: the two kinds of risk rarely go badly wrong in the same year.`;
      return {
        readouts: [["Capital requirement", H.fmtM(scr)], ["Funds at Lloyd’s", H.fmtM(fal)], ["Per £1 of capacity", `${pence}p`, pence > 70 ? "bad" : ""]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 0,
          legend: [["c1", "Adds capital"], ["c2", "Reduces it"], ["total", "Total"]],
          steps: [
            { label: "Steady business", value: steady },
            { label: "Catastrophe risk", value: cat },
            { label: "Diversification", value: div },
            { label: "Requirement", total: true },
            { label: "Lloyd’s 35% uplift", value: scr * 0.35 },
            { label: "Funds at Lloyd’s", total: true }
          ]
        },
        insight
      };
    }
  };

  X.chain = {
    title: "Which link pays the claims?",
    blurb: "Push a syndicate’s claims up and watch them work down the chain of security.",
    ask: "A syndicate has a bad year. Raise its claims, or change how much it holds at each link, and see where the money comes from. (Assume the members can’t put in more than their Funds at Lloyd’s.)",
    inputs: [
      { k: "claims", label: "Claims to pay this year", min: 0, max: 600, step: 10, value: 250, unit: "m" },
      { k: "own", label: "Syndicate’s own assets", min: 100, max: 400, step: 10, value: 200, unit: "m" },
      { k: "fal", label: "Members’ Funds at Lloyd’s", min: 50, max: 300, step: 10, value: 150, unit: "m" }
    ],
    presets: [
      { label: "Ordinary year", v: { claims: 150 } },
      { label: "Bad year", v: { claims: 280 } },
      { label: "Disaster", v: { claims: 500 } }
    ],
    compute(v, H) {
      const a = Math.min(v.claims, v.own);
      const b = Math.min(Math.max(v.claims - v.own, 0), v.fal);
      const c = Math.max(v.claims - v.own - v.fal, 0);
      let insight;
      if (v.claims <= v.own) insight = `An ordinary year: the syndicate’s own premiums and reserves pay every claim. The members’ capital isn’t touched; it simply sits in trust, as it does in most years.`;
      else if (c === 0) insight = `A bad year. The syndicate’s own funds are exhausted, and members pay ${H.fmtM(b)} from their Funds at Lloyd’s, ${Math.round((b / v.fal) * 100)}% of what they lodged.\n\nThe policyholders notice nothing; the members certainly do.`;
      else insight = `A disaster. The syndicate’s funds and the members’ FAL are both used up, and the Central Fund pays ${H.fmtM(c)}.\n\nEvery member of Lloyd’s now shares this loss through the fund they all contribute to, which is exactly why the market polices every syndicate’s plan.`;
      return {
        readouts: [["Syndicate pays", H.fmtM(a)], ["Members pay", H.fmtM(b)], ["Central Fund", H.fmtM(c), c ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 50, 100],
          suffix: "%",
          rows: [
            { label: "1. Syndicate assets", total: `${H.fmtM(a)} of ${H.fmtM(v.own)}`, segs: [[(a / v.own) * 100, "", "c1"]] },
            { label: "2. Members’ FAL", total: `${H.fmtM(b)} of ${H.fmtM(v.fal)}`, segs: [[(b / v.fal) * 100, "", "c2"]] },
            { label: "3. Central Fund", total: H.fmtM(c), segs: [[Math.min(100, (c / 300) * 100), "", "c3"]] }
          ]
        },
        insight
      };
    }
  };

  X.ritc = {
    title: "Is the closing price fair?",
    blurb: "Get the estimate of old claims wrong and see who wins and who loses.",
    ask: "The 2024 year of account earned £100m of premium and spent £25m on expenses. Set what it has paid in claims, the estimate of claims still to come, and then how that estimate turns out.",
    inputs: [
      { k: "paid", label: "Claims paid by the end of year three", min: 20, max: 80, step: 1, value: 45, unit: "m" },
      { k: "est", label: "Estimated claims still to come", min: 0, max: 60, step: 1, value: 25, unit: "m" },
      { k: "err", label: "How the estimate turns out", min: -40, max: 40, step: 5, value: 0, show: (x) => (x === 0 ? "Spot on" : `${x > 0 ? "+" : "−"}${Math.abs(x)}%`) }
    ],
    compute(v, H) {
      const result = 100 - 25 - v.paid - v.est;
      const actual = v.est * (1 + v.err / 100);
      const gain = v.est - actual;
      let insight;
      if (v.err === 0) insight = `The estimate was right, so the deal is fair to both sides. The 2024 members ${result >= 0 ? `receive ${H.fmtM(result)}` : `pay in ${H.fmtM(-result)}`}, and the 2025 year breaks even on the claims it took on.`;
      else if (v.err > 0) insight = `The old claims cost ${H.fmtM(actual)}, ${v.err}% more than the ${H.fmtM(v.est)} estimate. The **2025 members lose ${H.fmtM(-gain)}** on business they never wrote, while the 2024 members kept a result that was really too good.`;
      else insight = `The claims came in ${H.fmtM(gain)} below the estimate, so the **2025 members make a windfall** at the expense of the 2024 members, who paid too much to close their year.`;
      if (result < 0) insight += `\n\nNotice too that the 2024 year made a loss: its members must pay in ${H.fmtM(-result)} to close it.`;
      return {
        readouts: [["2024 members’ result", H.fmtM(result), result >= 0 ? "good" : "bad"], ["2025’s gain on old claims", H.fmtM(gain), gain > 0.05 ? "good" : gain < -0.05 ? "bad" : ""]],
        chart: {
          type: "waterfall",
          prefix: "£",
          suffix: "m",
          dp: 0,
          steps: [
            { label: "2024 premium", value: 100 },
            { label: "Expenses", value: -25 },
            { label: "Claims paid", value: -v.paid },
            { label: "RITC premium", value: -v.est },
            { label: "2024 result", total: true }
          ]
        },
        insight
      };
    }
  };

  X.spiral = {
    title: "The LMX spiral",
    blurb: "Pass one catastrophe loss around a ring of reinsurers and see where it ends up.",
    ask: "Five syndicates reinsure one another in a ring: A is reinsured by B, B by C, and so on, with E reinsured by A. A catastrophe hits A. Each keeps a small retention and passes the rest on, until someone’s reinsurance runs out.",
    inputs: [
      { k: "loss", label: "The original catastrophe loss", min: 50, max: 300, step: 10, value: 100, unit: "m" },
      { k: "ret", label: "Each syndicate’s retention", min: 2, max: 30, step: 1, value: 5, unit: "m" },
      { k: "lim", label: "Reinsurance each syndicate has bought", min: 20, max: 300, step: 10, value: 100, unit: "m" }
    ],
    presets: [
      { label: "Thin retentions", v: { ret: 3, lim: 150 } },
      { label: "Prudent retentions", v: { ret: 25, lim: 100 } }
    ],
    compute(v, H) {
      const n = 5;
      const names = ["A", "B", "C", "D", "E"];
      const G = Array(n).fill(0);
      const R = Array(n).fill(0);
      G[0] = v.loss;
      let moving = true;
      let guard = 0;
      while (moving && guard++ < 2000) {
        moving = false;
        for (let i = 0; i < n; i++) {
          const due = Math.min(Math.max(G[i] - v.ret, 0), v.lim);
          const extra = due - R[i];
          if (extra > 1e-6) { R[i] = due; G[(i + 1) % n] += extra; moving = true; }
        }
      }
      const net = G.map((g, i) => g - R[i]);
      const passed = G.reduce((a, b) => a + b, 0) - v.loss;
      const worst = net.indexOf(Math.max(...net));
      const even = Math.max(...net) - Math.min(...net) < 0.5;
      const insight = even
        ? `With retentions of ${H.fmtM(v.ret)}, each syndicate keeps a fair share and the loss stops circulating: the reinsurance did what it was meant to do, spreading the loss across the market.`
        : `The ${H.fmtM(v.loss)} loss generated **${H.fmtM(passed)} of reinsurance claims** as it circled the ring, ${r1((passed + v.loss) / v.loss)} times the real loss. Yet the market as a whole still lost only ${H.fmtM(v.loss)}.\n\nMost syndicates kept just their ${H.fmtM(v.ret)} retention. Syndicate ${names[worst]}, whose reinsurance ran out first, was left holding ${H.fmtM(net[worst])}. Notice that buying more reinsurance in a closed ring only makes the parcel go round more times; it doesn’t make the loss go away.`;
      return {
        readouts: [["Claims passed round", H.fmtM(passed), passed > v.loss * 2 ? "bad" : ""], ["Largest net loss", `${names[worst]}: ${H.fmtM(net[worst])}`]],
        chart: {
          type: "bars",
          scale: v.loss,
          ticks: [0, v.loss / 2, v.loss].map((x) => Math.round(x)),
          prefix: "£",
          suffix: "m",
          rows: names.map((nm, i) => ({ label: `Syndicate ${nm}${i === 0 ? " · hit first" : ""}`, total: H.fmtM(net[i]), segs: [[net[i], "", i === worst && !even ? "c2" : "c1"]] }))
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m04 */
  X.several = {
    title: "When one insurer can’t pay",
    blurb: "See what a failed insurer’s line costs the client when liability is several.",
    ask: "Five insurers share a risk. One becomes insolvent and its estate can pay only part of what it owes. Change the claim, the failed insurer’s line and how much its estate eventually pays.",
    inputs: [
      { k: "claim", label: "Size of the claim", min: 10, max: 200, step: 10, value: 80, unit: "m" },
      { k: "line", label: "Failed insurer’s signed line", min: 5, max: 40, step: 5, value: 15, unit: "pct" },
      { k: "rec", label: "What its estate eventually pays", min: 0, max: 100, step: 10, value: 30, show: (x) => `${x}p in the £` }
    ],
    compute(v, H) {
      const failed = (v.claim * v.line) / 100;
      const estate = (failed * v.rec) / 100;
      const gap = failed - estate;
      const others = v.claim - failed;
      const insight = gap < 0.01
        ? `The failed insurer’s estate pays in full, so the client loses nothing, though it may wait years for the money.`
        : `The other insurers pay their ${H.fmtM(others)} in full, but none of them touches the failed insurer’s ${pc(v.line)}. Its estate pays ${v.rec}p in the pound, so the client is **${H.fmtM(gap)} short**.\n\nThat gap is what several liability means in practice, and it is why brokers vet the security of every insurer on the slip, not just the leader.`;
      return {
        readouts: [["Other insurers pay", H.fmtM(others)], ["Estate pays", H.fmtM(estate)], ["Client loses", H.fmtM(gap), gap > 0.01 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{ label: "The claim", total: H.fmtM(v.claim), segs: [[100 - v.line, "Paid by the others", "c1"], [(v.line * v.rec) / 100, "", "c2"], [(v.line * (100 - v.rec)) / 100, "", "hatch"]] }],
          legend: [["c1", "Other insurers"], ["c2", "Failed insurer’s estate"], ["hatch", "Never paid"]]
        },
        insight
      };
    }
  };

  X["signing-down"] = {
    title: "Sign the lines down",
    blurb: "Collect more than 100% and watch every line shrink by the same factor.",
    ask: "Four underwriters write lines on a slip. Change their written lines, and decide whether the leader’s line stands, then see the signed lines.",
    inputs: [
      { k: "a", label: "Leader’s written line", min: 5, max: 60, step: 2.5, value: 40, unit: "pct" },
      { k: "b", label: "Follower B", min: 0, max: 50, step: 2.5, value: 30, unit: "pct" },
      { k: "c", label: "Follower C", min: 0, max: 50, step: 2.5, value: 30, unit: "pct" },
      { k: "d", label: "Follower D", min: 0, max: 50, step: 2.5, value: 25, unit: "pct" },
      { k: "stand", label: "Leader’s line to stand?", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Yes" : "No") }
    ],
    presets: [
      { label: "Undersubscribed", v: { a: 25, b: 20, c: 20, d: 15 } },
      { label: "Exactly 100%", v: { a: 30, b: 25, c: 25, d: 20 } },
      { label: "125%", v: { a: 40, b: 30, c: 30, d: 25 } }
    ],
    compute(v) {
      const w = [v.a, v.b, v.c, v.d];
      const W = w.reduce((x, y) => x + y, 0);
      let f = 1;
      let s = w.slice();
      if (W > 100) {
        if (v.stand) {
          const rest = W - v.a;
          f = rest > 0 ? Math.min(1, Math.max(0, 100 - v.a) / rest) : 1;
          s = w.map((x, i) => (i === 0 ? x : x * f));
        } else {
          f = 100 / W;
          s = w.map((x) => x * f);
        }
      }
      const S = s.reduce((x, y) => x + y, 0);
      const scale = Math.max(100, Math.ceil(W / 25) * 25);
      const tones = ["c1", "c2", "c3", "c4"];
      const seg = (arr) => arr.map((x, i) => [x, (x / scale) * 100 >= 11 ? `${r1(x)}%` : "", tones[i]]);
      let insight;
      if (W < 100) insight = `**Undersubscribed:** only ${pc(W)} is placed, so ${pc(100 - W)} of the risk has no insurer. The broker can’t complete the placement until it finds more lines, or the client agrees to go ahead with less than 100% covered.`;
      else if (W === 100) insight = `Exactly 100%: no signing down is needed and every written line is also the signed line. Notice there is no buffer at all if anyone withdraws before binding.`;
      else if (v.stand) insight = `Written lines total ${pc(W)}. The leader’s ${pc(v.a)} **stands**, so the other three share the remaining ${pc(Math.max(0, 100 - v.a))}: each is multiplied by ${f.toFixed(3)}.\n\nSee how the followers absorb the whole squeeze? Follower B’s ${pc(v.b)} becomes ${pc(s[1])}.`;
      else insight = `Written lines total ${pc(W)}, so every line is multiplied by 100 ÷ ${r1(W)} = **${f.toFixed(3)}**. The leader’s ${pc(v.a)} becomes ${pc(s[0])}, and the four signed lines total exactly 100%.\n\nPremium and claims will follow these signed lines, not the written ones.`;
      return {
        readouts: [["Written total", pc(W), W < 100 ? "bad" : ""], ["Factor", W > 100 ? f.toFixed(3) : "None"], ["Leader signs", pc(s[0])]],
        chart: {
          type: "bars",
          scale,
          mark: [100, "100%"],
          ticks: [0, 50].concat(scale > 100 ? [scale] : []),
          suffix: "%",
          rows: [
            { label: "Written lines", total: pc(W), segs: seg(w) },
            { label: "Signed lines", total: pc(S), segs: seg(s) }
          ],
          legend: [["c1", "Leader"], ["c2", "B"], ["c3", "C"], ["c4", "D"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m09 */
  const gbp = (m) => {
    if (Math.abs(m) < 0.0005) return "£0";
    if (Math.abs(m) < 1) return `${m < 0 ? "−" : ""}£${Math.round(Math.abs(m) * 1000).toLocaleString("en-GB")}k`;
    return `${m < 0 ? "−" : ""}£${r1(Math.abs(m)).toLocaleString("en-GB")}m`;
  };

  X.average = {
    title: "Underinsurance and average",
    blurb: "Insure a building for less than it’s worth and see what happens to every claim.",
    ask: "A warehouse costs a certain amount to rebuild but is insured for less, under a policy subject to average. Change the value, the sum insured and the size of the loss.",
    inputs: [
      { k: "value", label: "True rebuilding value", min: 10, max: 100, step: 5, value: 50, unit: "m" },
      { k: "si", label: "Sum insured", min: 5, max: 100, step: 5, value: 30, unit: "m" },
      { k: "loss", label: "Size of the loss", min: 1, max: 100, step: 1, value: 10, unit: "m" }
    ],
    presets: [
      { label: "Fully insured", v: { value: 50, si: 50, loss: 10 } },
      { label: "Badly underinsured", v: { value: 80, si: 30, loss: 20 } }
    ],
    compute(v, H) {
      const loss = Math.min(v.loss, v.value);
      const ratio = Math.min(1, v.si / v.value);
      const paid = Math.min(loss * ratio, v.si);
      const gap = loss - paid;
      const insight = ratio >= 1
        ? `The building is insured for its full value, so the ${H.fmtM(loss)} loss is paid in full. Average only bites when the sum insured falls short of the true value.`
        : `The building is insured for only **${Math.round(ratio * 100)}% of its value**, so under average only ${Math.round(ratio * 100)}% of each loss is paid: ${gbp(paid)} of the ${H.fmtM(loss)} loss. The insured is treated as its own insurer for the uninsured part.\n\nNotice that a small, partial loss is cut too, not just a total loss. That surprises many clients, and it is why insuring to full value matters.`;
      return {
        readouts: [["Insured to value", `${Math.round(ratio * 100)}%`, ratio < 1 ? "bad" : "good"], ["Insurer pays", gbp(paid)], ["Insured bears", gbp(gap), gap > 0.001 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "Sum insured ÷ true value", total: `${H.fmtM(v.si)} of ${H.fmtM(v.value)}`, segs: [[ratio * 100, "Insured", "c1"], [100 - ratio * 100, "", "idle"]] },
            { label: "Share of the loss paid", total: `${gbp(paid)} of ${H.fmtM(loss)}`, segs: [[(paid / loss) * 100, "Paid", "c1"], [(gap / loss) * 100, "", "hatch"]] }
          ],
          legend: [["c1", "Covered"], ["hatch", "Borne by the insured"]]
        },
        insight
      };
    }
  };

  X.proportionate = {
    title: "A proportionate reduction",
    blurb: "Change what the insurer would have charged, and watch the claim shrink.",
    ask: "An insured carelessly failed to mention a previous fire and paid £100k of premium. Set what the insurer would have charged had it known, the size of the claim, and whether the breach was deliberate.",
    inputs: [
      { k: "would", label: "Premium it would have charged", min: 100, max: 300, step: 10, value: 150, unit: "k" },
      { k: "claim", label: "The claim", min: 0.1, max: 5, step: 0.1, value: 1, unit: "m" },
      { k: "delib", label: "Deliberate or reckless?", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Yes" : "No") }
    ],
    compute(v) {
      const share = v.delib ? 0 : 100 / v.would;
      const paid = v.claim * share;
      let insight;
      if (v.delib) insight = `A deliberate or reckless breach: the insurer may avoid the policy, refuse all claims and **keep the £100k premium**. The ${gbp(v.claim)} claim isn’t paid at all.`;
      else if (v.would === 100) insight = `The insurer would have charged the same premium, so the omission made no difference to the price and the ${gbp(v.claim)} claim is paid in full, unless it would have changed the terms instead.`;
      else insight = `Told about the fire, the insurer would have charged £${v.would}k, so it received only 100 ÷ ${v.would} = **${Math.round(share * 100)}%** of the premium it should have. It pays the same ${Math.round(share * 100)}% of the claim: ${gbp(paid)} of ${gbp(v.claim)}.\n\nUnder the old law it could have avoided the whole policy and paid nothing. That is the shift from all-or-nothing to proportionate.`;
      return {
        readouts: [["Share paid", `${Math.round(share * 100)}%`, v.delib ? "bad" : ""], ["Paid", gbp(paid)], ["Cut", gbp(v.claim - paid), v.claim - paid > 0.001 ? "bad" : ""]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "Premium charged ÷ premium it should have been", total: v.delib ? "Avoided" : `£100k of £${v.would}k`, segs: [[v.delib ? 0 : share * 100, "", "c2"], [v.delib ? 100 : 100 - share * 100, "", "idle"]] },
            { label: "Share of the claim paid", total: `${gbp(paid)} of ${gbp(v.claim)}`, segs: [[share * 100, share > 0.3 ? "Paid" : "", "c1"], [100 - share * 100, "", "hatch"]] }
          ],
          legend: [["c1", "Paid"], ["hatch", "Cut"]]
        },
        insight
      };
    }
  };

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mon = (i) => `${MONTHS[i % 12]} ${2024 + Math.floor(i / 12)}`;
  X.triggers = {
    title: "Which policy pays?",
    blurb: "Move the loss and the claim through time and see which policy year responds.",
    ask: "A firm buys annual cover every January. Something goes wrong, and a claim is made later. Move the two dates, and choose whether the firm reset its retroactive date when it changed insurer in 2026.",
    inputs: [
      { k: "loss", label: "When it happened", min: 0, max: 35, step: 1, value: 14, show: mon },
      { k: "delay", label: "Then the claim is made", min: 0, max: 24, step: 1, value: 13, show: (x) => (x === 0 ? "At once" : `${x} month${x === 1 ? "" : "s"} later`) },
      { k: "retro", label: "Retroactive date on the 2026 policy", min: 0, max: 1, step: 1, value: 0, show: (x) => (x ? "Reset to 2026" : "Kept from 2024") }
    ],
    presets: [
      { label: "A fire", v: { loss: 14, delay: 0 } },
      { label: "Bad advice", v: { loss: 14, delay: 13, retro: 0 } },
      { label: "The gap", v: { loss: 14, delay: 13, retro: 1 } }
    ],
    compute(v) {
      const claimM = v.loss + v.delay;
      const loY = 2024 + Math.floor(v.loss / 12);
      const cmY = 2024 + Math.floor(claimM / 12);
      const cmOff = cmY > 2027;
      const gap = !cmOff && v.retro && cmY >= 2026 && loY < 2026;
      const rows = [2024, 2025, 2026, 2027].map((y) => {
        const lo = y === loY, cm = y === cmY && !cmOff;
        let tone = "idle";
        if (lo && cm) tone = gap ? "c1" : "c3";
        else if (lo) tone = "c1";
        else if (cm) tone = gap ? "hatch" : "c2";
        return { id: `p${y}`, label: `${y} policy`, segs: [[y, y + 1, tone, ""]] };
      });
      const lx = 2024 + v.loss / 12 + 1 / 24;
      const cx = 2024 + claimM / 12 + 1 / 24;
      const markers = Math.abs(cx - lx) < 0.35 ? [[lx, "Loss and claim"]] : [[lx, "Loss"], [Math.min(cx, 2027.98), "Claim"]];
      let insight;
      if (loY === cmY) insight = `The loss and the claim fall in the same policy year, so both triggers point to the **${loY} policy**. Triggers only matter when time separates the event from the claim.`;
      else {
        insight = `It happened in ${mon(v.loss)}, but the claim came in ${mon(claimM)}. A losses-occurring policy looks at the loss date, so the **${loY} policy** pays. A claims-made policy looks at the claim date, so the **${cmOff ? "(not yet bought)" : cmY} policy** pays.`;
        if (gap) insight += `\n\nBut the 2026 policy’s retroactive date was reset to January 2026, and the work was done in ${loY}. The old policy has expired and the new one excludes earlier work: **no one pays**. That is the classic gap in cover.`;
      }
      return {
        readouts: [["Losses occurring", `${loY} policy`, "c1"], ["Claims made", gap ? "Not covered" : cmOff ? "Beyond 2027" : `${cmY} policy`, gap ? "bad" : "c2"]],
        chart: {
          type: "timeline",
          from: 2024,
          to: 2028,
          ticks: [2024, 2025, 2026, 2027, 2028],
          markers,
          legend: [["c1", "Losses occurring"], ["c2", "Claims made"], ["c3", "Both"], ["hatch", "Excluded"]],
          rows
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m05 */
  const pounds = (x) => (x >= 1e6 ? `£${r2(x / 1e6)}m` : x >= 1000 ? `£${Math.round(x / 1000).toLocaleString("en-GB")}k` : `£${Math.round(x)}`);
  X["da-cost"] = {
    title: "Why small risks need delegation",
    blurb: "Shrink the premium per risk and watch open market costs swallow it.",
    ask: "Compare the cost of placing each risk in the open market with writing it under a binding authority. Change the premium per risk and how many risks the binder writes in a year. (Illustrative costs.)",
    inputs: [
      { k: "prem", label: "Premium per risk", values: [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000], value: 2500, show: pounds },
      { k: "n", label: "Risks the binder writes a year", values: [20, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 20000], value: 2500, show: (x) => x.toLocaleString("en-GB") }
    ],
    presets: [
      { label: "Small shops", v: { prem: 1000, n: 5000 } },
      { label: "A refinery", v: { prem: 1000000, n: 20 } }
    ],
    compute(v) {
      const open = 15 + (2500 / v.prem) * 100;
      const da = 25 + ((100000 / v.n + 20) / v.prem) * 100;
      const row = (label, x) => ({ label, total: `${Math.round(x)}% of premium`, segs: [[Math.min(x, 100), x > 100 ? "More than the premium" : "", x > da && x > open - 0.01 && x > 60 ? "c2" : "c1"]] });
      let insight;
      if (open > da) insight = `For a ${pounds(v.prem)} risk, placing it in the open market would cost about **${Math.round(open)}% of the premium**: the broker’s and underwriter’s time is worth ${open > 100 ? "more than the risk itself" : "a large slice of it"}. Under a binding authority the cost falls to about ${Math.round(da)}%, mostly the coverholder’s commission.\n\nThat is why most small, standard business reaches London through delegated authority.`;
      else insight = `At ${pounds(v.prem)} a risk, the premium easily pays for individual underwriting: the open market costs about ${Math.round(open)}%, less than the ${Math.round(da)}% the delegated route would. Big, unusual risks justify an expert’s attention, so they stay in the open market.`;
      if (v.n < 250) insight += `\n\nNotice the fixed cost of oversight: a binder writing only ${v.n} risks a year loads each one with ${pounds(100000 / v.n)} of audits and monitoring. Delegation pays only at volume.`;
      return {
        readouts: [["Open market", `${Math.round(open)}%`, open > da ? "bad" : "good"], ["Delegated", `${Math.round(da)}%`, da > open ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [row("Open market: brokerage and handling", open), row("Delegated: commission and oversight", da)]
        },
        insight
      };
    }
  };

  X["bdx-lag"] = {
    title: "What late bordereaux hide",
    blurb: "Delay the reports and watch the insurer’s blind spot grow before a hurricane.",
    ask: "A coverholder binds homes on the Florida coast every month, and a hurricane strikes at the end of the year. Change how much it binds, how late its bordereaux arrive and how many records lack key data.",
    inputs: [
      { k: "monthly", label: "Sum insured bound each month", min: 10, max: 100, step: 5, value: 40, unit: "m" },
      { k: "lag", label: "Bordereaux arrive", min: 0, max: 4, step: 1, value: 2, show: (x) => (x === 0 ? "On time" : `${x} month${x > 1 ? "s" : ""} late`) },
      { k: "bad", label: "Records missing locations or values", min: 0, max: 40, step: 5, value: 10, unit: "pct" }
    ],
    compute(v, H) {
      const total = v.monthly * 12;
      const reported = v.monthly * (12 - v.lag);
      const unusable = (reported * v.bad) / 100;
      const visible = reported - unusable;
      const late = total - reported;
      const blind = late + unusable;
      const insight = blind < 0.01
        ? `Timely, complete bordereaux: when the hurricane strikes, the insurer can see every one of the ${H.fmtM(total)} of homes bound, and can model its loss straight away.`
        : `When the hurricane strikes, the coverholder has bound ${H.fmtM(total)} of homes, but the insurer can see only ${H.fmtM(visible)}. **${H.fmtM(blind)}, ${Math.round((blind / total) * 100)}% of the exposure, is a blind spot**: ${H.fmtM(late)} not yet reported and ${H.fmtM(unusable)} reported without the data needed to model it.\n\nAn insurer can’t manage an accumulation it can’t see. That is why timely, structured data matters so much in delegated business.`;
      return {
        readouts: [["Insurer can see", H.fmtM(visible)], ["Blind spot", H.fmtM(blind), blind > 0.01 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [{ label: "Exposure on the day of the hurricane", total: H.fmtM(total), segs: [[(visible / total) * 100, "Visible", "c1"], [(unusable / total) * 100, "", "hatch"], [(late / total) * 100, "", "c2"]] }],
          legend: [["c1", "Reported and usable"], ["hatch", "Reported, unusable"], ["c2", "Not yet reported"]]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m06 */
  X["general-average"] = {
    title: "Share the sacrifice",
    blurb: "Jettison cargo to save a ship, then share the cost by value.",
    ask: "In a storm, the master throws part of cargo owner B’s goods overboard to save the ship. Under general average, everyone contributes in proportion to the value they had at risk. Change the values and the size of the sacrifice.",
    inputs: [
      { k: "ship", label: "Value of the ship", min: 20, max: 100, step: 5, value: 60, unit: "m" },
      { k: "a", label: "Cargo owner A’s goods", min: 5, max: 60, step: 5, value: 30, unit: "m" },
      { k: "b", label: "Cargo owner B’s goods", min: 5, max: 60, step: 5, value: 10, unit: "m" },
      { k: "s", label: "B’s goods jettisoned", min: 1, max: 10, step: 0.5, value: 5, unit: "m" }
    ],
    compute(v, H) {
      const s = Math.min(v.s, v.b);
      const T = v.ship + v.a + v.b;
      const cShip = (s * v.ship) / T, cA = (s * v.a) / T, cB = (s * v.b) / T;
      const share = (x) => Math.round((x / T) * 100);
      const insight = `B’s goods worth ${H.fmtM(s)} went overboard to save the voyage. Everyone shares the cost by the value they had at risk: the ship pays ${gbp(cShip)} (${share(v.ship)}% of the values), cargo A ${gbp(cA)} and B itself ${gbp(cB)}. B is made good for the rest, so **B’s net loss is only ${gbp(cB)}**.\n\nIn practice each party’s insurer pays its client’s contribution. Notice that A’s goods were never touched, yet A pays: it benefited from the sacrifice.`;
      return {
        readouts: [["Ship pays", gbp(cShip)], ["A pays", gbp(cA)], ["B’s net loss", gbp(cB)]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "Values at risk", total: H.fmtM(T), segs: [[(v.ship / T) * 100, "Ship", "c1"], [(v.a / T) * 100, (v.a / T) * 100 > 12 ? "A" : "", "c2"], [(v.b / T) * 100, (v.b / T) * 100 > 12 ? "B" : "", "c3"]] },
            { label: "Shares of the sacrifice", total: gbp(s), segs: [[(cShip / s) * 100, gbp(cShip), "c1"], [(cA / s) * 100, (cA / s) * 100 > 16 ? gbp(cA) : "", "c2"], [(cB / s) * 100, (cB / s) * 100 > 16 ? gbp(cB) : "", "c3"]] }
          ],
          legend: [["c1", "Shipowner"], ["c2", "Cargo A"], ["c3", "Cargo B"]]
        },
        insight
      };
    }
  };

  X["space-year"] = {
    title: "A year in the space market",
    blurb: "Add a satellite failure or two and watch a whole market’s premium disappear.",
    ask: "The whole space insurance market collects a modest premium each year. Change it, and the number and size of satellite losses, and see what happens to the market’s result. (Illustrative figures.)",
    inputs: [
      { k: "prem", label: "Premium for the whole market", min: 300, max: 1000, step: 50, value: 500, unit: "usd" },
      { k: "n", label: "Satellites lost this year", min: 0, max: 5, step: 1, value: 1 },
      { k: "size", label: "Insured value of each", min: 100, max: 500, step: 50, value: 300, unit: "usd" }
    ],
    compute(v) {
      const loss = v.n * v.size;
      const lr = (loss / v.prem) * 100;
      const scale = Math.max(v.prem, loss) * 1.05;
      const insight = v.n === 0
        ? `A clean year: no satellites lost, and the market keeps its ${usd(v.prem)} premium, less expenses. Years like this have to pay for the bad ones.`
        : `${v.n === 1 ? "One failure" : `${v.n} failures`} at ${usd(v.size)} each cost ${usd(loss)}, a loss ratio of **${Math.round(lr)}%**${lr > 100 ? ": more than the whole market collected" : ""}.\n\nNotice how few events it takes. With large values, few risks and a small premium pool, a single launch failure can decide the year, which is why insurers enter and leave this class as results swing.`;
      return {
        readouts: [["Loss ratio", `${Math.round(lr)}%`, lr > 100 ? "bad" : lr > 60 ? "" : "good"], ["Market result", `${v.prem - loss < 0 ? "−" : ""}${usd(Math.abs(v.prem - loss))}`, v.prem - loss < 0 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale,
          ticks: [0, Math.round(scale / 2 / 100) * 100, Math.round(scale / 100) * 100].filter((x, i, a) => a.indexOf(x) === i && x <= scale),
          prefix: "$",
          suffix: "m",
          rows: [
            { label: "Premium collected", total: usd(v.prem), segs: [[v.prem, "", "c1"]] },
            { label: "Claims from failures", total: usd(loss), segs: Array.from({ length: v.n }, (_, i) => [v.size, v.size / scale > 0.14 ? `#${i + 1}` : "", i % 2 ? "c2" : "c1m"]) }
          ]
        },
        insight
      };
    }
  };

  X.bi = {
    title: "Business interruption",
    blurb: "Lengthen the recovery and watch lost profit outgrow the damage itself.",
    ask: "A fire damages a factory. Change the cost of the damage, the factory’s annual gross profit, how long it takes to recover fully, and the indemnity period the client chose.",
    inputs: [
      { k: "pd", label: "Cost of the physical damage", min: 1, max: 40, step: 1, value: 8, unit: "m" },
      { k: "gp", label: "Annual gross profit", min: 2, max: 40, step: 1, value: 12, unit: "m" },
      { k: "rec", label: "Time to recover fully", min: 1, max: 30, step: 1, value: 18, unit: "mo" },
      { k: "ip", label: "Indemnity period chosen", values: [6, 12, 18, 24, 36], value: 12, unit: "mo" }
    ],
    compute(v, H) {
      const lost = (v.gp / 12) * v.rec;
      const paid = (v.gp / 12) * Math.min(v.rec, v.ip);
      const gap = lost - paid;
      const scale = Math.max(v.pd, lost) * 1.05;
      let insight = `The fire did ${H.fmtM(v.pd)} of damage, but the factory takes ${v.rec} months to recover, losing ${gbp(lost)} of gross profit${lost > v.pd ? ": **more than the damage itself**" : ""}.`;
      insight += gap > 0.001
        ? `\n\nWith a ${v.ip}-month indemnity period, only ${gbp(paid)} is covered, and the client bears ${gbp(gap)}. Customers who left during the outage don’t return the day the building reopens; choosing the indemnity period is really a forecast of how long recovery takes.`
        : `\n\nThe ${v.ip}-month indemnity period covers the whole recovery, so all ${gbp(lost)} of lost profit is paid.`;
      return {
        readouts: [["Lost profit", gbp(lost)], ["Covered", gbp(paid)], ["Client bears", gbp(gap), gap > 0.001 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale,
          prefix: "£",
          suffix: "m",
          rows: [
            { label: "Physical damage", total: H.fmtM(v.pd), segs: [[v.pd, "", "c2"]] },
            { label: "Lost gross profit", total: gbp(lost), segs: [[paid, paid / scale > 0.2 ? "Covered" : "", "c1"], [gap, "", "hatch"]] }
          ],
          legend: [["c2", "Damage"], ["c1", "BI covered"], ["hatch", "Beyond the indemnity period"]]
        },
        insight
      };
    }
  };

  X["long-tail"] = {
    title: "Inflation on a long tail",
    blurb: "Stretch the tail and raise claims inflation, and watch the ultimate cost run away.",
    ask: "A liability book is expected to cost £100m at today’s prices. Its claims are paid evenly over a number of years, and each year’s payments rise with claims inflation. Change both.",
    inputs: [
      { k: "years", label: "Years over which claims are paid", min: 1, max: 20, step: 1, value: 10, unit: "yr" },
      { k: "infl", label: "Claims inflation each year", min: 0, max: 12, step: 0.5, value: 5, unit: "pct" }
    ],
    presets: [
      { label: "Property, short tail", v: { years: 2, infl: 4 } },
      { label: "US liability, social inflation", v: { years: 15, infl: 9 } }
    ],
    compute(v) {
      const n = v.years, g = 1 + v.infl / 100;
      let cum = 0;
      const actual = [[0, 0]], today = [[0, 0]];
      for (let t = 1; t <= n; t++) {
        cum += (100 / n) * Math.pow(g, t);
        actual.push([t, r1(cum)]);
        today.push([t, r1((100 * t) / n)]);
      }
      const ult = cum;
      const ymax = Math.max(120, Math.ceil(ult / 20) * 20);
      const ticks = [];
      for (let y = 0; y <= ymax; y += ymax > 200 ? 50 : 20) ticks.push(y);
      const xt = n <= 5 ? Array.from({ length: n + 1 }, (_, i) => i) : [0, Math.round(n / 2), n];
      const insight = `Paid over ${n} year${n > 1 ? "s" : ""} at ${pc(v.infl)} claims inflation, a book expected to cost £100m at today’s prices ends up costing **£${Math.round(ult)}m**, ${Math.round(ult - 100)}% more.\n\nThe longer the tail, the longer inflation has to compound. That is why social inflation in US liability is so dangerous for reserves, and why short-tail property barely notices the same inflation rate.`;
      return {
        readouts: [["Ultimate cost", `£${Math.round(ult)}m`], ["Above estimate", `+${Math.round(ult - 100)}%`, ult > 130 ? "bad" : ""]],
        chart: {
          type: "line",
          title: "Cumulative claims paid",
          height: 210,
          x: { min: 0, max: n, ticks: xt, suffix: n > 1 ? "" : "", title: "Years after the policy period" },
          y: { min: 0, max: ymax, ticks, prefix: "£", suffix: "m", title: "Paid to date" },
          series: [
            { name: "At today’s prices", tone: "neutral", dash: true, points: today },
            { name: "With claims inflation", tone: "c2", points: actual }
          ],
          marks: [{ x: n, y: r1(ult), label: `£${Math.round(ult)}m`, dx: -8, dy: -10, anchor: "end", tone: "c2" }]
        },
        insight
      };
    }
  };

  /* ---------------------------------------------------------------- m08 */
  X.ibnr = {
    title: "Watch a year’s claims develop",
    blurb: "Move through time and see IBNR turn into reported and then paid claims.",
    ask: "A book of policies will eventually cost £60m in claims. Move forward in time, and change the type of business, to see how much has been paid, how much is known about, and how much is still IBNR.",
    inputs: [
      { k: "t", label: "Time since the policies began", min: 0.5, max: 10, step: 0.5, value: 2, unit: "yr" },
      { k: "tail", label: "Type of business", min: 0, max: 100, step: 10, value: 20, show: (x) => (x <= 20 ? "Short tail, like property" : x >= 80 ? "Long tail, like liability" : "In between") }
    ],
    presets: [
      { label: "Property, year 1", v: { t: 1, tail: 0 } },
      { label: "Liability, year 1", v: { t: 1, tail: 100 } },
      { label: "Liability, year 5", v: { t: 5, tail: 100 } }
    ],
    compute(v, H) {
      const U = 60;
      const tr = 0.5 + (3 * v.tail) / 100, tp = 1 + (5 * v.tail) / 100;
      const rep = (t) => 1 - Math.exp(-t / tr), pay = (t) => 1 - Math.exp(-t / tp);
      const paid = U * pay(v.t), inc = U * rep(v.t), cs = inc - paid, ib = U - inc;
      const pts = (f) => Array.from({ length: 21 }, (_, i) => [i / 2, r1(f(i / 2) * 100)]);
      const kind = v.tail <= 20 ? "this property-like book" : v.tail >= 80 ? "this liability book" : "this book";
      const insight = `${v.t} year${v.t === 1 ? "" : "s"} in, ${kind} has paid ${gbp(paid)} and knows of another ${gbp(cs)} in open claims. That leaves **${gbp(ib)} of IBNR**: ${Math.round((ib / U) * 100)}% of the ultimate is claims nobody has reported yet.\n\n${v.tail >= 60 ? "With a long tail, IBNR dominates for years. The reserve rests mostly on actuarial projection rather than known claims, which is exactly why long-tail reserving is so uncertain." : "With a short tail, claims are reported quickly, so IBNR shrinks fast and the estimate soon rests on known claims."}`;
      return {
        readouts: [["Paid", gbp(paid), "c1"], ["Case reserves", gbp(cs), "c2"], ["IBNR", gbp(ib), ib > 30 ? "bad" : ""]],
        chart: {
          type: "line",
          title: "Claims development",
          height: 210,
          x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], suffix: "", title: "Years since the policies began" },
          y: { min: 0, max: 100, ticks: [0, 25, 50, 75, 100], suffix: "%", title: "Share of the £60m ultimate" },
          refs: [{ x: v.t, label: "Now" }],
          series: [
            { name: "Incurred (paid + case)", tone: "c2", points: pts(rep) },
            { name: "Paid", tone: "c1", points: pts(pay) }
          ],
          marks: [{ x: v.t, y: r1(rep(v.t) * 100), tone: "c2" }, { x: v.t, y: r1(pay(v.t) * 100), tone: "c1" }]
        },
        insight
      };
    }
  };

  X.contribution = {
    title: "Two policies, one loss",
    blurb: "Overlap two policies and see how contribution shares the loss.",
    ask: "A loss is covered by two policies with different insurers. Change the loss and each policy’s limit, and see how the insurers share it so the insured recovers only once.",
    inputs: [
      { k: "loss", label: "The loss", min: 1, max: 20, step: 0.5, value: 8, unit: "m" },
      { k: "a", label: "Policy A’s limit", min: 1, max: 20, step: 0.5, value: 10, unit: "m" },
      { k: "b", label: "Policy B’s limit", min: 1, max: 20, step: 0.5, value: 5, unit: "m" }
    ],
    compute(v) {
      const ia = Math.min(v.loss, v.a), ib = Math.min(v.loss, v.b);
      const both = ia + ib;
      const sa = both >= v.loss ? (v.loss * ia) / both : ia;
      const sb = both >= v.loss ? (v.loss * ib) / both : ib;
      const gap = v.loss - sa - sb;
      const p = (x) => (x / v.loss) * 100;
      const insight = both >= v.loss
        ? `On its own, A would pay ${gbp(ia)} and B ${gbp(ib)}: together ${gbp(both)} for a ${gbp(v.loss)} loss. So they share in proportion to those **independent liabilities**: A pays ${Math.round((ia / both) * 100)}%, ${gbp(sa)}, and B ${Math.round((ib / both) * 100)}%, ${gbp(sb)}.\n\nThe insured recovers its ${gbp(v.loss)} once, not ${gbp(both)}. That is indemnity at work.`
        : `Even together the two policies only provide ${gbp(both)}, less than the ${gbp(v.loss)} loss. Each pays its full limit and the insured bears the remaining ${gbp(gap)}: contribution can’t create cover that isn’t there.`;
      return {
        readouts: [["A pays", gbp(sa), "c1"], ["B pays", gbp(sb), "c2"], ["Insured bears", gbp(gap), gap > 0.001 ? "bad" : "good"]],
        chart: {
          type: "bars",
          scale: 100,
          ticks: [0, 25, 50, 75, 100],
          suffix: "%",
          rows: [
            { label: "What each would pay alone", total: gbp(both), segs: [[(ia / both) * 100, (ia / both) * 100 > 22 ? `A ${gbp(ia)}` : "", "c1l"], [(ib / both) * 100, (ib / both) * 100 > 22 ? `B ${gbp(ib)}` : "", "c1m"]] },
            { label: "How the loss is shared", total: gbp(v.loss), segs: [[p(sa), p(sa) > 18 ? "A" : "", "c1"], [p(sb), p(sb) > 18 ? "B" : "", "c2"], [p(gap), "", "hatch"]] }
          ],
          legend: [["c1", "Insurer A"], ["c2", "Insurer B"], ["hatch", "Uninsured"]]
        },
        insight
      };
    }
  };

  window.SLIP_DATA.explore = Object.assign(window.SLIP_DATA.explore || {}, X);
})();
