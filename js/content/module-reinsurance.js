/* Module 5 — Outwards Reinsurance */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'reinsurance',
  icon: '🛡️',
  title: 'Outwards Reinsurance',
  tagline: 'Insurance for insurers: protecting the book you wrote',
  blurb: 'Quota share, surplus, excess of loss, stop loss — how insurers buy their own protection, structure programmes, and account for recoveries and reinsurer credit risk.',
  badge: { icon: '🛡️', name: 'Programme Architect', desc: 'Master the “Outwards Reinsurance” module.' },
  lessons: [
    {
      id: 'why-ri',
      title: 'Why insurers buy reinsurance — and the map of forms',
      minutes: 8,
      body: `
<p><strong>Reinsurance</strong> is insurance bought by an insurer. The insurer buying protection is the <strong>cedant</strong> (it “cedes” risk); “outwards” reinsurance is protection bought, as opposed to “inwards” reinsurance written as a business line. Almost every London market carrier does both.</p>
<h3>Why cede risk you were paid to take?</h3>
<ul>
<li><strong>Capacity</strong> — write £50m lines while only retaining £10m net; compete for big business without betting the company.</li>
<li><strong>Volatility control</strong> — cap the damage any one loss, event or bad year can do to results.</li>
<li><strong>Capital efficiency</strong> — ceding tail risk cuts the one-in-200 requirement; as the Capital module showed, this can raise return on capital even at the cost of margin.</li>
<li><strong>Catastrophe protection</strong> — survive the hurricane, quake or cyber event that hits many policies at once.</li>
<li><strong>Expertise and new classes</strong> — a reinsurer’s support (and pricing insight) when entering unfamiliar lines.</li>
</ul>
<h3>The map: two axes</h3>
<p>Every reinsurance arrangement sits on two axes. First, <em>what is covered</em>:</p>
<ul>
<li><strong>Treaty</strong> — covers a whole portfolio automatically (all cargo policies, the entire property book). One negotiation, blanket protection.</li>
<li><strong>Facultative</strong> — covers one specific risk, individually offered and accepted (the single refinery whose size exceeds normal appetite).</li>
</ul>
<p>Second, <em>how losses are shared</em>:</p>
<ul>
<li><strong>Proportional</strong> — reinsurer takes a defined share of premiums and losses alike (quota share, surplus). The reinsurer is a partner in the original economics, and pays the cedant a <strong>ceding commission</strong> to cover acquisition costs and expenses.</li>
<li><strong>Non-proportional (excess of loss)</strong> — reinsurer pays only when a loss exceeds an attachment point, for its own separately negotiated premium.</li>
</ul>
<h3>The programme</h3>
<p>Real carriers combine these into an annual <strong>outwards programme</strong>: perhaps a quota share on a growing class, surplus on the property account, per-risk excess of loss above the retention, a catastrophe tower above that, and facultative purchases for outsize individual risks. Programme design — what to retain net — is one of the most consequential financial decisions a carrier makes each year.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A syndicate wants to lead big property risks with £40m lines but hold only £8m of any single loss net. It buys a per-risk excess of loss treaty of £32m excess of £8m: for each loss on any one risk, it pays the first £8m and recovers up to £32m above that. A £25m loss costs it £8m net (recovery £17m); the treaty premium is the annual cost of writing “bigger than its balance sheet”.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Classify any reinsurance in two questions: <strong>portfolio or single risk (treaty vs facultative)? shared proportionally or triggered above an attachment (proportional vs excess of loss)?</strong> Everything else is detail on that map.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'An insurer buys protection for one specific power station risk that exceeds its normal line size. This is…',
          options: ['Treaty proportional', 'Facultative reinsurance', 'A stop loss', 'A binding authority'],
          answer: 1,
          explain: 'Cover for a single named risk, individually negotiated, is facultative — the “one-off” end of the treaty/facultative axis.' },
        { type: 'mc',
          q: 'What distinguishes proportional from non-proportional reinsurance?',
          options: [
            'Proportional covers property; non-proportional covers casualty',
            'Proportional shares premiums and losses in a defined ratio; non-proportional pays only above an attachment point for a separate premium',
            'Proportional is compulsory; non-proportional is optional',
            'Only non-proportional involves a ceding commission'
          ],
          answer: 1,
          explain: 'Proportional reinsurers partner in the original economics (with a ceding commission back to the cedant); excess-of-loss reinsurers sell a separately priced layer above a retention.' },
        { type: 'num',
          q: 'A cedant retains £5m and buys per-risk excess of loss of £20m excess of £5m. A single risk suffers a £17m loss. How much does the cedant recover, in £ millions?',
          answer: 12, tol: 0.05, unit: '£ millions',
          explain: 'The layer pays the loss above £5m: 17 − 5 = £12m recovered; the cedant keeps £5m net.' },
        { type: 'mc',
          q: 'Which is NOT a standard reason for buying outwards reinsurance?',
          options: [
            'Increasing gross line size beyond net appetite',
            'Reducing the one-in-200 capital requirement',
            'Smoothing results against catastrophes',
            'Increasing the insurer’s gross expected profit'
          ],
          answer: 3,
          explain: 'Reinsurance costs margin in expectation — reinsurers price to profit. Its value is capacity, stability and capital relief, not higher expected gross profit.' }
      ]
    },
    {
      id: 'proportional',
      title: 'Proportional treaties: quota share and surplus',
      minutes: 9,
      body: `
<p>Proportional reinsurance shares original premium and losses in defined proportions. Two structures dominate.</p>
<h3>Quota share</h3>
<p>The simplest treaty: the reinsurer takes a <strong>fixed percentage of every policy</strong> in the covered class. A 30% quota share means 30% of every premium and 30% of every loss is ceded. In return the reinsurer pays a <strong>ceding commission</strong> (say 25–35% of ceded premium) reimbursing the cedant’s brokerage and expenses — and the negotiation of that commission is where the economics really live. Some treaties add <strong>profit commission</strong> (a share of treaty profit returned to the cedant) or <strong>sliding-scale commission</strong> that rises when the loss ratio is low.</p>
<p>Quota share suits: new or fast-growing classes (capital relief across the whole book), volatile classes needing whole-account support, and situations where the cedant essentially rents the reinsurer’s balance sheet. Its weakness: it cedes the good with the bad — profitable small risks are given away in the same proportion as dangerous large ones, and it does nothing to even out the <em>sizes</em> of retained risks.</p>
<h3>Surplus treaty</h3>
<p>The surplus fixes that weakness by making the ceded share <strong>vary per risk</strong>. The cedant sets a retention per risk, called a <strong>line</strong> (say £2m). The treaty provides capacity in multiples of that line (a “10-line surplus” = up to £20m of cover). For each risk, the cedant retains up to its line and cedes the surplus above it — so the ceded <em>percentage</em> differs risk by risk:</p>
<ul>
<li>£1.5m risk: below the line — fully retained, nothing ceded.</li>
<li>£8m risk with £2m line: cede £6m = 75%; premiums and losses on that risk split 25/75.</li>
</ul>
<p>The result: small risks stay net (keeping their profit), large risks are heavily ceded, and the retained portfolio becomes homogeneous in size — classic portfolio grooming for property books.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p><strong>Quota share:</strong> a cedant writes £40m of premium in a class with a 30% quota share, 30% ceding commission. Ceded premium = £12m; commission received back = £3.6m. In a year with £24m of gross losses, the reinsurer bears 30% = £7.2m. Net result impact: cedant keeps 70% of everything, plus the commission cushion.</p>
<p><strong>Surplus:</strong> retention (line) £2m, 5-line surplus (£10m capacity). A £6m insured value risk with £60,000 premium: retained 2/6 = 33.3%, ceded 66.7%. A £900,000 loss on that risk splits £300,000 net / £600,000 recovered — same fractions as the premium split. A £1.8m risk in the same book cedes nothing at all.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Quota share = <strong>same percentage of everything</strong>, priced through the ceding commission. Surplus = <strong>percentage varies per risk around a fixed retention line</strong>, keeping small risks net and taming large ones. Both share losses in the same ratio as premiums, risk by risk.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Under a 25% quota share with 28% ceding commission, the cedant writes £60m of premium. How much ceding commission does it receive, in £ millions?',
          answer: 4.2, tol: 0.05, unit: '£ millions',
          explain: 'Ceded premium = 25% × 60 = £15m; commission = 28% × 15 = £4.2m back to the cedant.' },
        { type: 'num',
          q: 'A surplus treaty has a retention line of £3m. A risk has an insured value of £12m. What percentage of that risk’s losses does the cedant retain, in %?',
          answer: 25, tol: 0.2, unit: '%',
          explain: 'Retained = 3 ÷ 12 = 25%; the other 75% (£9m) is ceded to the surplus. Premium and losses on this risk split 25/75.' },
        { type: 'num',
          q: 'Same treaty (retention line £3m). The £12m risk suffers a £2m partial loss. How much does the cedant pay net, in £ millions?',
          answer: 0.5, tol: 0.01, unit: '£ millions',
          explain: 'Proportional means every loss is shared in the risk’s ratio: 25% × £2m = £0.5m net, £1.5m recovered — even though the loss is below the £3m line. The line sets the ratio, not a threshold per loss.' },
        { type: 'mc',
          q: 'Why might a cedant prefer surplus over quota share for a property book of very mixed risk sizes?',
          options: [
            'Surplus premiums are tax-free',
            'Surplus lets it keep small profitable risks fully net while heavily ceding only the large risks, homogenising the retained book',
            'Quota share requires Lloyd’s approval and surplus does not',
            'Surplus treaties never have losses'
          ],
          answer: 1,
          explain: 'The per-risk variable cession is the surplus treaty’s whole purpose: retention stays constant in money terms, so the ceded share rises with risk size.' },
        { type: 'mc',
          q: 'On which single number does most of the profitability negotiation of a quota share turn?',
          options: ['The attachment point', 'The ceding commission', 'The reinstatement premium', 'The rate on line'],
          answer: 1,
          explain: 'Since premium and losses are shared mechanically, the ceding commission (plus any profit/sliding features) determines who wins economically at a given loss ratio.' }
      ]
    },
    {
      id: 'xol',
      title: 'Excess of loss: layers, towers and reinstatements',
      minutes: 9,
      body: `
<p>Non-proportional reinsurance — <strong>excess of loss</strong> — pays only when a loss pierces an attachment point. It is the workhorse of London market protection, and its notation is universal: <strong>“£15m xs £5m”</strong> means a layer paying up to £15m of each qualifying loss above a £5m attachment.</p>
<h3>The three main flavours</h3>
<ul>
<li><strong>Risk excess of loss (per risk)</strong> — applies loss by loss, risk by risk: protects the retention against any single large individual loss (one factory fire).</li>
<li><strong>Catastrophe excess of loss (per event)</strong> — aggregates all losses from <em>one event</em> across the whole portfolio: the hurricane that damages 4,000 insured properties at once. An <strong>hours clause</strong> defines how long one “event” can last (for example 72 consecutive hours for windstorm), which matters enormously for sprawling disasters.</li>
<li><strong>Aggregate excess of loss / stop loss</strong> — triggers on <em>accumulated</em> losses over a period (next lesson).</li>
</ul>
<h3>Towers and co-reinsurance</h3>
<p>Protection is bought in stacked <strong>layers</strong> forming a tower — e.g. £10m xs £10m, £30m xs £20m, £50m xs £50m — because different layers attract different reinsurers and prices (lower layers = higher rate on line, as you saw in Pricing). Cedants often retain a <strong>co-participation</strong> (say 5–10%) of each layer, keeping skin in the game.</p>
<h3>Reinstatements</h3>
<p>A layer’s limit can be exhausted by one event. <strong>Reinstatements</strong> restore it — typically a stated number of times, at a stated additional premium (recall the Premium module: pro rata to limit consumed). A catastrophe layer with “2 reinstatements at 100%” gives, in effect, three limits across the year, with the second and third paid for as used. When reinstatements run out, the cedant is bare for the rest of the period — a real risk in multi-event years like 2017’s triple hurricanes.</p>
<h3>Net retained loss</h3>
<p>The point of the whole structure is to control the <strong>net loss</strong>: what remains with the cedant after all recoveries. Computing net positions across a tower — including co-participations and reinstatement premiums payable — is a daily task in exposure, claims and finance teams.</p>
<div class="diagram">
<div class="d-title">A catastrophe tower — losses fill it from the bottom</div>
<div class="tower">
<div class="tlayer">Layer 2 — £25m xs £25m<small>remote, low rate on line</small></div>
<div class="tlayer">Layer 1 — £15m xs £10m<small>working layer, higher rate on line</small></div>
<div class="tlayer retention">Retention — first £10m<small>the cedant’s own money, every event</small></div>
</div>
<div class="d-caption">A £42m event: retention absorbed first, Layer 1 fully consumed, Layer 2 pierced by £17m — recoveries net of any co-participation.</div>
</div>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A cedant retains £10m per event and buys a tower: Layer 1 £15m xs £10m, Layer 2 £25m xs £25m, each with 10% co-participation retained. A hurricane causes £42m of gross loss. Layer 1 pays 90% × £15m = £13.5m; Layer 2 is pierced by 42 − 25 = £17m, paying 90% × £17m = £15.3m. Total recoveries £28.8m; net loss = 42 − 28.8 = <strong>£13.2m</strong> (the £10m retention plus 10% of each layer’s contribution), before reinstatement premiums due.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Read “A xs B” as <strong>pay up to A of each qualifying loss above B</strong>. Know what triggers it (risk, event, aggregate), how many reinstatements remain, and any co-participation — then you can compute the number that matters: the net loss.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A cedant has a per-event catastrophe layer of £20m xs £30m (no co-participation). An event causes £44m of gross loss. What is the recovery, in £ millions?',
          answer: 14, tol: 0.05, unit: '£ millions',
          explain: 'Loss above the £30m attachment = £14m, within the £20m limit — recovery £14m; net loss £30m.' },
        { type: 'num',
          q: 'Same layer (£20m xs £30m), but the cedant retains a 10% co-participation. Gross event loss is £60m. What is the net loss to the cedant, in £ millions?',
          answer: 42, tol: 0.1, unit: '£ millions',
          explain: 'Layer is fully consumed: pays 90% × £20m = £18m. Net = 60 − 18 = £42m (the £30m attachment, plus £2m co-participation, plus £10m above the tower’s top).' },
        { type: 'mc',
          q: 'What does an hours clause in a catastrophe treaty do?',
          options: [
            'Sets the office hours during which claims may be notified',
            'Defines the maximum duration of losses that count as a single event for recovery purposes',
            'Limits the reinsurer’s payment to losses in the first hour',
            'Sets the deadline for paying reinstatement premium'
          ],
          answer: 1,
          explain: 'The hours clause (say 72 hours for windstorm, 168 for some perils) determines whether a long-running disaster is one event or several — hugely affecting recoveries against per-event attachments and limits.' },
        { type: 'num',
          q: 'A £10m catastrophe layer carries £2m premium and one reinstatement at 100%, pro rata to amount. An event consumes the full £10m limit. What reinstatement premium is due to restore it, in £ millions?',
          answer: 2, tol: 0.02, unit: '£ millions',
          explain: 'Full limit consumed → full reinstatement premium: (10 ÷ 10) × £2m = £2m. The cedant’s true net cost of the event includes this.' },
        { type: 'mc',
          q: 'Why do cedants buy catastrophe protection in multiple stacked layers rather than one big layer?',
          options: [
            'Regulation prohibits layers larger than £25m',
            'Different layers appeal to different reinsurers and price differently; stacking completes the tower at better overall cost and spreads counterparty risk',
            'Claims are easier to calculate with more layers',
            'Brokers charge less for more layers'
          ],
          answer: 1,
          explain: 'Layering matches remote-risk appetite to remote layers and working-layer appetite to lower ones, optimising price and diversifying reinsurer credit exposure.' }
      ]
    },
    {
      id: 'programme',
      title: 'Stop loss, aggregates and designing the programme',
      minutes: 8,
      body: `
<p>Per-risk and per-event covers leave one exposure untouched: <em>death by a thousand cuts</em> — a year where nothing huge happens but everything goes mildly wrong at once. Aggregate covers address the year as a whole.</p>
<h3>Stop loss and aggregate excess of loss</h3>
<p>A <strong>stop loss</strong> protects the year’s overall result: it pays when the cedant’s annual loss ratio (or aggregate losses) exceeds a threshold — for example, cover for 30 points of loss ratio excess of a 105% loss ratio. An <strong>aggregate excess of loss</strong> is similar in money terms: pays when accumulated qualifying losses in the period exceed an aggregate attachment (often with per-event deductibles and caps). These covers are expensive and carefully worded — reinsurers are wary of insuring an underwriter’s overall discipline — but they are powerful capital tools because they directly truncate the bad tail of the year’s distribution.</p>
<h3>Designing the whole programme</h3>
<p>A real outwards programme is designed each year, typically led by a dedicated outwards/ceded reinsurance team with actuarial modelling. The levers:</p>
<ul>
<li><strong>Retention</strong> — the net appetite per risk and per event. Too low: you give reinsurers your profit. Too high: one bad event breaks the year and the capital requirement balloons.</li>
<li><strong>Vertical exhaustion</strong> — how high the tower goes: usually calibrated to the modelled one-in-200 (or further) event, and to Lloyd’s catastrophe oversight expectations.</li>
<li><strong>Horizontal cover</strong> — reinstatements and aggregate protections for multi-event years.</li>
<li><strong>Proportional vs non-proportional mix</strong> — quota share for wholesale capital relief and growth support; excess of loss for shape.</li>
<li><strong>Cost vs benefit</strong> — modelled as: ceded premium versus expected recoveries, volatility reduction, and capital released (return-on-capital lens from the Capital module).</li>
</ul>
<h3>Alternative capital</h3>
<p>Reinsurance capacity increasingly comes from capital markets as well as traditional reinsurers: <strong>catastrophe bonds</strong> (investors’ principal is at risk if a defined event occurs) and <strong>collateralised reinsurance</strong> (funds posting full collateral). These widen the market and, for buyers, add counterparties whose obligations are pre-funded.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A syndicate’s plan: £200m of premium, expected loss ratio 60%. It fears an attritional pile-up plus mid-sized cats. It buys an aggregate excess of loss: £30m of cover excess of £150m of aggregate losses (i.e. attaching at a 75% loss ratio). The year delivers £172m of qualifying losses (86%): the cover pays 172 − 150 = <strong>£22m</strong>, pulling the net loss ratio back to 75% — exactly the truncation it was designed for.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Per-risk covers tame single losses; per-event covers tame catastrophes; <strong>aggregate covers tame the whole year</strong>. Programme design is the annual optimisation of retention, tower height, reinstatements and cost against volatility and capital relief.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'An aggregate excess of loss provides £25m of cover excess of £120m of aggregate annual losses. The year produces £158m of qualifying losses. What does the cover pay, in £ millions?',
          answer: 25, tol: 0.1, unit: '£ millions',
          explain: 'Losses exceed the attachment by £38m, but payment is capped at the £25m aggregate limit. Net losses: £133m.' },
        { type: 'mc',
          q: 'Which exposure is a stop loss designed to address that per-risk and per-event covers miss?',
          options: [
            'A single enormous factory fire',
            'One hurricane hitting thousands of policies',
            'An accumulation of many modest losses producing a terrible overall year',
            'Reinsurer default'
          ],
          answer: 2,
          explain: 'Frequency years — no single trigger, but the aggregate result is awful. Only aggregate-basis covers respond.' },
        { type: 'mc',
          q: 'What makes collateralised reinsurance and catastrophe bonds attractive from a credit-risk standpoint?',
          options: [
            'They are always cheaper than traditional reinsurance',
            'The obligation is pre-funded — collateral or bond principal is already held — reducing reliance on the counterparty’s future solvency',
            'They never dispute claims',
            'They are government-guaranteed'
          ],
          answer: 1,
          explain: 'Full collateralisation converts a promise to pay into money already set aside — a structural credit advantage, particularly for peak catastrophe exposures.' },
        { type: 'num',
          q: 'A programme cedes £18m of premium and models expected recoveries of £11m, while releasing £40m of capital. If the insurer’s cost of capital is 10%, what is the net modelled annual benefit of the programme, in £ millions? (Expected recoveries − ceded premium + capital released × cost of capital.)',
          answer: -3, tol: 0.2, unit: '£ millions',
          explain: '11 − 18 + (40 × 0.10) = −£3m. On these numbers the programme costs £3m a year in expectation — the price paid for volatility reduction beyond what the capital release compensates. Whether that is worth it is a risk-appetite judgement, not arithmetic.' }
      ]
    },
    {
      id: 'ri-accounting',
      title: 'Recoveries, reinsurance assets and credit risk',
      minutes: 8,
      body: `
<p>Buying the programme is half the job; collecting on it — sometimes decades later — is the other half. This lesson covers what reinsurance looks like in the accounts and where it can go wrong.</p>
<h3>The reinsurance asset</h3>
<p>When a cedant reserves a gross claim, it simultaneously books the expected recovery as an asset: the <strong>reinsurers’ share of technical provisions</strong> (the “reinsurance asset”). Net reserves = gross reserves − reinsurers’ share. For a catastrophe-exposed carrier the reinsurance asset can be enormous — which means a material portion of the balance sheet consists of <em>promises from other companies</em>.</p>
<h3>Credit risk and bad debt</h3>
<p>Those promises can fail three ways:</p>
<ul>
<li><strong>Insolvency</strong> — the reinsurer goes under before paying. Long-tail claims are most exposed: a casualty claim may be collected 15+ years after the treaty was signed.</li>
<li><strong>Dispute</strong> — the reinsurer contests coverage (was it one event or two under the hours clause? was the cedant’s claims handling proper?). Slow-pay is a cousin of no-pay.</li>
<li><strong>Erosion of willingness</strong> — a run-off reinsurer with no franchise to protect negotiates harder.</li>
</ul>
<p>Cedants therefore hold a <strong>bad-debt provision</strong> against reinsurance assets, monitor counterparty concentrations and ratings (security committees approve which reinsurers may be used), and demand <strong>collateral</strong> — letters of credit or funds withheld — from weaker or unrated counterparties. Capital models charge explicitly for reinsurance credit risk, so cheap-but-weak security costs capital as well as sleep.</p>
<h3>Reading net results</h3>
<p>Because recoveries and reinstatement premiums move with losses, big events produce complicated net accounting: gross loss up, recovery asset up, reinstatement premium expense up, future programme cost up. Analysts learn to trace an event through all four. And one subtlety deserves memorising: <strong>a cedant remains fully liable to its policyholders</strong> — reinsurance failing does not reduce the original claim, it just removes the offset.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A cedant books a £50m gross catastrophe loss with £35m of expected recoveries: net £15m plus a £3m reinstatement premium — headline net cost £18m. A year later one reinsurer owing £6m becomes insolvent, with an expected dividend of 40p in the pound. The cedant writes the asset down by £3.6m; the event’s net cost quietly grows to £21.6m. Nothing about the original claim changed — only the quality of the promises offsetting it.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Reinsurance converts insurance risk into <strong>counterparty credit risk</strong>. The recovery is an asset that must be provisioned, collateralised and chased — and the cedant’s liability to the original policyholder never goes away.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Gross reserves are £480m and the reinsurers’ share is £170m. What are net reserves, in £ millions?',
          answer: 310, tol: 1, unit: '£ millions',
          explain: '480 − 170 = £310m net. The £170m is an asset — a claim on reinsurers, not cash.' },
        { type: 'num',
          q: 'A reinsurer owing £12m of recoveries fails; the estimated recovery in insolvency is 35p in the pound. What bad-debt charge does the cedant book, in £ millions?',
          answer: 7.8, tol: 0.1, unit: '£ millions',
          explain: 'Expected shortfall = 65% × £12m = £7.8m written off the reinsurance asset.' },
        { type: 'mc',
          q: 'A cedant’s reinsurer becomes insolvent. What happens to the cedant’s obligation to its original policyholder?',
          options: [
            'It is reduced by the failed recovery',
            'It is unchanged — the cedant remains fully liable for the gross claim',
            'It transfers to the reinsurer’s liquidator',
            'The policyholder claims on the Central Fund'
          ],
          answer: 1,
          explain: 'Reinsurance is a separate contract between cedant and reinsurer. The policyholder’s claim on the cedant is untouched by the reinsurer’s failure.' },
        { type: 'mc',
          q: 'Why is long-tail casualty business especially exposed to reinsurance credit risk?',
          options: [
            'Casualty reinsurers are less regulated',
            'Recoveries may fall due decades after the treaty was written, requiring the reinsurer to still exist and be willing to pay',
            'Casualty claims are always disputed',
            'Casualty treaties have no collateral clauses'
          ],
          answer: 1,
          explain: 'The longer the gap between cession and collection, the more time for counterparty deterioration — a key reason security standards and collateral matter most in long-tail classes.' }
      ]
    }
  ]
});
