/*
 * The Slip — illustrative figures used inside lessons ({ fig: "id" } blocks).
 *
 * type "graph":    nodes placed on a grid (at: [row, col], span), joined by drawn arrows.
 *                  Optional narrow layout: colsN + atN/spanN, used when the figure is under 420px wide.
 *                  Edge options: label, tone ("good" | "bad" | "tint"), dash, bend (px), fromSide/toSide ("t"|"b"|"l"|"r"), fromAt/toAt (0–1).
 * type "bars":     stacked bars on one scale, with an optional reference mark.
 * type "timeline": bars on a time axis, with event markers; bars can be joined by edges like a graph.
 * Graph option gap: row gap in px (default 40).
 * Node tones: ink (navy), tint (outlined accent), brass, good, bad, q (a question), plain (default).
 */
window.SLIP_DATA = window.SLIP_DATA || {};
window.SLIP_DATA.figures = {
  market: {
    type: "graph",
    title: "Where London sits",
    caption: "A risk usually travels from the client through a local broker to a London broker, who places it with Lloyd’s syndicates, insurance companies or a P&I club. They pass part of what they write on to reinsurers.",
    cols: 3,
    nodes: [
      { id: "client", at: [1, 2], label: "Clients worldwide", sub: "Businesses, governments, insurers" },
      { id: "local", at: [2, 2], label: "Local broker", sub: "In Texas, Malaysia, Brazil…" },
      { id: "london", at: [3, 2], label: "London broker", sub: "Places the risk", tone: "tint" },
      { id: "lloyds", at: [4, 1], label: "Lloyd’s syndicates", tone: "ink" },
      { id: "company", at: [4, 2], label: "Company market", tone: "ink" },
      { id: "pi", at: [4, 3], label: "P&I clubs", tone: "ink" },
      { id: "reins", at: [5, 2], label: "Reinsurers", sub: "Insurance for insurers", tone: "brass" }
    ],
    edges: [
      { from: "client", to: "local", label: "instructs" },
      { from: "local", to: "london", label: "passes on" },
      { from: "london", to: "lloyds" },
      { from: "london", to: "company" },
      { from: "london", to: "pi" },
      { from: "lloyds", to: "reins", dash: true },
      { from: "company", to: "reins", dash: true },
      { from: "pi", to: "reins", dash: true }
    ]
  },

  lloyds: {
    type: "graph",
    title: "How Lloyd’s fits together",
    caption: "The Corporation oversees the market. Managing agents run syndicates, members provide the capital behind them, and brokers bring in the risks on behalf of clients.",
    cols: 3,
    nodes: [
      { id: "corp", at: [1, 2], label: "Corporation of Lloyd’s", sub: "Rules, licences, Central Fund", tone: "ink" },
      { id: "ma", at: [2, 2], label: "Managing agent", sub: "Employs the underwriters" },
      { id: "broker", at: [3, 1], label: "Broker", sub: "Acts for the client" },
      { id: "syn", at: [3, 2], label: "Syndicate", sub: "Writes the risk", tone: "tint" },
      { id: "members", at: [3, 3], label: "Members", sub: "Provide the capital", tone: "brass" },
      { id: "client", at: [4, 1], label: "Client", sub: "Buys the cover" }
    ],
    edges: [
      { from: "corp", to: "ma", label: "oversees" },
      { from: "ma", to: "syn", label: "runs" },
      { from: "broker", to: "syn" },
      { from: "members", to: "syn" },
      { from: "client", to: "broker", label: "instructs" }
    ]
  },

  yoa: {
    type: "timeline",
    title: "Three years of account",
    caption: "Each year of account writes new policies for twelve months, stays open for two more while claims develop, then closes by reinsurance to close into the next year.",
    from: 2024,
    to: 2030,
    ticks: [2024, 2025, 2026, 2027, 2028, 2029, 2030],
    legend: [["write", "Writing new policies"], ["open", "Open for claims"]],
    rows: [
      { id: "y24", label: "2024 year", segs: [[2024, 2025, "write"], [2025, 2027, "open"]] },
      { id: "y25", label: "2025 year", segs: [[2025, 2026, "write"], [2026, 2028, "open"]] },
      { id: "y26", label: "2026 year", segs: [[2026, 2027, "write"], [2027, 2029, "open"]] }
    ],
    edges: [
      { from: "y24", fromSide: "r", to: "y25", toSide: "t", toAt: 0.667, label: "RITC", tone: "tint" },
      { from: "y25", fromSide: "r", to: "y26", toSide: "t", toAt: 0.667, label: "RITC", tone: "tint" }
    ]
  },

  spiral: {
    type: "graph",
    title: "The LMX spiral",
    caption: "Each syndicate reinsured its large losses with the next, and the same loss circled the market several times. It ended up concentrated on whichever syndicates were left holding it.",
    cols: 3,
    nodes: [
      { id: "a", at: [1, 2], label: "Syndicate A", sub: "reinsures with B" },
      { id: "b", at: [2, 3], label: "Syndicate B", sub: "reinsures with C" },
      { id: "c", at: [3, 2], label: "Syndicate C", sub: "reinsures with D" },
      { id: "d", at: [2, 1], label: "Syndicate D", sub: "reinsures with A" },
      { id: "loss", at: [2, 2], label: "One big loss", sub: "round and round", tone: "bad" }
    ],
    edges: [
      { from: "a", to: "b", fromSide: "r", toSide: "t", tone: "bad" },
      { from: "b", to: "c", fromSide: "b", toSide: "r", tone: "bad" },
      { from: "c", to: "d", fromSide: "l", toSide: "b", tone: "bad" },
      { from: "d", to: "a", fromSide: "t", toSide: "l", tone: "bad" }
    ]
  },

  journey: {
    type: "graph",
    title: "The journey of a risk",
    caption: "From the client’s instructions to a bound and processed contract. The lead underwriter sets the terms; followers join on them until the lines reach 100%.",
    cols: 2,
    steps: true,
    nodes: [
      { id: "client", at: [1, 1], label: "Client", sub: "Needs cover" },
      { id: "local", at: [1, 2], label: "Local broker", sub: "Takes instructions" },
      { id: "london", at: [2, 2], label: "London broker", sub: "Builds the submission" },
      { id: "lead", at: [2, 1], label: "Lead underwriter", sub: "Sets terms, writes a line", tone: "tint" },
      { id: "follow", at: [3, 1], label: "Followers", sub: "Join on the same terms" },
      { id: "bind", at: [3, 2], label: "Bound at 100%", sub: "Signed down if over", tone: "good" },
      { id: "process", at: [4, 2], label: "Velonetic", sub: "Premium processed and settled" }
    ],
    edges: [
      { from: "client", to: "local" },
      { from: "local", to: "london" },
      { from: "london", to: "lead" },
      { from: "lead", to: "follow" },
      { from: "follow", to: "bind" },
      { from: "bind", to: "process" }
    ]
  },

  signing: {
    type: "bars",
    title: "Signing down an oversubscribed slip",
    caption: "Four underwriters write 125% between them. Every line is multiplied by 100 ÷ 125 = 0.8, so the signed lines add up to exactly 100%.",
    scale: 125,
    mark: [100, "100%"],
    rows: [
      { label: "Written", total: "125%", segs: [[40, "A 40%", "a"], [30, "B 30%", "b"], [30, "C 30%", "c"], [25, "D 25%", "d"]] },
      { label: "Signed", total: "100%", segs: [[32, "A 32%", "a"], [24, "B 24%", "b"], [24, "C 24%", "c"], [20, "D 20%", "d"]] }
    ]
  },

  delegated: {
    type: "graph",
    title: "How delegated authority works",
    caption: "The syndicate grants a binder setting out what the coverholder may write. The coverholder binds policies locally and reports back every month in bordereaux.",
    cols: 4,
    nodes: [
      { id: "syn", at: [1, 2], span: 2, label: "Syndicate", sub: "Through its managing agent", tone: "ink" },
      { id: "cov", at: [2, 2], span: 2, label: "Coverholder or MGA", sub: "Approved by Lloyd’s", tone: "tint" },
      { id: "ph", at: [3, 2], span: 2, label: "Policyholders", sub: "Hundreds or thousands" }
    ],
    edges: [
      { from: "syn", to: "cov", label: "binder", bend: 70 },
      { from: "cov", to: "syn", label: "bordereaux", bend: 70, tone: "tint" },
      { from: "cov", to: "ph", label: "binds policies" }
    ]
  },

  "reins-chain": {
    type: "graph",
    title: "Passing risk along",
    caption: "Premium flows down the chain and claim payments flow back up. The policyholder deals only with its insurer, which stays liable even if a reinsurer fails.",
    cols: 4,
    gap: 62,
    nodes: [
      { id: "ph", at: [1, 2], span: 2, label: "Policyholders" },
      { id: "ins", at: [2, 2], span: 2, label: "Insurer", sub: "The cedant", tone: "tint" },
      { id: "re", at: [3, 2], span: 2, label: "Reinsurer", tone: "brass" },
      { id: "retro", at: [4, 2], span: 2, label: "Retrocessionaire", sub: "The reinsurer’s reinsurer" }
    ],
    edges: [
      { from: "ph", to: "ins", label: "premium", bend: 46 },
      { from: "ins", to: "ph", label: "claims", bend: 46, tone: "good" },
      { from: "ins", to: "re", label: "premium", bend: 46 },
      { from: "re", to: "ins", label: "recoveries", bend: 46, tone: "good" },
      { from: "re", to: "retro", label: "premium", bend: 46 },
      { from: "retro", to: "re", label: "recoveries", bend: 46, tone: "good" }
    ]
  },

  "three-ways": {
    type: "bars",
    title: "The same £10m loss, three ways",
    caption: "Proportional covers share every loss: by a fixed percentage (quota share) or by the size of the risk (surplus). Excess of loss pays only the part above the retention.",
    scale: 10,
    legend: [["cedant", "Cedant keeps"], ["reins", "Reinsurer pays"]],
    rows: [
      { label: "Quota share 40%", total: "£10m", segs: [[6, "£6m", "cedant"], [4, "£4m", "reins"]] },
      { label: "Surplus, £2m retention on a £10m risk", total: "£10m", segs: [[2, "£2m", "cedant"], [8, "£8m", "reins"]] },
      { label: "Excess of loss £10m xs £5m", total: "£10m", segs: [[5, "£5m", "cedant"], [5, "£5m", "reins"]] }
    ]
  },

  "claim-life": {
    type: "graph",
    title: "The life of a claim",
    caption: "Most large claims follow these steps. Interim payments keep the insured going while the full amount is worked out.",
    cols: 2,
    steps: true,
    nodes: [
      { id: "n1", at: [1, 1], label: "Notification", sub: "Insured tells its broker" },
      { id: "n2", at: [1, 2], label: "Investigation", sub: "Loss adjuster appointed" },
      { id: "n3", at: [2, 2], label: "Coverage review", sub: "Does the policy respond?", tone: "q" },
      { id: "n4", at: [2, 1], label: "Reserve set", sub: "Estimate of the cost" },
      { id: "n5", at: [3, 1], label: "Interim payments", sub: "Money on account" },
      { id: "n6", at: [3, 2], label: "Settlement", sub: "Agreed and paid", tone: "good" }
    ],
    edges: [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
      { from: "n3", to: "n4" },
      { from: "n4", to: "n5" },
      { from: "n5", to: "n6" }
    ]
  },

  remedies: {
    type: "graph",
    title: "Remedies for an unfair presentation",
    caption: "The Insurance Act 2015 asks two questions: was the breach deliberate or reckless, and what would the insurer have done if it had been told?",
    cols: 3,
    nodes: [
      { id: "q1", at: [1, 1], span: 3, label: "Was the breach deliberate or reckless?", tone: "q" },
      { id: "a1", at: [2, 1], label: "Avoid the policy and keep the premium", tone: "bad" },
      { id: "q2", at: [2, 2], span: 2, label: "What would the insurer have done if told?", tone: "q" },
      { id: "a2", at: [3, 1], label: "Declined it", sub: "Avoid, but return the premium" },
      { id: "a3", at: [3, 2], label: "Used other terms", sub: "Treat those terms as applying" },
      { id: "a4", at: [3, 3], label: "Charged more", sub: "Cut claims in proportion" }
    ],
    edges: [
      { from: "q1", to: "a1", label: "Yes", tone: "bad", fromAt: 0.17 },
      { from: "q1", to: "q2", label: "No", fromAt: 0.67 },
      { from: "q2", to: "a2", fromAt: 0.2 },
      { from: "q2", to: "a3", fromAt: 0.25 },
      { from: "q2", to: "a4", fromAt: 0.75 }
    ]
  },

  triggers: {
    type: "timeline",
    title: "Which policy pays?",
    caption: "The same loss and the same claim, under two triggers. Losses occurring follows the date of the loss; claims made follows the date the claim is made.",
    from: 2025,
    to: 2027,
    ticks: [2025, 2026, 2027],
    markers: [[2025.45, "Loss happens"], [2026.3, "Claim made"]],
    legend: [["pays", "This policy pays"], ["idle", "Not triggered"]],
    rows: [
      { group: "Losses occurring" },
      { id: "lo25", label: "2025 policy", segs: [[2025, 2026, "pays", "Pays"]] },
      { id: "lo26", label: "2026 policy", segs: [[2026, 2027, "idle"]] },
      { group: "Claims made" },
      { id: "cm25", label: "2025 policy", segs: [[2025, 2026, "idle"]] },
      { id: "cm26", label: "2026 policy", segs: [[2026, 2027, "pays", "Pays"]] }
    ]
  },

  ratio: {
    type: "bars",
    title: "Reading a combined ratio",
    caption: "Loss ratio plus expense ratio. Below the 100% line underwriting makes money; above it, underwriting loses money.",
    scale: 120,
    mark: [100, "100%"],
    legend: [["reins", "Loss ratio"], ["brass", "Expense ratio"]],
    rows: [
      { label: "A good year", total: "93%", segs: [[60, "60%", "reins"], [33, "33%", "brass"]] },
      { label: "A catastrophe year", total: "111%", segs: [[78, "78%", "reins"], [33, "33%", "brass"]] }
    ]
  },

  cycle: {
    type: "graph",
    title: "The underwriting cycle",
    caption: "Profits draw in capital, competition softens prices until losses bite, capital leaves, and prices harden again.",
    cols: 3,
    nodes: [
      { id: "profit", at: [1, 1], label: "Profits", sub: "Results look good" },
      { id: "capital", at: [1, 2], label: "Capital arrives", sub: "More capacity" },
      { id: "soft", at: [1, 3], label: "Soft market", sub: "Prices fall, terms widen", tone: "tint" },
      { id: "losses", at: [2, 3], label: "Losses", sub: "Claims exceed premium", tone: "bad" },
      { id: "exit", at: [2, 2], label: "Capital leaves", sub: "Capacity shrinks" },
      { id: "hard", at: [2, 1], label: "Hard market", sub: "Prices rise, terms tighten", tone: "brass" }
    ],
    edges: [
      { from: "profit", to: "capital" },
      { from: "capital", to: "soft" },
      { from: "soft", to: "losses", fromSide: "b", toSide: "t" },
      { from: "losses", to: "exit" },
      { from: "exit", to: "hard" },
      { from: "hard", to: "profit", fromSide: "t", toSide: "b" }
    ]
  },

  regulators: {
    type: "graph",
    title: "Who regulates whom",
    caption: "Insurers and managing agents answer to both the PRA and the FCA. Brokers answer to the FCA. Lloyd’s adds its own oversight of its market.",
    cols: 3,
    nodes: [
      { id: "pra", at: [1, 1], label: "PRA", sub: "Financial soundness", tone: "ink" },
      { id: "fca", at: [1, 3], label: "FCA", sub: "Conduct", tone: "ink" },
      { id: "lloyds", at: [2, 2], label: "Lloyd’s", sub: "Oversees its market", tone: "tint" },
      { id: "ins", at: [3, 1], label: "Insurers and managing agents", sub: "PRA and FCA" },
      { id: "cov", at: [3, 2], label: "Cover\u00ADholders", sub: "Approved by Lloyd’s" },
      { id: "brokers", at: [3, 3], label: "Brokers", sub: "FCA only" }
    ],
    edges: [
      { from: "pra", to: "lloyds" },
      { from: "fca", to: "lloyds" },
      { from: "pra", to: "ins" },
      { from: "fca", to: "brokers" },
      { from: "lloyds", to: "ins", dash: true },
      { from: "lloyds", to: "cov", dash: true }
    ]
  }
};

