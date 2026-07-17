/* Module 7 — Claims & Reserving */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'claims',
  icon: '📋',
  title: 'Claims & Reserving',
  tagline: 'Paying the promises — and estimating the ones still coming',
  blurb: 'The London market claims process, case reserves and incurred-but-not-reported, development triangles, the chain ladder, and why reserving is the market’s biggest single judgement.',
  badge: { icon: '📋', name: 'Reserve Master', desc: 'Master the “Claims & Reserving” module.' },
  lessons: [
    {
      id: 'claims-process',
      title: 'How a London market claim actually gets paid',
      minutes: 8,
      body: `
<p>Claims are the product. Everything else — premium, capital, reinsurance — exists so that when the refinery burns, money moves. In a subscription market, paying a claim has its own choreography.</p>
<h3>Notification and the broker’s role</h3>
<p>The insured notifies its broker, who advises all subscribing carriers and manages the claim file on the market’s electronic claims systems — the historic Electronic Claims File and its successors under the market’s digital programme. The broker remains the insured’s advocate throughout, marshalling information between insured, insurers, and experts.</p>
<h3>Lead and follow — again</h3>
<p>Just as placement has a slip leader, claims have <strong>claims agreement parties</strong>. Under the market’s claims agreement arrangements, smaller and non-complex claims are typically agreed by the <strong>lead insurer alone</strong> on behalf of the whole subscription (dramatically speeding settlement), while larger or complex claims involve the lead plus a second agreement party, with all carriers bound by the agreed decision. Each carrier then pays its signed-line share through central settlement.</p>
<h3>The experts</h3>
<p>London claims lean on a professional ecosystem: <strong>loss adjusters</strong> (independent investigators quantifying property/energy losses), <strong>average adjusters</strong> (marine specialists), lawyers (coverage disputes, liability defence), surveyors and forensic accountants (business-interruption quantification). On delegated business, coverholders or third-party administrators may settle small claims under delegated claims authority, reported via claims bordereaux.</p>
<h3>Reserving a claim: the case reserve</h3>
<p>The moment a claim is notified, each carrier books a <strong>case reserve</strong> — the claims professional’s estimate of what this claim will ultimately cost. Case reserves move as facts emerge: a liability claim may open at £100,000 and close years later at £2m, or at nil. <strong>Paid + outstanding case reserves = incurred to date</strong> for that claim.</p>
<h3>What good claims handling is worth</h3>
<p>Fast, fair settlement is a commercial weapon (it is much of what the insured actually buys), and disciplined reserving is an information weapon: accurate early case reserves feed every downstream process — actuarial reserving, pricing feedback, reinsurance recoveries and capital. The worst claims sin is the slow drip of adverse development: reserves inching up year after year, poisoning trust in the whole balance sheet.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>An energy platform suffers storm damage. The broker notifies the 12-carrier subscription; the lead appoints a loss adjuster. Initial estimate: US$40m; each carrier books a case reserve at its signed line (a 7% follower books US$2.8m). The adjuster’s final quantification lands at US$34m; the lead and second agreement party agree it; carriers’ shares settle centrally. The 7% follower ends with US$2.38m paid, releasing US$0.42m of reserve — and its reinsurance team checks whether the loss pierces its per-risk excess of loss attachment.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Subscription claims are agreed once, by <strong>designated agreement parties</strong>, and paid by everyone at their signed line. The case reserve — each claim’s live estimate — is the atom from which the whole reserving edifice is built.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Under London market claims agreement arrangements, who typically agrees a small, non-complex claim on a subscription placement?',
          options: [
            'Every carrier individually',
            'The lead insurer, binding the whole following market',
            'The policyholder’s lawyer',
            'Lloyd’s Corporation'
          ],
          answer: 1,
          explain: 'Delegating routine claims to the lead is what keeps a 15-carrier subscription workable — followers are bound by the lead’s agreement and simply pay their shares.' },
        { type: 'num',
          q: 'A carrier has a 9% signed line on a risk. The agreed claim is US$26m. What does the carrier pay, in US$ millions?',
          answer: 2.34, tol: 0.01, unit: 'US$ millions',
          explain: '9% × 26 = US$2.34m — several liability at the signed line, settled centrally.' },
        { type: 'num',
          q: 'A claim has US$1.4m paid to date and a US$2.1m outstanding case reserve. What is its incurred value, in US$ millions?',
          answer: 3.5, tol: 0.01, unit: 'US$ millions',
          explain: 'Incurred = paid + outstanding case reserve = 3.5. “Incurred” in claims data almost always means this sum.' },
        { type: 'mc',
          q: 'What is a loss adjuster?',
          options: [
            'An insurer’s employee who sets premium rates',
            'An independent expert appointed to investigate and quantify a loss',
            'The broker’s claims accountant',
            'A regulator overseeing claims payments'
          ],
          answer: 1,
          explain: 'Loss adjusters independently establish cause, coverage relevance and quantum — the factual backbone of property and energy claims.' }
      ]
    },
    {
      id: 'ibnr',
      title: 'The iceberg: incurred but not reported',
      minutes: 8,
      body: `
<p>Case reserves cover the claims you know about. The reserving problem is the claims you don’t — yet.</p>
<h3>Why known claims aren’t enough</h3>
<p>At any balance-sheet date, the ultimate cost of the business already written includes:</p>
<ul>
<li><strong>Paid claims</strong> — done and dusted.</li>
<li><strong>Outstanding case reserves</strong> — known claims, estimated case by case.</li>
<li><strong>Incurred but not reported</strong> — losses that have <em>already happened</em> but haven’t reached the insurer: the injury not yet litigated, the storm claims still being tallied, the professional error not yet discovered. Actuaries book a bulk reserve for these, universally abbreviated <strong>IBNR</strong> (incurred but not reported).</li>
<li>Strictly, IBNR as booked usually also includes <strong>incurred but not enough reported</strong> — expected future development on known claims whose case reserves will prove light (sometimes separately labelled IBNER).</li>
</ul>
<p><strong>Ultimate claims = paid + case reserves + IBNR.</strong> The first is fact, the second is judgement claim by claim, the third is statistics — estimated at portfolio level from development patterns (next lesson).</p>
<h3>Tail length drives everything</h3>
<p>How much of the iceberg is under water depends on the class. Property claims report fast: within a year or two, most of the ultimate is visible. Casualty and professional liability report slowly: a year after the policies expire, half or more of the ultimate cost may still be unreported — IBNR dwarfs case reserves. This is why long-tail reserving is the market’s biggest single judgement, and why its failures (1990s asbestos, the 1997–2001 US casualty soft market) are the market’s biggest disasters.</p>
<h3>Reserving language you will hear</h3>
<ul>
<li><strong>Best estimate</strong> — the probability-weighted mean of outcomes, no deliberate prudence.</li>
<li><strong>Margin (or management loading)</strong> — an explicit buffer some carriers hold above best estimate.</li>
<li><strong>Reserve releases / strengthening</strong> — prior-year estimates revised down (profit) or up (loss) as experience emerges. Persistent one-directional revisions reveal systematic bias.</li>
<li><strong>Accident year vs underwriting year</strong> — grouping claims by when the loss occurred versus by the year of account of the policy. London market reserving traditionally works on underwriting year; much external reporting uses accident year.</li>
</ul>
<div class="diagram">
<div class="d-title">Ultimate claims = paid + case reserves + IBNR</div>
<div class="bar-split">
<span class="s-paid" style="flex:8">Paid £8m</span>
<span class="s-case" style="flex:22">Case £22m</span>
<span class="s-ibnr" style="flex:45">IBNR £45m</span>
</div>
<div class="d-caption">A young long-tail year: the visible claims (paid + case = £30m) are less than half the £75m ultimate — the iceberg is mostly under water.</div>
</div>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A casualty account’s 2023 underwriting year, viewed at the end of 2025: paid £8m, case reserves £22m, so incurred £30m. The actuary’s development analysis says accounts like this are typically only 40% reported at this maturity: ultimate ≈ 30 ÷ 0.40 = <strong>£75m</strong>, requiring IBNR of 75 − 30 = <strong>£45m</strong> — one and a half times the visible incurred. Booking only the visible claims would overstate profit by £45m.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p><strong>Ultimate = paid + case + IBNR</strong>, and in long-tail classes IBNR is the biggest and most judgemental piece. Reserve adequacy is the balance sheet’s deepest question — and persistent adverse development its loudest alarm.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A class shows paid claims of £14m, case reserves of £21m and booked IBNR of £30m. What is the booked ultimate, in £ millions?',
          answer: 65, tol: 0.5, unit: '£ millions',
          explain: '14 + 21 + 30 = £65m ultimate claims for the cohort.' },
        { type: 'num',
          q: 'Incurred claims (paid + case) are £24m and the actuary believes the cohort is 30% reported at this maturity. What IBNR is needed, in £ millions?',
          answer: 56, tol: 1, unit: '£ millions',
          explain: 'Ultimate = 24 ÷ 0.30 = £80m; IBNR = 80 − 24 = £56m — the iceberg below the waterline in a young long-tail cohort.' },
        { type: 'mc',
          q: 'Why is IBNR proportionally much larger for casualty than for property business?',
          options: [
            'Casualty premiums are larger',
            'Casualty losses are reported and settled over many years, so at any early valuation most of the ultimate cost is still invisible',
            'Property insurers do not book IBNR',
            'Casualty claims are always exaggerated'
          ],
          answer: 1,
          explain: 'Tail length is the driver: liability claims emerge through discovery, litigation and settlement over years or decades, while property damage is evident within months.' },
        { type: 'mc',
          q: 'A carrier has strengthened its prior-year casualty reserves in each of the last five years. What does this pattern most suggest?',
          options: [
            'Excellent conservative reserving',
            'Systematic initial under-estimation of ultimates — a bias that questions the whole reserving basis',
            'Falling claims inflation',
            'Nothing — reserves must move every year'
          ],
          answer: 1,
          explain: 'Random estimation error goes both ways. Persistent one-way strengthening is the classic signature of optimism embedded in the reserving process — the pattern behind most historic market crises.' }
      ]
    },
    {
      id: 'triangles',
      title: 'Development triangles and the chain ladder',
      minutes: 9,
      body: `
<p>How do actuaries actually estimate IBNR? The workhorse tool for a century has been the <strong>development triangle</strong> and the <strong>chain ladder</strong> method built on it.</p>
<h3>The triangle</h3>
<p>Arrange claims data with one row per origin cohort (accident year or underwriting year) and one column per age (“development period”). Each cell holds cumulative claims for that cohort at that age. Older years fill more columns; the newest year has only one cell — hence the triangle shape. The empty lower-right is precisely what reserving must estimate.</p>
<div class="table-scroll"><table>
<tr><th>Underwriting year</th><th>12 months</th><th>24 months</th><th>36 months</th><th>48 months</th></tr>
<tr><td>2022</td><td>20.0</td><td>30.0</td><td>36.0</td><td>39.6</td></tr>
<tr><td>2023</td><td>22.0</td><td>33.0</td><td>39.6</td><td>?</td></tr>
<tr><td>2024</td><td>25.0</td><td>37.5</td><td>?</td><td>?</td></tr>
<tr><td>2025</td><td>30.0</td><td>?</td><td>?</td><td>?</td></tr>
</table></div>
<h3>The chain ladder in four steps</h3>
<ol>
<li><strong>Compute link ratios</strong> — how much cumulative claims grow between ages, averaged across cohorts. Above: 12→24 months, every year grows by factor 1.50; 24→36 by 1.20; 36→48 by 1.10.</li>
<li><strong>Assume the past pattern holds</strong> — the young years will develop like the old ones did.</li>
<li><strong>Project the empty cells</strong> — multiply each cohort’s latest cumulative figure by the remaining link ratios. 2025: 30.0 × 1.50 × 1.20 × 1.10 = <strong>59.4</strong>.</li>
<li><strong>IBNR = projected ultimate − incurred to date</strong>. For 2025: 59.4 − 30.0 = 29.4. (If development continues beyond the triangle’s oldest age, a <strong>tail factor</strong> extends the pattern.)</li>
</ol>
<h3>Where the chain ladder breaks</h3>
<p>Its one big assumption — the future develops like the past — fails exactly when it matters most: after changes in claims handling (case reserving strength changes distort patterns), in portfolio mix, in inflation or litigation environments, or for young long-tail years where the latest figure is tiny and multiplying it is unstable (the problem the Bornhuetter–Ferguson method fixes — next lesson). Chain ladder on paid data versus incurred data gives different answers; comparing them is itself diagnostic.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>Using the triangle above: 2024’s incurred at 24 months is 37.5. Remaining development: ×1.20 (24→36) then ×1.10 (36→48): ultimate = 37.5 × 1.32 = <strong>49.5</strong>. IBNR for 2024 = 49.5 − 37.5 = <strong>12.0</strong>. Notice the leverage: if the true 24→36 factor were 1.30 instead of 1.20, the ultimate becomes 53.6 — a 4.1 swing from one assumption. Reserving reviews argue precisely over these factors.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>The chain ladder is disciplined extrapolation: <strong>measure how cohorts developed, assume the pattern persists, project, and the gap to today is IBNR</strong>. Know its assumption — stability of the pattern — and you know exactly when to distrust it.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A cohort’s cumulative claims are £40m at 24 months. Link ratios ahead of it are 1.25 (24→36) and 1.08 (36→48), with no further development. What is the projected ultimate, in £ millions?',
          answer: 54, tol: 0.2, unit: '£ millions',
          explain: '40 × 1.25 × 1.08 = £54m.' },
        { type: 'num',
          q: 'For that same cohort (incurred £40m, ultimate £54m), what IBNR should be booked, in £ millions?',
          answer: 14, tol: 0.2, unit: '£ millions',
          explain: 'IBNR = ultimate − incurred to date = 54 − 40 = £14m.' },
        { type: 'num',
          q: 'Across past cohorts, cumulative claims at 24 months averaged 1.6 times their value at 12 months. A new cohort stands at £15m at 12 months. What does the chain ladder predict at 24 months, in £ millions?',
          answer: 24, tol: 0.2, unit: '£ millions',
          explain: '15 × 1.6 = £24m — link ratios are just averaged historical growth factors applied forward.' },
        { type: 'mc',
          q: 'The claims department strengthened its case-reserving philosophy two years ago, setting initial reserves much higher than before. What does this do to a chain ladder on incurred data?',
          options: [
            'Nothing — the chain ladder is immune to process changes',
            'Historic link ratios (built on weaker case reserves) overstate future development of recent, stronger-reserved years, over-projecting ultimates',
            'It makes paid data unusable',
            'It reduces IBNR to zero automatically'
          ],
          answer: 1,
          explain: 'The chain ladder assumes a stable pattern. Stronger early case reserves mean recent cohorts need less future development than history suggests — applying old factors overshoots. Detecting such distortions is core actuarial craft.' }
      ]
    },
    {
      id: 'bf-method',
      title: 'Bornhuetter–Ferguson and the reserving toolkit',
      minutes: 8,
      body: `
<p>The chain ladder fails youngest where the money is biggest: a long-tail year at 12 months has reported almost nothing, and multiplying almost-nothing by a large factor produces noise. The <strong>Bornhuetter–Ferguson method</strong> — the market’s other staple — fixes this by blending in an independent prior expectation.</p>
<h3>The idea</h3>
<p>Instead of scaling up reported claims, start from what you <em>expected</em> the year to cost (from pricing: premium × expected loss ratio), and add only the <em>unreported portion</em> of that expectation to actual claims to date:</p>
<p style="text-align:center"><strong>Ultimate = incurred to date + expected ultimate × (1 − % reported)</strong></p>
<p>The “% reported” at each age comes from the same development patterns as the chain ladder. The effect: for a young year, the estimate leans on the prior expectation (stable, ignores noisy early claims); as the year matures and % reported rises, actual experience progressively takes over. It converges to the chain ladder as data completes.</p>
<h3>Choosing the prior</h3>
<p>The method is only as honest as its expected loss ratio. Using the business plan’s (optimistic) loss ratio as the prior quietly bakes optimism into reserves — the classic soft-market failure. Good practice sets priors from pricing analysis adjusted for rate change and claims inflation, and challenges them annually.</p>
<h3>The wider toolkit</h3>
<ul>
<li><strong>Expected loss ratio method</strong> — pure prior, ignore claims entirely: for a year too young for any credible data.</li>
<li><strong>Frequency–severity methods</strong> — model claim counts and average sizes separately: good where counts stabilise early.</li>
<li><strong>Large-loss separation</strong> — reserve big claims individually, model the attritional remainder statistically: standard for London portfolios where one claim can dwarf a year.</li>
<li><strong>Actuary’s judgement</strong> — no method is applied blind; selections weigh several methods, diagnostics and qualitative intelligence from claims and underwriting teams. Reserving committees, independent reviews and (at Lloyd’s) the signing actuary’s opinion formalise the challenge.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A 2025 casualty year: premium £100m, prior expected loss ratio 65% → expected ultimate £65m. At 12 months only £6m is incurred, and the pattern says such years are 15% reported. <br><strong>Chain ladder:</strong> 6 ÷ 0.15 = £40m — implausibly rosy, hostage to early noise. <br><strong>Bornhuetter–Ferguson:</strong> 6 + 65 × (1 − 0.15) = 6 + 55.25 = <strong>£61.25m</strong> — the sensible early-life estimate. If by 36 months incurred is £45m and 70% reported, Bornhuetter–Ferguson gives 45 + 65 × 0.30 = £64.5m while the chain ladder gives 45 ÷ 0.70 = £64.3m: the methods converge as data arrives.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Bornhuetter–Ferguson = <strong>actual claims so far + the unreported share of an independent expectation</strong>. It stabilises young long-tail years — provided the prior loss ratio is honest. Reserving is method-plus-judgement, never method alone.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Premium £80m, prior expected loss ratio 70%, incurred to date £10m, 20% reported. What is the Bornhuetter–Ferguson ultimate, in £ millions?',
          answer: 54.8, tol: 0.3, unit: '£ millions',
          explain: 'Expected ultimate = 56; unreported share = 56 × 0.8 = 44.8; ultimate = 10 + 44.8 = £54.8m.' },
        { type: 'num',
          q: 'Same year: what IBNR does Bornhuetter–Ferguson imply, in £ millions?',
          answer: 44.8, tol: 0.3, unit: '£ millions',
          explain: 'IBNR = ultimate − incurred = 54.8 − 10 = £44.8m — equal to the unreported share of the expectation, which is the method’s signature.' },
        { type: 'mc',
          q: 'Why is the chain ladder unreliable for a long-tail year at 12 months of development?',
          options: [
            'Because triangles cannot hold recent years',
            'Because scaling a small, noisy reported amount by a large factor magnifies randomness into the ultimate',
            'Because link ratios are illegal for young years',
            'Because premium is unknown at 12 months'
          ],
          answer: 1,
          explain: 'With 10–20% reported, one early large claim (or its absence) swings the projection wildly. Bornhuetter–Ferguson damps this by anchoring to a prior expectation.' },
        { type: 'mc',
          q: 'What is the classic failure mode of the Bornhuetter–Ferguson method in a softening market?',
          options: [
            'It converges too quickly to the chain ladder',
            'Using optimistic plan loss ratios as priors, so reserves for recent years are set too low until deterioration eventually forces recognition',
            'It cannot handle large claims',
            'It requires no assumptions at all'
          ],
          answer: 1,
          explain: 'The prior is a lever for optimism. Soft-market years priced inadequately but reserved to plan loss ratios show profits that later evaporate — the mechanism behind many reserving crises.' }
      ]
    }
  ]
});
