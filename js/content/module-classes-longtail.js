/* Module 9 — Classes of Business II: Casualty & Specialty */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'classes2',
  icon: '⚖️',
  title: 'Classes II: Casualty, Financial Lines & Specialty',
  tagline: 'The long-tail and specialty classes and their idiosyncrasies',
  cii: 'LM1 · LM3',
  blurb: 'Liability in its many forms — general casualty, professional and financial lines, cyber — plus political risk, credit, and the accident, health and contingency world.',
  badge: { icon: '🦉', name: 'Specialty Sage', desc: 'Master “Classes II: Casualty, Financial Lines & Specialty”.' },
  lessons: [
    {
      id: 'casualty',
      title: 'General casualty: the long-tail heartland',
      minutes: 9,
      body: `
<p><strong>Casualty</strong> — liability insurance — pays when the insured is legally liable for injuring third parties or damaging their property. It is the market’s long-tail heartland, and everything about it flows from one fact: the loss is decided by <em>courts and lawyers</em>, years after the policy is written.</p>
<h3>The main strands</h3>
<ul>
<li><strong>General/public liability</strong> — the shop customer who slips, the contractor who floods a building, the event that injures spectators.</li>
<li><strong>Products liability</strong> — harm caused by products after sale: from exploding batteries to contaminated food to pharmaceuticals. One product fault = thousands of claimants = casualty catastrophe.</li>
<li><strong>Employers’ liability / workers’ compensation</strong> — injury to the insured’s own workforce (in the United States, workers’ compensation is a distinct, heavily regulated system that London mostly touches as reinsurance).</li>
<li><strong>Excess/umbrella casualty</strong> — London’s classic role: layers above big primary programmes for multinationals, especially with United States exposure.</li>
</ul>
<h3>What drives the underwriting</h3>
<ul>
<li><strong>Jurisdiction above all</strong> — the same injury settles for radically different amounts in different legal systems. United States exposure (jury awards, punitive damages, aggressive plaintiff bar) is priced entirely differently from rest-of-world.</li>
<li><strong>Trigger and tail</strong> — most casualty is written on an <strong>occurrence</strong> basis (Pricing module): the injury during the policy period triggers cover whenever the claim eventually arrives. Asbestos claims are still being paid on policies from the 1970s. Reserving (Claims module) leans overwhelmingly on incurred-but-not-reported estimates.</li>
<li><strong>Social inflation</strong> — the market’s name for the upward drift in liability awards beyond economic inflation: litigation funding, “nuclear” jury verdicts, broadened theories of liability. It has repeatedly outrun pricing assumptions in United States casualty, driving reserve deterioration across the market in older soft-market years.</li>
</ul>
<h3>Casualty catastrophe</h3>
<p>The class’s accumulation problem (Exposure module) is causal: one harmful substance or product touching thousands of insureds and dozens of policy years. Asbestos remains the defining event — it nearly destroyed Lloyd’s — and horizon-scanning for “the next asbestos” (certain chemicals, microplastics, talc, opioids as precedents) is a permanent discipline.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A London syndicate writes US$15m xs US$35m on a US industrial company’s liability tower, occurrence basis, for a US$400,000 premium. Six years later, litigation over a product sold during the policy period settles at US$60m. The layer pays 60 − 35 = US$25m capped at US$15m: <strong>a full-limit loss of US$15m — 37 years of that layer’s premium</strong> — first advised in year 3, reserved at US$4m, and developing upward for three further years. That trajectory (late arrival, slow adverse development) is the texture of the whole class, and why casualty reserving humility is a survival trait.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Casualty = liability decided by courts, <strong>years later, in whatever legal climate then prevails</strong>. Jurisdiction (especially United States), occurrence triggers, social inflation and causal accumulation define the class — and make its reserves the market’s biggest judgement.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A syndicate writes a US$10m xs US$40m casualty layer. A liability settlement of US$47m is reached. How much does the layer pay, in US$ millions?',
          answer: 7, tol: 0.05, unit: 'US$ millions',
          explain: 'The layer pays the amount above US$40m: 47 − 40 = US$7m, within its US$10m limit.' },
        { type: 'mc',
          q: 'What is “social inflation”?',
          options: [
            'General consumer price inflation applied to claims',
            'The tendency of liability awards and settlements to grow faster than economic inflation, driven by litigation trends, funding and jury behaviour',
            'Inflation in social insurance schemes',
            'Premium increases driven by social media'
          ],
          answer: 1,
          explain: 'Social inflation is the legal-system component of claims trend — the hardest to predict and the one that has most consistently surprised US casualty reserves.' },
        { type: 'mc',
          q: 'Why is United States exposure the single most important rating factor in international casualty?',
          options: [
            'US risks are physically larger',
            'The US legal environment — jury awards, punitive damages, plaintiff-bar activity — produces claim severities far beyond most other jurisdictions',
            'US law requires higher premiums',
            'The dollar is stronger than other currencies'
          ],
          answer: 1,
          explain: 'The same accident costs multiples more in a US courtroom. Casualty pricing, wordings and appetite all pivot on the degree of US exposure.' },
        { type: 'mc',
          q: 'A casualty underwriter’s year shows almost no reported claims after 12 months. What should they conclude?',
          options: [
            'The year is definitely profitable',
            'Very little — long-tail claims report over many years, so early silence carries almost no information',
            'The premium was too high',
            'Reserves can be released immediately'
          ],
          answer: 1,
          explain: 'At 12 months a casualty year is largely unreported (recall the Bornhuetter–Ferguson logic). Early quiet is expected and proves nothing — a discipline point that separates casualty from property thinking.' }
      ]
    },
    {
      id: 'financial-lines',
      title: 'Professional and financial lines: insuring advice, decisions and balance sheets',
      minutes: 9,
      body: `
<p>Financial lines insure intangible failures: bad advice, mismanagement, dishonesty. London is a global centre for them, and they share a distinctive machinery — claims-made triggers, defence costs, and severity driven by financial markets rather than physical hazards.</p>
<h3>The family</h3>
<ul>
<li><strong>Professional indemnity</strong> (errors & omissions) — liability of professionals for negligent advice or services: lawyers, accountants, architects, engineers, brokers, technology firms. The insured’s <em>work product</em> is the risk.</li>
<li><strong>Directors’ & officers’ liability</strong> — protects company directors personally (and reimburses the company) for claims alleging mismanagement: shareholder suits, regulatory investigations, insolvency actions. Severity concentrates in securities class actions, above all in the United States.</li>
<li><strong>Financial institutions</strong> — the package for banks, insurers and asset managers: professional indemnity plus crime/fidelity (employee dishonesty, fraud) plus directors’ & officers’.</li>
<li><strong>Warranty & indemnity (transactional)</strong> — covering breaches of warranties in company sale agreements; a deal-driven, fast-growing specialty.</li>
</ul>
<h3>Shared machinery — and why it exists</h3>
<ul>
<li><strong>Claims-made trigger</strong> — the policy responding is the one in force when the <em>claim is first made</em> (with retroactive dates and discovery clauses). This shortens the tail versus occurrence casualty — the insurer knows its universe of claims within a year or so of expiry — though complex claims still take years to resolve.</li>
<li><strong>Defence costs within the limit</strong> — legal defence spend typically erodes the policy limit (unlike much general liability where defence is additional). In a securities suit, defence alone can consume tens of millions before any settlement.</li>
<li><strong>Notification discipline</strong> — insureds must notify <em>circumstances that may give rise to claims</em>; late notification is a recurring coverage battleground.</li>
<li><strong>Severity follows the economy</strong> — recessions, market crashes, insolvencies and scandals drive claims (the class’s “catastrophes” are financial crises: 2008 produced a generation of financial-institutions losses; economic downturns spike insolvency-related directors’ suits).</li>
</ul>
<h3>Cycle character</h3>
<p>Financial lines swing hard: directors’ & officers’ rates doubled in the 2019–21 hardening, then fell steeply as new capacity flooded in — a compressed illustration of the Pricing module’s cycle. Portfolio steering (limits deployed, attachment points, sector mix) matters as much as rate.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A technology company buys professional indemnity: US$10m limit, claims-made, defence costs within the limit, US$250,000 retention. A customer alleges a botched implementation caused US$20m of losses, claiming in year 2 of the policy. Defence costs run to US$3m before a US$6m settlement. Policy pays: (3 + 6) − 0.25 = <strong>US$8.75m</strong>, leaving only US$1.25m of limit for any further claims that year. Had the customer first claimed after expiry — with no renewal or discovery period — the policy would never respond at all: the trigger is the claim, not the botched work.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Financial lines insure <strong>decisions and advice</strong>, on <strong>claims-made</strong> triggers with <strong>defence costs inside the limit</strong>, and their catastrophes are economic events. Know the trigger and the retroactive date before anything else.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A directors’ & officers’ policy has a US$15m limit with defence costs within the limit and nil retention for individuals. Defence costs are US$9m and the settlement US$11m. How much of the total US$20m do insurers pay, in US$ millions?',
          answer: 15, tol: 0.1, unit: 'US$ millions',
          explain: 'Defence erodes the limit: the policy exhausts at US$15m, leaving US$5m uninsured. “Costs in addition” wording would have paid more — the clause is worth millions.' },
        { type: 'mc',
          q: 'Under a claims-made policy with a retroactive date of 1 January 2020, which claim is covered by the 2025 policy?',
          options: [
            'Work done in 2018, claim made in 2025',
            'Work done in 2022, claim first made against the insured during the 2025 policy period',
            'Work done in 2025, claim made in 2027 with no renewal or discovery period',
            'Any claim about work done during 2025, whenever made'
          ],
          answer: 1,
          explain: 'Claims-made needs both: the claim first made in the period, and the work after the retroactive date. Old work claimed now is in; new work claimed later is a matter for later policies.' },
        { type: 'mc',
          q: 'What kind of event is the “catastrophe” of the financial institutions class?',
          options: [
            'A hurricane hitting Wall Street',
            'A financial crisis or major market collapse generating waves of lawsuits, fraud discoveries and insolvencies across many insureds at once',
            'A cyber attack on one bank',
            'A change in accounting standards'
          ],
          answer: 1,
          explain: 'Financial-lines accumulation is macroeconomic: one crisis touches the whole portfolio simultaneously — 2008 being the defining example.' },
        { type: 'mc',
          q: 'Why do financial-lines insureds have to notify “circumstances” as well as actual claims?',
          options: [
            'To increase premium mid-term',
            'So known potential claims attach to the policy that was on risk when the problem emerged, preventing insureds from saving them up for future policies — and late notification can prejudice cover',
            'Because regulators collect the notifications',
            'It is optional courtesy only'
          ],
          answer: 1,
          explain: 'Circumstance notification pins emerging problems to the right policy period — essential in a claims-made world, and one of the class’s most litigated obligations.' }
      ]
    },
    {
      id: 'cyber',
      title: 'Cyber: the newest major class',
      minutes: 8,
      body: `
<p>Cyber has grown from novelty to one of the market’s most significant classes in two decades, with London a leading hub. It insures the consequences of digital failure — malicious or accidental — and it is still inventing itself: wordings, models and appetite all evolve year by year.</p>
<h3>What a cyber policy covers</h3>
<ul>
<li><strong>First-party costs</strong> (the insured’s own losses): incident response — forensics, legal counsel, notification of affected individuals, credit monitoring, public relations; <strong>business interruption</strong> from systems downtime; data restoration; <strong>cyber extortion</strong> — ransomware negotiation and (where lawful) ransom payment.</li>
<li><strong>Third-party liability</strong>: privacy claims from individuals whose data was exposed; regulatory investigations and (where insurable) fines; network-security liability for harm the insured’s compromised systems cause others.</li>
</ul>
<p>The incident-response service is half the product: insurers maintain panels of forensic and legal responders, and the insurer often coordinates the first 72 hours of a crisis — closer to assistance than indemnity.</p>
<h3>How it is underwritten</h3>
<p>Rating rests on security posture: multi-factor authentication, backups (offline and tested), patching cadence, endpoint detection, privileged-access management — plus sector (healthcare and retail hold sensitive data), revenue and jurisdiction. The 2019–21 ransomware epidemic taught brutal lessons: loss ratios soared, the market tripled rates, mandated minimum controls (no multi-factor authentication, no quote), and cut limits — then stabilised. It was the fastest full market cycle in living memory.</p>
<h3>The unresolved frontier</h3>
<ul>
<li><strong>Systemic accumulation</strong> — the cloud-outage and mass-vulnerability scenarios from the Exposure module: the class’s capacity is ultimately constrained by the plausibility of one event touching everyone.</li>
<li><strong>War and state actors</strong> — the NotPetya attack (2017), attributed to a state, triggered coverage litigation under traditional war exclusions; the market has since developed explicit cyber-war wordings defining state-attack carve-outs. Attribution — proving who attacked — remains the practical difficulty.</li>
<li><strong>Silent cyber remediation</strong> — the push (Exposure module) to make every non-cyber policy affirm or exclude cyber loss, so the peril is priced where it is covered.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A retailer with a US$5m cyber policy (US$100,000 retention) suffers ransomware. Costs: forensics and legal US$600,000; notification and credit monitoring for 2 million customers US$1.8m; 9 days of downtime causing US$2.2m business-interruption loss; ransom not paid. Total US$4.6m; insurer pays 4.6 − 0.1 = <strong>US$4.5m</strong>, and its response panel ran the incident from hour one. At renewal, the insurer requires offline backups and privileged-access controls before offering terms — underwriting and loss prevention fused, which is the class’s character.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Cyber = first-party crisis costs + business interruption + privacy liability, underwritten on <strong>security controls</strong> and haunted by <strong>systemic accumulation and war-exclusion</strong> questions. The product is a response service as much as a promise to pay.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A cyber claim comprises US$900,000 of incident response, US$2.5m of business interruption and US$1.1m of privacy liability, against a US$4m limit and US$250,000 retention. What does the insurer pay, in US$ millions?',
          answer: 4, tol: 0.05, unit: 'US$ millions',
          explain: 'Total loss US$4.5m less retention = US$4.25m, capped at the US$4m limit.' },
        { type: 'mc',
          q: 'Which control became a near-universal minimum requirement for cyber cover after the ransomware epidemic?',
          options: [
            'Quantum encryption',
            'Multi-factor authentication (plus tested offline backups)',
            'Annual password changes',
            'Cyber insurance for suppliers'
          ],
          answer: 1,
          explain: 'The 2019–21 loss wave made basic controls underwriting prerequisites: no multi-factor authentication frequently meant no quote at all.' },
        { type: 'mc',
          q: 'Why did the NotPetya attack become a defining coverage controversy?',
          options: [
            'It was the largest ransom ever paid',
            'A state-attributed attack caused massive commercial losses, testing whether traditional war exclusions applied to cyber operations — and driving new explicit cyber-war wordings',
            'It only affected insurers',
            'It proved cyber losses cannot exceed US$1m'
          ],
          answer: 1,
          explain: 'NotPetya forced the question: is a state cyber attack “war”? Litigation (notably the Merck case) and new model clauses defining state-attack exclusions followed.' },
        { type: 'mc',
          q: 'What ultimately constrains how much cyber capacity the market can deploy?',
          options: [
            'A shortage of underwriters',
            'The systemic scenario — one event (cloud outage, mass vulnerability) hitting a large share of all insureds at once, which caps prudent aggregate exposure',
            'Regulatory premium caps',
            'The cost of incident-response panels'
          ],
          answer: 1,
          explain: 'Unlike hurricanes, a digital catastrophe has no geography to diversify across. The plausible worst-case correlation across the whole book is the class’s capacity ceiling.' }
      ]
    },
    {
      id: 'political-credit',
      title: 'Political risk, credit and surety: insuring promises and politics',
      minutes: 8,
      body: `
<p>This family insures financial loss from governments behaving badly or counterparties failing to pay — classes that sit closer to banking than to traditional insurance, and where London is a world centre.</p>
<h3>Political risk</h3>
<p>Protects cross-border investors and lenders against sovereign actions: <strong>confiscation, expropriation and nationalisation</strong> of assets; <strong>currency inconvertibility</strong> (profits trapped because the central bank blocks exchange); <strong>political violence</strong> damage; contract frustration by government buyers; wrongful calling of bonds. Buyers: multinationals with plants in volatile jurisdictions, banks financing emerging-market projects, commodity traders. Policies are multi-year (matching investment horizons — 7, 10, 15 years), limits are large, and the underwriting is essentially applied geopolitics: country analysis, sanctions awareness, and careful wording of what government action counts.</p>
<h3>Trade credit</h3>
<p>Insures sellers against buyers not paying — whole portfolios of receivables (whole-turnover covers, the domain of large specialist credit insurers) or single large transactions and named buyers (London’s specialty: single-situation credit, often wrapped around bank financing of commodity flows). Losses track the economic cycle; underwriting lives on financial analysis of obligors and, critically, <strong>aggregation by obligor and country</strong> — one corporate collapse or sovereign crisis can hit dozens of policies (a lesson relearned in several trade-finance fraud episodes, where the same cargo secured multiple loans).</p>
<h3>Surety</h3>
<p>Bonds guaranteeing performance: a contractor’s performance bond pays the project owner if the contractor defaults. Legally a three-party guarantee rather than insurance — the surety expects to recover from the contractor — so underwriting resembles bank credit analysis, and pricing assumes near-zero expected loss with occasional severe surprises.</p>
<h3>Idiosyncrasies</h3>
<ul>
<li><strong>Waiting periods</strong> — political risk and credit claims typically pay only after a waiting period (say 180 days) confirming the loss is real and permanent, not a payment delay.</li>
<li><strong>Recoveries and subrogation</strong> — insurers step into the insured’s rights and may spend years recovering from sovereigns or liquidators; net loss ratios depend heavily on recovery skill.</li>
<li><strong>Correlation with banking</strong> — much of the class exists to give banks capital relief on loans; policy wordings are negotiated to satisfy banking regulators that the insurance is as good as the loan guarantee it replaces.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A bank finances US$120m of copper exports from a frontier-market producer and buys single-situation credit insurance for 90% of the exposure (insurer share US$108m, the bank retaining 10% skin in the game). The buyer defaults amid a currency crisis; after the 180-day waiting period the insurer pays 90% of the unpaid US$80m balance: <strong>US$72m</strong>, then pursues recoveries alongside the bank in the restructuring — recovering, over four years, US$30m, of which 90% (US$27m) offsets its loss. Final net claim: US$45m.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Political risk and credit insure <strong>promises — sovereign and commercial</strong>. Waiting periods filter delay from default; recoveries determine final cost; and aggregation runs by <strong>obligor and country</strong>, not postcode. Surety is credit analysis wearing an insurance badge.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A credit policy covers 85% of a US$60m receivable. The buyer defaults with US$40m unpaid. After the waiting period, what does the insurer pay, in US$ millions?',
          answer: 34, tol: 0.2, unit: 'US$ millions',
          explain: '85% × 40 = US$34m. The uninsured 15% keeps the insured incentivised to lend and collect prudently.' },
        { type: 'mc',
          q: 'What is currency inconvertibility cover for?',
          options: [
            'Losses from exchange-rate movements',
            'Profits or loan payments trapped in a country because its authorities block conversion or transfer of local currency',
            'Counterfeit banknotes',
            'Cryptocurrency losses'
          ],
          answer: 1,
          explain: 'It is a political peril, not a market one: the money exists but the government won’t let it out. Exchange-rate risk itself is not insured.' },
        { type: 'mc',
          q: 'Why do political risk and credit policies include waiting periods before claims are paid?',
          options: [
            'To earn extra investment income',
            'To distinguish permanent default or expropriation from temporary delays that resolve themselves',
            'Because courts require it',
            'To allow premium adjustment first'
          ],
          answer: 1,
          explain: 'Many “losses” cure within months — payments arrive late, disputes settle. The waiting period filters real, permanent loss from noise.' },
        { type: 'mc',
          q: 'In what key way does surety differ from conventional insurance?',
          options: [
            'It has no policy document',
            'It is a three-party guarantee where the surety expects to recover its payment from the defaulting principal — priced for near-zero expected loss',
            'It covers only governments',
            'It cannot be reinsured'
          ],
          answer: 1,
          explain: 'A surety bond backs one party’s obligations to another, with recourse against the principal — economically closer to a bank guarantee than to risk pooling.' }
      ]
    },
    {
      id: 'ah-contingency',
      title: 'Accident & health, contingency and the rest of the specialty zoo',
      minutes: 8,
      body: `
<p>The market’s long tail of smaller specialty classes shows its character best: anywhere a risk is odd, mobile or severe, someone in London will quote it.</p>
<h3>Accident & health</h3>
<p><strong>Personal accident</strong> pays fixed benefits for death or specified injury (so much for loss of a limb, so much per week disabled) — benefit-based rather than indemnity-based, so quantum is mechanical once the event is proven. London writes: group schemes for employers, high-limit personal accident for wealthy individuals, sports professionals, and <strong>medical expenses for travel and expatriates</strong>. A large share is <strong>inwards accident & health reinsurance</strong>, including catastrophe covers protecting life and health insurers against many claims from one event (a stadium disaster, a pandemic wave). Idiosyncrasy: accumulation by <em>people in one place</em> — airlines, cruise ships, conferences — so exposure managers track “common carrier” and event accumulations.</p>
<h3>Contingency</h3>
<p>The events business: <strong>event cancellation</strong> (weather, venue failure, non-appearance of the star performer), prize indemnity (the hole-in-one contest), film production covers, and <strong>non-appearance</strong> for tours. The COVID-19 pandemic was the class’s asteroid strike: worldwide simultaneous cancellation — the ultimate accumulation — produced enormous losses and rewrote wordings, with communicable-disease exclusions now standard. Underwriting is peril-by-peril reasoning about a specific date and venue: it rewards imagination more than data.</p>
<h3>Others you will meet</h3>
<ul>
<li><strong>Bloodstock and livestock</strong> — racehorses and breeding stock (mortality, infertility, theft).</li>
<li><strong>Fine art & specie</strong> — museum collections, private collections, vault risks (met in Marine).</li>
<li><strong>Kidnap & ransom</strong> — response consultants plus reimbursement, sold with strict confidentiality.</li>
<li><strong>Legal expenses, warranty products, parametric covers</strong> — where payout is triggered by an index (rainfall, wind speed at a station, flight delay) rather than proven loss: fast-paying, dispute-light, but with <strong>basis risk</strong> (index pays ≠ actual loss).</li>
</ul>
<h3>Why the zoo matters</h3>
<p>These classes are individually small but collectively significant — and they demonstrate the market’s method in miniature: define the peril precisely, price it with judgement where data is thin, cap the accumulation, and word the contract tightly. Skills learned here transfer everywhere.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A festival buys cancellation cover: limit £8m (its irrecoverable costs and committed profit), perils including venue damage and named-storm weather, communicable disease excluded. A named storm floods the site two days before gates open; the event is cancelled. The loss adjuster verifies irrecoverable costs of £6.9m (staging, artists’ guarantees, marketing) and lost net profit £1.5m — total £8.4m, paid at the £8m limit. Had the cancellation instead been caused by a new epidemic, the exclusion would have applied — the post-pandemic wording doing exactly what it was repriced to do.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Specialty classes insure precisely defined events with thin data and sharp wordings. Accident & health accumulates by <strong>people in one place</strong>; contingency by <strong>simultaneous cancellation</strong>; parametric covers trade indemnity precision for speed via <strong>basis risk</strong>.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A group personal accident schedule pays £250,000 per death. An accident at a client site kills 4 covered employees and the policy has a £2m per-event limit. What does the insurer pay, in £ millions?',
          answer: 1, tol: 0.01, unit: '£ millions',
          explain: '4 × £250,000 = £1m, within the £2m event limit. Benefit-based covers pay scheduled amounts, not proven economic loss.' },
        { type: 'mc',
          q: 'Why was the COVID-19 pandemic uniquely devastating for the contingency class?',
          options: [
            'Because premiums had been waived that year',
            'Because it cancelled events worldwide simultaneously — a perfect accumulation across the entire portfolio with no geographic diversification',
            'Because venues doubled their prices',
            'Because it caused physical damage to stadiums'
          ],
          answer: 1,
          explain: 'Cancellation risk was assumed to be idiosyncratic (one venue, one storm). A pandemic correlated every event on earth — the class’s systemic scenario realised, now addressed through communicable-disease exclusions.' },
        { type: 'mc',
          q: 'What is basis risk in a parametric cover?',
          options: [
            'The risk the index provider fails',
            'The mismatch between what the index pays and the actual loss suffered — the trigger can miss a real loss or pay without one',
            'The risk of choosing the wrong currency',
            'The credit risk of the insured'
          ],
          answer: 1,
          explain: 'Parametric covers pay on an objective index, not indemnity. Speed and certainty are bought at the price of imperfect correlation with the true loss.' },
        { type: 'mc',
          q: 'An accident & health underwriter worries about “common carrier accumulation”. What is the concern?',
          options: [
            'Too many policies sold through one broker',
            'Many covered individuals travelling on the same aircraft, ship or train, so one crash triggers hundreds of benefit payments at once',
            'Employees switching insurers together',
            'Duplicate cover for the same person'
          ],
          answer: 1,
          explain: 'People-in-one-place is the accident & health accumulation axis: group schemes and reinsurance treaties are monitored for shared flights, venues and events.' }
      ]
    }
  ]
});