/* Key ideas shown as the leaves of each lesson's branch in the mind maps (first one also feeds the course map). */
window.SLIP_DATA.keys = {
  "m01-l1": ["Specialist risks", "Lloyd’s", "Company market", "Subscription market"],
  "m01-l2": ["Edward Lloyd", "Underwriter", "Lutine Bell", "Lloyd’s Act 1871"],
  "m01-l3": ["Expertise", "Capacity", "200+ territories", "English law"],
  "m02-l1": ["Corporation", "Syndicates", "Managing agents", "Members"],
  "m02-l2": ["Insurance companies", "IUA", "Own ratings", "Shared slips"],
  "m02-l3": ["Agent of the insured", "Retail and wholesale", "Lloyd’s brokers", "Brokerage"],
  "m02-l4": ["P&I clubs", "LMA and IUA", "LIIBA", "Velonetic"],
  "m03-l1": ["Capacity", "Funds at Lloyd’s", "35% uplift", "Business plans"],
  "m03-l2": ["Syndicate assets", "Members’ funds", "Central Fund", "One market rating"],
  "m03-l3": ["Year of account", "Three-year close", "RITC", "Run-off"],
  "m03-l4": ["Names", "Unlimited liability", "LMX spiral", "Equitas"],
  "m04-l1": ["Submission", "Finding a lead", "Followers", "Binding"],
  "m04-l2": ["Slip", "MRC", "Contract certainty", "Several liability"],
  "m04-l3": ["Lines", "Leader", "GUA", "Follow facilities"],
  "m04-l4": ["Written line", "Signed line", "Signing down", "To stand"],
  "m04-l5": ["Endorsements", "Premium terms", "Signing number", "Central settlement"],
  "m05-l1": ["Open market", "Delegated authority", "Local reach"],
  "m05-l2": ["Binders", "Coverholders", "MGAs", "TPAs"],
  "m05-l3": ["Bordereaux", "Reporting standards", "Audits", "Referral rules"],
  "m05-l4": ["Lineslips", "Consortia", "Follow facilities"],
  "m06-l1": ["Hull and cargo", "Marine liability", "War risks", "General average"],
  "m06-l2": ["Aviation hull", "Aviation liability", "Hull war", "Space"],
  "m06-l3": ["Upstream", "Midstream", "Downstream", "Renewables"],
  "m06-l4": ["D&F property", "Binders", "Business interruption", "Cat accumulation"],
  "m06-l5": ["Liability", "PI and D&O", "Long-tail", "Cyber"],
  "m06-l6": ["Political risk", "K&R", "Contingency", "Fine art"],
  "m07-l1": ["Cedant", "Reinsurer", "Retrocession", "Capital relief"],
  "m07-l2": ["Facultative", "Treaty", "Proportional or not"],
  "m07-l3": ["Quota share", "Surplus", "Ceding commission"],
  "m07-l4": ["Excess of loss", "Attachment", "Cat XL", "Rate on line"],
  "m07-l5": ["Towers", "Reinstatements", "Hours clause", "1 January"],
  "m07-l6": ["Cat bonds", "Collateralised", "Sidecars", "Parametric"],
  "m08-l1": ["Notification", "Loss adjusters", "Reservation of rights", "Settlement"],
  "m08-l2": ["Claims leader", "Second agreement party", "SCAP", "ECF"],
  "m08-l3": ["Case reserves", "IBNR", "Ultimate loss", "Triangles"],
  "m08-l4": ["Subrogation", "Contribution", "Salvage", "Indemnity"],
  "m09-l1": ["Insurable interest", "Utmost good faith", "Indemnity", "Proximate cause"],
  "m09-l2": ["Fair presentation", "Insurance Act 2015", "No data dumping", "Reasonable search"],
  "m09-l3": ["Proportionate remedies", "Warranties suspend", "Section 11"],
  "m09-l4": ["Losses occurring", "Claims made", "Risks attaching", "Retroactive date"],
  "m09-l5": ["English law", "Commercial Court", "Arbitration", "FCA test case"],
  "m10-l1": ["Written premium", "Earned premium", "Gross and net", "Unearned premium"],
  "m10-l2": ["Combined ratio", "Loss ratio", "Expense ratio", "Float"],
  "m10-l3": ["Soft and hard", "Capital flows", "Underwriting discipline"],
  "m10-l4": ["SCR", "1-in-200", "Solvency ratio", "RDS"],
  "m11-l1": ["PRA and FCA", "Dual regulation", "Lloyd’s oversight", "Consumer Duty"],
  "m11-l2": ["IPT", "Sanctions", "OFSI", "Anti-bribery"],
  "m11-l3": ["200+ territories", "Lloyd’s Europe", "Overseas platforms", "US surplus lines"],
  "m11-l4": ["PPL and Whitespace", "Blueprint Two", "Core Data Record", "ACORD"],
  "m11-l5": ["Climate", "Cyber", "AI", "Protection gap"]
};
