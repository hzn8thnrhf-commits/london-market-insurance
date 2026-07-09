/* Module 6 — Exposure Management */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'exposure',
  icon: '🌪️',
  title: 'Exposure Management',
  tagline: 'Knowing what could hit you before it does',
  blurb: 'Aggregation, catastrophe models, exceedance-probability curves, Lloyd’s realistic disaster scenarios, and the discipline of monitoring what the portfolio could lose.',
  badge: { icon: '🌪️', name: 'Aggregation Hawk', desc: 'Master the “Exposure Management” module.' },
  lessons: [
    {
      id: 'why-exposure',
      title: 'Aggregation: the risk of everything happening at once',
      minutes: 8,
      body: `
<p>Underwriters accept risks one at a time; catastrophes claim them by the thousand. <strong>Exposure management</strong> is the discipline of understanding what the portfolio — not the policy — could lose from a single event or a connected series of them, and keeping that potential inside appetite.</p>
<h3>Attritional, large and catastrophe losses</h3>
<p>Portfolio losses come in three textures, and managing each needs different tools:</p>
<ul>
<li><strong>Attritional</strong> — frequent, small, statistically stable losses (minor cargo damage, slips and trips). Managed through pricing and claims discipline.</li>
<li><strong>Large (single-risk)</strong> — one big loss to one insured: the refinery fire. Managed through line size limits and per-risk reinsurance.</li>
<li><strong>Catastrophe (event)</strong> — one occurrence hitting many insureds simultaneously: hurricane, earthquake, cyber outage, war. This is the domain of exposure management proper, because no single underwriting decision reveals it — it emerges from the <em>accumulation</em> of many decisions.</li>
</ul>
<h3>The vocabulary of “how bad could it be”</h3>
<ul>
<li><strong>Total insured value</strong> — the sum of limits exposed in some zone: the theoretical worst case if everything is destroyed. Rarely realistic, but the crudest upper bound.</li>
<li><strong>Probable maximum loss</strong> — a judgement or model estimate of the plausible worst loss for a risk or zone, given realistic damage severities (a fire rarely consumes an entire industrial complex).</li>
<li><strong>Aggregate exposure</strong> — the sum of limits or probable losses across all policies exposed to one peril in one zone — the number that grows silently as underwriters write attractive risks that happen to sit in the same place.</li>
</ul>
<h3>Zones and control totals</h3>
<p>Carriers divide the world into <strong>accumulation zones</strong> (Florida wind, Tokyo earthquake, California quake…) and set <strong>aggregate limits</strong> per zone and peril, monitored continuously. When a zone fills up, underwriters must decline risks there — even good ones — or buy more protection. This “aggregate is a budget” mindset is the cultural heart of exposure management.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A property underwriter writes 200 Florida commercial buildings, each with a £2m limit and each individually excellent. The zone aggregate is 200 × £2m = £400m of total insured value. Modelling suggests a major hurricane damages 15% of insured value on average across the zone: an expected event loss of £60m — more than the class earns in premium in four years. No single policy was a mistake; the <em>accumulation</em> is the risk. That is why the aggregate budget, not the individual underwriter’s judgement, is the binding control.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Catastrophe risk lives in the <strong>portfolio, not the policy</strong>. Track aggregates by zone and peril, cap them like budgets, and remember that a book of individually good risks can still be a collectively fatal one.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A carrier insures 350 properties in one earthquake zone, average limit £1.6m. What is the zone’s total insured value, in £ millions?',
          answer: 560, tol: 1, unit: '£ millions',
          explain: '350 × £1.6m = £560m of theoretical maximum exposure in the zone.' },
        { type: 'num',
          q: 'That zone’s modelled severe-event damage ratio is 12% of total insured value. What is the modelled event loss, in £ millions?',
          answer: 67.2, tol: 0.5, unit: '£ millions',
          explain: '12% × £560m = £67.2m — the portfolio-level number no individual policy review would ever reveal.' },
        { type: 'mc',
          q: 'Which loss type is exposure management primarily designed to control?',
          options: [
            'Frequent small attritional losses',
            'A single large loss to one insured',
            'Event losses that strike many policies simultaneously through accumulation',
            'Expense overruns'
          ],
          answer: 2,
          explain: 'Attritional losses are a pricing matter and single large losses a line-size matter; accumulation across policies is the distinctive territory of exposure management.' },
        { type: 'mc',
          q: 'A zone’s aggregate limit is full. A broker offers an exceptionally well-priced risk in that zone. What does disciplined exposure management require?',
          options: [
            'Write it — good pricing always justifies more aggregate',
            'Decline it, or make room by shedding other exposure or buying more protection, because the aggregate budget is the binding constraint',
            'Write it but do not record it in the zone',
            'Halve the price to offset the risk'
          ],
          answer: 1,
          explain: 'The whole point of aggregate budgets is that they bind even against attractive individual risks — otherwise accumulations grow one “exception” at a time.' }
      ]
    },
    {
      id: 'cat-models',
      title: 'Catastrophe models and exceedance-probability curves',
      minutes: 9,
      body: `
<p>Since Hurricane Andrew (1992) bankrupted insurers who had guessed at their Florida exposure, the market has priced and capitalised catastrophe risk using <strong>catastrophe models</strong> — simulation engines built by specialist vendors (the major platforms include Moody’s RMS and Verisk’s AIR) and increasingly open frameworks.</p>
<h3>How a catastrophe model works</h3>
<ol>
<li><strong>Hazard module</strong> — a catalogue of tens of thousands of simulated years of events (hurricanes with tracks and wind fields, earthquakes with magnitudes and ground motion), statistically consistent with science and history.</li>
<li><strong>Exposure data</strong> — the insurer’s portfolio: locations, insured values, construction, occupancy, policy terms. Model output is only as good as this input — “garbage in” is the industry’s favourite warning.</li>
<li><strong>Vulnerability module</strong> — damage functions translating hazard intensity at a location into a damage ratio for that building type.</li>
<li><strong>Financial module</strong> — applies deductibles, limits and reinsurance to convert ground-up damage into insured loss.</li>
</ol>
<h3>The output: a distribution, not a number</h3>
<p>The model produces a loss for every simulated event, yielding an <strong>exceedance-probability curve</strong>: for any loss size, the annual probability of exceeding it. Two conventions matter:</p>
<ul>
<li><strong>Occurrence basis</strong> — the largest <em>single event</em> loss in a year. Used for per-event reinsurance and single-event appetite.</li>
<li><strong>Aggregate basis</strong> — the <em>sum of all event losses</em> in a year. Used for annual result and capital questions. Aggregate always sits at or above occurrence at a given probability.</li>
</ul>
<p>Points on the curve are quoted as <strong>return periods</strong>: “the 1-in-100 occurrence loss is £250m” means a 1% annual chance that some single event exceeds £250m. Crucially, a 1-in-100-year loss is not due once a century — each year rolls the dice afresh, and over 30 years the chance of at least one exceedance is about 26%.</p>
<h3>Uses and abuses</h3>
<p>Model outputs drive pricing of catastrophe-exposed business, reinsurance purchase (how high the tower), capital modelling, and appetite statements (“1-in-100 occurrence loss ≤ 10% of capital”). The abuse: treating outputs as truth. Vendors disagree; models miss perils (next lessons); exposure data decays. Good practice blends models, adjusts for known gaps, and stress-tests beyond them.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A syndicate’s modelled Florida wind curve (occurrence basis, net of reinsurance): 1-in-30 £40m; 1-in-100 £95m; 1-in-200 £140m. Its board appetite: the 1-in-100 occurrence net loss must not exceed £80m. At £95m the portfolio breaches appetite — the options are to shed aggregate, buy £15m+ more reinsurance, or (with board approval) revise appetite. Exposure management is exactly this feedback loop, run quarterly.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>A catastrophe model is <strong>hazard × exposure × vulnerability × financial terms</strong>, and its output is a curve, not a number. Know your basis (occurrence vs aggregate), quote by return period — and never confuse “1-in-100” with “once per hundred years”.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'What does “the 1-in-200 occurrence loss is £300m” mean?',
          options: [
            'A £300m event will happen exactly once every 200 years',
            'There is a 0.5% probability in any year that a single event’s loss exceeds £300m',
            'Total annual losses will never exceed £300m',
            'The model has simulated only 200 years'
          ],
          answer: 1,
          explain: 'Return periods are annual probabilities (1/200 = 0.5%) of exceedance by a single event, re-rolled every year — not a schedule.' },
        { type: 'mc',
          q: 'Why does the aggregate exceedance-probability curve sit at or above the occurrence curve?',
          options: [
            'Because aggregate includes reinsurance recoveries',
            'Because the sum of all events in a year is at least as large as the biggest single event',
            'Because occurrence curves ignore deductibles',
            'It doesn’t — occurrence is always higher'
          ],
          answer: 1,
          explain: 'Aggregate = sum of the year’s event losses ≥ the largest one. In multi-event years the gap is large — 2017’s hurricanes being the classic example.' },
        { type: 'num',
          q: 'A portfolio’s modelled 1-in-100 occurrence net loss is £120m. Appetite caps it at 8% of the carrier’s £1.2bn capital. By how much does the portfolio breach appetite, in £ millions?',
          answer: 24, tol: 0.5, unit: '£ millions',
          explain: 'Appetite = 8% × £1,200m = £96m; breach = 120 − 96 = £24m to be shed, reinsured or re-approved.' },
        { type: 'mc',
          q: 'Which input failure most commonly undermines catastrophe model output?',
          options: [
            'Using a leap year in the simulation',
            'Poor exposure data — missing locations, stale values, unknown construction',
            'Too many simulated years',
            'Using more than one vendor model'
          ],
          answer: 1,
          explain: 'The hazard science is the vendor’s job; the exposure data is yours. Incomplete or outdated schedules silently corrupt every downstream number.' }
      ]
    },
    {
      id: 'rds',
      title: 'Lloyd’s realistic disaster scenarios',
      minutes: 8,
      body: `
<p>Alongside probabilistic models, Lloyd’s runs a deliberately simple, deterministic discipline: <strong>realistic disaster scenarios</strong>. Every syndicate must regularly estimate its loss from a common set of specified mega-events, so that Lloyd’s can see each syndicate’s — and the whole market’s — concentration to the same disasters.</p>
<h3>The scenario set</h3>
<p>The prescribed events evolve, but the flavour is constant: two Gulf of Mexico windstorms in one season; a major Florida hurricane making landfall in Miami; San Francisco and Los Angeles earthquakes; a Japanese earthquake; a European windstorm; a terrorism event in a major city; aviation collision; a marine collision or major offshore energy complex loss; cyber scenarios; and others. Each comes with defined parameters — location, size, industry loss — so all syndicates answer the same exam question.</p>
<h3>What syndicates report</h3>
<p>For each scenario, syndicates estimate <strong>gross loss</strong> (before reinsurance), <strong>net loss</strong> (after outwards reinsurance and reinstatement premiums), and the resulting reinsurance recoveries — exposing both the exposure itself and the dependence on reinsurance to survive it. Lloyd’s tracks these against syndicate-specific tolerances (relating net scenario losses to capital) and market-level concentrations.</p>
<h3>Why deterministic scenarios survive in a probabilistic age</h3>
<ul>
<li><strong>Comparability</strong> — identical events across syndicates; no hiding behind model choices.</li>
<li><strong>Communicability</strong> — a board understands “Miami hurricane costs us £180m net” faster than any curve.</li>
<li><strong>Model-independence</strong> — a cross-check when models disagree or miss perils.</li>
<li><strong>Reinsurance realism</strong> — forces explicit tracing of recoveries, reinstatements and counterparty concentrations under stress.</li>
</ul>
<p>The same technique — named stress scenarios reported gross and net — is used internally by carriers far beyond the Lloyd’s prescribed set, including for casualty catastrophes (a mass tort), financial-market events and cyber accumulation.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>For the “Florida windstorm” scenario a syndicate reports: gross loss £310m; reinsurance recoveries £240m; reinstatement premiums payable £18m; net loss £88m. Lloyd’s notes two things: the net figure sits within the syndicate’s tolerance (12% of its £800m capital = £96m — just), and the recoveries depend heavily on three reinsurers. The follow-up questions are about reinsurer concentration and what happens in the two-storm season scenario, where reinstatements may be exhausted.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Realistic disaster scenarios are the market’s <strong>common stress exam</strong>: same events for everyone, answered gross and net. They complement probabilistic models with comparability — and expose how much survival depends on reinsurance actually paying.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'A syndicate reports a scenario gross loss of £260m, reinsurance recoveries of £190m and reinstatement premiums of £12m. What net loss does it report, in £ millions?',
          answer: 82, tol: 0.5, unit: '£ millions',
          explain: '260 − 190 + 12 = £82m net — reinstatement premiums add to the net cost of the event.' },
        { type: 'mc',
          q: 'Why does Lloyd’s prescribe the same disaster scenarios for all syndicates rather than accepting each syndicate’s own model output?',
          options: [
            'Because syndicates have no models',
            'To achieve comparability and to aggregate the whole market’s exposure to identical events',
            'Because vendor models are prohibited at Lloyd’s',
            'To calculate premium levies'
          ],
          answer: 1,
          explain: 'A common exam question lets Lloyd’s compare syndicates and sum the market’s concentration to one event — impossible if everyone models different storms.' },
        { type: 'mc',
          q: 'A syndicate’s scenario results show a modest net loss but enormous gross loss. What does that pattern reveal?',
          options: [
            'The syndicate has no catastrophe exposure',
            'Heavy dependence on outwards reinsurance performing — making reinsurer credit and reinstatement availability critical in that event',
            'The scenario is irrelevant to the syndicate',
            'The syndicate has over-reserved'
          ],
          answer: 1,
          explain: 'Gross-to-net gap = reliance on recoveries. Lloyd’s scrutinises exactly this: who are the reinsurers, how concentrated, and does protection survive a second event?' },
        { type: 'num',
          q: 'A syndicate’s tolerance caps any single scenario net loss at 15% of its £600m capital. Its Japanese earthquake scenario shows £104m net. By how much is it inside (positive) or outside (negative) tolerance, in £ millions? (Enter a negative number if outside.)',
          answer: -14, tol: 0.5, unit: '£ millions',
          explain: 'Tolerance = 15% × 600 = £90m. Net £104m exceeds it by £14m → outside tolerance by 14 (answer −14). Expect remediation: shed exposure or buy protection.' }
      ]
    },
    {
      id: 'clash',
      title: 'Clash, systemic perils and the frontier: cyber and casualty accumulation',
      minutes: 9,
      body: `
<p>Property catastrophe is exposure management’s oldest territory — but its hardest problems today are perils where accumulation hides in <em>connections</em> rather than geography.</p>
<h3>Clash: one event, many policies, many classes</h3>
<p><strong>Clash</strong> is a single occurrence hitting multiple policies or classes at once, often in ways no zone map shows. A refinery explosion can trigger property, business interruption, casualty (injured contractors), environmental liability and directors’ & officers’ policies simultaneously. The September 11 attacks remain the defining example: aviation hull, aviation liability, property, business interruption, workers’ compensation, life and event-cancellation losses from one morning. Clash covers (excess-of-loss treaties attaching above any single policy’s retention when two or more policies are hit) exist precisely for this.</p>
<h3>Cyber accumulation: geography without a map</h3>
<p>Cyber’s catastrophe is a <strong>common dependency</strong>: one cloud provider, one operating system, one widely embedded software library. An outage or malware event propagates to thousands of insureds regardless of location. Exposure managers attack it by mapping insureds’ technological dependencies (which cloud? which software?), running scenario losses (a multi-day outage of a major cloud provider), and policing <strong>silent cyber</strong> — cyber losses leaking into policies never priced for it, such as a property policy paying for fire caused by a hacked control system. The market now broadly requires cyber cover to be explicitly affirmed or excluded in every wording, and war/state-actor exclusions in cyber are among the market’s most debated clauses.</p>
<h3>Casualty accumulation: slow-motion catastrophe</h3>
<p>Liability books accumulate through shared causes rather than shared moments: one harmful product or substance (asbestos being the eternal warning), one flawed professional practice, one mass tort spanning thousands of claimants and decades. Emerging candidates are tracked — for instance certain “forever chemicals” — through systematic horizon-scanning: which insureds, which industries, which policy years would a given liability catastrophe touch across the whole casualty book?</p>
<h3>Non-modelled risk and model miss</h3>
<p>Every framework leaves residue: perils without vendor models (volcanic ash, space weather), secondary perils modelled poorly (wildfire, flood in some regions), and plain surprise. Disciplines against it: total-insured-value caps regardless of model output, explicit non-modelled loadings in pricing and capital, and post-event model evaluation (did reality match the curve?). Climate change adds a moving-target problem: history under-represents tomorrow’s hazard, so models and appetites need forward adjustment, not just calibration to the past.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A carrier maps its cyber book’s dependencies and finds 42% of insureds’ revenue-critical operations rely on a single cloud provider. Its scenario — a 3-day outage of that provider — produces a modelled loss of £70m across cyber business-interruption policies, plus an estimated £15m of “silent” exposure in technology errors-and-omissions wordings not yet remediated. Board appetite for a single cyber scenario is £60m. Actions: cap new business dependent on that provider, complete the wording remediation, and buy a cyber-specific aggregate cover — the same aggregate-budget logic as Florida wind, applied to a dependency instead of a coastline.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Modern accumulation is about <strong>connections — shared events (clash), shared technology (cyber), shared causes (casualty)</strong> — not just shared postcodes. The method transfers: identify the dependency, scenario-test it, budget it, and hunt the silent exposure in wordings.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'What is “silent cyber”?',
          options: [
            'Cyber attacks that are never discovered',
            'Cyber-caused losses covered unintentionally under policies not designed or priced for cyber risk',
            'Cyber policies with confidentiality clauses',
            'Encrypted claims data'
          ],
          answer: 1,
          explain: 'Silent cyber is leakage: a traditional wording (property, marine, casualty) picking up cyber-caused loss it never contemplated. The market response is mandatory affirmative cover or exclusion.' },
        { type: 'mc',
          q: 'Why is a single major cloud provider outage the canonical cyber accumulation scenario?',
          options: [
            'Cloud providers refuse to buy insurance',
            'Thousands of otherwise unrelated insureds share a dependency on it, so one event hits them all simultaneously — accumulation without geography',
            'Outages only affect insured companies',
            'Cloud outages are the most frequent cyber event'
          ],
          answer: 1,
          explain: 'The shared dependency plays the role a coastline plays in hurricane risk: the common factor through which one event reaches a whole portfolio.' },
        { type: 'mc',
          q: 'Which best describes casualty accumulation compared with property catastrophe?',
          options: [
            'It is identical but smaller',
            'A shared cause (product, substance, practice) generating claims across many insureds and many policy years, emerging over years rather than hours',
            'It only affects claims-made policies',
            'It cannot exceed one year of premium'
          ],
          answer: 1,
          explain: 'Casualty catastrophes are slow-motion: asbestos took decades to unfold across occurrence policies. The accumulation axis is causal and temporal, not geographic.' },
        { type: 'num',
          q: 'A carrier’s cyber scenario shows £70m of affirmative-cover loss plus £15m of silent exposure. Wording remediation eliminates 80% of the silent portion. What is the remediated scenario total, in £ millions?',
          answer: 82, tol: 0.5, unit: '£ millions',
          explain: '70 + (15 × 0.2) = £82m — wording work is exposure management, reducing scenario loss without touching a single affirmative policy.' }
      ]
    }
  ]
});
