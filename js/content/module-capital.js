/* Module 4 — Capital & Solvency */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'capital',
  icon: '🏦',
  title: 'Capital & Solvency',
  tagline: 'Why insurers hold capital, and how much is enough',
  blurb: 'The one-in-200 standard, Solvency UK, internal models, Lloyd’s member capital-setting, diversification, and how capital feeds back into pricing.',
  badge: { icon: '🏦', name: 'Capital Custodian', desc: 'Master the “Capital & Solvency” module.' },
  lessons: [
    {
      id: 'why-capital',
      title: 'Why insurers hold capital: the one-in-200 idea',
      minutes: 8,
      body: `
<p>An insurer sells promises. Premium is collected today against claims of unknown size arriving later — so there must be a buffer for the years when claims come in far worse than priced. That buffer is <strong>capital</strong>: the shareholders’ (or members’) money standing behind the promises.</p>
<h3>Expected versus unexpected loss</h3>
<p>Premium should cover <em>expected</em> claims plus expenses plus a profit margin. Capital exists for the <em>unexpected</em>: the hurricane season with three majors, the liability class hit by a new mass tort, the reinsurer that fails to pay. The worse the plausible downside relative to expectations, the more capital is needed.</p>
<h3>The one-in-200 standard</h3>
<p>United Kingdom and European regulation crystallises this into a target: an insurer must hold enough capital to withstand, over one year, a loss so severe it would be expected only once in 200 years — technically, the 99.5th percentile of the one-year distribution of outcomes. This is the <strong>Solvency Capital Requirement</strong>. The idea: policyholders should be protected even through genuinely extreme years.</p>
<h3>What risks eat capital</h3>
<p>The capital assessment covers far more than underwriting:</p>
<ul>
<li><strong>Insurance risk</strong> — premium risk (this year’s business worse than priced), reserve risk (old years deteriorate), catastrophe risk.</li>
<li><strong>Market risk</strong> — investments fall, interest rates and currencies move against you.</li>
<li><strong>Credit risk</strong> — reinsurers, brokers or bond issuers fail to pay.</li>
<li><strong>Operational risk</strong> — process failures, fraud, cyber attack on the insurer itself, model error.</li>
</ul>
<h3>Capital is the scarce resource</h3>
<p>Every pound of capital has a cost — investors expect a return on it. So capital sizing is not just a compliance exercise: it determines how much business can be written, which classes are attractive, and what price is needed. That feedback loop is the subject of the rest of this module.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A mono-line insurer expects £100m of claims next year, but its modelled distribution says the one-in-200 outcome is £280m of claims plus £20m of investment and credit losses. Premiums and expected investment income fund about £120m. The capital requirement is driven by the gap between the extreme outcome (£300m) and available resources (£120m) — roughly £180m of capital to survive the bad tail. If it wrote half as much of the same business, both the expectation and the tail would shrink roughly in proportion.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Premium pays for the expected; <strong>capital absorbs the unexpected, sized at a one-in-200-year standard</strong> across insurance, market, credit and operational risks. Capital is costly, so it silently shapes every underwriting decision.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'The Solvency Capital Requirement is calibrated so an insurer can survive a one-year loss at which probability level?',
          options: ['90%', '99.5% (one-in-200)', '99.99%', '50%'],
          answer: 1,
          explain: 'The regulatory standard is the 99.5th percentile of the one-year distribution — the “one-in-200-year” loss.' },
        { type: 'mc',
          q: 'Which of the following is NOT typically a component of an insurer’s capital requirement?',
          options: [
            'Reserve risk on prior years',
            'Catastrophe risk',
            'The risk that reinsurers fail to pay',
            'The marketing budget for next year'
          ],
          answer: 3,
          explain: 'Capital covers insurance, market, credit and operational risks — planned expenses like marketing are a budgeting matter, not an unexpected-loss buffer.' },
        { type: 'num',
          q: 'An insurer’s modelled one-in-200 net loss over one year is £450m. Premium margins and investment income available to absorb losses total £170m. Roughly how much capital (£ millions) does it need to withstand the one-in-200 year?',
          answer: 280, tol: 5, unit: '£ millions',
          explain: '£450m − £170m = £280m must come from capital. (Real calculations are more subtle, but this is the essential logic.)' },
        { type: 'mc',
          q: 'Why does the cost of capital influence insurance pricing?',
          options: [
            'It doesn’t — pricing only reflects expected claims',
            'Capital must earn a return for investors, so each contract’s price needs a margin for the capital it consumes',
            'Regulators add a capital tax to premiums',
            'Because brokerage is paid out of capital'
          ],
          answer: 1,
          explain: 'Business that consumes lots of capital (volatile, concentrated) must carry a bigger profit margin to pay for that capital — the bridge between capital modelling and underwriting.' }
      ]
    },
    {
      id: 'solvency-uk',
      title: 'Solvency II and Solvency UK: the regulatory framework',
      minutes: 8,
      body: `
<p>The capital regime for United Kingdom insurers — including Lloyd’s — grew out of the European Union’s <strong>Solvency II</strong> directive, retained and now adapted after Brexit as <strong>Solvency UK</strong>. Its architecture has three pillars.</p>
<h3>Pillar 1: quantitative requirements</h3>
<ul>
<li><strong>Technical provisions</strong> — liabilities valued on a market-consistent “best estimate” basis (probability-weighted, discounted for the time value of money) plus a <strong>risk margin</strong> representing what another insurer would charge to take the obligations over.</li>
<li><strong>Solvency Capital Requirement</strong> — the one-in-200 capital number, computed either by the regulator-prescribed <strong>standard formula</strong> or by the insurer’s own approved <strong>internal model</strong>.</li>
<li><strong>Minimum Capital Requirement</strong> — a lower floor; breaching it triggers the strongest supervisory intervention, up to closure to new business.</li>
<li><strong>Own funds</strong> — the capital resources eligible to cover these requirements, tiered by quality (paid-up equity is the best; some hybrid debt counts with limits).</li>
</ul>
<h3>Pillar 2: governance and the insurer’s own view</h3>
<p>Every insurer must run an <strong>Own Risk and Solvency Assessment</strong> — a forward-looking self-examination of whether capital is adequate for <em>its</em> risk profile and business plan, not just the regulatory formula. Requirements for risk management, actuarial and audit functions also live here.</p>
<h3>Pillar 3: disclosure</h3>
<p>Public and regulatory reporting — including the annual Solvency and Financial Condition Report — so the market can see solvency positions.</p>
<h3>Standard formula versus internal model</h3>
<p>The standard formula is a one-size-fits-all calculation using prescribed stress factors and correlation matrices. Large London market carriers — including Lloyd’s itself and most managing agents — typically use <strong>internal models</strong>: bespoke stochastic models of their own portfolios, requiring regulatory approval and continuous validation. Internal models capture specialist London business (catastrophe towers, reinsurance structures) far better than the standard formula, usually at the cost of heavy modelling and governance overhead.</p>
<h3>The headline metric</h3>
<p>The <strong>solvency coverage ratio</strong> = eligible own funds ÷ Solvency Capital Requirement. Ratios well above 100% (often 140–200%) are the norm — a buffer over the buffer, since dipping even near 100% invites supervisory attention and rating pressure.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>An insurer has eligible own funds of £720m and a Solvency Capital Requirement of £400m: coverage ratio 180%. A catastrophe year wipes £220m off own funds and, by increasing reserve risk, raises the requirement to £430m. New ratio: 500 ÷ 430 ≈ <strong>116%</strong> — still solvent, but the board will now be discussing capital raising, reinsurance purchases or shrinking the plan, because 116% leaves little room for a second bad year.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Three pillars: <strong>numbers, governance, disclosure</strong>. The Solvency Capital Requirement can come from a standard formula or an approved internal model, and the watched metric is the coverage ratio of own funds over that requirement.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Eligible own funds are £950m and the Solvency Capital Requirement is £500m. What is the solvency coverage ratio, in %?',
          answer: 190, tol: 1, unit: '%',
          explain: '950 ÷ 500 = 190%. Healthy insurers typically run well above 100% to absorb shocks without breaching.' },
        { type: 'mc',
          q: 'What are technical provisions under Solvency UK?',
          options: [
            'The insurer’s IT budget',
            'The market-consistent value of insurance liabilities: discounted best estimate plus a risk margin',
            'The premium expected next year',
            'The value of the insurer’s buildings'
          ],
          answer: 1,
          explain: 'Technical provisions value the promises made: probability-weighted expected cash flows, discounted, plus a risk margin for transferring the obligations.' },
        { type: 'mc',
          q: 'Why do most large London market carriers use internal models rather than the standard formula?',
          options: [
            'Internal models are always cheaper to run',
            'The standard formula is illegal at Lloyd’s',
            'Specialist portfolios — catastrophe towers, reinsurance structures, unusual classes — are poorly captured by one-size-fits-all factors',
            'Internal models need no regulatory approval'
          ],
          answer: 2,
          explain: 'The standard formula’s prescribed factors suit conventional books. London specialty risk profiles diverge enough that a bespoke, approved internal model gives a materially truer (and better-managed) picture.' },
        { type: 'mc',
          q: 'What is the Own Risk and Solvency Assessment?',
          options: [
            'The regulator’s annual inspection visit',
            'The insurer’s own forward-looking assessment of whether its capital is adequate for its specific risk profile and plans',
            'A tax return for insurers',
            'The process for approving brokers'
          ],
          answer: 1,
          explain: 'Pillar 2’s centrepiece: management must form and document its own view of risk and capital adequacy, beyond the Pillar 1 arithmetic.' }
      ]
    },
    {
      id: 'lloyds-capital',
      title: 'How Lloyd’s sets capital: from syndicate model to Funds at Lloyd’s',
      minutes: 9,
      body: `
<p>Lloyd’s runs a distinctive, layered capital process that connects each syndicate’s modelling to the funds every member must lodge. If you work anywhere near a Lloyd’s business, this chain is worth knowing cold.</p>
<h3>Step 1: the syndicate’s own view</h3>
<p>Each syndicate’s internal model produces a one-in-200 capital number for the coming year of account’s plan plus all unexpired risk — the <strong>syndicate Solvency Capital Requirement</strong>. It reflects the classes written, reinsurance bought, reserves held and catastrophe exposures, and is submitted alongside the business plan. Crucially, it is on an <em>ultimate</em> basis at Lloyd’s (to the final settlement of claims), a stricter horizon than the one-year basis used for the regulatory number — you may hear this called the “ultimate Solvency Capital Requirement”.</p>
<h3>Step 2: Lloyd’s review and the economic uplift</h3>
<p>Lloyd’s reviews and can adjust (“load”) syndicate numbers it finds weak. It then applies an <strong>economic capital uplift of 35%</strong> to the ultimate requirement. The result is the member’s <strong>Economic Capital Assessment</strong> — the amount of capital the member must actually provide to support its share of the syndicate. The uplift buys the market its collective financial strength: extra cushion protects the Central Fund and underpins Lloyd’s strong ratings.</p>
<h3>Step 3: Funds at Lloyd’s and coming into line</h3>
<p>Members lodge assets centrally as <strong>Funds at Lloyd’s</strong> — cash, securities or letters of credit held in trust — to meet their Economic Capital Assessment. Twice a year the market goes through <strong>coming into line</strong>: every member must demonstrate its funds meet the requirement, topping up if losses or plan growth have raised it. A member that cannot come into line cannot continue underwriting.</p>
<h3>Capital efficiency: why write at Lloyd’s?</h3>
<p>The uplifted requirement sounds expensive, but Lloyd’s offers offsetting advantages: the licence network (trade in 200+ territories without local subsidiaries), the shared rating, and diversification credit within a member’s own portfolio of syndicate participations. For many capital providers the package is more efficient than building a standalone insurer.</p>
<div class="diagram">
<div class="d-title">The Lloyd’s capital chain</div>
<div class="flow-h">
<span class="fnode">🧮 Syndicate model<small>1-in-200, ultimate</small></span><span class="farrow">→</span>
<span class="fnode">🔍 Lloyd’s review<small>may load weak numbers</small></span><span class="farrow">→</span>
<span class="fnode gold">× 1.35 uplift<small>Economic Capital Assessment</small></span><span class="farrow">→</span>
<span class="fnode">🏦 Funds at Lloyd’s<small>assets lodged in trust</small></span><span class="farrow">→</span>
<span class="fnode">✅ Coming into line<small>tested twice a year</small></span>
</div>
<div class="d-caption">Capital follows the plan: grow the plan or suffer losses, and the requirement — and the member’s funding call — moves with it.</div>
</div>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A syndicate’s approved plan produces an ultimate one-in-200 requirement of £200m. Lloyd’s applies the 35% uplift: members backing the syndicate must collectively hold an Economic Capital Assessment of £200m × 1.35 = <strong>£270m</strong> as Funds at Lloyd’s. Mid-year, catastrophe losses raise the requirement to £230m ultimate (£310.5m uplifted): at the next coming into line, members must find an extra £40.5m or the syndicate must shrink its plan.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>The chain is: <strong>syndicate internal model (ultimate basis) → Lloyd’s review → +35% economic uplift → member’s Economic Capital Assessment → Funds at Lloyd’s, tested at coming into line</strong>. Capital follows the plan — grow the plan or suffer losses, and the capital call follows.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A syndicate’s ultimate one-in-200 capital requirement is £160m. Applying Lloyd’s 35% economic uplift, what Economic Capital Assessment must its members meet, in £ millions?',
          answer: 216, tol: 1, unit: '£ millions',
          explain: '£160m × 1.35 = £216m of Funds at Lloyd’s required.' },
        { type: 'mc',
          q: 'What is “coming into line”?',
          options: [
            'The annual approval of syndicate business plans',
            'The twice-yearly test that each member’s Funds at Lloyd’s meet its capital requirement, with top-ups where short',
            'The process of signing down oversubscribed placements',
            'The queue of brokers at an underwriter’s box'
          ],
          answer: 1,
          explain: 'Coming into line is the periodic solvency test of member capital. No adequate funds, no continued underwriting.' },
        { type: 'mc',
          q: 'How does the Lloyd’s capital basis differ from the standard regulatory basis?',
          options: [
            'Lloyd’s uses a one-in-100 standard instead of one-in-200',
            'Lloyd’s capital is set on an ultimate basis (to final settlement of claims) with a 35% uplift, stricter than the one-year regulatory view',
            'Lloyd’s requires no capital for catastrophe risk',
            'There is no difference'
          ],
          answer: 1,
          explain: 'The ultimate horizon plus the 35% economic uplift make member capital more onerous than the bare one-year requirement — deliberately, to protect the Central Fund and ratings.' },
        { type: 'num',
          q: 'A member has £270m of Funds at Lloyd’s. Losses raise its Economic Capital Assessment from £270m to £297m. How much must it inject at coming into line, in £ millions?',
          answer: 27, tol: 0.5, unit: '£ millions',
          explain: '£297m − £270m = £27m top-up — or the member must reduce its underwriting to fit its capital.' }
      ]
    },
    {
      id: 'diversification',
      title: 'Diversification, capital allocation and return on capital',
      minutes: 9,
      body: `
<p>Capital modelling would be simple if risks added up. They don’t — and that fact shapes the economics of every multi-line insurer.</p>
<h3>Diversification: the whole is less than the sum</h3>
<p>A Japanese earthquake and a collapse in United States casualty reserves are essentially unrelated. The capital needed for both together is far less than the sum of each alone, because their one-in-200 years almost never coincide. Formally, the combined requirement reflects <em>correlations</em> between risks; the gap between the sum of standalone requirements and the combined requirement is the <strong>diversification benefit</strong> — routinely 30–50% in a well-spread specialty book. This is a core reason multi-line insurers and Lloyd’s itself exist: pooled, weakly-related risks use capital more efficiently.</p>
<h3>Allocating capital back to classes</h3>
<p>Pricing and performance management need capital per class, so the diversified total must be <em>allocated back</em>. Common approaches share the diversification benefit according to each class’s contribution to the insurer’s tail risk. Results are decision-changing: a volatile catastrophe class that dominates the tail gets allocated a lot of capital; a steady, uncorrelated specialty class gets little. Two classes with identical combined ratios can have utterly different returns on capital.</p>
<h3>Return on capital: the real yardstick</h3>
<p><strong>Return on capital = profit ÷ allocated capital.</strong> A class earning 5% margin on premium but consuming little capital may beat one earning 12% margin that soaks up capital. This is how modern portfolio steering works: push capacity toward the best risk-adjusted returns, not the best combined ratios. It also justifies reinsurance spend: ceding tail risk costs margin but releases capital, and can raise return on capital even while lowering absolute profit.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>Class A: £50m premium, expected profit £6m (12% margin), allocated capital £60m → return on capital <strong>10%</strong>. Class B: £50m premium, expected profit £3.5m (7% margin), allocated capital £20m → <strong>17.5%</strong>. Class B is the better use of capital despite the thinner margin, because it barely contributes to the tail. If the insurer’s cost of capital is 12%, class A is actually destroying value at current pricing — it needs rate, restructuring, more reinsurance or less capacity.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Risks that don’t move together need less combined capital — and once that diversified capital is allocated back, <strong>return on allocated capital, not combined ratio, is the true measure of a class’s worth</strong>.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Standalone capital requirements are £100m (property cat) and £80m (casualty). Combined, the model says £126m. What is the diversification benefit, in £ millions?',
          answer: 54, tol: 0.5, unit: '£ millions',
          explain: '(100 + 80) − 126 = £54m less capital than the standalone sum — the value of holding weakly related risks together.' },
        { type: 'num',
          q: 'A class earns expected profit of £9m on allocated capital of £60m. What is its return on capital, in %?',
          answer: 15, tol: 0.2, unit: '%',
          explain: '9 ÷ 60 = 15%.' },
        { type: 'mc',
          q: 'Two classes have identical 95% combined ratios. Class X is catastrophe-exposed; class Y is steady and uncorrelated with the rest of the book. Which likely shows the better return on capital?',
          options: [
            'Class X, because catastrophe business always earns more',
            'Class Y, because it is allocated less capital for the same profit margin',
            'They must be identical since combined ratios match',
            'Neither can be computed from combined ratios'
          ],
          answer: 1,
          explain: 'Capital allocation punishes tail-dominating classes. Same margin over less capital = higher return — why combined ratio alone cannot steer a portfolio.' },
        { type: 'mc',
          q: 'How can buying reinsurance increase return on capital even though it reduces expected profit?',
          options: [
            'It cannot — less profit always means less return',
            'Ceding tail risk reduces required capital; if capital falls proportionally more than profit, the ratio improves',
            'Reinsurance premiums are refunded in good years',
            'Regulators pay insurers to buy reinsurance'
          ],
          answer: 1,
          explain: 'Reinsurance trades margin for capital relief. When the capital released exceeds the margin given up (proportionally), return on capital rises — the standard business case for outwards protection.' }
      ]
    },
    {
      id: 'security',
      title: 'Ratings, the Central Fund and what “security” means',
      minutes: 7,
      body: `
<p>In a market where a policy may pay out decades after it is sold, buyers care intensely about <strong>security</strong> — the certainty that the insurer will still be there, willing and able to pay. Security is what capital ultimately buys.</p>
<h3>Financial strength ratings</h3>
<p>Rating agencies (A.M. Best, Standard & Poor’s, Moody’s, Fitch) grade insurers’ ability to meet policyholder obligations. Ratings matter commercially, not just prudentially: many brokers and clients will simply not place business with carriers below a threshold (commonly an “A−” category rating), and reinsurance contracts often include clauses letting the buyer cancel or demand collateral if the reinsurer is downgraded. A downgrade can therefore trigger a spiral: business flees, the franchise weakens, the rating falls further.</p>
<h3>Lloyd’s: one rating for the whole market</h3>
<p>Uniquely, all Lloyd’s syndicates share the market’s central ratings (strong “A+” category from the major agencies in recent years), because the chain of security — premium trust funds, Funds at Lloyd’s, the Central Fund — stands behind every Lloyd’s policy. A brand-new syndicate enjoys the same claims-paying rating as a century-old one. The price of that shared security is the central oversight this module has described: capital uplifts, business-plan approval and performance management protect the common rating from the weakest participant.</p>
<h3>The Central Fund in practice</h3>
<p>The Central Fund is financed by annual contributions levied on members’ premium, and is backed by further layers including the Corporation’s own assets and callable amounts. It has been used: most famously through the 1990s asbestos-driven crisis, when Equitas was created to reinsure the market’s old-year liabilities and the fund protected policyholders of failed members. Understanding this history explains today’s discipline — the market nearly died from under-reserved long-tail business and mutualised the lesson.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A reinsurance buyer places a 10-year liability programme. Carrier X offers a 5% cheaper price but is rated in the “BBB” category; Carrier Y is “A+”. The buyer’s broker advises Y: over a decade, the probability-weighted cost of X failing to pay a large late claim dwarfs the 5% saving. In practice most large buyers’ security committees would not even authorise X — cheap security is often no security.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Capital, ratings and central mutual layers together constitute <strong>security</strong> — the product beneath the product. At Lloyd’s, the shared rating is a common asset that central oversight exists to defend.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Why does a single financial-strength rating apply across all Lloyd’s syndicates?',
          options: [
            'Because all syndicates have identical portfolios',
            'Because the chain of security, including the mutual Central Fund, stands behind every Lloyd’s policy regardless of syndicate',
            'Because rating agencies cannot analyse syndicates individually',
            'Because the government guarantees Lloyd’s'
          ],
          answer: 1,
          explain: 'Policyholders are protected by the market’s collective resources, so the agencies rate the market. Central oversight exists to protect that shared rating.' },
        { type: 'mc',
          q: 'What commercial consequence commonly follows a rating downgrade below the “A−” category?',
          options: [
            'Nothing — ratings are advisory only',
            'Brokers and clients stop placing business, and downgrade clauses may let existing buyers cancel or demand collateral',
            'The regulator automatically liquidates the insurer',
            'Premiums must be refunded'
          ],
          answer: 1,
          explain: 'Security thresholds are hard-wired into broker guidance and contract clauses, which is why downgrades can spiral commercially.' },
        { type: 'mc',
          q: 'What event forced the creation of Equitas and demonstrated the Central Fund’s role?',
          options: [
            'The 2008 banking crisis',
            'The 1990s crisis from under-reserved long-tail liabilities, especially asbestos-related claims',
            'Hurricane Katrina in 2005',
            'The COVID-19 pandemic'
          ],
          answer: 1,
          explain: 'Decades of latent asbestos and pollution claims overwhelmed old years of account; Equitas took over the market’s pre-1993 liabilities and the episode reshaped Lloyd’s oversight and capital discipline.' },
        { type: 'num',
          q: 'A buyer weighs Carrier X (premium £950,000, weaker security) against Carrier Y (premium £1,000,000). The buyer estimates a 2% chance X fails to pay an expected £8m of claims over the programme. What is the expected cost of X’s credit risk, in £ — and note whether it exceeds the £50,000 saving? (Enter the expected cost.)',
          answer: 160000, tol: 2000, unit: '£',
          explain: '2% × £8m = £160,000 expected credit cost — more than three times the £50,000 premium saving. Security has a price, and here it is worth paying.' }
      ]
    }
  ]
});
