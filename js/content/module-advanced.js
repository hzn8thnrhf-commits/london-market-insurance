/* Module 13 — Advanced Practitioner */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'advanced',
  icon: '🧠',
  title: 'Advanced Practitioner',
  tagline: 'The techniques behind the techniques',
  blurb: 'A step up in technicality: pricing layers with exposure curves, loss-sensitive contract features, capital allocation methods, reserving diagnostics, the legal machinery of the contract, and the investment economics of float. Best tackled after the core modules.',
  badge: { icon: '🧠', name: 'Advanced Practitioner', desc: 'Master the “Advanced Practitioner” module.' },
  lessons: [
    {
      id: 'layer-pricing',
      title: 'Pricing layers: exposure curves and increased limit factors',
      minutes: 10,
      body: `
<p>The Pricing module priced whole risks. Real specialty pricing constantly needs something harder: the price of a <em>slice</em> — a layer, a higher limit, a bigger deductible. Two families of tools do this.</p>
<h3>Property: exposure curves (first-loss scales)</h3>
<p>For property, the question is: of a risk’s total value, what share of expected loss sits in the first 10%, 20%, 50% of that value? An <strong>exposure curve</strong> answers it, mapping “deductible or limit as a share of total value” to “share of expected loss cost”. Curves are steep because most losses are partial: for typical commercial property, the first 20% of value might contain 60–70% of expected loss cost. Classic parametrised families (such as the Swiss Re / Gasparini curves and Lloyd’s market scales) let underwriters price any layer consistently:</p>
<p style="text-align:center"><strong>layer cost share = curve(top of layer ÷ value) − curve(bottom ÷ value)</strong></p>
<h3>Casualty: increased limit factors</h3>
<p>For liability, severity has no “total value” anchor, so the market uses <strong>increased limit factors</strong>: ratios of the premium for a higher limit to the premium for a base limit, derived from severity distributions. If the £1m-limit premium is 100 and the factor for £5m is 1.65, the £5m-limit premium is 165 — the extra 65 buying the (thin but real) chance of losses between £1m and £5m. Two properties matter:</p>
<ul>
<li><strong>Factors flatten</strong> as limits rise — each extra million is ever less likely to be reached… unless severity inflation is biting, which steepens the curve exactly where excess underwriters live.</li>
<li><strong>Excess layer price = base premium × (factor(top) − factor(bottom))</strong> — the casualty twin of the exposure-curve formula.</li>
</ul>
<h3>Why this matters beyond pricing teams</h3>
<p>Layer mathematics explains market phenomena you will meet everywhere: why doubling a deductible does not halve the premium (the curve is steep at the bottom); why high excess layers are cheap per unit of limit but catastrophically leveraged to inflation; and why claims-trend surprises hit excess books multiples harder than primary books (a 10% severity trend can raise a high layer’s expected cost by 30–50% — “leveraged inflation”).</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A warehouse has £50m total insured value; ground-up expected loss cost £400,000 a year. The exposure curve gives: curve(20%) = 0.62, curve(60%) = 0.88. Price the layer £20m xs £10m (i.e. from 20% to 60% of value): cost share = 0.88 − 0.62 = 26%; expected layer cost = 26% × £400,000 = <strong>£104,000</strong>, to be loaded for expenses, capital and profit. Note the asymmetry: the first £10m (20% of value) carries 62% of the whole risk’s loss cost.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Exposure curves (property) and increased limit factors (casualty) turn one ground-up price into a consistent price for <strong>any slice</strong> — and their shape explains why deductibles are worth less than clients think, and why excess layers are levered bets on severity trend.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A risk has £30m total value and ground-up expected loss cost of £600,000. The exposure curve gives curve(1/3) = 0.70 and curve(2/3) = 0.90. What is the expected loss cost of the £10m xs £10m layer, in £?',
          answer: 120000, tol: 2000, unit: '£',
          explain: 'The layer spans 1/3 to 2/3 of value: (0.90 − 0.70) × £600,000 = £120,000.' },
        { type: 'num',
          q: 'Base premium at a £1m limit is £80,000. Increased limit factors: £1m = 1.00, £5m = 1.60, £10m = 1.85. What is the price of the £5m xs £5m excess layer, in £?',
          answer: 20000, tol: 500, unit: '£',
          explain: 'Base × (factor(10m) − factor(5m)) = 80,000 × 0.25 = £20,000 — cheap per unit of limit because losses rarely reach it.' },
        { type: 'mc',
          q: 'Why does severity inflation hit excess-of-loss books harder than primary books?',
          options: [
            'Excess books have higher expense ratios',
            'A given trend pushes proportionally more losses over high attachment points — small ground-up inflation becomes large layer-cost inflation (leveraged inflation)',
            'Primary books are index-linked',
            'It does not — inflation is uniform'
          ],
          answer: 1,
          explain: 'A loss that grows 10% from £9.5m to £10.45m goes from missing a £10m attachment entirely to hitting it. Layers amplify trend — the core risk of excess underwriting.' },
        { type: 'mc',
          q: 'A client doubles its deductible from 2% to 4% of insured value and expects the premium to fall substantially. Why is the actual saving usually modest?',
          options: [
            'Insurers refuse to reprice deductibles',
            'Exposure curves are steep at low values, but the slice between 2% and 4% of value contains only a modest share of expected loss cost compared with the first 2%',
            'Because brokerage rises with deductibles',
            'Regulation fixes minimum premiums'
          ],
          answer: 1,
          explain: 'Most of the curve’s weight sits in the very first slice of value. Moving the deductible within the steep region removes real but rapidly diminishing loss cost.' }
      ]
    },
    {
      id: 'loss-sensitive',
      title: 'Loss-sensitive features: sliding scales, swing rates and profit shares',
      minutes: 9,
      body: `
<p>Fixed premium is only the simplest deal. Much reinsurance and large-account business uses <strong>loss-sensitive features</strong> — contract terms that move money after the fact, depending on how the business performs. They blur the line between risk transfer and risk financing, and reading them correctly is an essential intermediate skill.</p>
<h3>Sliding-scale commission</h3>
<p>On proportional treaties (Reinsurance module), the ceding commission often <strong>slides</strong> with the loss ratio: e.g. commission of 30% at a 60% loss ratio, rising 0.5% for each point the loss ratio improves (capped at 35%), falling likewise to a floor at 25%. Effect: the cedant is rewarded for a clean year and penalised for a dirty one — the reinsurer’s result is stabilised in a band. Always compute the <strong>technical balance</strong>: commission + loss ratio at each scenario, to see who really bears which outcomes.</p>
<h3>Swing-rated premium</h3>
<p>On excess of loss, the premium itself can swing: a provisional rate is adjusted within a corridor based on actual losses to the layer — e.g. premium = losses × 100/80 (a 1.25 load), subject to minimum 2% and maximum 6% rate. Within the corridor the insured is essentially <em>financing its own losses plus a margin</em>; true risk transfer happens only beyond the maximum. Swing rating suits working layers with credible frequency.</p>
<h3>Profit commission and no-claims bonuses</h3>
<p>A share of the reinsurer’s profit returned to the cedant (met in the framework-agreement context in the Pens & Paper module) — same alignment logic, same accounting subtleties (deficit carry-forwards again).</p>
<h3>Why analysts must care</h3>
<ul>
<li><strong>Expected cost ≠ headline premium.</strong> A swing-rated layer’s expected cost is the probability-weighted premium across scenarios, not the provisional figure booked on day one.</li>
<li><strong>Risk-transfer testing.</strong> Accounting and regulation require genuine risk transfer for reinsurance accounting treatment; heavily loss-sensitive deals sit near that boundary and get formally tested (the practitioner shorthand: meaningful probability of a meaningful loss to the reinsurer).</li>
<li><strong>Reserving interactions.</strong> Loss-sensitive premium and commission must be re-estimated whenever loss estimates move — a recurring source of surprise in accounts if forgotten.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A quota share has sliding commission: 30% at a 60% loss ratio, ±0.5% per point, floor 25%, cap 35%. The year lands at a 68% loss ratio: commission slides down 8 × 0.5% = 4 points to <strong>26%</strong>. Technical balance to the reinsurer: 100 − 68 − 26 = 6% margin. Had the year come in at 52%, commission would cap at 34%: margin 100 − 52 − 34 = 14%. The slide has narrowed the reinsurer’s outcome range — the cedant absorbed part of both tails.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Loss-sensitive features move money after the result is known: <strong>sliding commissions and swing rates convert part of the risk back to the buyer</strong>. Price and reserve them on expected, probability-weighted terms — and check where genuine risk transfer begins.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Sliding commission: 32% at a 65% loss ratio, moving 0.5 points per loss-ratio point, floor 27%, cap 36%. The year’s loss ratio is 73%. What commission applies, in %?',
          answer: 28, tol: 0.1, unit: '%',
          explain: '73 is 8 points worse than 65: commission slides down 4 points to 28% — above the 27% floor, so no clipping.' },
        { type: 'num',
          q: 'A swing-rated layer: premium = layer losses × 1.2, minimum £1.5m, maximum £4.5m. Losses to the layer are £3.2m. What premium is due, in £ millions?',
          answer: 3.84, tol: 0.05, unit: '£ millions',
          explain: '3.2 × 1.2 = £3.84m, within the corridor. The insured effectively financed its own losses plus a 20% load.' },
        { type: 'mc',
          q: 'In the swing-rated example, where does genuine risk transfer to the reinsurer begin?',
          options: [
            'From the first pound of loss',
            'Only when losses × load would exceed the maximum premium — beyond that point the reinsurer pays without further premium',
            'At the minimum premium',
            'There is never risk transfer in swing-rated deals'
          ],
          answer: 1,
          explain: 'Inside the corridor, more loss simply means more premium. The reinsurer’s own money is only at stake once the maximum premium caps the adjustment.' },
        { type: 'mc',
          q: 'Loss estimates on a treaty with sliding commission deteriorate after year-end. What else must the accounts change, beyond claims reserves?',
          options: [
            'Nothing — commission was fixed at inception',
            'The accrued commission (and any profit commission) must be re-estimated at the new expected loss ratio, moving premium-related balances too',
            'Only the brokerage',
            'The premium tax'
          ],
          answer: 1,
          explain: 'Loss-sensitive terms tie commission and premium to the loss outcome; re-estimating one without the other misstates the result — a classic close-process trap.' }
      ]
    },
    {
      id: 'capital-allocation',
      title: 'Capital allocation in practice: co-measures and the one-year view',
      minutes: 9,
      body: `
<p>The Capital module established that diversified capital must be allocated back to classes. This lesson goes one level deeper: <em>how</em>, and on which time horizon — questions that shape real steering decisions and real bonus pools.</p>
<h3>Allocating by contribution to the tail</h3>
<p>The fair question for each class is: <strong>how much does it contribute to the outcomes that actually threaten us?</strong> The standard family of answers uses <strong>co-measures</strong>: run the capital model’s thousands of simulated years; identify the worst years for the <em>whole</em> firm (say the worst 1%); measure each class’s average loss <em>within those firm-level bad years</em>. A class that loses heavily in the firm’s catastrophic years gets a big allocation even if it looks tame standalone; a class that is flat or profitable in those years gets little. (Formally: allocation by co-tail-value-at-risk, or Euler/marginal methods with similar intent.) Contrast with naive pro-rata by standalone capital, which ignores exactly the correlations that matter.</p>
<h3>Consequences worth internalising</h3>
<ul>
<li><strong>Allocation is portfolio-relative.</strong> The same cyber book gets a small allocation in a property-cat-dominated firm and a huge one in a cyber-heavy firm. There is no “true” standalone capital for a class.</li>
<li><strong>Marginal ≠ average.</strong> The capital for growing a class 10% is its marginal contribution, usually below average allocation for diversifying lines — which is why disciplined firms quote marginal returns for growth decisions but average returns for performance assessment.</li>
<li><strong>Allocations move.</strong> Change the reinsurance programme or grow one class, and every other class’s allocation shifts — a governance headache when targets were set on last year’s allocations.</li>
</ul>
<h3>One-year versus ultimate</h3>
<p>Regulatory capital (Capital module) is a <strong>one-year</strong> measure: enough capital for how much the balance sheet can deteriorate <em>in one year</em>, including how estimates of long-tail liabilities can move in that year — not the full lifetime cost. Lloyd’s member capital, in contrast, runs to <strong>ultimate</strong>. The bridge is <strong>risk emergence</strong>: long-tail reserve uncertainty is recognised over several one-year windows, so a casualty book’s one-year requirement is smaller than its ultimate requirement — but it recurs year after year until the tail runs off. Understanding this reconciles apparently contradictory capital figures for the same book, and explains why long-tail business ties up capital for so long even after premium stops.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A firm’s model simulates 100,000 years; the worst 500 (the 0.5% tail) average a £900m firm loss. Within those years: property catastrophe averages £600m of loss, casualty £180m, specialty £60m, investments £60m. Co-measure allocation of a £900m capital base: property cat 67%, casualty 20%, specialty 6.7%, market risk 6.7%. Note casualty’s standalone one-in-200 might exceed £300m — but in <em>the firm’s</em> bad years (driven by hurricanes) casualty is usually unremarkable, so it is allocated less than standalone. If the firm doubled its casualty book, the firm’s bad years would start to include casualty crises — and the allocations would reshuffle.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Modern allocation asks <strong>“what do you cost me in my worst years?”</strong>, not “how risky are you alone?”. And hold both horizons: regulatory capital is one-year (with reserve risk recurring via emergence); Lloyd’s member capital is ultimate.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'In the firm’s worst-1% simulated years, average losses are: class A £240m, class B £90m, class C £30m (total £360m). Allocating £360m of capital by co-measure, what does class B receive, in £ millions?',
          answer: 90, tol: 1, unit: '£ millions',
          explain: 'Co-measure allocation is proportional to each class’s average loss in the firm-level tail: class B gets its £90m contribution.' },
        { type: 'mc',
          q: 'A class looks highly volatile standalone but receives a small capital allocation. What is the most likely reason?',
          options: [
            'A modelling error',
            'Its bad years rarely coincide with the firm’s bad years — it contributes little to the tail that the capital actually protects against',
            'It has no premium',
            'Its reserves are discounted'
          ],
          answer: 1,
          explain: 'Allocation follows contribution to the firm’s worst outcomes. Uncorrelated volatility is largely self-diversifying at portfolio level — the whole point of co-measures.' },
        { type: 'mc',
          q: 'Why do growth decisions properly use marginal capital while performance reviews use average allocated capital?',
          options: [
            'Tradition',
            'Growing a diversifying class adds less than its average share of capital, so marginal economics decide the growth; but the whole book must still pay for the whole capital base, hence average for assessment',
            'Marginal capital is always larger',
            'Regulators mandate the split'
          ],
          answer: 1,
          explain: 'Marginal answers “what changes if we do this?”; average answers “does this class pay its way?”. Using marginal for both lets every class claim the diversification benefit twice.' },
        { type: 'mc',
          q: 'A casualty book’s one-year capital requirement is much smaller than its ultimate requirement. What reconciles them?',
          options: [
            'One-year models ignore casualty',
            'Reserve uncertainty emerges over many successive one-year windows — the smaller one-year charge recurs each year until the tail runs off',
            'Ultimate figures include expenses',
            'Currency differences'
          ],
          answer: 1,
          explain: 'Risk emergence spreads lifetime uncertainty across annual windows. The one-year view is smaller per year but repeats — which is why long tails tie up capital long after premium ceases.' }
      ]
    },
    {
      id: 'reserving-diagnostics',
      title: 'Reserving in practice: diagnostics, tail factors and honest challenge',
      minutes: 10,
      body: `
<p>The Claims module taught the chain ladder and Bornhuetter–Ferguson. Real reserving is mostly neither — it is the craft of <em>checking</em> those methods against evidence and knowing when they lie. This lesson is a field guide to that craft.</p>
<h3>The diagnostic toolkit</h3>
<ul>
<li><strong>Paid versus incurred projections.</strong> Run the chain ladder on both. If incurred-based ultimates sit persistently above paid-based ones, case reserves may be conservative (or payments slow); if below, case reserves may be weakening — each story demands different action. Convergence over time is health; divergence is a flag.</li>
<li><strong>Actual versus expected.</strong> The sharpest routine test: last review predicted £X of claims movement this quarter; £Y arrived. Persistent adverse surprises — even individually small — are the earliest honest signal of under-reserving. Track them cumulatively by class and year.</li>
<li><strong>Ratio diagnostics.</strong> Paid-to-incurred ratios by development age (a fall suggests strengthening case reserves distorting patterns); average case reserve per open claim (drifting up with inflation? or being quietly eroded?); claim closure rates (a slowdown breaks paid patterns); the ratio of IBNR to case reserves versus history.</li>
<li><strong>Booked versus indicated.</strong> Compare management’s booked reserves to the actuary’s central indication over time. A persistent, growing gap in one direction is governance information, not noise.</li>
</ul>
<h3>Tail factors: the invisible assumption</h3>
<p>Triangles end; liabilities don’t. The <strong>tail factor</strong> extends development beyond the oldest observed age — fitted by curve (inverse power curves are common), benchmarked from industry data, or judged. Its leverage is fearsome on long-tail classes: on a £500m reserve base, moving a casualty tail factor from 1.05 to 1.08 adds £15m of IBNR at a stroke. Tail assumptions deserve — and in good shops receive — explicit annual challenge with documented rationale.</p>
<h3>When methods break: the checklist</h3>
<p>Before trusting any projection, ask what changed: claims-handling philosophy (case strength, settlement pace)? portfolio mix or policy structure (higher attachments lengthen patterns)? inflation regime? legal environment (a court ruling reopening old claims)? one distorting mega-claim (remove it, model it separately — the large-loss separation from the Claims module)? Every one of these violates the chain ladder’s “past patterns persist” assumption in a specific, correctable way.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A casualty class, year-end review. Chain ladder on incurred: ultimate £310m. Diagnostics: actual-versus-expected has run +£4m, +£6m, +£5m adverse in the last three quarters; paid-to-incurred at 48 months has fallen from 55% (older years) to 44% (recent years); closure rates are stable. Reading: case reserves were strengthened ~2 years ago (paid/incurred fell), so historical incurred link ratios <em>overstate</em> future development of recent years — but the adverse actual-versus-expected says the underlying signal is still deterioration. The actuary adjusts link ratios for the case-strength change (downward effect ~£12m), then adds an explicit inflation load (+£18m) and strengthens the tail factor. Booked ultimate: £322m, with each judgement documented. That — not the mechanical £310m — is reserving.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Methods propose; <strong>diagnostics dispose</strong>. Paid-versus-incurred, actual-versus-expected, ratio drifts and explicit tail-factor challenge are how reserving errors get caught early — and every diagnostic maps to a specific broken assumption with a specific fix.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Reserves before the tail are £400m of ultimate on a class where the tail factor moves from 1.04 to 1.075. Roughly how much extra IBNR does the change add, in £ millions?',
          answer: 14, tol: 1.5, unit: '£ millions',
          explain: '£400m × (1.075 − 1.04) = £14m — one quiet assumption, material money. Hence explicit annual tail challenge.' },
        { type: 'mc',
          q: 'Paid-based chain ladder ultimates sit persistently 8% below incurred-based ultimates, and the gap is stable across years. Most likely reading?',
          options: [
            'The class is over-reserved and both methods are wrong',
            'Case reserves carry consistent conservatism (or payments are structurally slow) — stable divergence is a feature to understand, while a widening gap would be the real alarm',
            'Paid data is always superior',
            'The triangle has a data error by definition'
          ],
          answer: 1,
          explain: 'Stable paid/incurred divergence usually reflects consistent case philosophy. The diagnostic value is in changes: convergence, or a widening gap, tells you something moved.' },
        { type: 'mc',
          q: 'Actual claims movements have exceeded expected movements for six consecutive quarters, each time by a “small” amount. Why do experienced reserving actuaries treat this as serious?',
          options: [
            'Because six is an unlucky number',
            'Persistent one-directional surprise is the signature of systematic under-estimation — random noise should straddle zero, and small repeated misses compound into large reserve gaps',
            'Because auditors only check quarters',
            'It is not serious if each miss is small'
          ],
          answer: 1,
          explain: 'Unbiased estimates miss in both directions. A drumbeat of adverse surprises means the model’s centre is wrong — the earliest catchable signal before triangles fully reveal it.' },
        { type: 'mc',
          q: 'The claims team strengthened initial case reserves two years ago. What is the correct reserving response when projecting recent years on incurred data?',
          options: [
            'Nothing — the chain ladder self-corrects',
            'Reduce the historical link ratios applied to recent years, since stronger early case reserves need less future development than history exhibits',
            'Switch permanently to paid data only',
            'Double the tail factor for prudence'
          ],
          answer: 1,
          explain: 'The Claims module flagged the distortion; the practitioner fix is adjusting development assumptions (or using Berquist–Sherman-style corrections) for the case-strength change — not blind mechanics.' }
      ]
    },
    {
      id: 'contract-law',
      title: 'The law of the contract: fair presentation, follow the settlements, disputes',
      minutes: 9,
      body: `
<p>Every number in this course rests on a legal instrument. This lesson covers the legal machinery practitioners actually bump into — in placement, in claims, and between cedant and reinsurer.</p>
<h3>The duty of fair presentation</h3>
<p>Under the United Kingdom’s Insurance Act 2015, a commercial insured must make a <strong>fair presentation of the risk</strong> before inception: disclosing every material circumstance it knows or ought to know (after reasonable search), or enough to put a prudent insurer on notice to ask, presented accessibly (no “data dumping”). The remedies are <em>proportionate</em>: deliberate or reckless breach lets the insurer avoid the policy and keep the premium; innocent breach leads to what would have happened anyway — different terms applied retrospectively, or claims scaled by the ratio of premium actually charged to premium that would have been charged. This replaced the old all-or-nothing avoidance regime, and it reshaped both underwriting questions and claims disputes.</p>
<h3>Warranties and conditions after the Act</h3>
<p>Breach of warranty now <em>suspends</em> cover during the breach rather than discharging the policy forever, and breach of a term irrelevant to the actual loss (an unlocked door in a flood claim) no longer defeats the claim. Marine underwriting (Classes I) still leans on warranties — but with these softened teeth.</p>
<h3>Between cedant and reinsurer: follow the settlements</h3>
<p>Reinsurance contracts commonly bind the reinsurer to <strong>follow the settlements</strong> of the cedant: if the cedant settles a claim honestly and businesslike, and it arguably falls within both contracts, the reinsurer pays its share without re-litigating the loss. Without such clauses, every claim could be fought twice. Limits: the settlement must be within the reinsurance terms (the “double proviso”), and dishonest or plainly ex gratia payments are not protected. Related: <strong>claims control and cooperation clauses</strong> (the reinsurer’s right to steer big claims) — heavily negotiated on facultative and large treaty business.</p>
<h3>When it goes wrong: disputes</h3>
<p>London market disputes typically go to <strong>arbitration</strong> (confidential, expert tribunals, seat usually London) or the English Commercial Court, whose insurance jurisprudence is a global export. Recurring battlegrounds: aggregation (one event or many — the hours-clause and “originating cause” arguments from earlier modules, litigated for fortunes after September 11 and the pandemic), late notification, fair presentation, and sanctions clauses. A practitioner’s rule of thumb: <strong>most coverage litigation is a wording defect discovered under stress</strong> — which is why the market invests so much in clause libraries and contract certainty.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>An insured innocently failed to disclose a prior loss; had it been disclosed, the insurer would have charged £150,000 premium instead of £100,000 (same terms). A £900,000 claim arises. Under proportionate remedies the insurer pays 100/150 of the claim: <strong>£600,000</strong>. Under the pre-2015 regime it could likely have avoided the policy entirely and paid nothing — the Act converted a cliff edge into arithmetic.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Know four levers: <strong>fair presentation with proportionate remedies; warranties that suspend rather than kill; follow-the-settlements between cedant and reinsurer; and arbitration as the market’s dispute engine</strong>. Most disputes are wordings failing under stress — draft accordingly.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'An innocent non-disclosure meant the insurer charged £200,000 when it would have charged £250,000 on the same terms. A £1.2m covered loss occurs. Under proportionate remedies, what does the insurer pay, in £?',
          answer: 960000, tol: 5000, unit: '£',
          explain: 'Claims scale by premium-charged ÷ premium-that-would-have-been: (200/250) × £1.2m = £960,000.' },
        { type: 'mc',
          q: 'Under the Insurance Act 2015, what happens if an insured breaches a warranty but remedies the breach before a loss occurs?',
          options: [
            'The policy is void from inception',
            'Cover was merely suspended during the breach — a loss after remedy is covered',
            'The insurer keeps the premium and cover ends',
            'The claim is halved'
          ],
          answer: 1,
          explain: 'Warranties now suspend rather than discharge: cover revives when the breach is cured — a major softening of the old marine-law severity.' },
        { type: 'mc',
          q: 'What does a follow-the-settlements clause spare the market?',
          options: [
            'Paying any claims at all',
            'Re-litigating every claim between cedant and reinsurer — honest, businesslike settlements arguably within both contracts bind the reinsurer',
            'The need for claims departments',
            'Arbitration costs in all cases'
          ],
          answer: 1,
          explain: 'Without it, each subscription claim could be fought again up the reinsurance chain. The double proviso (within both contracts) and honesty requirement are its guardrails.' },
        { type: 'mc',
          q: 'Why do most major coverage disputes trace back to wordings rather than facts?',
          options: [
            'Because facts are never contested',
            'Extreme events probe contract language in ways drafting never anticipated — aggregation definitions, exclusions and notification terms fail precisely under the stress they were meant for',
            'Because courts refuse to hear factual evidence',
            'Because wordings are deliberately ambiguous'
          ],
          answer: 1,
          explain: 'September 11 (one occurrence or two?) and pandemic business interruption both turned on drafted words meeting undrafted reality — the recurring pattern of market-shaking litigation.' }
      ]
    },
    {
      id: 'float-economics',
      title: 'Float, discounting and the economics of an insurer',
      minutes: 9,
      body: `
<p>Finish the advanced module with the financial engine underneath everything: an insurer is a leveraged investment fund whose “borrowing” is premium held before claims are paid. Understanding this reframes pricing, reserving and strategy.</p>
<h3>Float</h3>
<p><strong>Float</strong> is policyholder money temporarily held: unearned premium plus outstanding claims reserves, net of receivables. A casualty book paying claims eight years after premium receipt generates enormous float per unit of premium; property catastrophe generates little. If the combined ratio is below 100%, the float is better than free — the insurer is <em>paid</em> to hold investable money (the insight famously exploited by Berkshire Hathaway). At a combined ratio above 100%, the underwriting loss is the interest rate paid on borrowed float — tolerable while investment returns exceed it.</p>
<h3>Discounting and duration</h3>
<p>Reserves shown undiscounted overstate the economic liability: £100m payable in eight years at a 4% yield is economically ~£73m today. Modern regimes recognise this — Solvency technical provisions are discounted; the 2023 accounting standard discounts and then unwinds the discount through time (Regulation module). Consequences practitioners must internalise:</p>
<ul>
<li><strong>Interest-rate sensitivity</strong> — rising rates cut the economic value of liabilities (good) and the market value of bonds (bad); the net effect depends on <strong>duration matching</strong> between assets and liabilities. Mismatch is a deliberate or accidental interest-rate bet.</li>
<li><strong>Long-tail pricing includes investment income</strong> — a casualty price can be economically adequate at a 103% combined ratio when yields are 5%, and inadequate at 98% when yields are 1%. Rate cycles and interest-rate cycles interact: cheap money era pricing needed lower combined ratios than it often achieved.</li>
<li><strong>Inflation is float’s enemy twice</strong> — it raises the claims that must eventually be paid <em>and</em> erodes the real value of the bonds funding them.</li>
</ul>
<h3>The whole-firm view</h3>
<p>Return on equity decomposes into: underwriting margin × premium leverage + investment yield × asset leverage (assets ÷ equity, swollen by float). This identity explains strategy across the market: long-tail specialists tolerate thinner underwriting margins (their float works harder); short-tail catastrophe writers need fat margins (no float to speak of, and their capital must sit in liquid, low-yield assets); and everyone’s risk appetite in investments is constrained by the promise that claims money must be there on the bad day.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>Two carriers each write £500m of premium at a 98% combined ratio (£10m underwriting profit). Carrier S (short-tail) holds average float of £200m; carrier L (long-tail casualty) holds £900m. At a 4% investment yield: S earns 10 + 8 = £18m; L earns 10 + 36 = <strong>£46m</strong> on identical underwriting. Now rates fall to 1%: S earns £12m, L earns £19m — and if L had priced assuming 4% yields, its true economics just deteriorated by £27m a year with no change in claims at all. Interest rates are a silent partner in every long-tail price.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Insurers earn twice: on the underwriting margin and on the <strong>float</strong> — and the second engine is largest where tails are longest. Discounting, duration matching and the interest-rate environment are therefore pricing inputs, not back-office details.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A carrier holds £750m of average float invested at a 3.6% yield, and runs a 101% combined ratio on £400m of earned premium. What is its combined underwriting-plus-investment result, in £ millions?',
          answer: 23, tol: 0.5, unit: '£ millions',
          explain: 'Underwriting: −1% × 400 = −£4m; investment: 3.6% × 750 = £27m; total £23m. The float engine outruns a small underwriting loss — the classic long-tail economics.' },
        { type: 'num',
          q: 'Reserves of £260m are payable in one payment six years from now. Discounting at 3% a year, what is their approximate economic value today, in £ millions? (Use 1.03^6 ≈ 1.194.)',
          answer: 217.8, tol: 3, unit: '£ millions',
          explain: '260 ÷ 1.194 ≈ £217.8m — the gap versus the undiscounted figure is the time value that discounting regimes recognise.' },
        { type: 'mc',
          q: 'Why can a long-tail class be economically adequate at a 103% combined ratio in a 5%-yield world but inadequate at 98% in a 1%-yield world?',
          options: [
            'Combined ratios are calculated differently at different yields',
            'Investment income on float funds the gap: the higher the yield and the longer the tail, the more underwriting loss the float can economically carry',
            'Claims fall when yields rise',
            'It cannot — lower combined ratios are always better economics'
          ],
          answer: 1,
          explain: 'The economic price is premium plus the investment income it will earn before claims are paid. Yield changes reprice long-tail business even when claims assumptions are static.' },
        { type: 'mc',
          q: 'What is duration matching, and why do insurers care?',
          options: [
            'Matching policy periods to calendar years',
            'Aligning the interest-rate sensitivity of investments with that of liabilities, so rate moves affect both sides similarly rather than creating an accidental rate bet',
            'Matching premium instalments to claim payments exactly',
            'Holding only cash'
          ],
          answer: 1,
          explain: 'A mismatch means rate rises or falls change assets and liabilities by different amounts — a market-risk position the capital model charges for, taken deliberately or by neglect.' }
      ]
    }
  ]
});
