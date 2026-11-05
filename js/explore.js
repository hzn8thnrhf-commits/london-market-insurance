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

  window.SLIP_DATA.explore = Object.assign(window.SLIP_DATA.explore || {}, X);
})();
