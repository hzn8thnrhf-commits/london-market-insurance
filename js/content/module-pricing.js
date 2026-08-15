/* Module 3 — Pricing & Underwriting */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'pricing',
  icon: '⚖️',
  title: 'Pricing & Underwriting',
  tagline: 'Ratios, rates and the craft of selecting risk',
  cii: 'LM3',
  blurb: 'How underwriters decide what to write and what to charge — loss ratios, combined ratios, rate on line, experience versus exposure rating, and the market cycle.',
  badge: { icon: '⚖️', name: 'Rate Setter', desc: 'Master the “Pricing & Underwriting” module.' },
  lessons: [
    {
      id: 'ratios',
      title: 'The vital signs: loss ratio, expense ratio, combined ratio',
      minutes: 8,
      body: `
<p>Three ratios are the vital signs of any insurance operation. Learn to compute and interrogate them and you can read any underwriting result.</p>
<h3>Loss ratio</h3>
<p><strong>Loss ratio = incurred claims ÷ earned premium.</strong> “Incurred” claims means paid claims plus the movement in reserves for claims outstanding — not just cash out of the door. A 60% loss ratio means 60p of every £1 of earned premium goes (or is expected to go) to claims. Variants matter: gross versus net of reinsurance, accident-year versus calendar-year, with or without catastrophes. State which one you mean.</p>
<h3>Expense ratio</h3>
<p><strong>Expense ratio = expenses ÷ premium</strong>, usually split into <em>acquisition costs</em> (brokerage, commissions) and <em>administrative expenses</em> (staff, buildings, systems). London market expense ratios are famously high — often 35–40% in total — because distribution is intermediated and risks are individually underwritten. Expense discipline is a perennial market theme.</p>
<h3>Combined ratio</h3>
<p><strong>Combined ratio = loss ratio + expense ratio.</strong> Below 100% the underwriting made a profit; above 100% it lost money before investment income. A combined ratio of 93% means an 7p underwriting profit per £1 of premium. Note that insurers can tolerate combined ratios slightly above 100% in long-tail classes because they invest the premium for years before paying claims — but in short-tail classes there is little investment cushion.</p>
<h3>Reading them together</h3>
<p>The decomposition tells the story. A 105% combined ratio could be a 70% loss ratio with 35% expenses (bad luck or bad pricing?) or a 55% loss ratio with 50% expenses (a cost problem). Catastrophe classes swing violently year to year — a single-year combined ratio there tells you little without a multi-year average.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A syndicate’s class earns £80m of premium. Paid claims are £30m, reserves for outstanding claims rise by £18m, acquisition costs are £20m and administrative expenses £10m. Loss ratio = (30 + 18) ÷ 80 = <strong>60%</strong>. Expense ratio = (20 + 10) ÷ 80 = <strong>37.5%</strong>. Combined ratio = <strong>97.5%</strong> — an underwriting profit of £2m (2.5% of £80m), before investment income.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Combined ratio below 100% = underwriting profit. But always ask: <strong>which premium (earned?), which claims (incurred, gross or net?), which period?</strong> The definition details change the answer.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Earned premium is £120m; paid claims £42m; outstanding claims reserves increase by £24m. What is the loss ratio, in %?',
          answer: 55, tol: 0.2, unit: '%',
          explain: 'Incurred claims = 42 + 24 = £66m; 66 ÷ 120 = 55%.' },
        { type: 'num',
          q: 'A class runs a 58% loss ratio, 24% acquisition ratio and 13% administrative expense ratio. What is the combined ratio, in %?',
          answer: 95, tol: 0.1, unit: '%',
          explain: '58 + 24 + 13 = 95%. Below 100%, so the underwriting is profitable — a 5% margin.' },
        { type: 'num',
          q: 'With earned premium of £250m and a combined ratio of 96%, what is the underwriting profit, in £ millions?',
          answer: 10, tol: 0.1, unit: '£ millions',
          explain: '(100% − 96%) × £250m = £10m of underwriting profit before investment income.' },
        { type: 'mc',
          q: 'Why might a long-tail casualty insurer accept a combined ratio slightly above 100%?',
          options: [
            'Because regulators require it',
            'Because premium is invested for years before claims are paid, so investment income can turn an underwriting loss into an overall profit',
            'Because claims in casualty are usually never paid',
            'Because expense ratios do not apply to casualty'
          ],
          answer: 1,
          explain: 'The long delay between premium and claim payment creates investment “float”. This never makes discipline optional — but it explains different tolerance across classes.' },
        { type: 'mc',
          q: 'A catastrophe-exposed class shows a 45% combined ratio this year. The most sensible reading is:',
          options: [
            'The class is permanently hugely profitable',
            'The pricing is too high and should be halved',
            'A benign year in a volatile class — judge it on a multi-year average including loss years',
            'The data must be wrong'
          ],
          answer: 2,
          explain: 'Cat classes are priced to absorb rare big losses. Quiet years look spectacular; the true margin only appears over a full cycle of years including events.' }
      ]
    },
    {
      id: 'rate-on-line',
      title: 'Rate on line, payback and burning cost',
      minutes: 8,
      body: `
<p>Excess-of-loss business — where an insurer or reinsurer pays only when a loss exceeds an attachment point — has its own pricing vocabulary. Three linked concepts do most of the work.</p>
<h3>Rate on line</h3>
<p><strong>Rate on line = premium ÷ limit.</strong> A layer paying up to £10m for a premium of £1.5m has a 15% rate on line. It answers: what fraction of the amount at stake is being charged per year? High rate on line (say 25%+) signals a layer expected to be hit often (“working layer”); very low rate on line (1–3%) signals remote catastrophe protection.</p>
<h3>Payback</h3>
<p>The reciprocal view: <strong>payback = limit ÷ premium</strong> — how many years of premium are needed to recoup one full-limit loss. A 15% rate on line is a 6.7-year payback: one total loss to the layer consumes the next 6–7 years of premium. Underwriters use payback as an intuition check: “Am I comfortable this layer suffers a full loss less than once in 7 years?”</p>
<h3>Burning cost</h3>
<p><strong>Burning cost</strong> is experience-based pricing at its simplest: take the historical losses that <em>would have hit the layer</em>, average them over the period, and express as premium (often loaded for expenses and profit). If the past ten years would have produced £8m of losses to a layer, the raw burning cost is £0.8m a year. Burning cost must be adjusted — for inflation (a £9m loss ten years ago is a bigger loss today), exposure changes, and the simple fact that a short history may contain zero large losses purely by luck.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A reinsurer quotes a layer of <strong>£20m excess of £10m</strong> (pays up to £20m of each loss above a £10m attachment). Premium quoted: £2.4m — a rate on line of 2.4 ÷ 20 = <strong>12%</strong>, i.e. a payback of about 8.3 years. Historical losses trended to today’s values show layer losses of £4m, £0m, £18m, £0m, £6m over five years — average £5.6m a year, far above the £2.4m premium. On experience alone this layer is underpriced; either the history is unrepresentative or the quote needs to rise.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Rate on line, payback and burning cost are three lenses on one question: <strong>does the premium cover the expected hits to the layer, with margin?</strong> Always trend historical losses to current values before comparing.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A layer provides £15m of limit for £1.8m premium. What is the rate on line, in %?',
          answer: 12, tol: 0.1, unit: '%',
          explain: '1.8 ÷ 15 = 12%.' },
        { type: 'num',
          q: 'A layer has a rate on line of 8%. What is its payback period, in years?',
          answer: 12.5, tol: 0.1, unit: 'years',
          explain: 'Payback = 1 ÷ 0.08 = 12.5 years of premium to fund one full-limit loss.' },
        { type: 'num',
          q: 'Trended losses to a layer over 8 years total £13.6m. Ignoring loadings, what is the annual burning cost, in £ millions?',
          answer: 1.7, tol: 0.02, unit: '£ millions',
          explain: '£13.6m ÷ 8 = £1.7m a year of expected layer losses on raw experience.' },
        { type: 'mc',
          q: 'A 10-year loss history shows no losses at all to a high catastrophe layer. The buyer argues the premium should be near zero. What is wrong with that argument?',
          options: [
            'Nothing — no losses means no risk',
            'Rare events can easily be absent from a short window; the layer exists precisely for low-frequency, high-severity outcomes that experience alone cannot price',
            'Burning cost may only be computed over 20 years',
            'Catastrophe layers are priced by regulators'
          ],
          answer: 1,
          explain: 'For remote layers, absence of losses in a decade is expected even when real risk exists. That is why exposure-based methods (next lesson) and catastrophe models are used instead of pure burning cost.' }
      ]
    },
    {
      id: 'rating-methods',
      title: 'Experience versus exposure rating — and monitoring rate change',
      minutes: 9,
      body: `
<p>Two fundamentally different philosophies underpin pricing, and most real London market pricing blends them.</p>
<h3>Experience rating</h3>
<p><strong>Price from the risk’s own claims history.</strong> Collect several years of losses, adjust them to today’s conditions — inflation, changes in the insured’s size and activities, changes in cover — then project forward. Powerful where claims are frequent (a motor fleet, a marine cargo account), because history is statistically credible. Weak where losses are rare: ten clean years on a refinery tells you little about explosion risk.</p>
<h3>Exposure rating</h3>
<p><strong>Price from the characteristics of the risk itself</strong>, using external data: what could go wrong, how badly, how often — informed by market-wide curves and models rather than the risk’s own (sparse) history. For property, underwriters use total insured values, construction, occupancy and location fed into rating curves or catastrophe models; for liability, turnover, headcount, jurisdiction and industry. Exposure rating handles the refinery problem: it prices the possibility of the loss that hasn’t happened yet.</p>
<h3>Credibility blending</h3>
<p>In practice actuaries weight the two: <em>credibility</em> increases with volume of experience. A large fleet might be priced 80% on experience; a satellite launch 100% on exposure. The blend shifts as data accumulates.</p>
<h3>Rate change monitoring</h3>
<p>Portfolio management needs to know whether pricing is improving or deteriorating. <strong>Rate change</strong> (or “rate movement”) measures the price change on renewing business <em>for the same exposure and cover</em>. If a risk renews at +10% premium but the client also doubled its deductible, the true rate change is more than +10%; if its fleet grew 10%, the true rate change may be zero. London carriers maintain rate indices by class, tracking cumulative rate adequacy across the cycle — one of the most-watched metrics in any underwriting business review, and a key input when planning next year’s loss ratios.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A liability account renews at £550,000 premium versus £500,000 last year (+10% premium change). But the insured’s turnover — the exposure base — grew 10%, so the exposure-adjusted price is 550 ÷ (500 × 1.1) = 1.0: <strong>0% true rate change</strong>. A plan that assumed +10% rate improvement would be building on sand. Now add claims inflation of 5%: in real terms, the rate has actually <em>weakened</em> by about 5%.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Experience rating asks “what did this risk do?”; exposure rating asks “what could this risk do?”. And headline premium change is not rate change — always <strong>adjust for exposure, cover and claims inflation</strong> before declaring pricing progress.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Which risk is most suited to pure exposure rating?',
          options: [
            'A courier fleet with 400 vehicles and dense claims history',
            'A one-off satellite launch with no loss history of its own',
            'A retailer’s employee injury account with 10 years of data',
            'A binder with thousands of small property policies'
          ],
          answer: 1,
          explain: 'With no meaningful history, price must come from the characteristics of the risk and market-wide data — the essence of exposure rating.' },
        { type: 'num',
          q: 'A risk renews at £828,000 versus £720,000 expiring. Exposure is unchanged and cover is identical. What is the rate change, in %?',
          answer: 15, tol: 0.2, unit: '%',
          explain: '828 ÷ 720 = 1.15, a +15% rate change — a genuine price increase since exposure and cover are constant.' },
        { type: 'num',
          q: 'Premium rises from £400,000 to £440,000 at renewal, but the insured’s exposure base grew 25%. What is the true exposure-adjusted rate change, in %? (A reduction should be negative.)',
          answer: -12, tol: 0.5, unit: '%',
          explain: 'Exposure-adjusted: 440 ÷ (400 × 1.25) = 0.88 → −12%. The headline +10% premium masks a real rate reduction.' },
        { type: 'mc',
          q: 'Why does claims inflation matter when interpreting rate change?',
          options: [
            'It doesn’t — rate change already includes inflation',
            'If claim costs rise 6% a year, a +6% rate change only stands still in real terms; less than that is an underlying weakening',
            'Inflation only affects expense ratios',
            'Regulators cap rate change at inflation'
          ],
          answer: 1,
          explain: 'Rate adequacy is relative to loss costs. Rate increases below claims inflation still erode margin — a trap in reading “positive rate change” headlines.' }
      ]
    },
    {
      id: 'terms',
      title: 'Terms and conditions: where the real underwriting lives',
      minutes: 9,
      body: `
<p>Price gets the attention, but underwriters often add or destroy more value through <strong>contract design</strong> — the terms that determine which losses are covered at all, and for how much.</p>
<h3>The vertical structure: deductibles and limits</h3>
<ul>
<li><strong>Deductible (or excess/retention)</strong> — the first slice of each loss the insured keeps. It eliminates small attritional claims, aligns incentives, and hugely affects price.</li>
<li><strong>Limit</strong> — the most the insurer pays. Limits may apply per occurrence, per claim, or in the <strong>aggregate</strong> (a cap on all losses in the period combined) — very different exposures for the same headline number.</li>
<li><strong>Sub-limits</strong> — lower caps for particular perils (say, flood) inside a bigger policy.</li>
</ul>
<h3>The trigger: occurrence versus claims-made</h3>
<p>Liability policies differ on <em>what event activates cover</em> — one of the market’s most consequential distinctions:</p>
<ul>
<li><strong>Occurrence</strong> policies cover injuries or damage <em>happening</em> during the policy period, whenever the claim is eventually made — possibly decades later (asbestos taught the market this the hard way).</li>
<li><strong>Claims-made</strong> policies cover claims <em>first made against the insured</em> during the period, usually with a retroactive date. The insurer’s exposure ends much sooner, so reserving uncertainty is lower — which is why professional and financial lines are typically claims-made.</li>
</ul>
<h3>Warranties, conditions and exclusions</h3>
<p>A <strong>warranty</strong> in marine and other London wordings is a strict promise by the insured (for example, a vessel will not sail in certain waters); breach can suspend or void cover. <strong>Conditions precedent</strong> make cover contingent on something (surveys completed, sprinklers maintained). <strong>Exclusions</strong> carve out perils — war, cyber, sanctions — and their precise wording is fought over hardest after big events, as the disputes over pandemic business-interruption wordings showed.</p>
<h3>Why wording discipline is a portfolio issue</h3>
<p>One sloppy wording is a claim; a market-wide sloppy wording is a catastrophe. Ambiguity is generally construed against the drafter, and “non-modelled” wording exposure (cover you didn’t realise you were giving) is a recognised source of surprise loss. Hence market initiatives on clause libraries and contract certainty — every term agreed before inception.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A factory policy: £5m limit per occurrence, £250,000 deductible, flood sub-limit £1m. A flood causes £4m of damage. The insurer pays min(£4m − £0.25m, flood sub-limit £1m) = <strong>£1m</strong>. Same year, a fire causes £6.5m of damage: the insurer pays min(£6.5m − £0.25m, £5m) = <strong>£5m</strong>. Two losses, same policy, very different recoveries — all determined by structure, not price.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Coverage design — <strong>trigger, deductible, limit basis, sub-limits, warranties and exclusions</strong> — determines the risk actually transferred. Underwriters who only compete on price have given away their strongest tools.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A policy has a £100,000 deductible and a £2m per-occurrence limit. A covered loss of £2.6m occurs. How much does the insurer pay, in £?',
          answer: 2000000, tol: 5000, unit: '£',
          explain: 'Loss less deductible = £2.5m, but the payment is capped at the £2m limit.' },
        { type: 'num',
          q: 'A policy has a £50,000 deductible per loss and a £500,000 annual aggregate limit. Three covered losses of £150,000, £300,000 and £400,000 occur. What does the insurer pay in total, in £?',
          answer: 500000, tol: 1000, unit: '£',
          explain: 'After deductibles the losses are 100k + 250k + 350k = £700k, but the annual aggregate caps total payments at £500,000.' },
        { type: 'mc',
          q: 'A claim is made in 2032 for gradual harm that occurred during a policy written for 2024. Under which trigger would the 2024 policy respond?',
          options: [
            'Claims-made — the claim was made after expiry',
            'Occurrence — the harm occurred during the 2024 period, regardless of when the claim is made',
            'Neither — claims must be made within the policy period under both forms',
            'Both forms respond identically'
          ],
          answer: 1,
          explain: 'Occurrence policies respond to harm happening in the period, however delayed the claim — the source of decades-long tails. A 2024 claims-made policy would not respond to a claim first made in 2032.' },
        { type: 'mc',
          q: 'Why do insurers care so much about standardised, unambiguous clause wordings?',
          options: [
            'Because ambiguity is generally construed against the insurer, and a market-wide ambiguous wording can create huge unintended exposure across thousands of policies',
            'Because regulators write all policy wordings',
            'Because brokers charge more for bespoke wordings',
            'Because claims teams cannot read long documents'
          ],
          answer: 0,
          explain: 'Wording risk scales across the portfolio. Contract-certainty discipline and tested clause libraries exist to prevent giving cover you did not price.' }
      ]
    },
    {
      id: 'wording-anatomy',
      title: 'Reading a wording: the anatomy of a policy',
      minutes: 9,
      body: `
<p>The terms lesson covered <em>what</em> coverage design does; this one covers <em>where to find it</em>. Every policy wording, however exotic the class, is built from the same components — and once you know the skeleton, a 60-page wording becomes navigable in minutes.</p>
<h3>The skeleton</h3>
<ul>
<li><strong>The operative (insuring) clause</strong> — the promise itself: “the Insurers agree to indemnify the Insured against…”. Everything else qualifies this sentence. Find it first: it defines the trigger (occurrence? claims-made? — the terms lesson) and the basic scope.</li>
<li><strong>The schedule</strong> — the variables: named insured, period, limits, deductibles, premium. The wording is the engine; the schedule is the dashboard settings. In a dispute, specifically negotiated schedule entries generally prevail over standard printed text — the parties’ actual bargain outranks the boilerplate.</li>
<li><strong>Definitions</strong> — capitalised terms with assigned meanings. Never assume a defined term means what it means in English: “Occurrence”, “Event”, “Insured” do exactly what their definitions say, no more. Half of coverage analysis is chasing definitions.</li>
<li><strong>Conditions</strong> — obligations and machinery: notification of claims, premium payment, cooperation, cancellation. Some are <strong>conditions precedent</strong> (to liability or to a claim): non-compliance can defeat the claim; ordinary conditions merely sound in damages. The label matters enormously and drafters fight over it.</li>
<li><strong>Warranties</strong> — strict promises (the terms lesson; softened by the 2015 Act to suspend rather than void cover).</li>
<li><strong>Exclusions</strong> — the carve-outs, read with their causation language (“directly or indirectly” — the proximate-cause lesson in Principles & the Law).</li>
<li><strong>Extensions and endorsements</strong> — bolted-on broadenings and the mid-term change log (the Market Reform Contract lesson).</li>
</ul>
<h3>Standard clauses, manuscript wordings and layers</h3>
<p>Most London wordings assemble <strong>standard market clauses</strong> — model texts maintained by the Lloyd’s Market Association and others, referenced by code on the slip — with bespoke (“manuscript”) drafting for the deal’s particulars. Standard clauses carry decades of interpretation; manuscript text carries none, which is both its power and its danger. And in layered programmes, excess layers commonly incorporate the primary wording by reference — <strong>“follow form”</strong> — so the tower responds consistently; any deliberate difference in an excess layer’s terms is a trap for whoever misses it.</p>
<h3>A reading protocol</h3>
<p>Experienced practitioners read in this order: <strong>schedule → operative clause → definitions of the operative clause’s terms → exclusions → conditions precedent</strong>. That sequence answers “what is promised, to whom, minus what, subject to what homework” — which is the whole contract — before wading through machinery.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A claim arrives on a professional indemnity wording: the insured notified a claim four months after receiving it. The operative clause covers “Claims first made during the Period” — satisfied. But the notification clause requires notice “as soon as practicable” and is labelled a <strong>condition precedent to liability</strong>. Four months, unexplained, likely breaches it — and because it is a condition precedent, the insurer may decline outright rather than merely complain. Same facts under an ordinary condition: the claim survives, less any damages for prejudice. The entire outcome pivots on three words of labelling in the conditions section — which is exactly why you read the skeleton, not just the story.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Every wording = <strong>operative clause + schedule + definitions + conditions (precedent or not) + warranties + exclusions + endorsements</strong>. Read schedule-first, chase the defined terms, respect “condition precedent” labels — and in towers, verify the excess layers truly follow form.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Which part of a policy contains the core promise that everything else qualifies?',
          options: ['The schedule', 'The operative (insuring) clause', 'The conditions', 'The endorsements'],
          answer: 1,
          explain: 'The operative clause is the engine — “Insurers agree to indemnify…”. Trigger, scope and parties flow from it; definitions, conditions and exclusions all modify it.' },
        { type: 'mc',
          q: 'Why does the “condition precedent” label matter so much?',
          options: [
            'It is purely decorative',
            'Breach of a condition precedent can defeat the claim entirely, while breach of an ordinary condition typically only sounds in damages for any prejudice caused',
            'Conditions precedent apply only before inception',
            'It doubles the premium'
          ],
          answer: 1,
          explain: 'The label converts an obligation into a gateway. The worked example’s late notification shows the same facts producing declinature or payment depending on three words.' },
        { type: 'mc',
          q: 'What does a “follow form” excess layer do?',
          options: [
            'Follows the primary insurer’s claims decisions automatically',
            'Incorporates the primary policy’s wording by reference so the tower responds on consistent terms, subject to any stated differences',
            'Copies the premium of the layer below',
            'Renews automatically with the primary'
          ],
          answer: 1,
          explain: 'Follow form keeps a layered tower coherent. The dangerous exceptions are deliberate divergences buried in an excess layer — found only by actually comparing the wordings.' },
        { type: 'mc',
          q: 'In interpretation disputes, why do specifically negotiated schedule entries generally beat standard printed wording?',
          options: [
            'Schedules are signed in ink',
            'Because they evidence the parties’ actual, specific bargain, which courts prefer over boilerplate the parties may never have focused on',
            'Because schedules are filed with regulators',
            'They don’t — printed wording always prevails'
          ],
          answer: 1,
          explain: 'The specially-agreed outranks the standard: interpretation seeks the parties’ real intent, and the deal-specific entries are its best evidence.' }
      ]
    },
    {
      id: 'cycle',
      title: 'The underwriting cycle: hard markets, soft markets',
      minutes: 8,
      body: `
<p>London market pricing is not stable — it breathes. Periods of rising prices and restrictive terms (<strong>hard markets</strong>) alternate with periods of falling prices and generous terms (<strong>soft markets</strong>), in cycles lasting years. No concept better explains the market’s history, and no discipline matters more than managing through it.</p>
<h3>What drives the cycle</h3>
<ol>
<li><strong>Capital flows.</strong> After heavy losses (a major hurricane year, an asbestos-style reserving shock), capital is destroyed or withdrawn; capacity shrinks; survivors can raise prices — the market hardens. High prices then attract fresh capital (new syndicates, catastrophe bonds, opportunistic funds), capacity expands, competition returns, prices fall — the market softens. Repeat.</li>
<li><strong>The delay in seeing results.</strong> Insurance costs are only known years after the product is sold, especially in long-tail classes. In a soft market, underpricing is invisible for years — reserves look fine until they don’t — so competition can push prices below true cost for a long time before pain forces correction.</li>
<li><strong>Behaviour.</strong> Premium targets, market-share ambitions and the difficulty of shrinking a business all pressure underwriters to keep writing as prices fall.</li>
</ol>
<h3>Cycle management</h3>
<p>The stated ideal: write more when margins are fat, less when they are thin, and defend terms even at the cost of volume. It is organisationally hard — shrinking means telling brokers no and cutting income while competitors grow. Lloyd’s itself acts as a cycle brake through business-plan oversight, leaning on syndicates whose plans assume growth in inadequately priced classes. Performance-management crackdowns (such as the market-wide remediation from 2018 onwards) followed periods where soft-market discipline failed.</p>
<h3>Reading the cycle in data</h3>
<p>Cycle position shows up in: cumulative rate indices, terms and conditions drift (rising deductibles and tightening exclusions = hardening), the ease of completing placements (oversubscription = soft; struggling to fill 100% = hard), and reinsurance costs. Different classes run their own cycles — aviation can be hard while cyber softens.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A property catastrophe rate index stands at 100 in year 1. Soft years take it to 78 by year 5. A record hurricane season then removes capacity, and renewals rise 35% in year 6: index 105. An underwriter who kept volume flat through years 2–5 wrote five years of thinning margins; one who cut back 40% in the softest years and doubled up in year 6 wrote less business overall but at far better average adequacy. Same market — very different results, purely from cycle positioning.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>The cycle is driven by <strong>capital in, capital out — with results delayed</strong>. Skilled cycle management (flex volume with margin, defend terms) separates the long-term winners from the passengers.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Which sequence best describes the classic underwriting cycle?',
          options: [
            'Losses → capital exits → prices rise → new capital enters → prices fall → underpricing → losses',
            'Prices rise steadily with inflation forever',
            'Regulation sets prices annually for all classes',
            'Prices are fixed by the lead underwriter for five-year periods'
          ],
          answer: 0,
          explain: 'Capital destruction hardens the market; attractive pricing attracts new capital which softens it again. The loop is the cycle.' },
        { type: 'mc',
          q: 'Why can soft-market underpricing persist for years before being recognised?',
          options: [
            'Because claims are always paid immediately',
            'Because in long-tail classes the true cost of business written today only emerges years later as claims develop',
            'Because brokers hide the prices',
            'Because rate indices are illegal in soft markets'
          ],
          answer: 1,
          explain: 'The production-cost delay is insurance’s defining economic quirk: you sell now, learn the cost later. Optimistic reserving can hide inadequacy until losses force recognition.' },
        { type: 'num',
          q: 'A rate index is at 80. The market hardens and rates rise 25%. Where does the index stand?',
          answer: 100, tol: 0.5, unit: 'index points',
          explain: '80 × 1.25 = 100 — note a 25% rise only just restores adequacy after a 20% fall from 100 to 80. Percentage falls need bigger percentage rises to recover.' },
        { type: 'mc',
          q: 'Which observation most suggests a hardening market?',
          options: [
            'Placements routinely oversubscribed at 150% with lines heavily signed down',
            'Brokers struggling to complete 100% of placements, deductibles rising and exclusions tightening',
            'Falling reinsurance costs',
            'Insurers competing by broadening cover for the same premium'
          ],
          answer: 1,
          explain: 'Scarce capacity and tightening terms are the signature of a hard market; easy oversubscription and broadening cover signal softness.' }
      ]
    }
  ]
});
