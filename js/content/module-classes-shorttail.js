/* Module 8 — Classes of Business I: Property, Marine, Energy, Aviation & Cat */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'classes1',
  icon: '🚢',
  title: 'Classes I: Property, Marine, Energy & Aviation',
  tagline: 'The shorter-tail classes and their idiosyncrasies',
  cii: 'LM1 · LM3',
  blurb: 'What each major shorter-tail class actually covers, how it is priced and structured, and the quirks — general average, control of well, vertical placements — that make each one its own world.',
  badge: { icon: '🚢', name: 'Class Connoisseur', desc: 'Master “Classes I: Property, Marine, Energy & Aviation”.' },
  lessons: [
    {
      id: 'property-df',
      title: 'Property direct & facultative: the open-market property class',
      minutes: 9,
      body: `
<p>“Property direct & facultative” — universally shortened to <strong>property D&F</strong> — is the London market’s open-market property class: large commercial and industrial property risks insured individually (directly, or as facultative reinsurance of a local insurer), as opposed to flowing through binders or treaties.</p>
<h3>What is covered</h3>
<p>Physical damage to buildings, plant, machinery and stock — typically on an “all risks” basis (everything except what is excluded) — plus, critically, <strong>business interruption</strong>: the loss of profit and continuing costs while the damaged operation is out of action. Business interruption often exceeds the physical damage itself, and quantifying it (forensic accountants, indemnity periods, trends clauses) is a specialism of its own. Typical buyers: mining companies, utilities, hotel chains, manufacturers, municipal authorities — worldwide.</p>
<h3>How it is underwritten</h3>
<ul>
<li><strong>Values and scale</strong> — risks are described by total insured values, often in the billions; underwriters take layered or quota shares of programmes far larger than any one carrier.</li>
<li><strong>Engineering information</strong> — construction, occupancy, protection (sprinklers!), exposure — the classic “COPE” data — plus survey reports drive rating and terms.</li>
<li><strong>Catastrophe exposure</strong> — much D&F business is bought precisely because it sits in hurricane, quake or flood zones. Catastrophe modelling and aggregate control (Exposure module) dominate portfolio management; premium is heavily loaded for cat.</li>
<li><strong>Structure</strong> — big programmes are built in layers with different markets on each; London often writes the higher, catastrophe-driven layers or the difficult slices locals decline.</li>
</ul>
<h3>Idiosyncrasies to remember</h3>
<ul>
<li><strong>Valuation risk</strong> — underinsurance is endemic; after 2021–22 inflation, declared values lagged rebuilding costs badly, and the market pushed hard on valuation discipline. “Average” clauses (proportional reduction of claims for under-declared values) and margin clauses respond to it.</li>
<li><strong>Short tail, spiky results</strong> — claims are known quickly, but results swing violently with the catastrophe calendar; a decade of profit can vanish in one season. Judge the class on model-based expected loss, not recent experience (the Pricing module’s burning-cost trap).</li>
<li><strong>Occupancy quirks</strong> — some segments (waste/recycling, food processing, unoccupied buildings) carry notorious fire records and their own sub-market of specialist appetite.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A hotel group insures a Caribbean resort: property damage values US$400m, business interruption US$150m (18-month indemnity period). London writes the US$100m xs US$50m layer. A hurricane causes US$120m of physical damage and forces 10 months’ closure costing US$70m of lost profit: ground-up loss US$190m. The layer pays in full: US$100m. Post-loss, the loss adjuster discovers declared values were 20% below rebuild cost — on a policy with an average clause, the recovery on the damage element would have been scaled down by that shortfall — the valuation lesson made painfully concrete.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Property D&F = large individual property risks, all-risks damage <strong>plus business interruption</strong>, underwritten on engineering data and catastrophe models. Its recurring sins: under-declared values and catastrophe amnesia in soft markets.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A factory suffers £30m of physical damage and £24m of business-interruption loss. London carriers write a £40m xs £20m layer of the programme. How much does the layer pay, in £ millions?',
          answer: 34, tol: 0.2, unit: '£ millions',
          explain: 'Combined ground-up loss = £54m; the layer pays the part above £20m up to its £40m limit: 54 − 20 = £34m.' },
        { type: 'mc',
          q: 'Why can business interruption exceed the physical damage that caused it?',
          options: [
            'Because policies double the damage automatically',
            'Because months of lost profit and continuing fixed costs during rebuild can outweigh the repair bill itself',
            'Because business interruption has no limits',
            'It cannot — physical damage is always larger'
          ],
          answer: 1,
          explain: 'A modest fire in a critical facility can halt revenue for a year. The time element, not the bricks, often drives the loss — hence indemnity periods and forensic accounting matter so much.' },
        { type: 'num',
          q: 'A policy contains an average clause. The insured declared values of £8m but true rebuild value is £10m. A £2m loss occurs. What does the insurer pay, in £ millions?',
          answer: 1.6, tol: 0.02, unit: '£ millions',
          explain: 'Average clause scales the claim by declared ÷ true value: 8/10 × £2m = £1.6m. Underinsurance costs the insured proportionally.' },
        { type: 'mc',
          q: 'What does the classic “COPE” underwriting information describe?',
          options: [
            'Commission, order, premium, exclusions',
            'Construction, occupancy, protection, exposure — the fundamentals of a property risk',
            'Claims, outstanding, paid, estimated',
            'Cedant, order, placement, endorsement'
          ],
          answer: 1,
          explain: 'COPE is the property underwriter’s core data checklist: what it’s built of, what happens inside it, what protects it, and what surrounds/threatens it.' }
      ]
    },
    {
      id: 'marine',
      title: 'Marine: hull, cargo, liability and some ancient idiosyncrasies',
      minutes: 9,
      body: `
<p>Marine is London’s founding class — the market literally began in a coffee house serving ship owners — and it remains a cluster of distinct sub-classes with some of insurance’s most distinctive machinery.</p>
<h3>The sub-classes</h3>
<ul>
<li><strong>Hull</strong> — physical damage to vessels themselves (and machinery), from fishing boats to ultra-large container ships; includes total loss, repairs, salvage. War risks are typically insured separately with cancellable terms.</li>
<li><strong>Cargo</strong> — goods in transit worldwide, by sea, air and land, warehouse to warehouse. High-volume, attritional business often written through binders; accumulations hide in ports and warehouses (one explosion — Tianjin 2015 — hit thousands of policies).</li>
<li><strong>Marine liability</strong> — including charterers’ and ship-repairers’ liability. The largest slice of shipowners’ liability (crew injury, pollution, wreck removal) sits with mutual <strong>protection & indemnity clubs</strong> — shipowner-owned mutuals whose enormous top layer is reinsured into the market: a structure unique to marine.</li>
<li><strong>Specie & fine art</strong> — high-value portable property: bullion in vaults, museum collections, jewellers’ stocks (often classed with marine for historical reasons).</li>
</ul>
<h3>Idiosyncrasies with centuries of pedigree</h3>
<ul>
<li><strong>General average</strong> — a principle older than insurance itself: when cargo or expense is deliberately sacrificed to save the whole voyage (jettison, salvage costs, a tow after engine failure), <em>all</em> interests saved — every cargo owner and the shipowner — contribute proportionally to the loss. Cargo policies cover the insured’s general-average contributions; specialist <strong>average adjusters</strong> compute them, sometimes over years (the Ever Given grounding produced a monumental adjustment).</li>
<li><strong>Warranties</strong> — marine wordings historically used strict warranties (navigation limits, laid-up warranties, surveys); breach could void cover entirely, a severity softened by modern United Kingdom insurance law but still central to marine underwriting.</li>
<li><strong>Total loss vocabulary</strong> — an <strong>actual total loss</strong> (ship gone) versus a <strong>constructive total loss</strong>: repair would cost more than the insured value, so the insured abandons the vessel to insurers and claims in full. Agreed insured values, not market values, drive these decisions.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A container ship grounds; salvors refloat her for a US$20m salvage award, declared general average. Interests saved: vessel valued US$50m, cargo US$150m. Contributions are pro rata to values saved: the vessel bears 25% (US$5m), cargo owners collectively 75% (US$15m), each cargo owner in proportion to its cargo’s value. A shipper with US$3m of cargo contributes 3/200 × 20 = US$300,000 — and its cargo insurer pays that contribution under the general-average clause. No physical damage to that cargo occurred: the claim arises purely from the ancient principle of shared sacrifice.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Marine is several classes in one — hull, cargo, liability, specie — sharing a distinctive legal heritage: <strong>general average, warranties, constructive total loss, and the protection & indemnity club system</strong>. Its accumulations lurk in ports, not just at sea.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'General average of US$12m is declared. Values saved: vessel US$40m, total cargo US$80m. What does a cargo owner with US$5m of cargo contribute, in US$?',
          answer: 500000, tol: 5000, unit: 'US$',
          explain: 'Total saved values = 120m; contribution rate = 12/120 = 10%; 10% × US$5m = US$500,000 — recoverable from the owner’s cargo insurer.' },
        { type: 'mc',
          q: 'A vessel insured for an agreed value of US$30m suffers damage that would cost US$34m to repair. What is this?',
          options: [
            'An actual total loss',
            'A constructive total loss — repair exceeds insured value, so the insured may abandon and claim the full US$30m',
            'A general average act',
            'A partial loss payable at 50%'
          ],
          answer: 1,
          explain: 'Constructive total loss is the marine mechanism for “not worth repairing”: abandonment and payment of the agreed insured value.' },
        { type: 'mc',
          q: 'Where does most of the world’s shipowners’ liability (crew, pollution, wreck removal) sit?',
          options: [
            'With Lloyd’s syndicates directly',
            'With mutual protection & indemnity clubs owned by shipowners, whose upper layers are reinsured into the market',
            'With governments',
            'It is uninsurable'
          ],
          answer: 1,
          explain: 'The protection & indemnity club system — mutuals with a shared group reinsurance programme — is a marine-specific structure sitting alongside the commercial market.' },
        { type: 'mc',
          q: 'Why did the 2015 Tianjin port explosion become a defining marine cargo loss?',
          options: [
            'Because one vessel sank with all cargo',
            'Because cargo from thousands of separate policies had accumulated in one port storage area — static accumulation the insurers had not fully measured',
            'Because war risk was triggered',
            'Because general average was declared across the port'
          ],
          answer: 1,
          explain: 'Cargo insurance follows goods in transit — including while sitting in ports and warehouses. Tianjin showed that marine catastrophe risk can be a static pile of containers, and pushed the class toward mapping port aggregations.' }
      ]
    },
    {
      id: 'energy',
      title: 'Energy: platforms, refineries and the transition',
      minutes: 8,
      body: `
<p>Energy is a flagship London class — the market insures a large share of the world’s oil, gas and, increasingly, renewable infrastructure. It splits along the production chain.</p>
<h3>Upstream (offshore) energy</h3>
<p>Exploration and production: drilling rigs, offshore platforms, subsea pipelines, and the construction projects that build them. Signature covers:</p>
<ul>
<li><strong>Physical damage</strong> to rigs and platforms — enormous single values in hostile environments (and hurricane paths: Gulf of Mexico platforms are classic cat exposure).</li>
<li><strong>Operators’ extra expense / control of well</strong> — the costs of regaining control of a blowout: killing the well, redrilling, cleanup. A uniquely upstream peril.</li>
<li><strong>Liability</strong> — pollution and third-party damage; Deepwater Horizon (2010) demonstrated the scale, with total economic costs in the tens of billions dwarfing the insured programme.</li>
</ul>
<h3>Downstream (onshore) energy</h3>
<p>Refineries, petrochemical plants, power generation. The dominant perils are fire and explosion, and the dominant loss driver is often <strong>business interruption</strong>: a damaged crude unit can halt a refinery for a year. Underwriting is deeply engineering-led — process safety records, plant age, maintenance turnarounds — and market capacity is deployed in layers over values running to many billions.</p>
<h3>Renewables and the transition</h3>
<p>The class is pivoting with its clients: offshore wind construction and operation, solar farms (hail is a nasty surprise loss driver), battery storage (thermal runaway fire risk) and emerging technologies (hydrogen, carbon capture). Underwriting challenges are youth of technology, serial-defect risk (one flawed component design replicated across a whole wind farm), and contractual complexity between developers, contractors and operators. Serial-loss clauses and evolving wordings are where the underwriting battle happens.</p>
<h3>Idiosyncrasies</h3>
<ul>
<li><strong>Package placements</strong> — upstream risks often combine physical damage, control of well and liability in one package slip.</li>
<li><strong>Scale of single risks</strong> — one platform or refinery can absorb the whole market’s appetite; subscription and layering are indispensable.</li>
<li><strong>Cyclicality with commodity prices</strong> — drilling activity (and premium volume) follows oil prices; business interruption values swell and shrink with margins.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>An operator insures an offshore platform package: physical damage US$1.2bn, control of well US$150m, liability US$300m. A blowout destroys the topside (US$400m damage), costs US$90m to bring under control, and causes US$120m of pollution liability. Three sections of one package respond: 400 + 90 + 120 = <strong>US$610m</strong> ground-up, flowing through the subscription’s layers. The redrill of the lost well is covered under control of well’s redrilling extension — a cost with no property-damage analogue onshore.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Energy = engineering-led underwriting of colossal single risks: upstream’s signature is <strong>control of well</strong>; downstream’s is <strong>fire/explosion plus huge business interruption</strong>; renewables add technology youth and serial-defect risk. Values move with commodity cycles.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'What does “control of well” (operators’ extra expense) insurance cover?',
          options: [
            'Loss of oil revenue during price falls',
            'The costs of regaining control of a well blowout — well kill, redrilling, cleanup',
            'The physical value of the drilling rig',
            'Directors’ liability for pollution fines'
          ],
          answer: 1,
          explain: 'Control of well is upstream energy’s signature cover: the extraordinary expenses of taming and replacing a blown-out well, distinct from damage to the rig itself.' },
        { type: 'num',
          q: 'A refinery fire causes US$180m of property damage and 14 months of business interruption at US$25m per month. What is the total ground-up loss, in US$ millions?',
          answer: 530, tol: 2, unit: 'US$ millions',
          explain: '180 + (14 × 25) = US$530m — the time element is nearly double the physical damage, a typical downstream pattern.' },
        { type: 'mc',
          q: 'What is “serial defect” risk in offshore wind underwriting?',
          options: [
            'Sequential hurricanes hitting one wind farm',
            'A single flawed component design replicated across every turbine, so one defect emerges as dozens of near-identical losses',
            'Defective serial numbers on turbine parts',
            'The risk of consecutive soft-market years'
          ],
          answer: 1,
          explain: 'Replication is renewables’ accumulation quirk: a flawed blade or cable design fails farm-wide. Serial-loss clauses (aggregating or limiting such related losses) address it.' },
        { type: 'mc',
          q: 'Why does upstream energy premium volume track oil prices?',
          options: [
            'Premiums are legally indexed to crude prices',
            'Higher prices spur drilling activity and raise insured values and business-interruption exposure, expanding what needs insuring',
            'Insurers invest premiums in oil futures',
            'It does not — the class is countercyclical'
          ],
          answer: 1,
          explain: 'Activity and values follow the commodity cycle: more rigs working and richer margins mean more exposure to insure — and vice versa in downturns.' }
      ]
    },
    {
      id: 'aviation',
      title: 'Aviation: airlines, products and the vertical quirk',
      minutes: 8,
      body: `
<p>Aviation is a compact, globally concentrated class — a small number of specialist underwriters worldwide insure the airlines, manufacturers and airports of the entire planet, with London at the centre.</p>
<h3>The sub-classes</h3>
<ul>
<li><strong>Airline hull & liability</strong> — the fleets of scheduled airlines: physical damage to aircraft (hull) and, far larger, liability to passengers and third parties. Liability limits run to US$1.5–2.5bn+ per aircraft per occurrence. Premium is small relative to limits: a working attritional layer of losses punctuated by rare disasters.</li>
<li><strong>Aerospace products liability</strong> — manufacturers of airframes, engines and components. Idiosyncrasy: <strong>grounding risk</strong> — a design fault can ground a whole global fleet, and litigation follows every major accident to the manufacturer regardless of cause.</li>
<li><strong>General aviation</strong> — corporate jets, helicopters, flying schools.</li>
<li><strong>Airports & air traffic control liability</strong>, plus <strong>space</strong> (satellite launch and in-orbit) often sits with aviation teams.</li>
<li><strong>Aviation war & allied perils</strong> — hijack, sabotage, confiscation — written separately with 7-day cancellation notice clauses, because war risk can transform overnight. The stranded-aircraft claims following the 2022 Russian confiscations of leased aircraft became one of the class’s largest-ever disputes, centring on whose policy (operators’ or lessors’, war or all-risks) responds.</li>
</ul>
<h3>The vertical placement quirk</h3>
<p>Aviation broke with London’s “follow the lead’s price” tradition: airline placements are commonly <strong>vertical</strong>, meaning different carriers on the same slip write the same risk at <em>different premium rates</em>, each negotiating its own terms with the broker. The signed shares still sum to 100%, but there is no single market price — a structural oddity almost unique to this class, and a perennial argument about market discipline.</p>
<h3>Underwriting texture</h3>
<p>Rating weighs fleet values, passenger volumes (revenue passenger kilometres), loss records, jurisdiction of likely litigation (United States awards dominate severity) and safety culture. The class’s economics are stark: global airline premium in a normal year is barely above the cost of two major widebody losses — discipline evaporates quickly when capacity is plentiful.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>An airline buys hull & liability: fleet value US$4bn, liability limit US$2bn per occurrence, annual premium US$18m. A widebody is lost with significant liability claims: hull US$150m (agreed value) plus liability settlements developing toward US$700m. One event consumes more than 45 years of that airline’s premium — illustrating why the class prices for the market-wide expected disaster rate, not any single airline’s benign history, and why followers’ different vertical rates reflect genuinely different views of that tail.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Aviation: tiny premium base, colossal limits, litigation-driven severity, war risks cancellable at 7 days — and the market’s great structural quirk, <strong>vertical placements where subscribers charge different prices for the same risk</strong>.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'What makes a “vertical” aviation placement unusual for the London market?',
          options: [
            'The risk is placed from the top layer downwards',
            'Different carriers on the same placement write the same risk at different premium rates rather than following the lead’s price',
            'Only vertical takeoff aircraft are covered',
            'The slip is signed in a vertical column'
          ],
          answer: 1,
          explain: 'Vertical placement abandons single-price subscription: each market negotiates its own rate for its share — near-unique to aviation and much debated.' },
        { type: 'mc',
          q: 'Why do aviation war policies carry 7-day notice-of-cancellation clauses?',
          options: [
            'Because aircraft are re-registered weekly',
            'Because geopolitical risk can transform overnight, and insurers need the ability to re-price or withdraw cover quickly',
            'Because regulators require weekly renewal',
            'To allow weekly premium instalments'
          ],
          answer: 1,
          explain: 'War perils are uniquely volatile: the clause lets insurers reset terms when conflict erupts — as buyers discovered when rates spiked after 2022.' },
        { type: 'num',
          q: 'Global airline hull & liability premium is roughly US$2bn in a year. Two major losses cost US$800m and US$650m, and attritional losses add US$700m. What is the market’s aggregate loss ratio for the year, in %? (Ignore expenses.)',
          answer: 107.5, tol: 1, unit: '%',
          explain: '(800 + 650 + 700) ÷ 2000 = 107.5% — before expenses. The thin premium base against disaster severity is the class’s defining economics.' },
        { type: 'mc',
          q: 'What is “grounding” risk in aerospace products liability?',
          options: [
            'Aircraft being struck by lightning while parked',
            'A design defect causing regulators to ground an entire fleet type, generating manufacturer liability far beyond any single accident',
            'Losses from airport ground handling',
            'Subsidence at manufacturing plants'
          ],
          answer: 1,
          explain: 'One flawed component design can idle hundreds of aircraft worldwide — the products-liability analogue of the serial-defect problem, and a key reason manufacturers buy enormous limits.' }
      ]
    },
    {
      id: 'terror-cat',
      title: 'Terrorism, political violence and property treaty: the pure accumulation classes',
      minutes: 8,
      body: `
<p>Two further short-tail classes complete the picture — both defined almost entirely by accumulation rather than attrition.</p>
<h3>Terrorism & political violence</h3>
<p>After the September 11 attacks, terrorism was excluded from standard property policies worldwide, and a standalone market grew in London to sell it back. The class spans a spectrum: sabotage and terrorism; strikes, riots and civil commotion; malicious damage; up to full <strong>political violence</strong> — insurrection, rebellion, coup and war on land. Features:</p>
<ul>
<li><strong>Accumulation by city block</strong> — a truck bomb’s damage radius defines the unit of exposure management: carriers map insured values within blast zones of city centres, and capacity in prime districts is finite.</li>
<li><strong>Government backstops</strong> — many countries pair private markets with state schemes (in the United Kingdom, Pool Re — a mutual reinsurer with government backing — takes terrorism risk above member retentions). Understanding what the state scheme covers dictates what the private market sells around it.</li>
<li><strong>Event definition disputes</strong> — was civil unrest one “occurrence” or many? The 2019–21 waves of riots (Chile, South Africa, the United States) made strikes/riots/civil-commotion cover a genuinely loss-making, repricing class.</li>
</ul>
<h3>Inwards property treaty: writing other insurers’ catastrophes</h3>
<p>London is also a major seller of <strong>property treaty reinsurance</strong> — the catastrophe excess-of-loss and proportional treaties that other insurers worldwide buy (the mirror image of the Outwards Reinsurance module, as a business line). The underwriting raw material is the cedant’s data: exposure schedules, model outputs, historical event losses. Idiosyncrasies:</p>
<ul>
<li><strong>Peak-zone pricing</strong> — the world’s reinsurance capital is disproportionately consumed by a few peak zones (Florida wind, California quake, Japan, European windstorm); rate on line varies with the global supply-demand balance for each peak.</li>
<li><strong>The retro market</strong> — reinsurers themselves buy <strong>retrocession</strong> (reinsurance of reinsurance), a smaller, more volatile market whose capacity swings amplify the whole market cycle; collateralised and catastrophe-bond capacity is concentrated here.</li>
<li><strong>Loss occurrence wording</strong> — hours clauses, event definitions and per-event vs aggregate structures (Reinsurance module) are the entire game when the big one happens.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A political violence underwriter tracks a capital city where it insures US$900m of values within a half-kilometre radius of the business district. Its realistic scenario — a large vehicle bomb — assumes 35% average damage within the radius: US$315m, against a class scenario budget of US$250m. The underwriter stops writing new risks in the district and buys a US$75m facultative protection — treating a city block exactly as a property catastrophe underwriter treats a Florida county.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Terrorism/political violence and property treaty are <strong>pure accumulation classes</strong>: the underwriting unit is the blast radius, the peak zone, the event definition. Wordings about what counts as “one event” decide fortunes.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A terrorism underwriter has US$600m of insured values in a city district and assumes 40% damage in its bomb scenario. What is the scenario loss, in US$ millions?',
          answer: 240, tol: 1, unit: 'US$ millions',
          explain: '40% × 600 = US$240m — blast-zone accumulation arithmetic, the terrorism equivalent of a hurricane zone aggregate.' },
        { type: 'mc',
          q: 'What is Pool Re?',
          options: [
            'A Lloyd’s syndicate specialising in swimming pools',
            'The United Kingdom’s government-backed mutual reinsurer for terrorism risk above member insurers’ retentions',
            'The market’s central settlement system',
            'A retrocession broker'
          ],
          answer: 1,
          explain: 'Pool Re is the UK state-backed terrorism scheme: private insurers retain the first slice and mutualise the rest with an ultimate government backstop — shaping what standalone cover the private market sells.' },
        { type: 'mc',
          q: 'What is retrocession?',
          options: [
            'The cancellation of a reinsurance treaty',
            'Reinsurance bought by reinsurers to protect their own inwards portfolios',
            'The return of premium after a loss-free year',
            'A type of terrorism exclusion'
          ],
          answer: 1,
          explain: 'Retrocession is reinsurance-of-reinsurance — a smaller, concentrated market whose capacity swings amplify pricing cycles across the whole catastrophe market.' },
        { type: 'mc',
          q: 'Why did strikes, riots and civil commotion cover reprice sharply after 2019–21?',
          options: [
            'Regulators banned the cover',
            'Waves of civil unrest in several countries produced major insured losses and exposed disputes over whether unrest was one event or many',
            'Premium taxes rose',
            'The cover was merged into cyber policies'
          ],
          answer: 1,
          explain: 'Chile, South Africa and other events turned a quiet throw-in cover into a loss-making class, forcing standalone pricing and tighter event definitions.' }
      ]
    }
  ]
});
