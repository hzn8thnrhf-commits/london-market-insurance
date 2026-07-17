/* Module 2 — Premium */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'premium',
  icon: '💷',
  title: 'Premium: From Gross to Net',
  tagline: 'The lifeblood of the market — measured five different ways',
  blurb: 'Written, signed, earned, gross, net: premium wears many hats. This module builds the full waterfall from the client’s cheque to the insurer’s profit line.',
  badge: { icon: '💷', name: 'Premium Pro', desc: 'Master the “Premium” module.' },
  lessons: [
    {
      id: 'waterfall',
      title: 'The premium waterfall: gross, brokerage and net',
      minutes: 8,
      body: `
<p>Ask three people in an insurance company what “the premium” on a contract is and you may get three different numbers — all correct. Premium is measured at several points along a waterfall, and knowing which figure you are looking at is half the job.</p>
<h3>Starting at the top: gross premium</h3>
<p><strong>Gross written premium</strong> is the full price the client agrees to pay for the cover, before anyone takes a slice. It is the headline measure of business volume — the number in business plans and market league tables.</p>
<h3>Deduction one: brokerage and commissions</h3>
<p>The broker’s remuneration — <strong>brokerage</strong> — is deducted from the premium before it reaches the insurer, typically 10–30% in the London market depending on class and role. On delegated business there may be further slices: coverholder commission, and sometimes profit commission if the account performs well. Premium net of these acquisition deductions is often called <strong>net premium</strong> (or “net of acquisition costs”).</p>
<h3>Other deductions along the way</h3>
<ul>
<li><strong>Taxes and levies</strong> — insurance premium taxes owed in the client’s territory are usually collected on top of, or out of, the premium and passed to authorities.</li>
<li><strong>Other acquisition costs</strong> — the insurer’s own costs of winning the business (underwriters’ salaries, surveys, modelling fees) don’t reduce booked premium but do count against it in profitability measures.</li>
</ul>
<h3>One more meaning of “net”</h3>
<p>Beware the market’s most overloaded word. “Net premium” can also mean <strong>net of outwards reinsurance</strong> — gross premium minus what the insurer spends buying its own protection. Reports often distinguish <em>gross written premium</em>, <em>net written premium</em> (after reinsurance spend) and premium <em>net of acquisition costs</em>. When someone says “net”, always ask: net of what?</p>
<div class="diagram">
<div class="d-title">The premium waterfall</div>
<div class="flow-h">
<span class="fnode">💷 Gross written<small>£1,000,000</small></span><span class="farrow">→</span>
<span class="fnode">− Brokerage 20%<small>£200,000 to broker</small></span><span class="farrow">→</span>
<span class="fnode">Net of acquisition<small>£800,000</small></span><span class="farrow">→</span>
<span class="fnode">− Outwards reinsurance<small>£150,000 ceded</small></span><span class="farrow">→</span>
<span class="fnode gold">Net net<small>£650,000 retained</small></span>
</div>
<div class="d-caption">Three legitimate “premiums” from one contract — always ask which point on the waterfall a number refers to.</div>
</div>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A property risk carries gross written premium of <strong>£1,000,000</strong> with brokerage at 20%. The insurer receives £800,000. The insurer separately spends £150,000 of its own money on outwards reinsurance attributable to this contract. So: gross written £1,000,000 → net of brokerage £800,000 → net of brokerage <em>and</em> reinsurance £650,000. Three legitimate “premiums”, one contract — and if a pricing actuary assumed 15% brokerage instead of 20%, the profit estimate would be out by £50,000 on this one risk alone.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Premium figures are only meaningful with a label: <strong>gross or net — and net of what?</strong> Brokerage, coverholder commission, taxes and outwards reinsurance each take their slice at a different point in the waterfall.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Gross written premium is £2,500,000 and brokerage is 17.5%. How much premium reaches the insurer, in £?',
          answer: 2062500, tol: 1000, unit: '£',
          explain: '£2,500,000 × (1 − 0.175) = £2,062,500. Brokerage comes off the top before the insurer sees the money.' },
        { type: 'num',
          q: 'A delegated-authority account has US$8m gross written premium, 20% coverholder commission and 10% brokerage (both applied to gross). What premium is left for the insurer, in US$ millions?',
          answer: 5.6, tol: 0.05, unit: 'US$ millions',
          explain: 'Deductions = 30% of US$8m = US$2.4m, leaving US$5.6m. Stacked distribution costs are why delegated business must run at strong gross loss ratios to be profitable.' },
        { type: 'mc',
          q: '“Net written premium” in a set of accounts most commonly means gross written premium minus…',
          options: [
            'Claims paid',
            'Outwards reinsurance premium ceded',
            'Insurance premium tax',
            'Underwriters’ salaries'
          ],
          answer: 1,
          explain: 'In financial reporting, net written premium is conventionally net of reinsurance ceded. Premium net of brokerage is usually labelled net of acquisition costs — always check which is meant.' },
        { type: 'mc',
          q: 'Why does an error in the assumed brokerage rate directly distort profitability analysis?',
          options: [
            'Brokerage changes the client’s claims behaviour',
            'Brokerage is a fixed percentage of claims',
            'The insurer’s real revenue is premium after brokerage, so misstating brokerage misstates the margin available to pay claims and expenses',
            'Regulators cap profits by reference to brokerage'
          ],
          answer: 2,
          explain: 'The insurer can only pay claims and expenses out of what it actually receives. Overstating that revenue flatters every downstream profitability measure.' }
      ]
    },
    {
      id: 'earning',
      title: 'Written, earned and unearned premium',
      minutes: 8,
      body: `
<p>An insurer that books £12m of premium on 31 December has not <em>earned</em> £12m that year — it has merely promised a year of future cover. The distinction between written and earned premium is the single most important timing concept in insurance accounting.</p>
<h3>The three measures</h3>
<ul>
<li><strong>Written premium</strong> — recognised when the contract is bound: the full contract price, recorded up front.</li>
<li><strong>Earned premium</strong> — the portion of written premium corresponding to cover <em>already provided</em>. It accrues as time (and exposure) passes.</li>
<li><strong>Unearned premium</strong> — the remainder: cover promised but not yet delivered. It sits on the balance sheet as a liability (the unearned premium reserve), because if the policy cancelled today, roughly this amount would be returned.</li>
</ul>
<h3>Earning patterns</h3>
<p>The default assumption is <strong>straight-line earning</strong>: a 12-month policy earns 1/12 of its premium each month. But exposure is not always even. A Gulf of Mexico windstorm policy earns most of its premium during hurricane season; an extended-warranty book earns late in the policy term when failures cluster. Where exposure is materially uneven, actuaries use shaped earning patterns. A special case is delegated-authority business: a 12-month binder allows the coverholder to attach policies all year, each with its own 12-month term — so the binder’s premium can take up to 24 months to earn fully from the binder’s start.</p>
<h3>Why the distinction matters</h3>
<p>Profit must match revenue to the period in which the risk was run: <strong>earned premium is compared with incurred claims</strong>, never written premium. A fast-growing book flatters a written-premium loss ratio (denominator inflated by premium whose risk period is still ahead) — one of the classic traps in monitoring a growing account.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A 12-month policy incepts 1 October 2025 with premium £480,000, earning evenly. At 31 December 2025 three months have run: earned premium is 3/12 × £480,000 = <strong>£120,000</strong>; unearned premium is £360,000. The 2025 accounts show £480,000 written but only £120,000 earned; the remaining £360,000 will be earned in 2026 — matched against any 2026 claims on the policy.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p><strong>Written = promised; earned = delivered; unearned = still owed as cover.</strong> Performance is always judged on earned premium versus incurred claims, and growth distorts any ratio built on written premium.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A 12-month policy with £720,000 premium incepts 1 May and earns evenly. How much premium is earned by 31 December of the same year, in £?',
          answer: 480000, tol: 1000, unit: '£',
          explain: 'May to December is 8 months: 8/12 × £720,000 = £480,000.' },
        { type: 'num',
          q: 'Using the same policy (£720,000, incepting 1 May, even earning), what is the unearned premium reserve at 31 December, in £?',
          answer: 240000, tol: 1000, unit: '£',
          explain: 'The remaining 4 months of cover: 4/12 × £720,000 = £240,000 — held as a liability for cover still to be provided.' },
        { type: 'mc',
          q: 'Why can premium written under a 12-month binding authority take up to 24 months to earn?',
          options: [
            'Coverholders are slow to report premium',
            'Policies can attach throughout the binder year, and each then runs for its own 12-month term',
            'Lloyd’s rules require binder premium to be spread over two years of account',
            'Brokerage on binders is deferred by 12 months'
          ],
          answer: 1,
          explain: 'A policy attaching in month 12 of the binder still provides cover for 12 further months, so exposure under the binder stretches to month 24.' },
        { type: 'mc',
          q: 'A rapidly growing account shows a healthy claims-to-written-premium ratio. Why should you be cautious?',
          options: [
            'Written premium includes reinsurance recoveries',
            'The denominator includes premium for exposure that hasn’t run yet, so the ratio understates true claims experience',
            'Claims on new business are always reported instantly',
            'Growth automatically improves risk quality'
          ],
          answer: 1,
          explain: 'New written premium carries future exposure. Until it earns, comparing claims to written premium flatters the result — earned premium is the honest denominator.' }
      ]
    },
    {
      id: 'estimates',
      title: 'Premium that moves: estimates, adjustments and reinstatements',
      minutes: 9,
      body: `
<p>In much of the London market, the premium on the slip is not a fixed number — it is an <em>estimate</em> that will be trued up as reality unfolds. Understanding adjustable premium is essential for anyone working with premium data, reserving or planning.</p>
<h3>Estimated premium income</h3>
<p>Where the final premium depends on something measured later — a shipping line’s actual cargo volumes, an employer’s actual payroll, a coverholder’s actual policies bound — the contract is priced on <strong>estimated premium income</strong>, an up-front estimate. The insurer initially books this estimate (or a prudent fraction of it) and adjusts as declarations arrive. Whole-account planning versions of the same idea appear in syndicate business plans: planned premium is an estimate that “develops” toward final signed premium over months or years.</p>
<h3>Adjustment premiums</h3>
<p>After the period ends, actuals are declared and an <strong>adjustment premium</strong> settles the difference — additional premium if actual exposure exceeded the estimate, or a return premium if it fell short. Many contracts protect the insurer with a <strong>minimum and deposit premium</strong>: the deposit is paid up front and the adjustment can only ever move upwards from the minimum, never below it.</p>
<h3>Reinstatement premiums</h3>
<p>On excess-of-loss reinsurance, a loss to the layer exhausts some or all of its limit. A <strong>reinstatement</strong> restores the limit for the rest of the period, usually in exchange for a <strong>reinstatement premium</strong> — commonly calculated pro rata to the amount of limit consumed (and sometimes to time remaining). “Two reinstatements at 100%” means the limit can be restored twice, each time for an additional premium proportional to the limit used. Reinstatement premium is unusual: it is premium that <em>arrives because of a loss</em>, so heavy catastrophe years produce premium spikes alongside claims.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A cargo binder is priced on estimated premium income of US$10m with a minimum and deposit of US$8m. Actual declarations total US$11.5m: the client pays an adjustment of US$3.5m on top of the US$8m deposit. Had declarations been only US$7m, the insurer would keep the full US$8m minimum — no return below it.</p>
<p>Separately: a catastrophe layer of US$20m limit carries premium of US$4m with one reinstatement at 100% (pro rata to amount). A loss consumes US$15m of the layer. Reinstatement premium = (15 ÷ 20) × US$4m = <strong>US$3m</strong>, and the layer’s limit is restored for future losses.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>London market premium is a moving picture: estimates that true up, minimums that floor the downside, and reinstatements that generate premium precisely when losses strike. Premium data must always be read with its <strong>development still to come</strong> in mind.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A binder is priced on estimated premium income of £6m with a minimum and deposit premium of £5m. Actual declarations total £4.2m. What total premium does the insurer keep, in £ millions?',
          answer: 5, tol: 0.01, unit: '£ millions',
          explain: 'Declarations fell below the minimum, so the £5m minimum applies — the client gets no return below it.' },
        { type: 'num',
          q: 'An excess-of-loss layer has a US$30m limit and US$6m premium, with one reinstatement at 100% pro rata to amount. A loss uses US$18m of limit. What is the reinstatement premium, in US$ millions?',
          answer: 3.6, tol: 0.02, unit: 'US$ millions',
          explain: '(18 ÷ 30) × US$6m = US$3.6m, paid to restore the consumed limit for the rest of the period.' },
        { type: 'mc',
          q: 'Why do catastrophe-heavy years often show a spike in certain premium lines as well as claims?',
          options: [
            'Insurers backdate rate increases to existing policies',
            'Reinstatement premiums fall due when losses consume excess-of-loss limits',
            'Brokerage is refunded after catastrophes',
            'Regulators levy premium surcharges after disasters'
          ],
          answer: 1,
          explain: 'Reinstatement premium is triggered by losses to a layer — so premium income arrives precisely because claims did.' },
        { type: 'mc',
          q: 'A syndicate’s premium for the 2025 year of account keeps increasing in the accounts through 2026 and 2027 even though no new policies incept. What is the most likely explanation?',
          options: [
            'Fraudulent double-counting of premium',
            'Signed premium developing: declarations, adjustments and late-processed transactions truing up initial estimates',
            'Exchange rates are always favourable',
            'The bureau charges premium interest'
          ],
          answer: 1,
          explain: 'Premium “develops” after inception as estimates are replaced by actual declarations, adjustments arrive and processing catches up — a normal feature of London market data.' }
      ]
    },
    {
      id: 'subscription-maths',
      title: 'Subscription maths: orders, written lines and signing down',
      minutes: 8,
      body: `
<p>This lesson drills the arithmetic every London market analyst needs to do in their head: converting between what an underwriter <em>wrote</em>, what they were <em>signed</em> for, and what premium and claims they actually get.</p>
<h3>The order</h3>
<p>Sometimes the client only wants part of a risk placed in London — say 60% of the whole risk, with the rest insured locally. That instruction is the <strong>order</strong>. Lines are then expressed relative to the order or to the whole, and confusing the two is a classic error. A “10% line on a 60% order” of a £100m risk is 10% × 60% = 6% of the whole risk: £6m of exposure.</p>
<h3>Signing down, precisely</h3>
<p>Recall from the Market module: brokers often collect written lines totalling more than 100% of the order. Unless a line is marked “line to stand” (agreed not to be reduced), every written line scales by the same factor:</p>
<p style="text-align:center"><strong>signed line = written line ÷ total written lines × 100%</strong></p>
<p>Signed lines drive everything financial: premium share, claim share, exposure counted against underwriting limits. Underwriters therefore often write a larger line than they want, anticipating sign-down — which is fine until a placement is undersubscribed and they are signed for everything they wrote.</p>
<h3>From signed line to booked numbers</h3>
<p>Once signed, an insurer’s numbers on a contract follow mechanically:</p>
<ul>
<li>Gross premium booked = contract premium × signed line (× order, if lines are quoted on the whole).</li>
<li>Exposure = contract limit × signed line.</li>
<li>Any claim = claim amount × signed line.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A US$150m energy risk comes to London with a 70% order (US$105m to be placed). Contract premium for the full risk is US$9m, so the London order carries 70% × US$9m = US$6.3m. An underwriter writes a 15% line of the order. Total written lines reach 120% of the order, so their signed line is 15 ÷ 120 = <strong>12.5%</strong> of the order. Their premium is 12.5% × US$6.3m = <strong>US$787,500</strong> before brokerage; their share of a US$40m insured loss is 12.5% × 70% × US$40m = <strong>US$3.5m</strong>.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Work in this order every time: <strong>whole risk → order → written line → signed line → money</strong>. Ambiguity about whether a percentage refers to the whole risk or the order causes real booking errors — always pin it down.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A placement has a 100% order. Written lines total 125%. An underwriter wrote 10%. Contract premium is £5m. What premium is booked to that underwriter (before brokerage), in £?',
          answer: 400000, tol: 1000, unit: '£',
          explain: 'Signed line = 10 ÷ 125 = 8%; 8% × £5m = £400,000.' },
        { type: 'num',
          q: 'A £200m risk has a 50% London order. An underwriter has a 6% signed line on the order. A £30m insured loss occurs. What does the underwriter pay, in £ millions?',
          answer: 0.9, tol: 0.01, unit: '£ millions',
          explain: 'The London order covers 50% of each loss: 50% × £30m = £15m; the underwriter pays 6% of that = £0.9m.' },
        { type: 'mc',
          q: 'An underwriter deliberately writes 20% expecting to be signed down to about 12%. The placement struggles and closes at exactly 100% written. What happens?',
          options: [
            'Their line still signs down to 12%',
            'They are signed at the full 20% they wrote — with the premium and exposure that entails',
            'The broker must cancel the placement',
            'Lloyd’s reduces every line by a standard factor'
          ],
          answer: 1,
          explain: 'Sign-down only happens when written lines exceed 100%. Writing big in anticipation of sign-down carries the risk of being held to the full written line.' },
        { type: 'num',
          q: 'Written lines on a placement total 160% and one follower is signed at 5%. What line did that follower originally write, in %?',
          answer: 8, tol: 0.05, unit: '%',
          explain: 'Reverse the sign-down: written = signed × total ÷ 100 = 5% × 1.6 = 8%.' }
      ]
    },
    {
      id: 'cash',
      title: 'Premium in practice: instalments, trust funds and currency',
      minutes: 7,
      body: `
<p>The final piece of the premium picture is cash: when it actually arrives, where it must be held, and in what currency. These practicalities shape the balance sheet and much of the data you will encounter.</p>
<h3>Payment terms and instalments</h3>
<p>London premium rarely arrives on day one. Slips carry <strong>premium payment terms</strong> — commonly 60 or 90 days from inception — and larger contracts often pay in <strong>instalments</strong> (for example quarterly). Until cash arrives, the insurer carries a broker/insured debtor balance. Persistent late payment is a real credit and liquidity issue, and slips include clauses allowing cancellation if premium is not paid within the agreed period.</p>
<h3>Premium trust funds</h3>
<p>At Lloyd’s, premiums received are not free corporate cash: they must be held in <strong>premium trust funds</strong> — trusts for the benefit of policyholders, out of which claims, expenses and reinsurance premiums are paid. Profit can only be released to capital providers after a year of account closes and its result is declared. Certain territories add their own ring-fenced trust funds (for example for United States business), which is part of what the Lloyd’s licence network manages on behalf of the whole market.</p>
<h3>Currency</h3>
<p>London is a multi-currency market: business is commonly booked in sterling, US dollars, Canadian dollars and euros as principal settlement currencies. A single contract may be insured in one currency, settled in another, and reported in a third. Premium and claims data therefore carry both <strong>original currency</strong> and <strong>settlement currency</strong> amounts, and exchange-rate movements create revaluation effects in results that have nothing to do with underwriting performance. US dollar exposure dominates many London portfolios, so sterling results can swing noticeably with the dollar.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A policy incepts 1 January with US$1.2m premium, payable in four equal quarterly instalments, brokerage 15%. Each instalment delivers US$300,000 × 0.85 = US$255,000 to the insurer, arriving through central settlement roughly at the start of each quarter (subject to payment terms). If the insurer reports in sterling and the dollar strengthens 5% during the year, the later instalments are worth more in sterling — a currency gain that sits in the accounts alongside, but separate from, underwriting profit.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Premium is a <strong>promise that becomes cash slowly</strong>, held in trust at Lloyd’s until the year of account closes, and spread across currencies. Debtor balances, trust rules and foreign exchange all sit between written premium and distributable profit.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A contract has £2m annual premium paid in four equal instalments, brokerage 12.5%. How much cash does the insurer receive per instalment, in £?',
          answer: 437500, tol: 500, unit: '£',
          explain: '£2m ÷ 4 = £500,000 per instalment; less 12.5% brokerage = £437,500.' },
        { type: 'mc',
          q: 'What is the purpose of Lloyd’s premium trust funds?',
          options: [
            'To pay dividends to members quarterly',
            'To hold premiums for the benefit of policyholders, so claims and expenses are paid before any profit is released',
            'To invest premiums in the stock market on Lloyd’s behalf',
            'To collect insurance premium tax'
          ],
          answer: 1,
          explain: 'Premium trust funds ring-fence premium for policyholders. Capital providers only receive profit after the year of account closes and declares a result.' },
        { type: 'mc',
          q: 'A London insurer reporting in sterling writes most of its business in US dollars. Its sterling result improves sharply with no change in underwriting. What is a likely cause?',
          options: [
            'The dollar strengthened against sterling, lifting the sterling value of dollar premiums and reserves',
            'Premium trust funds released extra profit',
            'Brokerage rates fell automatically',
            'Central settlement paid interest'
          ],
          answer: 0,
          explain: 'Currency revaluation flows through results independently of underwriting. Separating foreign-exchange effects from trading performance is a routine analytical task.' },
        { type: 'mc',
          q: 'Why do slips include a premium payment condition (for example, premium due within 60 days)?',
          options: [
            'To let the insurer cancel or suspend cover if premium is not paid in time, limiting credit exposure to unpaid premium',
            'Because bureau systems cannot process later payments',
            'To increase brokerage',
            'Because trust funds close after 60 days'
          ],
          answer: 0,
          explain: 'Payment terms with cancellation rights protect insurers from providing cover indefinitely while the premium remains unpaid.' }
      ]
    }
  ]
});
