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
  const gbp = (m) => (Math.abs(m) < 1 ? `£${Math.round(m * 1000).toLocaleString("en-GB")}k` : `£${r2(m).toLocaleString("en-GB")}m`);

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

  window.SLIP_DATA.explore = Object.assign(window.SLIP_DATA.explore || {}, X);
})();
