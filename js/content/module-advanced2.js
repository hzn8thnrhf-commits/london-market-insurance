/* Module 14 — Advanced Practitioner II: Models, Portfolios & Practice */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'advanced2',
  icon: '📊',
  title: 'Advanced Practitioner II: Models & Portfolios',
  tagline: 'View of risk, cat pricing, reserve ranges and running a book',
  blurb: 'The second advanced set: building a house view of catastrophe risk, pricing catastrophe layers from the curve, quantifying reserve uncertainty, the syndicate planning year, portfolio management information, and global programmes with captives.',
  badge: { icon: '📊', name: 'Portfolio Practitioner', desc: 'Master “Advanced Practitioner II: Models & Portfolios”.' },
  lessons: [
    {
      id: 'view-of-risk',
      title: 'Building a view of risk: blending and validating catastrophe models',
      minutes: 9,
      body: `
<p>The Exposure module treated the catastrophe model as a given. Mature carriers go a step further: they own a <strong>view of risk</strong> — a considered, documented position on what the hazard really is — and treat vendor models as inputs to it, not oracles.</p>
<h3>Why a house view is necessary</h3>
<ul>
<li><strong>Vendors disagree</strong> — two leading models can differ by 30–50% on the same portfolio’s 1-in-100 loss, because they encode different science on hazard frequency, severity and damage.</li>
<li><strong>Models have gaps</strong> — secondary perils (wildfire, flood in some territories), post-event loss amplification, litigation and demand surge are unevenly captured; some perils have no model at all.</li>
<li><strong>The past is drifting</strong> — climate trends, exposure growth in coastal zones and inflation mean history under-represents tomorrow; a house view decides how far to adjust.</li>
</ul>
<h3>The toolkit</h3>
<ul>
<li><strong>Blending</strong> — weighting two or more models (say 60/40) by peril and region, based on validation evidence rather than convenience.</li>
<li><strong>Adjustments</strong> — explicit loadings on model output: frequency uplifts for climate-sensitive perils, non-modelled peril loads, inflation trueing of insured values, loss-amplification factors.</li>
<li><strong>Validation</strong> — testing model output against the carrier’s own event experience, industry losses, and reasonableness checks (does the model’s Miami hurricane look like engineering reality?). After every major event: did reality land inside the model’s range?</li>
<li><strong>Governance</strong> — a model-change process with documented rationale, because moving weights moves capital, pricing and appetite all at once. Regulators and Lloyd’s expect exactly this discipline.</li>
</ul>
<h3>The practical consequence</h3>
<p>Every downstream number in this course — technical price, aggregate budget, scenario tolerance, one-in-200 capital — inherits the view of risk. Changing it is the single most consequential analytical decision a catastrophe-exposed carrier makes, which is why it is a committee matter, not a modeller’s preference.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>For Florida wind, Model A gives a 1-in-100 portfolio loss of £120m; Model B gives £170m. Validation against the carrier’s own last three landfall events shows Model B tracked actuals better on severity but over-counted frequency. The committee sets a 40/60 blend: 0.4 × 120 + 0.6 × 170 = <strong>£150m</strong>, then adds a 6% non-modelled load (storm-surge leakage and post-event amplification): <strong>£159m</strong> house-view 1-in-100. That number — not either vendor’s — now drives pricing loads, the reinsurance tower and the capital submission.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>A house <strong>view of risk = weighted models + explicit adjustments + validation + governance</strong>. Vendors inform it; the carrier owns it — and every price, limit and capital figure downstream inherits it.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Model A shows a 1-in-200 loss of £200m; Model B shows £260m. The house view blends 50/50 and adds a 5% non-modelled load. What is the house-view 1-in-200, in £ millions?',
          answer: 241.5, tol: 1, unit: '£ millions',
          explain: 'Blend = 230; ×1.05 = £241.5m. Weights and loads are explicit, documented decisions.' },
        { type: 'mc',
          q: 'Why do carriers blend vendor models rather than simply picking the “best” one?',
          options: [
            'Blending is cheaper than licensing one model',
            'Different models encode different defensible science; validation rarely crowns a single winner across all perils and regions, and blending reflects that genuine uncertainty',
            'Regulators prohibit single-model use in all cases',
            'Blending always produces lower numbers'
          ],
          answer: 1,
          explain: 'Model divergence is real scientific disagreement. A validated blend (with peril-by-peril weights) represents uncertainty more honestly than false confidence in one vendor.' },
        { type: 'mc',
          q: 'After a major hurricane, the carrier’s actual loss lands far outside the range its model gave for that event’s parameters. What should follow?',
          options: [
            'Nothing — single events prove nothing',
            'A structured post-event review: was the miss exposure data, model hazard/vulnerability, or non-modelled leakage — feeding adjustments to the house view and its governance trail',
            'Immediate switch to the other vendor',
            'Suppress the comparison'
          ],
          answer: 1,
          explain: 'Post-event validation is the sharpest evidence available. The diagnosis (data vs model vs non-modelled) determines the correct fix — and single events do carry real information about tails.' },
        { type: 'mc',
          q: 'Why is a model-weight change treated as a governance event rather than an analyst’s working choice?',
          options: [
            'Because model licences restrict changes',
            'Because the view of risk simultaneously moves pricing, aggregate budgets, reinsurance purchase and regulatory capital — a lever too consequential for undocumented change',
            'Because weights are set by brokers',
            'It is not — analysts change weights freely'
          ],
          answer: 1,
          explain: 'One number feeds everything downstream. Model-change control, documentation and committee sign-off are what make a house view defensible to boards, Lloyd’s and regulators.' }
      ]
    },
    {
      id: 'cat-pricing',
      title: 'From curve to price: catastrophe layer pricing',
      minutes: 9,
      body: `
<p>The Pricing module gave you rate on line as a market observation. This lesson builds it from first principles: how a catastrophe underwriter converts the model’s curve into a technical price for a layer.</p>
<h3>Step 1: expected loss to the layer</h3>
<p>The model’s event set gives a loss for every simulated event. Run each through the layer’s terms (attachment, limit, reinstatements) and average over all simulated years: the layer’s <strong>expected annual loss</strong>. Expressed as a percentage of limit this is the <strong>loss cost on line</strong> — the pure-risk floor beneath the rate on line.</p>
<h3>Step 2: load for volatility and capital</h3>
<p>Expected loss is not a price: a layer that pays nothing in 19 years and everything in the twentieth needs compensation for the pain of year twenty. Standard loadings:</p>
<ul>
<li><strong>Volatility load</strong> — commonly a share of the layer’s standard deviation of loss (a remote layer’s standard deviation dwarfs its mean, so this load dominates high layers).</li>
<li><strong>Cost of capital load</strong> — the capital the layer consumes (its contribution to the tail — co-measure logic from the first Advanced module) times the required return.</li>
<li><strong>Expenses and brokerage</strong> — the practical wedge between technical and market price.</li>
</ul>
<h3>Step 3: compare with the market and allocate capacity</h3>
<p>The market’s rate on line moves with the cycle; the technical price moves with the view of risk. The underwriter’s discipline is the ratio between them — writing more when market price exceeds technical (hard markets), less when it falls below (soft). Capacity is finite peak-zone aggregate, so it is allocated to the layers with the best price-to-technical ratios — portfolio optimisation in its most literal form.</p>
<h3>Reading the structure</h3>
<p>Low layers: expected loss dominates the price (frequency business — burning cost logic works). High layers: volatility and capital loads dominate (the expected loss may be a tenth of the premium). This is why high layers look “expensive” per unit of expected loss yet cheap per unit of limit — and why capital-rich entrants compete hardest at the top of towers.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A £50m xs £100m layer. From the event set: expected annual loss to the layer £3.0m (6% loss cost on line); standard deviation £12m. Technical price = expected loss + 15% of standard deviation + capital charge: 3.0 + 1.8 + (layer’s £20m capital contribution × 10% = 2.0) = <strong>£6.8m</strong>, a 13.6% technical rate on line, before expenses. If the market is paying 16%, the layer clears the hurdle with margin — write a full line. If the soft market offers 10%, the disciplined answer is a smaller line or none: the premium no longer pays for the year-twenty pain.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Technical price = <strong>expected layer loss + volatility load + cost of allocated capital + expenses</strong>. High layers are priced by their volatility and capital, not their expected loss — and cycle discipline is the ratio of market price to that technical price.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A £40m layer has expected annual loss of £2.4m, standard deviation £10m (loaded at 12%), and consumes £15m of capital at a 10% required return. What is the technical price before expenses, in £ millions?',
          answer: 5.1, tol: 0.1, unit: '£ millions',
          explain: '2.4 + (0.12 × 10) + (0.10 × 15) = 2.4 + 1.2 + 1.5 = £5.1m — a 12.75% technical rate on line.' },
        { type: 'num',
          q: 'That layer’s expected loss is £2.4m against a £40m limit. What is its loss cost on line, in %?',
          answer: 6, tol: 0.1, unit: '%',
          explain: '2.4 ÷ 40 = 6% — the pure-risk floor beneath whatever rate on line the market pays.' },
        { type: 'mc',
          q: 'Why do volatility and capital loads dominate the price of high, remote layers?',
          options: [
            'Because expected losses are highest there',
            'Because a remote layer’s losses are rare but huge: its standard deviation and tail-capital contribution are large relative to a small expected loss',
            'Because brokerage is higher on top layers',
            'Because regulators tax high layers'
          ],
          answer: 1,
          explain: 'The mean is small, the variance is not. Compensation for bearing rare, violent outcomes — not expected claims — is most of a top layer’s premium.' },
        { type: 'mc',
          q: 'The market rate on line for a layer falls below the carrier’s technical price. What does cycle discipline require?',
          options: [
            'Match the market to protect relationships and volume',
            'Shrink or decline the line: premium below technical price does not pay for the volatility and capital consumed, however long the layer has been loss-free',
            'Double the line to average down',
            'Move the layer into the reserve fund'
          ],
          answer: 1,
          explain: 'Loss-free years prove nothing for remote layers (the burning-cost trap). Writing below technical is the soft-market failure mode the whole framework exists to prevent.' }
      ]
    },
    {
      id: 'reserve-ranges',
      title: 'Reserve ranges: quantifying the uncertainty around the estimate',
      minutes: 9,
      body: `
<p>The Claims module produced a single “best estimate” of reserves. Boards, regulators and capital models all need more: <em>how wrong could it be?</em> This lesson covers how actuaries put a distribution around the number.</p>
<h3>Why a point estimate is not enough</h3>
<p>Reserve risk is typically the largest single risk on a mature carrier’s balance sheet (recall its place in the capital requirement). Decisions hang on the shape of uncertainty, not the centre: how much margin to book above best estimate, how much capital reserve risk consumes, whether to buy an adverse development cover — all distribution questions.</p>
<h3>The two standard machines</h3>
<ul>
<li><strong>Mack’s method</strong> — an analytic formula quantifying the standard error around a chain-ladder estimate, from the observed variability of the historical link ratios. Fast, transparent, but only gives a mean and variance (a distribution shape must be assumed).</li>
<li><strong>Bootstrapping</strong> — resample the triangle’s residuals thousands of times, re-run the reserving method on each pseudo-triangle, and collect the results: a full simulated distribution of reserve outcomes, ready to read percentiles from.</li>
</ul>
<p>Both share a sobering limitation: they quantify the uncertainty <em>visible in the triangle</em>. Regime changes — a new inflation environment, a legal shock, a latent peril — live outside the data, so practitioners add scenario overlays and treat model output as a floor on uncertainty, not the ceiling.</p>
<h3>Speaking the language</h3>
<p>Results are quoted as percentiles: “best estimate £400m; one-in-ten adverse outcome £460m; booked at the 70th percentile.” Uses:</p>
<ul>
<li><strong>Margin policy</strong> — boards often book above best estimate by a stated percentile target, making prudence explicit and consistent rather than hidden in assumptions.</li>
<li><strong>Capital</strong> — the one-year reserve deterioration distribution feeds the internal model directly.</li>
<li><strong>Transactions</strong> — loss portfolio transfer and adverse development cover pricing (Bespoke module) is percentile arithmetic: what does the seller charge to absorb the distribution above the attachment?</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A casualty account’s bootstrap gives: best estimate £300m, standard deviation £40m, 75th percentile £324m, 90th percentile £352m, 99.5th £412m. The board’s policy is to book at the 75th: carried reserves <strong>£324m</strong> (an explicit £24m margin). The internal model charges one-year reserve risk off the same distribution. When a legacy buyer quotes an adverse development cover attaching at £324m, its price of £22m is effectively selling the distribution above the 75th percentile — and comparing that £22m with the £28m of capital it would release is the whole transaction decision.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Mack and bootstrap turn a reserve estimate into a <strong>distribution</strong>; margins, capital and legacy deals are then percentile arithmetic. But triangles only reveal the uncertainty they contain — regime change lives outside the data, so add scenarios and humility.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Best estimate reserves are £500m and the board books at the 75th percentile, which the bootstrap puts at £532m. What explicit margin is being held, in £ millions?',
          answer: 32, tol: 0.5, unit: '£ millions',
          explain: '532 − 500 = £32m — prudence made explicit and reviewable, rather than hidden in individual assumptions.' },
        { type: 'mc',
          q: 'What does bootstrapping a claims triangle produce that Mack’s method does not?',
          options: [
            'A more accurate best estimate',
            'A full simulated distribution of reserve outcomes (read any percentile directly), rather than just a mean and standard error',
            'Freedom from all assumptions',
            'Faster computation'
          ],
          answer: 1,
          explain: 'Mack gives analytic moments; bootstrap gives the whole distribution by resampling residuals — at the cost of more machinery and the same underlying data limits.' },
        { type: 'mc',
          q: 'Why do practitioners treat triangle-based uncertainty measures as a floor rather than the full truth?',
          options: [
            'Because triangles are usually miscoded',
            'Because they only quantify variability present in historical data — inflation regime changes, legal shocks and latent perils sit outside the triangle entirely',
            'Because percentiles cannot exceed 99%',
            'Because regulators require doubling all ranges'
          ],
          answer: 1,
          explain: 'The bootstrap cannot simulate what the data never saw. Scenario overlays for regime risks are the standard supplement — the asbestos lesson applied to statistics.' },
        { type: 'num',
          q: 'A legacy specialist prices an adverse development cover attaching at the 80th percentile (£560m) with £60m of limit. Its modelled expected loss to the cover is £9m and it loads 100% for risk and expenses. What premium does it quote, in £ millions?',
          answer: 18, tol: 0.5, unit: '£ millions',
          explain: '9 × 2 = £18m — percentile arithmetic plus a heavy uncertainty load, typical for tail-of-distribution deals.' }
      ]
    },
    {
      id: 'planning-cycle',
      title: 'The planning year: how a syndicate’s plan, capital and monitoring interlock',
      minutes: 9,
      body: `
<p>Almost everything in this course converges once a year into a single artefact: the <strong>syndicate business plan</strong>. Understanding the planning rhythm explains half the meetings in any London market carrier’s calendar.</p>
<h3>The annual rhythm</h3>
<ol>
<li><strong>Plan construction (summer–autumn)</strong> — class by class: expected premium, rate change assumptions, loss ratios (attritional + large + catastrophe, built from pricing analysis and the view of risk), expense budgets, reinsurance structure and cost. Every assumption you have studied — rate adequacy, exposure curves, cat loads — lands in these rows.</li>
<li><strong>Capital submission</strong> — the internal model runs the proposed plan: one-in-200 ultimate requirement, uplifted 35% to the Economic Capital Assessment; members must fund it at coming into line. <em>The plan and the capital are one decision</em>: grow a volatile class and the capital bill follows immediately.</li>
<li><strong>Lloyd’s review (autumn)</strong> — challenge on rate assumptions versus market evidence, loss ratios versus the syndicate’s track record, catastrophe appetite versus scenario tolerances. Weak plans are loaded (capital added) or trimmed (premium capped). Approval is permission to trade the coming year of account.</li>
<li><strong>In-year monitoring (all year)</strong> — actual versus plan on premium (is the business actually there at the assumed rates?), rate change achieved versus assumed, claims experience versus loss ratio picks, catastrophe events against the aggregate budget, reinsurance actually placed versus planned cost. Material deviation triggers reforecasts — and possibly a mid-year capital top-up.</li>
</ol>
<h3>Where plans go wrong</h3>
<ul>
<li><strong>Rate optimism</strong> — assuming +5% when the market delivers +1% quietly inflates every planned profit figure; monitoring must catch it by quarter two, not at year end.</li>
<li><strong>Growth at the wrong moment</strong> — plans built at the cycle’s top bake in soft-market business; Lloyd’s performance management exists precisely to lean against this.</li>
<li><strong>Reinsurance slippage</strong> — planned protections that turn out more expensive or unavailable (post-event hard markets) leave the net position riskier than the approved plan assumed.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A syndicate plans £600m of premium at +4% rate change and a 92% combined ratio, supported by £310m of member capital. By April, achieved rate change is only +1% and a treaty renewal cost £8m more than planned. The reforecast moves the combined ratio to ~95% and the recalculated capital requirement rises £18m. Consequences cascade: members must top up at mid-year coming into line, the underwriting committee cuts the plan in two under-performing classes to claw capital back, and next year’s plan credibility now carries this year’s variance history. Plan, capital and monitoring are one loop, not three processes.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>The business plan is where pricing, exposure, reinsurance and capital meet — <strong>approved once, monitored continuously, reforecast when reality diverges</strong>. Rate-change optimism is the classic silent killer, and the capital bill moves with every material plan change.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A plan assumes £500m premium at a 60% loss ratio. Rate change comes in 3 points below assumption, flowing straight to the loss ratio. All else equal, what loss ratio should the reforecast show, in %?',
          answer: 63, tol: 0.3, unit: '%',
          explain: 'Missing rate is margin lost: the loss ratio pick worsens by roughly the shortfall — 60 + 3 = 63%. (In practice the effect compounds with earning patterns.)' },
        { type: 'mc',
          q: 'Why are the business plan and the capital requirement described as “one decision”?',
          options: [
            'They are submitted in the same document format',
            'The internal model computes capital from the plan’s classes, volumes and reinsurance — so any material plan change immediately changes the member capital that must be funded',
            'Lloyd’s charges one fee for both',
            'They are decided by the same person'
          ],
          answer: 1,
          explain: 'Capital is a function of the plan. Growth, mix shifts or reinsurance changes reprice the one-in-200 — and members fund the result at coming into line.' },
        { type: 'mc',
          q: 'Achieved rate change is tracking well below plan in the first quarter. Why is waiting until year-end to act the wrong answer?',
          options: [
            'Because Lloyd’s fines quarterly',
            'Because the shortfall silently repriced the whole year’s book: every month of writing at inadequate assumed rates adds mispriced exposure that cannot be recalled later',
            'Because rate change always recovers in summer',
            'Because brokers must be notified within 90 days'
          ],
          answer: 1,
          explain: 'Premium written is exposure banked. Early detection lets the syndicate re-price, shrink or restructure while most of the year’s capacity is still unwritten.' },
        { type: 'mc',
          q: 'What does it mean when Lloyd’s “loads” a syndicate’s capital?',
          options: [
            'It lends the syndicate money',
            'It adds capital above the syndicate’s own model result, reflecting scepticism about plan assumptions or model adequacy',
            'It increases the premium the syndicate may write',
            'It transfers capital from the Central Fund'
          ],
          answer: 1,
          explain: 'Loading is the review’s teeth: if Lloyd’s doubts the loss ratios or the model, members fund extra capital until the doubt is resolved — making optimism expensive.' }
      ]
    },
    {
      id: 'portfolio-mi',
      title: 'Running the book: portfolio management information that actually steers',
      minutes: 9,
      body: `
<p>Between annual plans, a book is steered with <strong>management information</strong> — and the difference between good and decorative information is whether it changes decisions. This lesson covers the handful of measures that genuinely steer a London market portfolio.</p>
<h3>The premium bridge</h3>
<p>Explain this year’s premium versus last year’s in components: <strong>expiring premium × retention rate × (1 + rate change) × (1 + exposure change) + new business</strong>. The bridge exposes quality: growth from rate is margin; growth from new business at lower adequacy is dilution; high retention of underpriced renewals is anti-selection by inertia.</p>
<h3>Rate adequacy, not just rate change</h3>
<p>Rate change says prices rose 5%; <strong>rate adequacy</strong> says whether the resulting price covers technical cost (from the pricing models) — the cumulative index of achieved price versus benchmark. A class can post three years of positive rate change and still sit 10% below adequacy if the starting point was dire. Adequacy, tracked by segment, is the honest steering metric.</p>
<h3>Segmentation and the decile view</h3>
<p>Rank the book’s risks by modelled profitability and view them in deciles: the routine discovery is that the top few deciles subsidise the bottom ones. Actions write themselves: defend and grow the top, re-price or non-renew the bottom, and interrogate what the worst decile has in common (a segment? a broker? one underwriter’s optimism?). Repeat quarterly and the mix improves without a single heroic decision.</p>
<h3>The rest of the dashboard</h3>
<ul>
<li><strong>Renewal retention rate</strong> — too low wastes acquisition cost; suspiciously high in a hardening market suggests underpricing.</li>
<li><strong>Quote-to-bind ratios</strong> — falling hit rates flag uncompetitive pricing (or improving discipline — context decides).</li>
<li><strong>Claims frequency and severity trends</strong> — leading indicators feeding back into picks long before triangles mature.</li>
<li><strong>Terms leakage</strong> — deductibles, sub-limits and wording concessions given away at renewal that never show in the rate index; soft markets rot terms before they rot price.</li>
<li><strong>Large-line and referral audit</strong> — did the biggest lines and exceptions follow the framework? Portfolio steering fails at the exceptions first.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A class wrote £100m last year. This year: retention 85%, rate change +6%, exposure flat, new business £18m. Bridge: 100 × 0.85 × 1.06 + 18 = <strong>£108.1m</strong> — headline growth of 8%. The decile view, though, shows the £18m of new business modelled at 97% adequacy versus 105% for retained renewals: growth is diluting quality. The steering decision: hold volume, tighten new-business thresholds to 102%, and non-renew the bottom decile (£7m at 82% adequacy). Next year’s book is smaller on paper and better in expectation — invisible in premium, visible in the loss ratio two years later.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Steer with the <strong>premium bridge, cumulative rate adequacy, decile segmentation, retention and leakage</strong> — measures that force decisions. Premium growth is the vanity metric; mix and adequacy are the performance.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Expiring premium £80m; retention 90%; rate change +5%; exposure unchanged; new business £12m. What is this year’s premium by the bridge, in £ millions?',
          answer: 87.6, tol: 0.3, unit: '£ millions',
          explain: '80 × 0.90 × 1.05 + 12 = £87.6m — and the bridge shows how much of the movement is quality (rate) versus volume (new business).' },
        { type: 'mc',
          q: 'A class shows +4% rate change for three consecutive years. Why might its rate adequacy still be poor?',
          options: [
            'Because rate change is always misreported',
            'If the class started far below technical price, or claims inflation matched the increases, cumulative achieved price can remain below adequacy despite positive movement',
            'Because adequacy only applies to new business',
            'It cannot — positive rate change means adequate rates'
          ],
          answer: 1,
          explain: 'Rate change is a derivative; adequacy is the level. Three +4% years from a 85%-adequate start, against 4% claims inflation, leaves the class exactly where it began.' },
        { type: 'mc',
          q: 'What is the standard action pattern from a decile analysis of modelled profitability?',
          options: [
            'Cut the whole book equally',
            'Defend and grow the top deciles, re-price or non-renew the bottom, and diagnose what the worst risks share — improving mix without changing headline strategy',
            'Reward underwriters by premium volume',
            'Ignore it, since models are uncertain'
          ],
          answer: 1,
          explain: 'Decile discipline converts model output into renewal-by-renewal actions. Mix improvement compounds quietly — the most reliable form of portfolio alpha.' },
        { type: 'mc',
          q: 'Why is “terms leakage” dangerous precisely because it is hard to measure?',
          options: [
            'Because deductible and wording concessions reduce the real price of risk without appearing in rate-change statistics, letting adequacy rot invisibly in soft markets',
            'Because it involves currency movements',
            'Because brokers report it late',
            'It is not dangerous if premium is flat'
          ],
          answer: 0,
          explain: 'A held premium with a halved deductible is a price cut the rate index never sees. Monitoring terms drift alongside rate is soft-market survival — the Pricing module’s cycle lesson in practice.' }
      ]
    },
    {
      id: 'global-programmes',
      title: 'Global programmes, captives and the admitted/non-admitted maze',
      minutes: 9,
      body: `
<p>Multinational clients don’t buy one policy — they buy a <strong>global programme</strong>: coordinated cover across dozens of countries, each with its own rules about who may insure what. London leads many of these programmes, and the machinery is worth knowing.</p>
<h3>The structure</h3>
<ul>
<li><strong>Master policy</strong> — issued to the parent (often in London), setting the programme’s full limits and broad terms.</li>
<li><strong>Local policies</strong> — issued in each country by locally licensed insurers (the global carrier’s own network or fronting partners), satisfying local law, local claims service and local premium taxes.</li>
<li><strong>Difference in conditions / difference in limits</strong> — the master’s safety net: where a local policy’s cover is narrower (conditions) or smaller (limits) than the master, the master “drops down” to fill the gap, so the group’s protection is uniform even where local products are not.</li>
</ul>
<h3>Admitted versus non-admitted</h3>
<p>Many countries prohibit <strong>non-admitted</strong> insurance — cover of local risks by insurers without a local licence. Where prohibited, all cover must flow through admitted local policies (with reinsurance back to the programme carrier); where permitted, the master can insure the local risk directly. Getting this wrong is a regulatory breach and can make claims unpayable or non-deductible — so programme design starts with a country-by-country compliance map, and premium must be allocated to countries defensibly for tax.</p>
<h3>Captives: the client’s own insurer</h3>
<p>Large groups often interpose a <strong>captive</strong> — their wholly owned insurance subsidiary — into the programme: local policies are reinsured to the captive up to a chosen retention, with the commercial market attaching above. The captive formalises self-insurance (the group keeps its own predictable losses and the margin on them), builds loss data, smooths market cycles (retain more when markets are hard, less when soft), and is the risk manager’s lever for group-wide deductible strategy. The market’s role shifts accordingly: from ground-up insurer to provider of capacity above the captive — and fronting services into it (the Pens & Paper module’s fronting lesson, seen from the buyer’s side).</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A consumer-goods group in 40 countries structures: local property policies everywhere (admitted paper), each reinsured 100% to the group captive up to £2m per loss; the captive buys a master programme above £2m from the London market with a £250m limit and difference-in-conditions wrap. A £1.4m warehouse fire in Brazil: paid by the local policy, reinsured to the captive — the group bore its own loss, by design. A £60m plant loss in Germany: local policy pays its £20m local limit, the master drops down for the £38m above the captive’s £2m... the layers knit together so the group recovers £58m beyond its retention, wherever the loss happened.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Global programmes = <strong>master + local policies + difference-in-conditions glue</strong>, engineered around admitted/non-admitted rules — with a captive often holding the group’s retention. London’s role: lead capacity above the captive and the wrap that makes forty policies behave as one.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A group captive retains £3m per loss; the master programme sits above it. A covered loss of £11m occurs where the local policy pays in full and is reinsured to the captive/master stack. How much does the commercial master programme bear, in £ millions?',
          answer: 8, tol: 0.1, unit: '£ millions',
          explain: 'The captive keeps its £3m retention; the master pays the £8m above it — the group self-insures the working layer by design.' },
        { type: 'mc',
          q: 'What does a difference-in-conditions clause in a master policy do?',
          options: [
            'It charges different premiums by country',
            'Where a local policy’s cover is narrower than the master’s terms, the master fills the gap — keeping group protection uniform across jurisdictions',
            'It converts currencies for claims',
            'It substitutes local law for English law'
          ],
          answer: 1,
          explain: 'Local products vary; the master’s drop-down wrap is what makes a patchwork of local policies behave as one coherent programme.' },
        { type: 'mc',
          q: 'Why can non-admitted insurance of a local risk be a serious problem even if the insurer is willing to pay claims?',
          options: [
            'Non-admitted claims are always smaller',
            'Local law may prohibit it: claims may be unpayable locally, premiums non-deductible, and the insured and insurer exposed to regulatory penalties',
            'Because brokers cannot earn commission on it',
            'It is never a problem'
          ],
          answer: 1,
          explain: 'Compliance drives structure: where non-admitted cover is banned, protection must route through licensed local paper — the reason global carriers and fronts maintain country networks.' },
        { type: 'mc',
          q: 'Which is a genuine reason for a group to run a captive rather than simply buying lower deductibles?',
          options: [
            'Captives eliminate all insurance costs',
            'The group keeps the margin on its own predictable losses, builds unified loss data, and can flex retention against the market cycle — retaining more when commercial pricing is hard',
            'Captives are unregulated',
            'Captives remove the need for local policies'
          ],
          answer: 1,
          explain: 'A captive is formalised self-insurance with strategic optionality. It converts the predictable layer from an insurer’s profit into the group’s, and cycles retention intelligently.' }
      ]
    }
  ]
});
