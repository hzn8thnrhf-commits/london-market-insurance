/* Module 12 — Bespoke & Structured Risk Solutions */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'bespoke',
  icon: '🧩',
  title: 'Bespoke & Structured Risk Solutions',
  tagline: 'One-off deals, credit enhancement and retrospective covers',
  blurb: 'Beyond the standard classes lies deal-driven underwriting: bespoke covers with no rating model, credit enhancement for banks, transactional liability for dealmakers, and retrospective covers that trade in old liabilities. This is where specialty underwriting meets investment banking.',
  badge: { icon: '🧩', name: 'Deal Maker', desc: 'Master “Bespoke & Structured Risk Solutions”.' },
  lessons: [
    {
      id: 'bespoke-uw',
      title: 'Underwriting the one-off: how bespoke deals differ',
      minutes: 9,
      body: `
<p>Most of this course has described <em>classes</em>: flows of broadly similar risks priced with models and managed as portfolios. But a meaningful and growing slice of the specialty market is <strong>bespoke</strong>: individually structured deals that fit no class — insuring a specific contract, a specific financing, a specific feared event for a specific client. Some specialty carriers treat this as a dedicated division and a core identity.</p>
<h3>What makes a deal bespoke</h3>
<ul>
<li><strong>No rating model</strong> — there is no burning cost for “this satellite operator’s revenue if this specific launch slips by a year”. Pricing is built from scenario reasoning, adjacent data and judgement.</li>
<li><strong>Cross-class perils</strong> — a single deal may blend credit, political, legal and physical perils that would normally sit in four different underwriting teams.</li>
<li><strong>Deal deadlines</strong> — the cover often enables a transaction (a financing closing, an acquisition completing); the underwriter works to the deal’s timetable, in days not weeks.</li>
<li><strong>Binary or heavily structured outcomes</strong> — many bespoke covers either never pay or pay in full; the distribution of outcomes is a cliff, not a curve.</li>
</ul>
<h3>The disciplines that replace the model</h3>
<ol>
<li><strong>Define the downside first.</strong> The first question is not the premium but the worst case: what is the maximum loss, through exactly what mechanism, and is it truly capped by the wording?</li>
<li><strong>Wording is the risk.</strong> In a class, one bad wording is diluted by thousands of good ones; in a bespoke deal the wording <em>is</em> the entire risk transfer. Trigger definitions, exclusions, conditions and dispute mechanics get investment-banking levels of drafting attention.</li>
<li><strong>Scenario pricing.</strong> Enumerate the ways the deal can lose, attach probabilities (with humility), and load heavily for uncertainty and the winner’s curse — if ten markets declined this deal before you, ask why.</li>
<li><strong>Return on capital floors.</strong> Because outcomes are binary, expected-loss pricing is not enough: the deal must clear a minimum return on the capital its worst case consumes (the Capital module’s logic, applied deal by deal).</li>
<li><strong>Governance.</strong> Bespoke deals bypass class-level controls, so they get their own: mandatory peer review, cross-class referral (the credit view <em>and</em> the political view <em>and</em> the legal view), and named senior sign-off.</li>
</ol>
<h3>Why carriers want this business</h3>
<p>Priced well, bespoke deals earn margins unobtainable in commoditised classes — precisely because there is no market rate to compete down to, and few competitors capable of the analysis. They also deepen client relationships: the carrier that solved the unsolvable problem gets the first call — and often the renewal without a broking auction. The risk is symmetrical: with no portfolio to average across, mistakes are loud.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A commodities producer needs US$150m of cover against a specific government cancelling its export licence during a 3-year investment programme — a peril sitting between political risk and contract frustration. Scenario analysis: probability of cancellation ~2% a year (elections in year 2 raise it), partial-loss scenarios possible via quota reductions. Expected loss ≈ US$7m over the term; the underwriter prices at US$13.5m (3% rate a year) — a 90%+ loading over expected loss, reflecting parameter uncertainty, the binary downside and a 15% return floor on the US$60m of capital the deal’s tail consumes. Wording defines “cancellation” to include de facto measures (quota cuts beyond 60%) — without that clause the most likely loss path would be uninsured.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Bespoke underwriting inverts class underwriting: <strong>no model, so downside definition, wording precision, scenario pricing with fat uncertainty loads, and deal-level governance</strong> carry the whole weight. The reward is margin without a market rate to erode it.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A 2-year bespoke cover has a US$100m limit. Scenarios: 3% chance of total loss, 8% chance of a US$25m partial loss (over the whole term, mutually exclusive). What is the expected loss, in US$ millions?',
          answer: 5, tol: 0.1, unit: 'US$ millions',
          explain: '(3% × 100) + (8% × 25) = 3 + 2 = US$5m — the floor from which loading for uncertainty and capital starts.' },
        { type: 'num',
          q: 'That deal’s worst case consumes US$40m of allocated capital and the carrier requires a 15% return on capital plus expected loss recovery. Ignoring expenses, what minimum premium does that imply for the term, in US$ millions?',
          answer: 11, tol: 0.3, unit: 'US$ millions',
          explain: 'Expected loss US$5m + required return 15% × 40 = US$6m → minimum US$11m. Binary deals are priced off capital consumption, not expected loss alone.' },
        { type: 'mc',
          q: 'Why does wording matter more in a bespoke deal than in a class of thousands of policies?',
          options: [
            'Bespoke wordings are longer',
            'There is no portfolio to dilute a drafting error — the single wording defines the entire risk transfer, so one ambiguity is the whole loss',
            'Class wordings are written by regulators',
            'Bespoke deals have no exclusions'
          ],
          answer: 1,
          explain: 'In class business, wording risk averages out; in a one-off, the trigger definition IS the product. Hence investment-banking drafting intensity.' },
        { type: 'mc',
          q: 'A bespoke enquiry arrives that ten other markets have already declined. What should the underwriter’s first instinct be?',
          options: [
            'Quote quickly before they change their minds',
            'Ask why ten informed competitors passed — the winner’s curse means being the only one to see value often means missing what others saw',
            'Halve the premium to win the deal',
            'Decline automatically'
          ],
          answer: 1,
          explain: 'Adverse selection is fiercest in deal-driven business: the deals that reach you easily are the ones others refused. Understanding their reasons is due diligence, not weakness.' }
      ]
    },
    {
      id: 'credit-enhancement',
      title: 'Credit enhancement: insurance as bank capital',
      minutes: 9,
      body: `
<p>One of the most sophisticated corners of the specialty market sells insurance not against fires or storms but against <strong>borrowers defaulting</strong> — structured so that banks and investors can hold less capital against their loans. Here insurance competes directly with capital markets products, and the buyer’s regulator matters as much as the seller’s.</p>
<h3>The basic trade</h3>
<p>A bank holds a portfolio of loans and must hold regulatory capital against their default risk. If a strongly rated insurer guarantees part of that risk — via credit insurance or an unfunded risk-transfer contract — the bank’s capital requirement on the protected portion drops. The bank pays premium; the insurer takes default risk; the saving in the bank’s cost of capital funds the trade. This is the engine behind:</p>
<ul>
<li><strong>Single-situation credit</strong> (Classes II module) — one loan, one obligor, wrapped for a bank.</li>
<li><strong>Significant risk transfer</strong> — protection on <em>tranches</em> of whole loan portfolios (the bank keeps the first-loss slice; insurers and funds take mezzanine slices), formally recognised by banking regulators as reducing the bank’s capital.</li>
<li><strong>Mortgage credit risk transfer</strong> — programmes by which housing agencies and mortgage guarantors (most prominently the United States government-sponsored enterprises) buy reinsurance on pools of mortgage default risk — a large, data-rich, genuinely actuarial credit market.</li>
</ul>
<h3>What the underwriter must know</h3>
<ul>
<li><strong>Tranche mechanics</strong> — attachment and detachment points on a portfolio’s cumulative losses work exactly like excess-of-loss layers (Reinsurance module), but the “event” is economic: defaults net of recoveries accumulating over years.</li>
<li><strong>The buyer’s rulebook</strong> — for the bank to get capital relief, the protection must be effectively unconditional: minimal exclusions, no disputes about claims payment timing. Wordings are negotiated against banking regulation as much as insurance law.</li>
<li><strong>Correlation and wrong-way risk</strong> — credit portfolios sour together in recessions, exactly when the insurer’s investment portfolio and other credit exposures also suffer. Capital models must charge for this clustering; diversification credit against a hurricane book is genuine, against another credit book much less so.</li>
<li><strong>Underwriting = credit analysis</strong> — obligor financials, loan-to-value ratios, seasoning, vintage effects, recovery assumptions. The skills are a bank credit officer’s, deployed with an insurer’s balance sheet.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A bank seeks protection on a US$2bn portfolio of corporate loans: it retains the first 1.5% of losses (US$30m); an insurer takes the 1.5%–5% tranche (US$70m of exposure) for a premium of 3.2% of tranche notional a year. Over the deal’s life a recession produces cumulative portfolio losses of 2.8% (US$56m). The insurer pays losses above the US$30m attachment: US$26m, against premium of roughly US$2.24m a year × 5 years ≈ US$11.2m — a losing deal in this scenario, which is precisely the recession clustering the pricing (and the insurer’s capital model) must have charged for. Had losses stopped at 1.4%, the insurer would have kept every dollar.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Credit enhancement sells the insurer’s balance sheet as a substitute for bank capital: <strong>tranche mechanics like reinsurance layers, wordings written for banking regulators, and pricing that respects recession clustering</strong> — the diversification against catastrophe books is real, but credit risks correlate fiercely with each other.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'An insurer protects the 2%–6% loss tranche of a US$1.5bn loan portfolio. Cumulative losses reach 3.5%. How much does the insurer pay, in US$ millions?',
          answer: 22.5, tol: 0.5, unit: 'US$ millions',
          explain: 'Losses above the 2% attachment: (3.5% − 2%) × 1,500 = US$22.5m, within the tranche’s 4-point (US$60m) width — layer arithmetic on an economic “event”.' },
        { type: 'mc',
          q: 'Why must credit-relief insurance wordings be close to unconditional?',
          options: [
            'Because insurance law requires it',
            'Because the bank’s regulator only grants capital relief if the protection will pay reliably and promptly — conditions and broad exclusions destroy the product’s purpose',
            'Because banks refuse to read policy documents',
            'Because unconditional wordings are cheaper to draft'
          ],
          answer: 1,
          explain: 'The product is regulatory capital substitution. Protection a regulator won’t recognise is worthless to the buyer at any price — so banking rules drive the drafting.' },
        { type: 'mc',
          q: 'What is “wrong-way risk” in a credit insurance portfolio?',
          options: [
            'Insuring loans in left-hand-drive countries',
            'The insurer’s credit losses cluster in recessions exactly when its investments and other credit exposures also suffer — correlations turning against it precisely when claims arrive',
            'Premiums paid in the wrong currency',
            'Writing tranches upside down'
          ],
          answer: 1,
          explain: 'Credit risks correlate with each other and with financial markets. Capital modelling must charge for this clustering rather than assume catastrophe-style independence.' },
        { type: 'mc',
          q: 'In a significant-risk-transfer structure, why does the bank retain the first-loss tranche?',
          options: [
            'First-loss tranches are illegal to sell',
            'Skin in the game: retaining expected losses keeps the bank incentivised to originate and service loans properly — protecting the insurer from moral hazard',
            'Because it is the cheapest tranche',
            'To avoid paying any premium'
          ],
          answer: 1,
          explain: 'The same alignment logic as hybrid fronting and co-participations: the party controlling loan quality keeps the slice that suffers first.' }
      ]
    },
    {
      id: 'transactional',
      title: 'Transactional liability: insuring deals themselves',
      minutes: 8,
      body: `
<p>When companies are bought and sold, risks crystallise at the moment of signing: what if the seller’s promises prove false? What if a tax structure fails? What if that dormant lawsuit awakens? <strong>Transactional liability</strong> insurance answers these — and has grown into a substantial specialty market whose fortunes track the deal cycle.</p>
<h3>Warranty & indemnity insurance</h3>
<p>In a company sale, the seller gives <strong>warranties</strong> (formal statements: the accounts are true, taxes are paid, no undisclosed litigation). Traditionally the buyer’s remedy for breach was suing the seller. <strong>Warranty & indemnity insurance</strong> (in the United States, representations & warranties insurance) replaces that: the insurer pays the buyer for breaches, letting sellers exit cleanly (private-equity funds love returning money to investors unencumbered) and buyers avoid suing people who now work for them. Features:</p>
<ul>
<li><strong>Underwriting = re-diligence</strong> — the insurer’s team (usually lawyers) reviews the buyer’s due diligence in days, probing where it was thin; anything inadequately diligenced is excluded.</li>
<li><strong>Known matters excluded</strong> — the product covers the <em>unknown</em>; identified issues need separate solutions (below).</li>
<li><strong>Pricing</strong> — a one-off premium, historically ~1–1.5% of the limit for European deals (more in the United States), with limits typically 10–30% of deal value.</li>
<li><strong>Claims</strong> — mostly accounting and tax warranty breaches; severity is lumpy, and soft pricing years (the 2021 deal boom) showed up later in loss ratios.</li>
</ul>
<h3>Known-risk covers</h3>
<ul>
<li><strong>Tax liability insurance</strong> — a specific identified tax position (will the authority challenge this reorganisation?) insured after review of counsel’s opinion. Binary, opinion-driven underwriting.</li>
<li><strong>Contingent legal risk</strong> — a specific piece of live or threatened litigation ring-fenced so a deal can proceed: the insurer prices the lawsuit’s outcome. The frontier includes judgment preservation (insuring a won judgment against reversal on appeal) — an area where the market has taken painful recent losses and retrenched.</li>
<li><strong>Title insurance</strong> — defects in ownership of property or shares.</li>
</ul>
<h3>Idiosyncrasies</h3>
<p>The class lives on <strong>deal flow</strong>: when mergers stop, premium stops — a demand cycle uncorrelated with the insurance cycle. Underwriting talent is legal rather than actuarial. And unlike most insurance, each policy is negotiated against a live transaction deadline measured in days.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A private-equity fund sells a manufacturer for €400m. The buyer takes warranty & indemnity cover: limit €60m (15% of deal value), retention €2m, premium 1.2% of limit = <strong>€720,000</strong> one-off. Eighteen months later the buyer discovers pre-sale environmental non-compliance breaching the warranties, costing €9.5m to remediate. The insurer pays 9.5 − 2 = <strong>€7.5m</strong>. The seller’s fund, long since wound up, is never pursued — which is exactly what everyone paid for.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Transactional liability insures the <strong>promises and known unknowns of deals</strong>: warranty & indemnity for the unknown breach, tax and contingent legal covers for identified risks. Underwriting is legal re-diligence on deal deadlines, and volume lives and dies with merger activity.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A warranty & indemnity policy has a €40m limit, €1.5m retention and a premium of 1.4% of limit. What is the premium, in €?',
          answer: 560000, tol: 5000, unit: '€',
          explain: '1.4% × €40m = €560,000 — a single premium for cover typically running 2–7 years depending on the warranty periods.' },
        { type: 'num',
          q: 'Under that policy, a warranty breach costs the buyer €12m. What does the insurer pay, in € millions?',
          answer: 10.5, tol: 0.1, unit: '€ millions',
          explain: '12 − 1.5 retention = €10.5m, within the €40m limit.' },
        { type: 'mc',
          q: 'Why are known, identified issues excluded from warranty & indemnity cover?',
          options: [
            'Insurers never cover anything known',
            'The product insures unknown breaches discovered later; identified risks are priced and covered separately (tax liability, contingent legal covers) or dealt with in the deal price',
            'Known issues are always immaterial',
            'Regulation prohibits covering them'
          ],
          answer: 1,
          explain: 'Insuring a known problem inside a blanket policy invites certain loss. The market’s answer is separation: blanket cover for the unknown, bespoke pricing for the known.' },
        { type: 'mc',
          q: 'What primarily drives the premium volume of the transactional liability class?',
          options: [
            'Hurricane seasons',
            'Mergers and acquisitions activity — no deals, no policies',
            'Interest rates alone',
            'The Lloyd’s capital-setting cycle'
          ],
          answer: 1,
          explain: 'The class is a derivative of the deal market: its cycle follows corporate transactions, giving carriers diversification against the classic insurance cycle.' }
      ]
    },
    {
      id: 'retrospective',
      title: 'Retrospective covers: trading in the past',
      minutes: 9,
      body: `
<p>Almost everything so far insures the future. A distinct market insures the <strong>past</strong>: liabilities from business already written, sold by carriers who want certainty to specialists who want the risk. The Regulation module met this as the “legacy market”; here are the instruments themselves — increasingly used not just for old problems but as active capital-management tools.</p>
<h3>Loss portfolio transfer</h3>
<p>The cedant transfers its booked reserves for a defined block of past business to a reinsurer, paying a premium approximately equal to those reserves (adjusted for the time value of money and a fee). The reinsurer now pays the claims as they settle. Economics: the reinsurer invests the premium and profits if claims come in at or below expectations — it is buying an uncertain liability stream for a known price. The cedant converts an open-ended tail into a fixed cost, releasing the capital that reserve risk consumed (Capital module logic).</p>
<h3>Adverse development cover</h3>
<p>Instead of transferring the reserves, the cedant keeps paying claims but buys protection <em>above</em> them: a layer attaching at (or near) booked reserves, covering deterioration up to a limit. This is excess of loss on reserves — cheaper than a full transfer, targeted precisely at the risk that keeps chief financial officers awake: prior-year strengthening.</p>
<h3>Why buyers buy</h3>
<ul>
<li><strong>Capital release</strong> — reserve risk is a major component of the one-in-200 requirement; capping it frees capital for live underwriting.</li>
<li><strong>Clean exits</strong> — discontinued classes, closed books, or a Lloyd’s year that cannot otherwise close (reinsurance-to-close transactions with third-party specialists).</li>
<li><strong>Deal hygiene</strong> — acquirers of insurers routinely demand adverse development covers on the target’s reserves, converting the biggest unknown in the price into a third party’s problem (many recent large insurance acquisitions featured exactly this).</li>
<li><strong>Drawing a line</strong> — after a reserving crisis, an adverse development cover buys credibility: investors can trust the balance sheet again because someone else now owns the tail.</li>
</ul>
<h3>What the seller (the legacy specialist) is really doing</h3>
<p>Pricing = projected claims (their own view, often less optimistic than the cedant’s) discounted for investment income, plus a risk load, plus expenses. Their edge: claims-handling aggression, reserving skill on old liabilities, and patience. Their risks: inflation (a duration-mismatched nightmare for long tails), latent surprises (the asbestos lesson), and — the buyer’s risk in reverse — <strong>counterparty concentration</strong>: the cedant has swapped reserve risk for a very large, very long-dated credit exposure to the legacy carrier, usually mitigated with collateral or funds-withheld structures.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A carrier holds £500m of reserves for a discontinued casualty book and fears deterioration. Option A, loss portfolio transfer: premium £480m (reserves discounted for investment income, plus fee) — the whole book gone, ~£70m of reserve-risk capital released. Option B, adverse development cover: £150m of protection attaching at £500m, premium £45m — deterioration to £650m is now insured. The year after, social inflation pushes ultimate claims to £590m. Under A the legacy carrier absorbs all £90m; under B the carrier pays claims but recovers 90 − 0 = £90m above its £500m attachment... within the £150m limit, so the cover pays £90m and the balance sheet holds. Both worked; A cost more and released more capital, B kept the operational relationship with claimants in-house.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Loss portfolio transfers <strong>sell the reserves</strong>; adverse development covers <strong>insure above them</strong>. Both convert reserve risk into capital release and certainty — at the price of premium and a decades-long credit exposure to the protection seller.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'An adverse development cover provides £200m of protection attaching at booked reserves of £800m. Ultimate claims develop to £905m. How much does the cover pay, in £ millions?',
          answer: 105, tol: 1, unit: '£ millions',
          explain: 'Deterioration above the £800m attachment = £105m, within the £200m limit — excess of loss applied to reserves.' },
        { type: 'num',
          q: 'A legacy specialist prices a loss portfolio transfer: projected claims £300m paid over many years, worth £252m discounted, plus a £18m risk-and-expense load. What premium does it charge, in £ millions?',
          answer: 270, tol: 2, unit: '£ millions',
          explain: '252 + 18 = £270m — below the £300m nominal reserves because the specialist earns investment income while claims pay out slowly.' },
        { type: 'mc',
          q: 'Why do acquirers of insurance companies often require an adverse development cover as part of the deal?',
          options: [
            'To reduce the purchase tax',
            'The target’s reserve adequacy is the biggest unknown in the price; the cover converts that uncertainty into a third party’s problem, making the deal underwriteable',
            'Because regulators forbid buying reserves',
            'To increase the target’s premium income'
          ],
          answer: 1,
          explain: 'Reserves are an estimate (Claims module); buying a balance sheet means buying that estimate’s error. An adverse development cover caps it — deal insurance for the deal itself.' },
        { type: 'mc',
          q: 'What risk does a cedant retain after a full loss portfolio transfer of a long-tail book?',
          options: [
            'None whatsoever',
            'Credit exposure to the legacy reinsurer for decades (mitigated by collateral), and its original liability to policyholders if that reinsurer ever fails',
            'All the reserve risk, unchanged',
            'Only currency risk'
          ],
          answer: 1,
          explain: 'The reinsurance principle never sleeps: policyholder obligations stay with the original carrier, so the transfer swaps reserve risk for long-dated counterparty risk — hence collateral and funds-withheld structures.' }
      ]
    },
    {
      id: 'deal-lifecycle',
      title: 'Capstone: a structured deal from enquiry to booking',
      minutes: 9,
      body: `
<p>Finish this module by walking one structured deal through the machinery — noticing how every earlier module reappears in deal clothing.</p>
<h3>1. Triage (day 1)</h3>
<p>A broker calls: a bank syndicate needs US$250m of protection against a sovereign-owned utility defaulting on payments under a power-purchase agreement in an emerging market, tenor 7 years, answer needed in three weeks. Triage questions: Is this in appetite (credit? political risk? both)? Do we have country capacity left (aggregation by obligor and country — Classes II)? Is the counterparty sanctions-clean (Regulation module)? Who else has seen it and passed?</p>
<h3>2. Structuring (week 1)</h3>
<p>The deal is shaped: the bank retains 10% (alignment), the insured tranche attaches after a 90-day waiting period (filtering delay from default), political perils (currency inconvertibility, expropriation of the plant) are wrapped in alongside the payment default — a genuinely cross-class construction requiring the credit and political underwriters jointly. Limit US$225m after the retention; the carrier will keep US$75m net and syndicate US$150m to two other markets (subscription — Market module — reborn as deal syndication).</p>
<h3>3. Pricing (week 2)</h3>
<p>No burning cost exists. The team builds: sovereign ratings-implied default probabilities, recovery assumptions from past emerging-market restructurings, scenario adjustments for the utility’s tariff politics, correlation load (this country already appears in the political-risk book), capital consumption at one-in-200 (Capital module), return-on-capital floor. Price: 2.4% a year on the limit. Peer review challenges the recovery assumption; price moves to 2.65%.</p>
<h3>4. Wording (week 3)</h3>
<p>Lawyers negotiate: definition of default (missed payment vs formal insolvency), the waiting period’s mechanics, exclusions (war on land? devaluation as opposed to inconvertibility?), claims cooperation, and — because the bank wants capital relief — the near-unconditionality demanded by its regulator (credit enhancement lesson). Wording is the risk.</p>
<h3>5. Bind, book, monitor (and the unglamorous truth)</h3>
<p>The deal binds. Now the systems must swallow it: which class code (it is neither pure credit nor pure political risk)? What premium earning pattern over 7 years (Premium module)? Which aggregation buckets (country, obligor, and the correlated “emerging-market crisis” scenario)? What reinsurance protects it (does the political-risk treaty pick up a hybrid deal? — a wording question on the <em>outwards</em> side now)? Exposure management logs it against country limits; the capital model ingests it; claims teams brief on the waiting-period mechanics they may one day operate. Structured business strains every pipe built for flow business — and deal teams who ignore the plumbing create tomorrow’s data-quality and recovery disputes.</p>
<div class="example">
<div class="ex-label">Worked example — the numbers</div>
<p>Limit US$225m; the carrier retains US$75m net, syndicating the rest. Premium 2.65% a year on the full limit ≈ US$5.96m a year, of which the carrier’s share (one third) ≈ US$1.99m. Year 4: the utility misses payments amid a currency crisis; after the 90-day waiting period, default is confirmed with US$180m unpaid. The insured tranche pays 90% × 180 = US$162m; the carrier’s third = <strong>US$54m</strong>, against roughly US$8m of premium earned to date on its share. Recovery negotiations with the sovereign begin — and the political-risk team’s decade of restructuring experience becomes the difference between a 30% and a 60% ultimate recovery.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>A structured deal is the whole course compressed: <strong>appetite and aggregation, subscription and syndication, scenario pricing against capital, wording as the product, then years of premium earning, monitoring and — sometimes — recovery work</strong>. The craft is making every module show up on time for one transaction.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'In the capstone deal: the insured tranche covers 90% of losses after the bank’s 10% retention. The utility’s confirmed unpaid balance is US$140m. What does the insurance pay, in US$ millions?',
          answer: 126, tol: 0.5, unit: 'US$ millions',
          explain: '90% × 140 = US$126m; the bank absorbs the other US$14m — alignment by retention, as everywhere in this course.' },
        { type: 'num',
          q: 'The carrier keeps one third of a US$225m limit and later recovers 45% of its US$54m claim payment through sovereign restructuring. What is its final net loss, in US$ millions (ignore premium)?',
          answer: 29.7, tol: 0.3, unit: 'US$ millions',
          explain: '54 × (1 − 0.45) = US$29.7m — recovery skill is a profit centre in credit and political risk, often worth more than the original pricing precision.' },
        { type: 'mc',
          q: 'Why did the deal include a 90-day waiting period before claims become payable?',
          options: [
            'To let the insurer invest the premium longer',
            'To distinguish permanent default from temporary payment delays that cure themselves — the standard filter in credit and political risk',
            'Because claims staff need notice',
            'To comply with the hours clause'
          ],
          answer: 1,
          explain: 'Same logic as the Classes II lesson: many missed payments arrive late rather than never. The waiting period keeps the product insuring default, not inconvenience.' },
        { type: 'mc',
          q: 'After binding, why does a hybrid credit/political deal deserve special attention in the carrier’s systems and outwards reinsurance review?',
          options: [
            'Hybrid deals are exempt from booking',
            'It fits no standard class code, its aggregations span multiple buckets, and its recovery under class-based outwards treaties may be disputed — plumbing failures here surface years later as data and recovery problems',
            'Because premiums on hybrids are always paid in cash',
            'Because regulators require paper files for hybrids'
          ],
          answer: 1,
          explain: 'Structured deals strain systems built for flow business. Misclassification quietly corrupts aggregation, capital and reinsurance recoveries — the unglamorous half of deal underwriting.' }
      ]
    }
  ]
});
