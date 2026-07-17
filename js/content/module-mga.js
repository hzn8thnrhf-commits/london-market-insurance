/* Module 11 — Underwriting Without a Balance Sheet */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'mga',
  icon: '🤝',
  title: 'Pens & Paper: The Underwriter–Capital Split',
  tagline: 'Managing general underwriters, fronting, platforms and alternative capital',
  blurb: 'The modern market increasingly separates the people who underwrite from the balance sheets that carry the risk. This module covers how — managing general underwriters, fronting arrangements, incubator platforms, insurance-linked securities — and the lead-versus-follow economics underneath it all.',
  badge: { icon: '🤝', name: 'Structure Strategist', desc: 'Master “Pens & Paper: The Underwriter–Capital Split”.' },
  lessons: [
    {
      id: 'mgu-model',
      title: 'The managing general underwriter model: splitting the pen from the balance sheet',
      minutes: 9,
      body: `
<p>The Delegated Authority lesson introduced coverholders writing small business under binders. Scale that idea up to its logical extreme and you reach one of the most important structural trends in the modern specialty market: the <strong>managing general underwriter</strong> — a full underwriting business, with hundreds of staff, its own leaders, pricing models, claims and exposure teams, writing billions of premium — that deliberately owns <em>no insurance balance sheet at all</em>. The risk sits with one or more separate carriers who supply “paper” (their licences, ratings and capital) under long-term agreements.</p>
<h3>How the split works</h3>
<ul>
<li><strong>The underwriting company</strong> holds the pen: it originates, prices, binds and services the business, employing the underwriters and making every risk decision within an agreed framework.</li>
<li><strong>The balance-sheet carrier</strong> issues the policies, holds the reserves and capital, buys (or directs) the outwards reinsurance, and answers to prudential regulators and rating agencies for solvency.</li>
<li>A <strong>framework agreement</strong> — typically long-term, sometimes exclusive in both directions — governs the relationship: classes and volumes delegated, underwriting guidelines, referral triggers, data and audit rights, and above all the economics.</li>
</ul>
<div class="diagram">
<div class="d-title">The underwriter–capital split</div>
<div class="flow-h">
<span class="fnode">🤝 Brokers &amp; clients<small>bring the risk</small></span><span class="farrow">→</span>
<span class="fnode gold">🖊️ Underwriting company<small>holds the pen · earns commissions</small></span><span class="farrow">→</span>
<span class="fnode">🏦 Balance-sheet carrier<small>issues paper · holds capital &amp; reserves</small></span><span class="farrow">→</span>
<span class="fnode">🛡️ Outwards reinsurance<small>shapes the carrier’s net</small></span>
</div>
<div class="d-caption">The framework agreement is the hinge: it delegates the pen one way and sends premium (less commissions) the other.</div>
</div>
<h3>The economics</h3>
<p>The underwriting company is paid like a supercharged coverholder: a <strong>ceding/underwriting commission</strong> on premium written (covering its costs plus a margin) and usually a <strong>profit commission</strong> — a share of the underwriting profit it generates for the carrier, often above a threshold loss ratio. The carrier keeps the balance of underwriting profit plus investment income on the reserves, and carries the downside.</p>
<h3>Why anyone does this</h3>
<ul>
<li><strong>Valuation</strong> — stock markets and private buyers typically value fee-earning, capital-light businesses at higher multiples than volatile balance-sheet insurers. Splitting the two can make the sum worth more than the whole.</li>
<li><strong>Alignment and talent</strong> — underwriters can own meaningful equity in the underwriting company, tying their wealth to underwriting quality rather than to balance-sheet investment results.</li>
<li><strong>Capital flexibility</strong> — the carrier side can flex capital up and down (reinsurance, alternative capital, multiple paper providers) without disturbing the client-facing franchise.</li>
</ul>
<h3>The tensions everyone watches</h3>
<ul>
<li><strong>Moral hazard</strong> — commission on volume but only a <em>share</em> of downside can tempt growth over discipline. Mitigants: profit commissions with deficit carry-forward (losses must be earned back before profit share resumes), long-term exclusivity, equity cross-holdings, and carrier veto rights.</li>
<li><strong>Dependence</strong> — the underwriting business is only as good as its capacity renewal; the carrier is only as good as the underwriting it no longer controls day to day. Rating agencies and regulators probe both directions.</li>
<li><strong>Familiar problem, old solution</strong> — note the rhyme with Lloyd’s itself: a managing agent underwriting with members’ capital is a centuries-old version of the same split, policed by business-plan oversight and capital-setting. The market keeps reinventing this structure because the underlying trade — expertise seeking capital, capital seeking expertise — is permanent.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>An underwriting company writes US$3bn of premium on its partner carrier’s paper. Framework terms: 12% underwriting commission plus 20% profit commission on underwriting profit below a 70% combined ratio... the year lands at a 62% combined ratio on US$2.5bn earned. Underwriting profit = 38% × 2.5bn = US$950m... wait — profit commission is typically computed after the commission itself and per the agreement’s definitions; on a simplified basis: commission income = 12% × 3bn = <strong>US$360m</strong> (capital-light fee revenue), plus profit commission of 20% × US$950m = <strong>US$190m</strong>. The carrier retains US$760m of underwriting profit plus investment income — and would have carried the whole loss in a bad year. In that bad year the underwriting company still earns its US$360m commission: that asymmetry is exactly why deficit-carry-forward clauses and equity alignment exist.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>The managing general underwriter model separates <strong>underwriting expertise (paid in commissions and profit share) from risk capital (paid in retained underwriting profit and float)</strong>. Its permanent design problem is alignment — solved, imperfectly, by profit commissions, deficit carry-forwards, exclusivity and shared equity.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'An underwriting company writes £1.8bn of premium at a 13% underwriting commission. What is its commission income, in £ millions?',
          answer: 234, tol: 1, unit: '£ millions',
          explain: '13% × £1,800m = £234m — fee revenue earned regardless of how the underwriting year ultimately turns out.' },
        { type: 'num',
          q: 'A framework agreement pays 15% profit commission on underwriting profit. The carrier earns £900m of premium at an 80% combined ratio. What profit commission is due, in £ millions?',
          answer: 27, tol: 0.5, unit: '£ millions',
          explain: 'Underwriting profit = 20% × 900 = £180m; profit commission = 15% × 180 = £27m.' },
        { type: 'mc',
          q: 'What is a deficit carry-forward clause in a profit commission arrangement?',
          options: [
            'A tax deferral mechanism',
            'Losses from bad years must be recouped before profit commission is payable again — so the underwriter cannot earn profit share while the carrier is still underwater',
            'The carrier’s right to carry losses to its reinsurers',
            'A premium instalment schedule'
          ],
          answer: 1,
          explain: 'It is the key alignment tool: profit commission measured cumulatively, not year-by-year, so volatility cannot be gamed by alternating good and bad years.' },
        { type: 'mc',
          q: 'Why can separating an underwriting business from its balance sheet increase the combined value of the two?',
          options: [
            'Because separated companies pay no tax',
            'Because fee-earning, capital-light businesses typically command higher valuation multiples than volatile balance-sheet insurers',
            'Because regulators require less capital for separated groups',
            'Because brokers pay higher commissions to split structures'
          ],
          answer: 1,
          explain: 'The market prices predictable fee streams more richly than catastrophe-exposed equity. The split lets each investor base own the piece it values.' },
        { type: 'mc',
          q: 'Which long-established London market structure is essentially the same “expertise without capital” split?',
          options: [
            'Central settlement',
            'A Lloyd’s managing agent underwriting with members’ capital',
            'A premium trust fund',
            'An hours clause'
          ],
          answer: 1,
          explain: 'Managing agents have always underwritten on other people’s capital — with Lloyd’s oversight playing the role that framework agreements and carrier controls play in the modern model.' }
      ]
    },
    {
      id: 'fronting',
      title: 'Fronting: writing on someone else’s licence',
      minutes: 8,
      body: `
<p>Between the coverholder and the full underwriter–capital split sits a quieter but ubiquitous structure: <strong>fronting</strong>. A licensed, rated insurer (the <strong>fronting carrier</strong>) issues the policy — then immediately reinsures most or all of the risk to whoever actually wants it: an offshore reinsurer, an alternative-capital vehicle, a captive insurer owned by the insured itself, or the capacity behind a managing general agent.</p>
<h3>Why fronting exists</h3>
<ul>
<li><strong>Licences</strong> — insurance must usually be issued by a locally admitted insurer. A capital provider without licences in fifty states or countries rents them from one who has.</li>
<li><strong>Ratings</strong> — brokers and insureds demand strongly rated paper; unrated capital (a hedge fund, a new vehicle, a captive) accesses the market behind a rated front.</li>
<li><strong>Speed</strong> — building a licensed, rated insurer takes years; renting one takes a contract.</li>
</ul>
<h3>The economics and the catch</h3>
<p>The fronting carrier charges a <strong>fronting fee</strong> — typically around 4–7% of premium — for the use of its licence and rating. But here is the catch, and it echoes the Reinsurance module: <strong>the fronting carrier remains 100% liable to the policyholder</strong>. If the reinsurer behind the front fails or refuses to pay, the front pays anyway. Fronting is therefore, at bottom, a credit business:</p>
<ul>
<li><strong>Collateral</strong> — fronts demand security for the reinsurance recoverable: trust accounts, letters of credit or funds withheld, often topped up as reserves develop.</li>
<li><strong>Retention</strong> — pure fronts cede ~100%; “hybrid” fronts retain a strip (say 10–20%) to demonstrate aligned underwriting interest — a feature capacity providers and regulators increasingly expect.</li>
<li><strong>Due diligence</strong> — on the capital behind the front, exactly as a cedant vets reinsurers — because that is what the front is: a cedant with its name on the policy.</li>
</ul>
<h3>Where you meet it</h3>
<p>Fronting is everywhere once you look: captives fronted into admitted markets; programme business in the United States (where a wave of specialist “fronting carriers” grew alongside the managing-general-agent boom, and where a prominent 2023–24 failure of one such arrangement reminded everyone that fronting risk is real); alternative capital accessing insurance risk; and international programmes where a global insurer fronts locally and reinsures back to the client’s captive or its own hub carrier.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A manufacturer’s captive wants to retain its own US$20m-limit property programme, but local law requires an admitted insurer. A fronting carrier issues the policy for US$8m of premium, cedes 90% to the captive (retaining 10% as a hybrid strip), and charges a 5% fronting fee on the ceded premium: 5% × US$7.2m = <strong>US$360,000</strong> of fee income. It requires the captive to post a letter of credit for 100% of ceded reserves. A US$10m loss occurs and the captive disputes it: the front must still pay the policyholder in full and pursue the captive under the reinsurance agreement — drawing the letter of credit if need be. The fee was never payment for risk; it was payment for licence, rating and this exact credit exposure.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Fronting rents <strong>licences and ratings</strong> to capital that lacks them — but the front stays fully liable to the policyholder, so fronting is a <strong>collateralised credit business</strong> wearing an underwriting costume.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A fronting carrier issues £15m of premium, cedes 100% and charges a 5.5% fronting fee. What is its fee income, in £?',
          answer: 825000, tol: 5000, unit: '£',
          explain: '5.5% × £15m = £825,000 for the use of its licence, rating and balance sheet standing behind the reinsurance.' },
        { type: 'mc',
          q: 'The reinsurer behind a 100% fronted programme becomes insolvent. Who pays the policyholder’s valid claim?',
          options: [
            'Nobody — the policy is void',
            'The fronting carrier, in full — its policy obligation is unaffected by the reinsurance failure',
            'The policyholder’s broker',
            'The insolvent reinsurer’s liquidator, directly'
          ],
          answer: 1,
          explain: 'Same principle as all reinsurance: the issuing carrier’s liability to its policyholder never transfers. This is precisely why fronts demand collateral.' },
        { type: 'mc',
          q: 'Why do capacity providers and regulators increasingly prefer “hybrid” fronts that retain 10–20% of the risk?',
          options: [
            'To increase the fronting fee',
            'Skin in the game — a front bearing some of its own underwriting result has an incentive to police the business quality it puts its name to',
            'Because pure fronting is illegal',
            'To reduce collateral requirements to zero'
          ],
          answer: 1,
          explain: 'A pure pass-through front earns fees on volume with no underwriting downside — the moral-hazard problem again. Retention aligns the front with the capital behind it.' },
        { type: 'mc',
          q: 'A hedge fund wants to take insurance risk but has no licences or rating. Which structure gets it there fastest?',
          options: [
            'Applying for insurance licences in every state',
            'Standing behind a fronting carrier as its reinsurer, with collateral posted',
            'Buying a Lloyd’s broker',
            'Issuing policies directly and hoping'
          ],
          answer: 1,
          explain: 'Renting a front converts years of licensing into a reinsurance contract plus collateral — the standard on-ramp for alternative capital into primary insurance.' }
      ]
    },
    {
      id: 'platforms',
      title: 'Incubators and platforms: manufacturing new underwriting businesses',
      minutes: 8,
      body: `
<p>If underwriting talent no longer needs a balance sheet, it doesn’t necessarily need a big company either. The past decade has seen the rise of <strong>platforms and incubators</strong> — businesses whose product is <em>other underwriting businesses</em>.</p>
<h3>The platform model</h3>
<p>A platform provides everything around the underwriting decision so that a small specialist team can launch a managing general agent quickly:</p>
<ul>
<li><strong>Regulatory permissions</strong> — the team operates under the platform’s licences and compliance infrastructure (as an “appointed representative” in United Kingdom terms) rather than seeking its own authorisation, which can take years.</li>
<li><strong>Capacity broking</strong> — the platform’s relationships and track record help the new agent secure paper from carriers and syndicates.</li>
<li><strong>Services</strong> — actuarial, claims oversight, finance, systems, delegated-authority reporting (the bordereaux machinery from the Market module).</li>
</ul>
<p>In exchange the platform takes a share of the agent’s fee income and usually equity. Successful cells scale up and may eventually “graduate” — raising their own capacity, seeking their own permissions, or being sold; unsuccessful ones are wound down cheaply. The platform is running a portfolio of underwriting-business ventures, applying portfolio logic (a few big winners pay for the failures) to entrepreneurship itself.</p>
<h3>Why capacity providers play</h3>
<p>For a syndicate or carrier, backing a platform cell is a cheap option on a niche: access to a specialist team’s deal flow in, say, marine war or intellectual-property insurance, without hiring the team or building the operation. The carrier controls its downside with binder-style limits, referral triggers and audit rights — everything from the Delegated Authority lesson applies, plus framework economics from this module.</p>
<h3>What can go wrong</h3>
<ul>
<li><strong>Key-person risk</strong> — the cell often <em>is</em> two or three people; their departure ends it.</li>
<li><strong>Capacity cliff</strong> — a cell whose carrier withdraws at renewal can die overnight, mid-portfolio; orderly run-off provisions matter.</li>
<li><strong>Quality drift</strong> — platforms earn fees on cells launched; the discipline to decline mediocre teams is the platform’s own moral-hazard test.</li>
<li><strong>Oversight stretch</strong> — regulators have scrutinised the appointed-representative regime precisely because one authorisation can end up covering many loosely supervised ventures.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>Two respected underwriters of fine-art risk leave a big carrier to launch their own agency on a platform. Year one: the platform provides permissions, systems and introductions; a syndicate grants a US$25m-capacity binder with tight referral rules; the pair write US$12m of premium at a 22% commission (US$2.64m fee income), of which the platform takes 30% plus it holds 25% of the equity. Year four: the book is US$45m, loss ratios have beaten plan every year, and a carrier buys the agency outright at a fee-multiple valuation. The platform’s return came from one success across the six cells it launched that year — two of which quietly closed.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Platforms industrialise the creation of niche underwriting businesses: <strong>permissions, services and capacity in exchange for fees and equity</strong>. For capital providers they are cheap options on specialist talent — governed by exactly the delegated-authority controls you already know.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A platform cell writes US$18m of premium at a 20% commission, and the platform takes 30% of the fee income. What does the underwriting team’s agency keep, in US$ millions?',
          answer: 2.52, tol: 0.02, unit: 'US$ millions',
          explain: 'Fee income = 20% × 18 = US$3.6m; the agency keeps 70% = US$2.52m before its own costs.' },
        { type: 'mc',
          q: 'What does a platform fundamentally sell to a new underwriting team?',
          options: [
            'Insurance capital',
            'Speed to market: regulatory permissions, infrastructure and capacity relationships, in exchange for fees and equity',
            'Guaranteed profitability',
            'Client lists'
          ],
          answer: 1,
          explain: 'The platform removes the years of authorisation and build-out; the team supplies the underwriting edge. Neither provides the risk capital — that still comes from carriers.' },
        { type: 'mc',
          q: 'Why might a syndicate back a two-person platform cell in a niche class rather than hire the team?',
          options: [
            'Platform cells are exempt from Lloyd’s oversight',
            'It gains access to the niche’s deal flow with capped downside (binder limits, referrals, audit) and no fixed build cost — a cheap option it can decline to renew',
            'Hiring underwriters is prohibited',
            'Cells always produce lower loss ratios'
          ],
          answer: 1,
          explain: 'The carrier converts a strategic hire decision into a controllable, reversible delegated-authority arrangement — optionality is the point.' },
        { type: 'mc',
          q: 'Which is the most existential risk to an individual platform cell?',
          options: [
            'Rising office rents',
            'Its capacity provider declining to renew the binder, leaving the cell unable to write',
            'A change in the platform’s brand',
            'Currency fluctuations'
          ],
          answer: 1,
          explain: 'No paper, no business: the capacity cliff (alongside key-person departure) is the cell’s defining fragility, which run-off provisions and multi-carrier capacity try to soften.' }
      ]
    },
    {
      id: 'ils',
      title: 'Alternative capital: catastrophe bonds, sidecars and collateralised reinsurance',
      minutes: 9,
      body: `
<p>The Reinsurance module mentioned that protection increasingly comes from capital markets. This lesson opens that box, because <strong>insurance-linked securities</strong> now supply a large share of the world’s catastrophe and retrocession capacity — and understanding their mechanics explains much of modern market behaviour.</p>
<h3>Catastrophe bonds</h3>
<p>An insurer (the <strong>sponsor</strong>) wants, say, US$300m of protection against a defined catastrophe. A special-purpose vehicle issues bonds to investors; the US$300m raised sits in a collateral trust invested in safe assets. If the defined event occurs, collateral flows to the sponsor and investors lose principal; if not, investors earn an attractive coupon and get their money back at maturity (typically 3–4 years). Because the money is already in trust, the sponsor bears essentially no credit risk — the structural advantage you met in the Reinsurance module.</p>
<p><strong>Trigger types</strong> matter enormously:</p>
<ul>
<li><strong>Indemnity</strong> — pays on the sponsor’s actual losses. Best protection, but investors bear the sponsor’s data quality and claims handling (“moral hazard” pricing).</li>
<li><strong>Industry loss</strong> — pays when the whole industry’s loss (per a recognised index) exceeds a threshold. Clean for investors; leaves the sponsor <strong>basis risk</strong> (its own loss may differ from industry experience — the same concept as parametric covers).</li>
<li><strong>Parametric</strong> — pays on physical event parameters (magnitude, wind speed). Fastest and cleanest; most basis risk.</li>
</ul>
<h3>Sidecars and collateralised reinsurance</h3>
<ul>
<li>A <strong>sidecar</strong> is a special-purpose vehicle through which investors take a <strong>quota share of a (re)insurer’s book</strong> — riding alongside the sponsor’s own underwriting for a season, sharing premium and losses proportionally, fully collateralised. Sponsors use sidecars to flex capacity up in hard markets and earn fee/profit overrides on the capital they manage — a miniature of the underwriter–capital split this module is about.</li>
<li><strong>Collateralised reinsurance</strong> — funds writing ordinary reinsurance contracts, posting collateral for their full limit instead of holding a rating.</li>
</ul>
<h3>The wrinkle: trapped collateral</h3>
<p>Collateral must stay in trust until losses are finally settled — and catastrophe losses take time to develop. After a major event, a fund’s collateral can be <strong>trapped</strong> for a year or more against possible deterioration: investors can neither be paid out nor redeploy the money into the (now hardening) market. Trapped collateral after 2017–18 dampened alternative capital’s appetite for years and is a key reason capacity does not instantly flood back after big losses — a structural amplifier of the underwriting cycle.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A carrier sponsors a US$200m catastrophe bond: industry-loss trigger attaching at a US$60bn United States hurricane industry loss, exhausting at US$80bn, coupon 9% over the collateral yield. A hurricane season produces a US$70bn industry loss: the bond pays (70 − 60) ÷ (80 − 60) × 200 = <strong>US$100m</strong> to the sponsor. The sponsor’s own loss from the event was US$130m — the US$30m gap is basis risk realised. Investors lose half their principal; the remaining US$100m of collateral is held (trapped) for months while the index estimate finalises.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Insurance-linked securities pre-fund protection in trust — <strong>no credit risk, but trigger choice trades protection quality against investor cleanliness (basis risk)</strong>, and trapped collateral after events slows capital’s return, amplifying the cycle.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A catastrophe bond pays linearly between a US$40bn attachment and US$60bn exhaustion on an industry-loss index, with US$150m of principal. The industry loss is US$55bn. How much does the sponsor recover, in US$ millions?',
          answer: 112.5, tol: 1, unit: 'US$ millions',
          explain: '(55 − 40) ÷ (60 − 40) = 75% of the layer consumed; 75% × 150 = US$112.5m.' },
        { type: 'mc',
          q: 'Why does a sponsor using an industry-loss trigger retain basis risk?',
          options: [
            'Because industry indices are published in euros',
            'Because its own loss from an event may be proportionally larger than the industry’s, leaving it under-recovered even when the bond pays',
            'Because industry triggers carry credit risk',
            'Because indemnity triggers are cheaper'
          ],
          answer: 1,
          explain: 'The bond pays on the market’s loss, not the sponsor’s. A sponsor overweight in the affected region can suffer badly while the index barely triggers — the price of a cleaner instrument for investors.' },
        { type: 'mc',
          q: 'What is a sidecar?',
          options: [
            'A small excess-of-loss layer',
            'A collateralised special-purpose vehicle through which investors take a quota share of a sponsor’s book for a period, with the sponsor typically earning fees and profit overrides',
            'A second policy issued alongside the first',
            'A broker’s sub-account'
          ],
          answer: 1,
          explain: 'Sidecars let sponsors flex capacity with other people’s capital and monetise their underwriting — proportional reinsurance meeting asset management.' },
        { type: 'mc',
          q: 'How does trapped collateral amplify the underwriting cycle?',
          options: [
            'It doesn’t — collateral is always released immediately',
            'After major events, collateral held against developing losses cannot be redeployed, so alternative capacity is slow to return precisely when prices are hardening',
            'It causes premium taxes to rise',
            'It forces sponsors to buy more bonds'
          ],
          answer: 1,
          explain: 'The mechanism that removes credit risk (money locked in trust) also locks capital out of the post-event market — deepening and lengthening hard markets.' }
      ]
    },
    {
      id: 'lead-follow',
      title: 'Lead, follow and the new economics of the subscription market',
      minutes: 8,
      body: `
<p>The Market module described leads and followers as a fact of subscription life. This lesson looks at the same structure as a set of <em>business models</em> — because who leads, who follows, and who gets paid what for which is one of the market’s liveliest strategic battlegrounds.</p>
<h3>What leading really costs — and earns</h3>
<p>A lead underwriter does the expensive work: risk analysis, negotiation, wording, claims agreement, client relationships. Traditionally the reward was influence and information (seeing every risk first, shaping terms) rather than extra pay — lead and follower earn the same rate on their lines. Increasingly, leaders monetise the role explicitly:</p>
<ul>
<li><strong>Consortium arrangements</strong> (Market module) where the leader underwrites for the group and charges the followers a fee or commission override for the service.</li>
<li><strong>Managing other people’s capacity</strong> — sidecars and quota shares of the leader’s book (previous lesson), where followers pay ceding commissions and profit shares to ride the lead’s underwriting.</li>
<li><strong>Data</strong> — a lead’s pricing and claims dataset across thousands of risks it shaped is itself an asset followers lack.</li>
</ul>
<h3>The rise of efficient following</h3>
<p>If following adds little analysis, it should cost little. Hence a wave of structures aimed at stripping expense from follow capacity:</p>
<ul>
<li><strong>Broker facilities</strong> — a broker pre-arranges follow capacity (say 20% of every qualifying risk it places) with a carrier, in exchange for enhanced commission. Efficient — and controversial: the broker is paid more by the insurer whose line it controls, a conflict the conduct regulator watches.</li>
<li><strong>Algorithmic followers</strong> — carriers (including purpose-built “smart tracker” syndicates at Lloyd’s) that follow chosen leads by rule, with minimal staff, at expense ratios far below the market’s ~35–40%.</li>
<li><strong>Portfolio participations</strong> — taking broad quota shares of a whole market segment rather than underwriting risk by risk.</li>
</ul>
<h3>The strategic question</h3>
<p>Efficient following poses a real challenge to mid-sized carriers with full cost bases but little lead influence: they pay lead-level expenses for follow-level insight. The stable end-state most strategists sketch: a smaller number of genuine lead franchises earning fees and influence, plus pools of cheap, systematic follow capital — with the squeezed middle forced to pick a side. Wherever you work, it is worth knowing which side of that line your business model sits on.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>Two carriers each have a 10% line on the same £2m-premium risk (£200,000 each). Carrier A led: its underwriters spent days on engineering analysis and negotiated the wording; its expense ratio on the class is 38%. Carrier B followed via a broker facility at a 3% enhanced commission with a skeleton team; its expense ratio is 24% (including the enhanced commission). Same premium, same claims. At a 60% loss ratio, A makes 2% margin and B makes 16% — an eight-fold difference for identical risk. A’s consolation: it chose the terms both of them ride on, and it can charge for that — via a consortium fee — next year.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Leading earns <strong>influence, information and (increasingly) fees</strong>; following earns whatever margin survives its cost base. The market is polarising into lead franchises and cheap systematic followers — and every carrier needs to know which it is.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Two carriers hold identical 8% lines earning £160,000 each on a risk running a 62% loss ratio. Carrier A’s expense ratio is 37%; carrier B’s is 25%. What is carrier B’s underwriting profit on the line, in £?',
          answer: 20800, tol: 500, unit: '£',
          explain: 'B’s combined ratio = 62 + 25 = 87%; margin 13% × £160,000 = £20,800. (A makes just £1,600 — the expense gap is the whole story.)' },
        { type: 'mc',
          q: 'What is a broker facility?',
          options: [
            'A broker’s office at Lloyd’s',
            'A pre-arranged commitment of follow capacity to a share of qualifying risks the broker places, usually in exchange for enhanced commission',
            'A loan from a broker to an insurer',
            'The broker’s claims-handling team'
          ],
          answer: 1,
          explain: 'Facilities industrialise following — efficient for all sides, but the enhanced commission paid by the very insurer whose capacity the broker directs creates the conflict regulators scrutinise.' },
        { type: 'mc',
          q: 'Why do consortium arrangements let a lead underwriter earn more than its own line?',
          options: [
            'Consortium leads are exempt from brokerage',
            'The lead underwrites on behalf of the group’s combined capacity and charges the members fees or commission overrides for that service',
            'Consortium lines never suffer losses',
            'Lloyd’s subsidises consortium leaders'
          ],
          answer: 1,
          explain: 'The consortium converts underwriting skill into fee income on other people’s capacity — the subscription market’s native version of the underwriter–capital split.' },
        { type: 'mc',
          q: 'Which carrier is most strategically exposed in a market polarising between lead franchises and cheap systematic followers?',
          options: [
            'A recognised lead with proprietary data and consortium fee income',
            'A low-cost algorithmic follower',
            'A mid-sized carrier with a full expense base but little lead influence — paying lead costs for follow insight',
            'A collateralised fund following via quota shares'
          ],
          answer: 2,
          explain: 'The squeezed middle pays for capabilities it cannot monetise. The strategic prescription is to become a genuine lead in chosen niches or strip cost and follow efficiently.' }
      ]
    }
  ]
});
