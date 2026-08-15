/* Module 10 — Regulation, Accounting & The Big Picture */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'regulation',
  icon: '🏰',
  title: 'Regulation, Accounting & The Big Picture',
  tagline: 'Who watches the market, how results are measured, and how it all connects',
  cii: 'LM1 · LM2',
  blurb: 'The regulators and their remits, the Lloyd’s three-year accounting tradition and reinsurance to close, modern reporting, conduct and financial crime — and a capstone that follows one risk through everything you have learned.',
  badge: { icon: '🏰', name: 'Market Guardian', desc: 'Master “Regulation, Accounting & The Big Picture”.' },
  lessons: [
    {
      id: 'regulators',
      title: 'Who regulates the London market',
      minutes: 8,
      body: `
<p>A London market carrier answers to several supervisors at once, each with a distinct remit. Knowing who cares about what explains much of the reporting and governance you see around you.</p>
<h3>The twin peaks</h3>
<p>United Kingdom financial regulation splits into two authorities:</p>
<ul>
<li><strong>The Prudential Regulation Authority</strong> (part of the Bank of England) — supervises safety and soundness: capital adequacy (the Solvency UK regime from the Capital module), reserving, reinsurance, risk management, and approval of senior individuals. Its lens: could this firm fail and hurt policyholders or the system?</li>
<li><strong>The Financial Conduct Authority</strong> — supervises conduct: fair treatment of customers, product value, claims handling, market integrity, competition. Its lens: is this firm treating customers and markets properly? Brokers are regulated primarily by the conduct authority.</li>
</ul>
<h3>Lloyd’s: the third supervisor</h3>
<p>Inside Lloyd’s, managing agents face an additional layer — the Corporation’s oversight described throughout this course: business-plan approval, capital setting with the economic uplift, performance management, realistic disaster scenario returns, minimum standards. Lloyd’s itself is supervised by both statutory regulators, and its own rules must satisfy them. In practice, a syndicate experiences Lloyd’s as its most hands-on supervisor.</p>
<h3>The senior managers regime</h3>
<p>Named individuals — chief executive, chief underwriting officer, chief risk officer, chief actuary and others — hold formal regulatory responsibility for their areas under the senior managers and certification regime. Personal accountability (with fitness-and-propriety assessment and potential personal sanction) is designed to make governance real rather than ornamental.</p>
<h3>Beyond the United Kingdom</h3>
<p>London business is global, so overseas rules follow the risk: United States surplus-lines requirements and state regulation, European Union rules for European risks written through European subsidiaries or branches established after Brexit, local licensing wherever the market’s licences operate. The Lloyd’s international licence network handles much of this centrally — a core part of the value of writing at Lloyd’s — while company market carriers maintain their own licence networks.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>One managing agent, one year: the Prudential Regulation Authority reviews its internal model change; the Financial Conduct Authority examines its delegated-authority claims handling for fair customer outcomes; Lloyd’s challenges its business plan’s growth in an underpriced class and its Florida windstorm scenario against tolerance; and its chief actuary personally attests to reserve adequacy under the senior managers regime. Four supervisory conversations, four different questions, one firm.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Twin peaks: <strong>prudential (will you stay solvent?) and conduct (are you treating customers fairly?)</strong> — plus Lloyd’s as a third, hands-on supervisor for syndicates, and named senior individuals personally on the hook.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Which regulator’s core question is “does this firm hold enough capital and reserves to stay solvent”?',
          options: [
            'The Financial Conduct Authority',
            'The Prudential Regulation Authority',
            'The Information Commissioner',
            'The Competition and Markets Authority'
          ],
          answer: 1,
          explain: 'Prudential = safety and soundness: capital, reserving, risk management. Conduct is the other peak.' },
        { type: 'mc',
          q: 'A syndicate’s claims handling under a delegated authority is producing slow, poor outcomes for small customers. Which supervisor’s remit is most directly engaged?',
          options: [
            'The Prudential Regulation Authority',
            'The Financial Conduct Authority (conduct and fair customer treatment) — with Lloyd’s oversight interest too',
            'The Bank of England’s monetary policy committee',
            'No supervisor — claims are a private matter'
          ],
          answer: 1,
          explain: 'Customer outcomes are conduct territory. Delegated-authority claims handling for consumers and small businesses is a recurring conduct focus, and Lloyd’s minimum standards apply as well.' },
        { type: 'mc',
          q: 'What does the senior managers and certification regime change about accountability?',
          options: [
            'It makes the board collectively anonymous',
            'Named individuals hold formal personal responsibility for defined areas, with fitness assessment and potential personal sanction',
            'It transfers liability to Lloyd’s',
            'It applies only to brokers'
          ],
          answer: 1,
          explain: 'Personal accountability of named senior managers is the regime’s point: governance failures trace to responsible individuals, not just the corporate entity.' },
        { type: 'mc',
          q: 'Why do Lloyd’s syndicates often describe Lloyd’s as their most hands-on supervisor?',
          options: [
            'Because Lloyd’s sets premium rates directly',
            'Because Lloyd’s approves business plans, sets member capital, monitors performance and scenarios — granular interventions statutory regulators rarely make',
            'Because the statutory regulators have no power over syndicates',
            'Because Lloyd’s pays their claims'
          ],
          answer: 1,
          explain: 'Statutory regulators supervise the framework; Lloyd’s supervises the plan itself, line by line — a level of commercial intrusion unique to the market.' }
      ]
    },
    {
      id: 'international',
      title: 'Trading the world: licences, surplus lines and premium taxes',
      minutes: 9,
      body: `
<p>A London policy on a Chilean mine or a Texan warehouse is a cross-border financial transaction — and every territory has rules about who may insure its risks and what tax the premium owes. This machinery, largely invisible until it goes wrong, is core London market practice.</p>
<h3>The starting rule: risks need licensed insurers</h3>
<p>Most countries require insurance of local risks to be written by an insurer <strong>licensed (admitted)</strong> there — consumer protection logic: a local regulator, local rules, someone to sue at home. Writing without a licence (“non-admitted”) ranges from freely permitted, through permitted-with-conditions, to criminal, territory by territory (the Global Programmes lesson met this map from the buyer’s side). So the first question on any risk is: <strong>where is it located, and may we write it from London?</strong> — which is exactly what the Market Reform Contract’s Fiscal & Regulatory section documents.</p>
<h3>Lloyd’s answer: the licence network</h3>
<p>A core part of what Lloyd’s sells its market is <strong>licences in bulk</strong>: authorisations to write business across 200+ territories, maintained centrally, with local representatives and deposits where required — so a new syndicate trades globally from day one. Post-Brexit, European risks are served through a Lloyd’s subsidiary insurer in Brussels rather than the old passporting rights: a structural workaround worth knowing because it shows how licensing shapes corporate structure.</p>
<h3>The United States: surplus lines and reinsurance trusts</h3>
<p>The market’s biggest territory has its own two doors:</p>
<ul>
<li><strong>Direct insurance</strong> mostly enters as <strong>surplus lines</strong>: US states permit “eligible” non-admitted insurers (Lloyd’s prominent among them) to write risks the admitted market declines, placed through specially licensed surplus lines brokers, historically after a “diligent search” of the admitted market, with a state surplus lines tax on the premium.</li>
<li><strong>Reinsurance</strong> of US insurers is supported by <strong>credit-for-reinsurance</strong> rules: for a US cedant to take balance-sheet credit for its recoveries, the overseas reinsurer historically had to collateralise via US trust funds — the ring-fenced American trust funds mentioned in the Premium module. Reforms (reciprocal-jurisdiction status) have eased this for well-regulated markets, but the trust-fund architecture still shapes how Lloyd’s holds assets.</li>
</ul>
<h3>Premium taxes: the state’s slice</h3>
<p><strong>Insurance premium taxes</strong> are levied on premium (not profit) by the risk’s territory — rates and rules varying wildly by country, state and class. The insurer or broker typically must calculate, collect and remit them; on multi-country programmes the premium must first be <strong>allocated</strong> across territories so each gets its lawful slice. Misallocation is not an accounting quibble — it is unpaid tax in someone’s jurisdiction, with penalties and reputational consequences. This is why the Fiscal & Regulatory section exists, why global programmes agonise over allocation, and why “where is the risk?” is a tax question as much as a licensing one.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A programme covers property in three countries: 60% of the exposure in country A (premium tax 5%), 30% in country B (tax 10%), 10% in country C (no premium tax). Premium £2m, allocated by exposure. Tax: A: £1.2m × 5% = £60,000; B: £0.6m × 10% = £60,000; C: nil — <strong>£120,000</strong> total, collected on top of (or out of) the premium and remitted territory by territory. Now shade the allocation toward tax-free C to “save” tax, and you have not optimised — you have under-declared in A and B. Allocation must follow the genuine distribution of risk, documented and defensible.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Every risk has a location; the location determines <strong>licence</strong> (admitted, surplus lines, or via the Lloyd’s network) and <strong>tax</strong> (premium taxes, correctly allocated and remitted). The Fiscal & Regulatory section of the contract is where this due diligence lives — and getting it wrong is a compliance event, not a rounding error.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A £3m programme allocates 50% of exposure to a country with 6% premium tax, 25% to one with 12%, and 25% to one with no tax. What is the total premium tax, in £?',
          answer: 180000, tol: 2000, unit: '£',
          explain: '£1.5m × 6% = £90,000 plus £0.75m × 12% = £90,000 plus nil = £180,000 — computed territory by territory on the allocated premium.' },
        { type: 'mc',
          q: 'Through which mechanism does most direct (non-reinsurance) London market business enter the United States?',
          options: [
            'Ordinary admitted licences in every state',
            'Surplus lines: eligible non-admitted insurers writing risks the admitted market declines, via specially licensed surplus lines brokers, with a state premium tax',
            'A federal insurance licence',
            'It cannot — the US is closed to London insurers'
          ],
          answer: 1,
          explain: 'Surplus lines is the deliberate US channel for hard-to-place risks — eligibility lists, specialist brokers, diligent-search traditions and its own tax.' },
        { type: 'mc',
          q: 'Why were US trust funds historically required of overseas reinsurers like Lloyd’s?',
          options: [
            'To pay US federal income tax',
            'Credit for reinsurance: US cedants could only count recoveries from a collateralised reinsurer, so assets had to sit ring-fenced in the US',
            'To fund the Central Fund',
            'To pay surplus lines brokers'
          ],
          answer: 1,
          explain: 'The collateral protected US cedants and their policyholders from overseas non-payment. Reciprocal-jurisdiction reforms have eased the requirement, but the trust architecture persists.' },
        { type: 'mc',
          q: 'Why is deliberately shading a programme’s premium allocation toward low-tax territories dangerous rather than clever?',
          options: [
            'It increases brokerage',
            'Allocation must reflect the genuine distribution of risk: shading it under-declares premium — and tax — in the higher-tax territories, a compliance breach with penalties',
            'Because premium taxes are voluntary',
            'It voids the reinsurance'
          ],
          answer: 1,
          explain: 'Premium tax follows the risk’s real location. Artificial allocation is under-payment of someone’s tax, not optimisation — the reason allocation methodologies are documented and defensible.' }
      ]
    },
    {
      id: 'yoa-ritc',
      title: 'Three-year accounting and reinsurance to close',
      minutes: 9,
      body: `
<p>Lloyd’s measures underwriting results in a way found nowhere else in insurance: the <strong>three-year accounting</strong> tradition built around the year of account. It shapes capital, profit release and even how careers are judged.</p>
<h3>Why three years?</h3>
<p>Recall (Market module) that every policy belongs to the year of account in which it incepts. A year of account traditionally stays <strong>open for 36 months</strong>: time for nearly all premium to be signed (binder premium, adjustments and late processing — Premium module) and for claims to develop enough that the result is estimable with confidence. Only then is the year’s profit or loss declared and distributed to the members who backed it.</p>
<h3>Reinsurance to close</h3>
<p>A year cannot pay claims forever — casualty claims will still arrive decades later. So at 36 months the closing year buys <strong>reinsurance to close</strong>: a reinsurance contract transferring <em>all its remaining liabilities</em> (known outstanding claims plus incurred-but-not-reported) to the next open year of account, in exchange for a premium equal to the estimated value of those liabilities. The 2023 year closes into the 2024 year; members of 2023 are released; members of 2024 (often, but not necessarily, the same people in the same proportions) now stand behind the old liabilities alongside their own.</p>
<h3>Why the premium matters so much</h3>
<p>The reinsurance-to-close premium is an estimate of ultimate claims — the Claims module’s hardest problem. Set it too low and the receiving year’s members subsidise the closing year’s; too high and the reverse. This intergenerational fairness problem is why an independent <strong>statement of actuarial opinion</strong> is required on reserves, and why reinsurance to close receives intense actuarial and audit scrutiny. If liabilities are too uncertain to estimate — the asbestos years — the year cannot close and stays open as a <strong>run-off year</strong>, trapping its members’ capital (the crisis that led to Equitas).</p>
<h3>Legacy: run-off as a business</h3>
<p>Beyond Lloyd’s mechanics, a whole <strong>legacy market</strong> exists to buy old liabilities: run-off specialists acquire reserves (through reinsurance-to-close transactions, retrospective reinsurance, or company transfers), betting they can settle claims for less than the premium received. Live carriers use them to exit discontinued classes and free capital — an increasingly routine portfolio-management tool.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>Syndicate 4242’s 2023 year of account reaches 31 December 2025 (36 months). Its remaining liabilities are estimated: outstanding case reserves £180m plus incurred-but-not-reported £140m = £320m. The 2023 year pays a £320m reinsurance-to-close premium to the 2024 year and declares its result: premiums earned £900m, claims paid £310m, expenses £270m, reinsurance-to-close premium £320m → written result £0m... every £10m the reserve estimate is light flows straight to the 2024 members as future loss. The signing actuary’s opinion on that £320m is not a formality.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>A Lloyd’s year lives for 36 months, then <strong>closes by transferring all remaining liabilities to the next year for a premium equal to their estimated value</strong>. That estimate is an intergenerational fairness question — and when it cannot be made, years stay open in run-off.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A closing year of account has outstanding case reserves of £210m and incurred-but-not-reported of £160m. What reinsurance-to-close premium (£ millions) transfers its liabilities at best estimate?',
          answer: 370, tol: 2, unit: '£ millions',
          explain: 'The premium equals the estimated remaining liabilities: 210 + 160 = £370m, paid by the closing year to the receiving year.' },
        { type: 'mc',
          q: 'Who bears the loss if a reinsurance-to-close premium turns out to have been set £50m too low?',
          options: [
            'The members of the closed year, who are recalled to pay',
            'The members of the receiving (later) year of account, who took on the liabilities for inadequate premium',
            'The policyholders, whose claims are cut',
            'The brokers'
          ],
          answer: 1,
          explain: 'Closure releases the old year’s members; deterioration lands on the year that accepted the liabilities. That intergenerational transfer is why the estimate is so heavily scrutinised.' },
        { type: 'mc',
          q: 'When does a year of account go into run-off instead of closing?',
          options: [
            'Whenever profits are too large to distribute',
            'When its remaining liabilities are too uncertain to estimate reliably, so no fair reinsurance-to-close premium can be set',
            'When Lloyd’s needs extra capital',
            'Every fifth year automatically'
          ],
          answer: 1,
          explain: 'No credible estimate, no closure: the year stays open, reporting annually, its members’ capital locked — the fate of the asbestos-era years before Equitas.' },
        { type: 'mc',
          q: 'What service does the legacy (run-off) market provide to live carriers?',
          options: [
            'Cheap retrocession for new catastrophe business',
            'Buying old liabilities — discontinued classes, old years — so carriers can exit cleanly and release capital',
            'Providing underwriting staff',
            'Regulating closed syndicates'
          ],
          answer: 1,
          explain: 'Legacy specialists acquire and run off old reserves for a price, converting an uncertain long tail into a known exit cost and freeing the seller’s capital for live business.' }
      ]
    },
    {
      id: 'reporting',
      title: 'Modern reporting: from technical provisions to the result announcement',
      minutes: 8,
      body: `
<p>Alongside the Lloyd’s three-year tradition, every carrier reports on modern accounting bases. You do not need to be an accountant to work in the market — but you do need to recognise what each basis is trying to say.</p>
<h3>The bases you will meet</h3>
<ul>
<li><strong>Annual accounting (generally accepted accounting principles)</strong> — the conventional company view: premiums earned, claims incurred (including movements in reserves), expenses, investment income, profit — all for the calendar year, across all years of account combined. Lloyd’s publishes market results on this basis too, alongside the year-of-account view.</li>
<li><strong>International Financial Reporting Standard 17</strong> — the global insurance accounting standard (effective 2023) used in listed groups’ accounts. Its vocabulary: fulfilment cash flows (discounted best-estimate liabilities plus a risk adjustment) and the <strong>contractual service margin</strong> — unearned profit recognised as service is provided. Its headline effect: profit emerges as cover is delivered, losses on onerous contracts are recognised immediately, and discounting is explicit.</li>
<li><strong>Solvency reporting</strong> — the regulatory balance sheet from the Capital module: market-consistent technical provisions, own funds, capital requirement coverage.</li>
</ul>
<p>Same business, three lenses: they will show different profit in any given year, and reconciling them is a routine finance task. What never changes underneath: cash premium in, cash claims and expenses out, and the movement in estimated liabilities.</p>
<h3>Reading a London market result</h3>
<p>When a carrier announces results, the disciplined reading order is:</p>
<ol>
<li><strong>Combined ratio</strong> — and its split: attritional loss ratio, catastrophe losses, prior-year reserve development, expense ratio. Each tells a different story (Pricing and Claims modules).</li>
<li><strong>Prior-year development</strong> — releases flatter the year; strengthening is the alarm bell. Persistent releases can also mean past over-caution unwinding.</li>
<li><strong>Rate change versus claims inflation</strong> — is the underlying margin building or eroding?</li>
<li><strong>Investment result</strong> — increasingly material when interest rates are higher; remember long-tail float.</li>
<li><strong>Capital position</strong> — solvency coverage, and what the plan implies for capital needs.</li>
</ol>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A carrier reports a 91% combined ratio. Decomposition: attritional loss ratio 51%, catastrophes 9%, prior-year releases −4%, expenses 35%. The print looks strong — but notice: 4 points came from releasing old reserves (non-repeatable), catastrophes were below the 12-point annual average (luck), and rate change of +2% trails claims inflation of 6% (margin eroding ~4 points a year). Underlying, next year looks more like 91 + 4 (normal cats) + 4 (no releases) + 4 (margin erosion) ≈ 103% unless pricing responds. One number, two very different stories — this decomposition habit is possibly the single most useful skill this course can leave you with.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Three reporting lenses — annual accounts, the 2023 international standard, and solvency — describe one underlying reality. Read results by <strong>decomposition</strong>: attritional, catastrophe, prior-year development, expenses, and rate versus inflation.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A result shows attritional loss ratio 54%, catastrophe losses 11%, prior-year releases of 3 points (i.e. −3%), and expense ratio 36%. What is the combined ratio, in %?',
          answer: 98, tol: 0.2, unit: '%',
          explain: '54 + 11 − 3 + 36 = 98%. The release contributed 3 points of the profit — worth knowing when judging repeatability.' },
        { type: 'mc',
          q: 'Under the 2023 international accounting standard, what is the contractual service margin?',
          options: [
            'The broker’s commission',
            'The unearned profit in a group of contracts, held back and recognised as the insurance service is delivered',
            'The regulatory minimum capital',
            'The discount rate applied to claims'
          ],
          answer: 1,
          explain: 'The contractual service margin spreads profit recognition over the coverage period — while expected losses on onerous contracts hit the accounts immediately.' },
        { type: 'mc',
          q: 'A carrier’s headline combined ratio improved from 97% to 94%, driven entirely by prior-year reserve releases growing from 1 to 5 points. What should an analyst conclude about the current year’s business?',
          options: [
            'It improved by 3 points',
            'It actually deteriorated: excluding development, the current-year ratio worsened from 98% to 99% — the improvement is old years’ profit, not new business quality',
            'Nothing can ever be concluded from combined ratios',
            'The reserves must be understated'
          ],
          answer: 1,
          explain: 'Strip development to see the current accident year: 97+1=98 versus 94+5=99. Decomposition reverses the headline story — exactly why the habit matters.' },
        { type: 'mc',
          q: 'Why does investment income matter more to a long-tail carrier than a short-tail one?',
          options: [
            'Long-tail carriers are better investors',
            'Premium is held for many years before claims are paid, so the investable float is much larger relative to premium',
            'Short-tail carriers may not invest premiums',
            'It does not differ'
          ],
          answer: 1,
          explain: 'Casualty premium may sit invested for a decade before final settlement; property premium may be paid out within two years. Float scales with tail.' }
      ]
    },
    {
      id: 'conduct',
      title: 'Conduct, sanctions and financial crime',
      minutes: 8,
      body: `
<p>The market’s licence to operate rests on more than solvency. Conduct failures — unfair products, mishandled claims, sanctions breaches — can cost more in fines, remediation and reputation than a bad underwriting year.</p>
<h3>Customer outcomes and product value</h3>
<p>Conduct regulation has moved from “don’t mislead” to a positive duty: products must deliver <strong>fair value</strong> to the end customer, communications must support good decisions, and firms must evidence customer outcomes (in the United Kingdom, the Consumer Duty for retail-touching business). For a wholesale market this bites hardest in <strong>delegated authority</strong>: the syndicate may be three intermediaries away from a consumer buying a mobile-phone policy, yet remains responsible for the product’s value and claims service at the end of the chain. Distribution-chain oversight — who takes what commission for what work — is a live regulatory theme.</p>
<h3>Sanctions</h3>
<p>Insurance is a financial service, so <strong>sanctions regimes</strong> (United Nations, United Kingdom, United States, European Union) bind the market absolutely: no cover, no claims payment, no premium acceptance for sanctioned persons, entities or activities. Marine and energy books feel this daily — vessels, cargoes, ports and counterparties are screened continuously, and the Russia-related regimes since 2022 (including oil price-cap attestation requirements on shipping insurance) turned sanctions from a compliance checkbox into a front-line underwriting issue. Breaches carry criminal exposure — and United States dollar settlement means United States rules reach far beyond United States risks.</p>
<h3>Financial crime and the market’s own integrity</h3>
<ul>
<li><strong>Money laundering</strong> — premium flows can disguise dirty money; know-your-customer discipline applies to insureds, coverholders and claim payees.</li>
<li><strong>Bribery and corruption</strong> — international placements, intermediaries and claims settlements in high-risk jurisdictions demand third-party due diligence.</li>
<li><strong>Claims fraud</strong> — exaggerated or invented claims (including sophisticated trade-credit and cargo frauds using duplicate documents) are priced into loss ratios but policed hard.</li>
<li><strong>Market conduct</strong> — the non-financial kind matters too: the market has faced public reckonings over workplace culture, and regulators treat non-financial misconduct as a fitness-and-propriety issue for senior managers.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A marine underwriter is offered hull cover for a tanker fleet through a new overseas coverholder. Screening flags: two vessels recently renamed and reflagged, ownership through nominee companies in a secrecy jurisdiction, and voyage patterns consistent with a sanctioned oil trade. The premium is attractive; the correct answer is still no — and a report to the money-laundering reporting officer. If cover had been bound and a claim paid, the carrier could face regulatory penalties, criminal exposure and loss of its United States dollar clearing relationships — a cost no premium covers.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Conduct duties follow the product to the end customer — <strong>through every link of the delegated chain</strong> — and sanctions screening is an absolute constraint that no pricing can compensate. The cheapest premium in the market is the one you rightly declined.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'A syndicate’s consumer product is sold via a broker, a managing general agent and a retailer, stacking 55% of premium in distribution costs before claims. Why is this a conduct problem for the syndicate?',
          options: [
            'It is not — distribution costs are the intermediaries’ business',
            'The syndicate remains responsible for the product delivering fair value to the end customer, and a product where most premium never funds claims struggles to be fair value',
            'Because commissions are illegal above 50%',
            'Because Lloyd’s takes a share of commissions'
          ],
          answer: 1,
          explain: 'Product-value responsibility travels down the chain to the manufacturer of the insurance — the carrier. Excessive distribution stacking is a defining fair-value concern in delegated business.' },
        { type: 'mc',
          q: 'Why do United States sanctions rules constrain even non-United States London market business?',
          options: [
            'They don’t',
            'Because much market business settles in United States dollars and touches United States persons or systems, bringing United States jurisdiction with it',
            'Because Lloyd’s is a United States company',
            'Because all reinsurance is bought in the United States'
          ],
          answer: 1,
          explain: 'Dollar clearing and United States nexus give United States rules extraordinary extraterritorial reach — losing dollar-clearing access is an existential commercial threat.' },
        { type: 'mc',
          q: 'A claims payee on a cargo claim turns out to be a newly designated sanctioned entity. What must the carrier do?',
          options: [
            'Pay quickly before the designation takes effect',
            'Freeze the payment and follow sanctions procedures — payment to a sanctioned party is prohibited even for a valid claim',
            'Pay into a third-country account',
            'Deduct a sanctions surcharge'
          ],
          answer: 1,
          explain: 'Sanctions override contract: valid claims to designated parties cannot be paid. Licences or escrow arrangements are matters for the sanctions authorities, not workarounds.' },
        { type: 'mc',
          q: 'Which statement about “know your customer” duties in the London market is correct?',
          options: [
            'They apply only to retail banks',
            'They extend across insureds, coverholders and claim payees — anyone through whom criminal funds could flow',
            'They are satisfied by checking the broker’s licence',
            'They apply only above £100m of premium'
          ],
          answer: 1,
          explain: 'Anti-money-laundering diligence follows the money: premium sources and claims destinations both matter, especially across long intermediary chains.' }
      ]
    },
    {
      id: 'capstone',
      title: 'Capstone: one risk, end to end',
      minutes: 10,
      body: `
<p>Finish by assembling everything: follow a single risk through the entire machine you now understand.</p>
<h3>1. The risk arrives</h3>
<p>A Chilean copper mine wants US$600m of property and business-interruption cover. Its local broker partners with a London wholesale broker, who structures a programme: a US$50m local layer, then London layers up to US$600m, with a 75% order to London <em>(Market module)</em>.</p>
<h3>2. Placement</h3>
<p>A specialist mining underwriter leads the US$150m xs US$50m layer at a 0.9% rate on line, after engineering review of the mine’s data <em>(Pricing module)</em>. Followers subscribe on the electronic platform; written lines reach 130% and sign down pro rata. Premium flows through central settlement, less 15% brokerage; each carrier books its signed share, earning it over the 12-month period <em>(Premium module)</em>.</p>
<h3>3. The portfolio view</h3>
<p>Each carrier’s exposure management logs the layer against its Chile earthquake aggregate — the mine sits in a high-hazard zone. The catastrophe model adds it to the exceedance-probability curve; one carrier finds its 1-in-100 Chile occurrence loss now breaches appetite and buys additional facultative protection <em>(Exposure and Reinsurance modules)</em>.</p>
<h3>4. Capital consequences</h3>
<p>The new business flows into each syndicate’s internal model: premium risk, catastrophe risk, reinsurance credit risk. The syndicate’s capital requirement ticks up; members’ funds at Lloyd’s must cover it with the 35% economic uplift at the next coming into line <em>(Capital module)</em>.</p>
<h3>5. The event</h3>
<p>An earthquake strikes. Ground-up loss: US$380m damage plus business interruption. The broker notifies the market; the lead and second agreement party appoint adjusters and agree interim payments; each follower pays its signed share of each settlement <em>(Claims module)</em>. Carriers book gross reserves, reinsurance recoveries on their per-event towers, and reinstatement premiums payable — net positions computed across every treaty <em>(Reinsurance module)</em>.</p>
<h3>6. The aftermath</h3>
<p>Reserving actuaries hold incurred-but-not-reported for slow-emerging elements (contingent business interruption from damaged ports). The year of account carries the loss; three years on, its remaining liabilities transfer by reinsurance to close, scrutinised by the signing actuary <em>(Regulation module)</em>. Exposure managers feed the event back: did the model predict this loss? Rate on line on Chilean risks rises at renewal; the cycle turns a notch <em>(Pricing module)</em>.</p>
<h3>The one-paragraph summary of the whole course</h3>
<p>The London market is a machine for <strong>pooling specialist judgement and capital against the world’s hardest risks</strong>: brokers bring risk to subscription; underwriters select and price it; premium waterfalls down to net; exposure management polices what accumulates; reinsurance reshapes it; capital — sized to a one-in-200 standard — stands behind it; claims teams honour it; reserves estimate what remains; and regulation, ratings and mutual security make the whole thing credible enough that a mine in Chile will pay for a promise made in a room in London.</p>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Every function you have studied is one organ of a single organism. When you meet a number at work — a premium booking, a reserve movement, a capital charge — you can now place it in the chain: <strong>placement → premium → exposure → reinsurance → capital → claims → reserves → close</strong>.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'In the capstone: the lead layer is US$150m xs US$50m and the earthquake causes a US$380m ground-up insured loss. London holds a 75% order of the layer. How much do the layer’s London subscribers collectively pay, in US$ millions?',
          answer: 112.5, tol: 0.5, unit: 'US$ millions',
          explain: 'The layer is fully consumed (loss far exceeds 50 + 150). London’s 75% order of the US$150m layer = US$112.5m, shared by signed lines.' },
        { type: 'num',
          q: 'The lead wrote 20% of the layer, signed down from 130% total written lines. What is the lead’s share of that US$112.5m London layer loss, in US$ millions?',
          answer: 17.31, tol: 0.25, unit: 'US$ millions',
          explain: 'Signed line = 20 ÷ 130 ≈ 15.38%; × US$112.5m ≈ US$17.31m — placement mathematics determining a claims cash flow years later.' },
        { type: 'mc',
          q: 'Which chain correctly orders the life of the capstone risk?',
          options: [
            'Claims agreement → placement → capital setting → reinsurance to close',
            'Placement and signing → premium booking and earning → aggregate/capital impact → event and claims → recoveries and reserving → year of account closure',
            'Reinsurance to close → placement → premium → claims',
            'Capital setting → claims → placement → premium'
          ],
          answer: 1,
          explain: 'Risk flows through the machine in that order — and every module of this course governs one stage of it.' },
        { type: 'mc',
          q: 'After the earthquake, one follower’s reinsurance recoveries exceed 80% of its gross loss, and its next-year treaty costs jump sharply. What market dynamic does this illustrate?',
          options: [
            'Central settlement failure',
            'The cycle: heavy reinsurance recoveries transfer the pain upward, and reinsurers reprice at renewal — hardening flows through the chain',
            'A breach of the several liability principle',
            'An error in the signing process'
          ],
          answer: 1,
          explain: 'Losses travel up the risk-transfer chain and pricing corrections travel back down — the market cycle propagating exactly as the Pricing module described.' }
      ]
    }
  ]
});
