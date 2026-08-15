/* Module 15 — Insurance Principles & the Law (LM1/LM2 legal core) */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'principles',
  icon: '📜',
  title: 'Insurance Principles & the Law',
  tagline: 'The legal foundations every market exam starts with',
  blurb: 'The doctrines underneath every policy: insurable interest, indemnity and its corollaries (subrogation and contribution), good faith, proximate cause, and the agency relationships that hold the market together. This is the legal core of the CII’s London market syllabus.',
  cii: 'LM1 · LM2',
  badge: { icon: '📜', name: 'First Principles', desc: 'Master “Insurance Principles & the Law”.' },
  lessons: [
    {
      id: 'insurable-interest',
      title: 'Insurable interest: why you can’t insure a stranger’s ship',
      minutes: 8,
      body: `
<p>Insurance law begins with a filter: not everyone may insure everything. A valid policy requires the insured to have an <strong>insurable interest</strong> — a legally recognised relationship to the subject matter such that the insured benefits from its preservation and suffers from its loss.</p>
<h3>Why the doctrine exists</h3>
<p>Two evils drove its creation in the eighteenth century (the Marine Insurance Act 1745 and Life Assurance Act 1774 remain the historical roots):</p>
<ul>
<li><strong>Wagering</strong> — without the requirement, insurance is indistinguishable from gambling on other people’s misfortunes; eighteenth-century speculators famously took out policies on ships and public figures they had no connection to.</li>
<li><strong>Moral hazard of the worst kind</strong> — a person who profits when a ship sinks has an interest in sinking it. Insurable interest aligns the insured with survival, not loss.</li>
</ul>
<h3>What counts as an interest</h3>
<ul>
<li><strong>Ownership</strong> — the obvious case: you may insure what you own, to its value.</li>
<li><strong>Partial and limited interests</strong> — a mortgagee (the lending bank) may insure the property securing its loan; a bailee (a warehouse keeper, a repairer) may insure goods in its custody; trustees, tenants and part-owners each have their slice.</li>
<li><strong>Legal liability</strong> — the basis of the entire casualty market: you have an insurable interest in your potential liability to others.</li>
<li><strong>Contractual expectations</strong> — a freight forwarder’s earnings from a voyage, a business’s future profits (the foundation of business interruption cover).</li>
</ul>
<h3>Timing — a marine idiosyncrasy</h3>
<p>In most non-marine insurance the interest must exist when the policy is taken out; in <strong>marine</strong> insurance it need only exist <em>at the time of the loss</em> — a pragmatic accommodation of cargo that changes hands mid-voyage under sale contracts. One of many places where marine law, the market’s oldest layer, keeps its own rules.</p>
<h3>Where it bites in practice</h3>
<p>Modern disputes are rarely about wagers; they are about <strong>who exactly holds the interest</strong> in complex commercial arrangements: co-insureds on construction projects, subsidiaries insured under a parent’s programme, lenders noted on policies, warehouse operators versus cargo owners. Getting the insured entities and their interests right on the slip is contract-certainty work with real claims consequences — a claim can fail because the entity that suffered the loss was not the entity insured.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A bank lends £6m secured on a £10m building, and the borrower insures the building for £10m. Both have insurable interests — but different ones: the owner to the full £10m, the bank only to its £6m exposure (shrinking as the loan amortises). If the building burns when £4m of the loan remains, the bank’s recoverable interest is £4m, not £6m — an interest is measured by what you actually stand to lose <em>at the time of loss</em>.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Insurable interest = <strong>a legal stake in the thing’s survival</strong>, measured by what you stand to lose. It separates insurance from wagering, anchors the indemnity principle (next lesson) — and in the London market it lives on as the discipline of naming the right insureds on the slip.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Why does the law require insurable interest for a valid insurance contract?',
          options: [
            'To increase premium volumes',
            'To separate insurance from wagering and remove the incentive to cause the insured loss',
            'Because reinsurers demand it',
            'To limit insurance to property owners only'
          ],
          answer: 1,
          explain: 'The doctrine kills the gambling use of insurance and aligns the insured with the survival of the subject matter — the foundation the indemnity principle builds on.' },
        { type: 'num',
          q: 'A bank holds a mortgage with £3.2m outstanding on a building insured for £9m. The building is destroyed. What is the maximum the bank’s insurable interest supports recovering, in £ millions?',
          answer: 3.2, tol: 0.05, unit: '£ millions',
          explain: 'An interest is measured by actual exposure at the time of loss: the bank stands to lose only its outstanding £3.2m, whatever the building is worth.' },
        { type: 'mc',
          q: 'When must insurable interest exist in marine insurance?',
          options: [
            'When the policy is taken out',
            'At the time of the loss',
            'Continuously throughout the policy',
            'Only when premium is paid'
          ],
          answer: 1,
          explain: 'Marine’s timing rule accommodates cargo changing ownership mid-voyage — interest at the moment of loss suffices, unlike the general non-marine position.' },
        { type: 'mc',
          q: 'A warehouse operator with no ownership of the goods it stores wants insurance covering those goods. Can it have an insurable interest?',
          options: [
            'No — only owners can insure property',
            'Yes — as bailee it has custody and potential liability for the goods, a recognised insurable interest',
            'Only if the goods’ owners consent in writing',
            'Only for goods stored over 12 months'
          ],
          answer: 1,
          explain: 'Bailees, mortgagees, tenants, carriers and others with limited interests can all insure to the extent of their stake — which is why cargo, bailee liability and similar covers exist.' }
      ]
    },
    {
      id: 'indemnity',
      title: 'Indemnity: restored, not enriched',
      minutes: 8,
      body: `
<p>The organising principle of most insurance: a claim payment should place the insured in the <strong>same financial position as immediately before the loss — no better</strong>. Insurance restores; it must not enrich, or every loss becomes a payday and moral hazard runs wild.</p>
<h3>Measuring an indemnity</h3>
<ul>
<li><strong>Property</strong> — usually the cost of repair or the value of what was lost, with deductions for wear and betterment. Many commercial policies contract up to <strong>reinstatement (new-for-old)</strong> cover — technically more than a strict indemnity, permitted because the parties agreed it and priced it.</li>
<li><strong>Agreed value policies</strong> — marine hull and fine art commonly fix the insured value up front; at total loss the agreed value is paid without re-arguing worth. The market accepts the departure from pure indemnity for certainty (recall constructive total loss decisions in the Marine lesson turning on agreed values).</li>
<li><strong>Liability</strong> — the indemnity is the insured’s legal liability plus defence costs: whatever the court or settlement says.</li>
<li><strong>Benefit policies stand apart</strong> — personal accident pays fixed sums per injury with no indemnity measurement at all (as the Accident & Health lesson noted): a different contract species.</li>
</ul>
<h3>Underinsurance and average</h3>
<p>Indemnity interacts with premium fairness through the <strong>average clause</strong> you met in Property D&F: declare only half the true value, pay half the premium — and recover only half of any partial loss. Average enforces proportionality between premium paid and protection enjoyed.</p>
<h3>The corollaries</h3>
<p>Two doctrines exist purely to police the “no better off” rule, and they are the next lesson’s subject:</p>
<ul>
<li><strong>Subrogation</strong> — stops the insured recovering twice (once from insurers, once from the wrongdoer).</li>
<li><strong>Contribution</strong> — stops the insured recovering twice from two overlapping policies.</li>
</ul>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A machine bought for £800,000 five years ago is destroyed. Replacement new costs £1m; its second-hand (actual) value immediately before the loss was £450,000. Strict indemnity: <strong>£450,000</strong> — position restored. Under a reinstatement policy: <strong>£1m</strong> — new for old, as contracted. If the insured had declared values at only 60% of the truth on an average-clause policy, a £300,000 partial repair claim would scale to 60% × £300,000 = <strong>£180,000</strong>. Same loss, three different recoveries — all determined by the indemnity basis agreed at placement.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Indemnity = <strong>restoration, not enrichment</strong>. Reinstatement and agreed-value covers are priced, contracted departures; average punishes under-declaration; and subrogation and contribution exist solely to stop double recovery.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'Equipment with a pre-loss market value of £320,000 is destroyed; replacing it new would cost £500,000. On a strict indemnity basis (no reinstatement cover), what does the insurer pay, in £?',
          answer: 320000, tol: 2000, unit: '£',
          explain: 'Indemnity restores the pre-loss position: the £320,000 the insured actually lost, not the cost of a brand-new upgrade.' },
        { type: 'num',
          q: 'A policy has an average clause. True value at risk is £5m but the insured declared £3.5m. A £1m partial loss occurs. What is paid, in £?',
          answer: 700000, tol: 5000, unit: '£',
          explain: 'Recovery scales by declared ÷ true value: (3.5 ÷ 5) × £1m = £700,000 — proportionality between premium and protection, enforced.' },
        { type: 'mc',
          q: 'Why are agreed-value policies (marine hull, fine art) tolerated despite departing from strict indemnity?',
          options: [
            'They are not — they are void',
            'Certainty: valuation disputes after a total loss are avoided because both parties fixed the value, and priced it, at inception',
            'Because those assets never change value',
            'Because regulators set the values'
          ],
          answer: 1,
          explain: 'The parties contract out of measurement arguments. The agreed value governs total-loss payouts and constructive-total-loss mathematics alike.' },
        { type: 'mc',
          q: 'Which type of policy is NOT an indemnity contract at all?',
          options: [
            'Commercial property insurance',
            'Professional indemnity insurance',
            'Personal accident cover paying £250,000 per death',
            'Marine cargo insurance'
          ],
          answer: 2,
          explain: 'Benefit policies pay fixed scheduled sums with no measurement of financial loss — a distinct species alongside the indemnity family.' }
      ]
    },
    {
      id: 'subrogation-contribution',
      title: 'Subrogation and contribution: no double recovery',
      minutes: 9,
      body: `
<p>Two doctrines act as indemnity’s enforcement arm. Both trigger only for indemnity policies, and both quietly move serious money around the London market every day.</p>
<h3>Subrogation: stepping into the insured’s shoes</h3>
<p>When an insurer pays a claim caused by a third party’s fault, the insured may also have the right to sue that wrongdoer. Recovering from both would breach indemnity — so the insurer, having paid, <strong>steps into the insured’s legal rights</strong> and pursues the wrongdoer itself (in the insured’s name), keeping recoveries up to what it paid.</p>
<ul>
<li><strong>Practical scale</strong> — subrogated recoveries (against negligent contractors, product manufacturers, colliding shipowners) materially reduce net claims; recovery teams and lawyers exist for exactly this. Recall the Political Risk lesson: recovery skill can matter more than pricing precision.</li>
<li><strong>Waivers</strong> — commercial contracts frequently require insurers to <strong>waive subrogation</strong> against project partners (a landlord’s insurer against the tenant, co-venturers on a construction project) so that one project insurance pot settles matters without internal warfare. Underwriters price these waivers because they surrender real recovery value.</li>
<li><strong>Limits</strong> — the insurer recovers only what it paid; anything above goes to the insured (for the uninsured deductible, for example).</li>
</ul>
<h3>Contribution: two policies, one loss</h3>
<p>Where two policies cover the same insured, same interest and same peril, the insured may claim in full from either — but the paying insurer can demand <strong>contribution</strong> from the other, so each ultimately bears its <strong>rateable proportion</strong>. The common method divides by sums insured (or by independent liability for liability covers).</p>
<p>Policies try to pre-empt the tangle with clauses: <strong>“other insurance” clauses</strong>, non-contribution clauses, and escape clauses — and when two policies each say “the other pays first”, courts generally cancel the clauses out and order contribution anyway. In the London market this surfaces constantly at the boundaries between programmes: project covers versus annual covers, the master policy versus the local policy (Global Programmes lesson), the property policy versus the cyber policy on a hacked-then-burned facility.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p><strong>Subrogation:</strong> a negligent contractor burns down an insured warehouse. The property insurer pays its insured £4.2m, then sues the contractor (in the insured’s name) and recovers £3m from the contractor’s liability insurers. Net claim: £1.2m. The contractor’s liability policy, of course, is now paying — one market’s recovery is another market’s claim.</p>
<p><strong>Contribution:</strong> the same stock is insured under Policy A (sum insured £6m) and Policy B (£4m). A £2m loss occurs and the insured claims it all from A. A pays £2m, then recovers B’s rateable proportion: 4/(6+4) × £2m = <strong>£800,000</strong>. Each insurer ends up bearing its share; the insured is indemnified exactly once.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p><strong>Subrogation</strong> shifts the loss to the wrongdoer; <strong>contribution</strong> splits it between overlapping insurers — both so the insured recovers exactly once. Waivers of subrogation are priced concessions, and recovery work is a genuine profit centre.</p>
</div>`,
      quiz: [
        { type: 'num',
          q: 'An insurer pays a £5m claim caused by a negligent supplier, then recovers £3.5m through subrogation. What is the insurer’s net claim cost, in £ millions?',
          answer: 1.5, tol: 0.05, unit: '£ millions',
          explain: '5 − 3.5 = £1.5m. Subrogated recoveries directly reduce net incurred claims — and the loss lands on the wrongdoer’s liability insurers.' },
        { type: 'num',
          q: 'The same property is insured under Policy A (£8m sum insured) and Policy B (£2m). A covered loss of £1.5m is paid in full by A. What contribution can A recover from B, in £?',
          answer: 300000, tol: 5000, unit: '£',
          explain: 'B’s rateable proportion by sums insured = 2/(8+2) = 20%; 20% × £1.5m = £300,000.' },
        { type: 'mc',
          q: 'Why do construction project agreements commonly require insurers to waive subrogation between project parties?',
          options: [
            'To reduce premiums automatically',
            'So the project’s insurance settles losses without the parties’ insurers suing each other across the same site — buying commercial peace, which underwriters price for',
            'Because subrogation is illegal on construction sites',
            'To transfer all losses to the main contractor'
          ],
          answer: 1,
          explain: 'A waiver surrenders real recovery rights in exchange for workable project relationships — a priced concession, not a giveaway.' },
        { type: 'mc',
          q: 'Two overlapping policies each contain a clause saying the other policy must pay first. What do courts generally do?',
          options: [
            'Neither policy pays',
            'The policy issued first pays everything',
            'The clauses cancel out and the insurers share by contribution',
            'The insured chooses which insurer keeps the loss'
          ],
          answer: 2,
          explain: 'Mutually repugnant escape clauses neutralise each other; rateable contribution follows — the doctrine the clauses tried to dodge.' }
      ]
    },
    {
      id: 'proximate-cause',
      title: 'Proximate cause: which peril gets the blame',
      minutes: 8,
      body: `
<p>Policies insure against named perils and exclude others — but real losses arrive as <em>chains</em> of events. A storm breaches a wall, water short-circuits a panel, the fire alarm fails, the building burns. Which event is “the cause”? The law answers with the doctrine of <strong>proximate cause</strong>: the policy responds to the <strong>dominant, efficient cause</strong> of the loss — not necessarily the last event in time, but the one that set the operative chain in motion.</p>
<h3>Working the chain</h3>
<ul>
<li><strong>Unbroken chains</strong> — if an insured peril starts a natural, unbroken sequence, everything that flows is covered: storm → breach → flood damage is a storm loss.</li>
<li><strong>Intervening causes</strong> — a genuinely new, independent event breaks the chain and becomes the new proximate cause: fire damages a wall; a week later, negligent demolition collapses it — the collapse is the demolition’s loss, not the fire’s.</li>
<li><strong>Concurrent causes</strong> — two causes operate together, inseparably. The classic rule: if one is insured and the other merely <em>not mentioned</em>, the loss is covered; if one is insured and the other is <strong>excluded</strong>, the exclusion wins. This single rule decides enormous cases.</li>
</ul>
<h3>Why the market fights over it</h3>
<p>Proximate cause is where wordings meet catastrophe. Was hurricane damage caused by wind (covered) or flood (sub-limited or excluded)? Was the loss terrorism, riot, or insurrection — three different policies (the Terrorism map’s exact dispute)? The pandemic business-interruption litigation, fought to the UK Supreme Court in 2021, turned substantially on causation questions across thousands of wordings — and rewrote how “each individual case of disease” is treated as a cause. After every major event, causation arguments are where the money moves.</p>
<h3>Drafting around the doctrine</h3>
<p>Because the default rules are known, drafters modify them deliberately: exclusions applying to losses “directly or indirectly” caused by a peril widen the exclusion beyond proximate cause; “howsoever arising” goes further still. Reading a wording means reading its causation language — the same peril can be in or out depending on two adverbs.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A policy covers storm but excludes flood. A violent storm drives a tidal surge over the sea wall; wind tears part of the roof while surge water wrecks the ground floor. Roof: proximate cause storm — covered. Ground floor: the operative cause is inundation by seawater — flood — excluded, even though the storm “caused the flood”; and where wind and water damage are truly inseparable, the concurrent-cause rule sends the excluded peril’s share out of cover. Exactly this wind-versus-water autopsy follows every hurricane, adjuster by adjuster, building by building.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Proximate cause = the <strong>dominant, efficient cause</strong>, not the last one. Unbroken chains follow the initiating peril; an insured and an <em>excluded</em> cause operating together defaults to the exclusion; and drafters override all of it with “directly or indirectly” language. After a catastrophe, this doctrine is the battlefield.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'What does “proximate cause” mean in insurance law?',
          options: [
            'The event closest in time to the loss',
            'The dominant, efficient cause that set the operative chain of events in motion',
            'The most expensive contributing factor',
            'Whatever cause the insured nominates'
          ],
          answer: 1,
          explain: 'Proximity is about causal potency, not chronology — the cause that made the loss happen, however many links follow it.' },
        { type: 'mc',
          q: 'A loss results from two inseparable concurrent causes: one insured, one expressly excluded. What is the default legal outcome?',
          options: [
            'The loss is covered — the insured peril prevails',
            'The loss is excluded — the exclusion prevails',
            'The loss is split 50/50',
            'The court chooses the fairer outcome case by case'
          ],
          answer: 1,
          explain: 'Where an excluded cause is a concurrent proximate cause, the exclusion wins — one of the most consequential default rules in coverage law, and the reason exclusion drafting is fought so hard.' },
        { type: 'mc',
          q: 'Why do exclusions often say losses “directly or indirectly” caused by a peril?',
          options: [
            'Legal tradition with no effect',
            'To widen the exclusion beyond the proximate-cause default, sweeping in losses where the excluded peril sits anywhere in the chain',
            'To narrow the exclusion to immediate causes only',
            'To satisfy regulators'
          ],
          answer: 1,
          explain: '“Directly or indirectly” deliberately overrides the doctrine: the excluded peril need not be dominant, merely present in the causal chain. Two adverbs, enormous consequences.' },
        { type: 'mc',
          q: 'After a hurricane, why do insurers and adjusters painstakingly separate wind damage from flood damage building by building?',
          options: [
            'Regulatory statistics require it',
            'Because wind and flood are often covered differently — full cover versus sub-limits, exclusions or separate schemes — so the proximate cause of each element of damage determines who pays what',
            'To delay claim payments',
            'Because reinsurers only cover wind'
          ],
          answer: 1,
          explain: 'The wind/water autopsy is applied proximate-cause doctrine at industrial scale — the same storm, radically different recoveries depending on causation findings.' }
      ]
    },
    {
      id: 'agency-institutions',
      title: 'Agency, the broker’s duties and the market’s institutions',
      minutes: 9,
      body: `
<p>The London market runs on intermediaries acting for others — which makes the law of <strong>agency</strong>, and the institutions that organise the market, part of its legal core.</p>
<h3>Agency: acting for another</h3>
<p>An agent binds a principal in dealings with third parties. The market’s daily question is always: <strong>whose agent is this?</strong></p>
<ul>
<li><strong>The broker is the insured’s agent</strong> — the Market module’s foundation, restated as law: duties of skill and care in advising, placing effectively, disclosing what the client needs disclosed, and handling claims in the client’s interest. Broker negligence claims (placement gaps, missed notifications) form a steady stream of professional-indemnity litigation.</li>
<li><strong>Yet the broker holds roles both ways</strong> — collecting premiums for insurers, sometimes holding claims funds, operating under <strong>terms of business agreements</strong> that define whose money sits in whose account when. This dual position is a managed, disclosed conflict — and the conduct rules around broker remuneration (the Broker Facilities debate from the Pens & Paper module) live exactly here.</li>
<li><strong>The coverholder is the insurer’s agent</strong> — the mirror image: under a binding authority the coverholder binds the <em>insurer</em>. Its authority has legal edges: bind outside the authority and questions of apparent authority and ratification decide whether the insurer is stuck with the risk. Binder wording defines the pen’s limits precisely because agency law makes those limits matter.</li>
<li><strong>The managing agent</strong> at Lloyd’s acts for its syndicate members; the members’ agent for individual members — the whole Lloyd’s structure is nested agency.</li>
</ul>
<h3>The institutions that hold it together</h3>
<ul>
<li><strong>Lloyd’s (the Corporation)</strong> — market oversight, licences, chain of security (Modules 1 and 4).</li>
<li><strong>The Lloyd’s Market Association</strong> — represents managing agents; produces the model wordings and clauses (its clause library underpins market contract certainty).</li>
<li><strong>The International Underwriting Association</strong> — the company market’s counterpart.</li>
<li><strong>The London & International Insurance Brokers’ Association</strong> — the brokers’ body.</li>
<li>Jointly, these run the market’s shared machinery — placing standards (the Market Reform Contract), the central bureau arrangements, and the modernisation programmes progressively digitising placement and processing.</li>
</ul>
<h3>Why this matters beyond the exam</h3>
<p>Almost every operational document you will touch — a terms of business agreement, a binding authority, a claims agreement arrangement — is an allocation of agency: who may commit whom, with whose money, within what limits. Read them with the question “whose agent, for what?” and their structure becomes obvious.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A coverholder with a US$2m-per-risk binding authority binds a US$5m risk. The insured, knowing nothing of the internal limit, claims after a loss. Agency law asks: did the insurer clothe the coverholder with <em>apparent</em> authority? If the coverholder appeared authorised (issuing the insurer’s documents, as usual), the insurer is likely bound to the innocent insured — and left to pursue the coverholder for the breach. This is why binder oversight (audits, bordereaux, system-enforced limits) is not bureaucracy: it is the practical management of a legal exposure.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Ask of every market relationship: <strong>whose agent, for what, within what authority?</strong> Brokers act for insureds (with managed dual roles), coverholders for insurers, managing agents for members — and the market associations (Lloyd’s Market Association, International Underwriting Association, the brokers’ association) maintain the shared wordings and machinery that keep those relationships standardised.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'In a standard London market placement, whose agent is the broker?',
          options: [
            'The lead underwriter’s',
            'The insured’s — with defined, disclosed functions performed for insurers (like premium collection) under terms of business agreements',
            'Lloyd’s',
            'Nobody’s — brokers act only for themselves'
          ],
          answer: 1,
          explain: 'The broker’s primary agency is to the client, with limited both-ways roles managed through terms of business agreements — a structured, disclosed conflict.' },
        { type: 'mc',
          q: 'A coverholder binds a risk exceeding its binding authority limit; the insured was unaware of the limit. Why might the insurer still be on the hook?',
          options: [
            'Because binders are unenforceable',
            'Apparent authority: the insurer held the coverholder out as authorised, so an innocent third party can rely on that appearance — leaving the insurer to pursue the coverholder',
            'Because Lloyd’s guarantees all coverholder commitments',
            'It cannot be — unauthorised means void'
          ],
          answer: 1,
          explain: 'Agency law protects innocent third parties who rely on apparent authority. Binder controls exist precisely to manage this legal exposure.' },
        { type: 'mc',
          q: 'Which body produces the model clauses and wordings widely used by Lloyd’s managing agents?',
          options: [
            'The Financial Conduct Authority',
            'The Lloyd’s Market Association',
            'The International Underwriting Association',
            'Pool Re'
          ],
          answer: 1,
          explain: 'The Lloyd’s Market Association represents managing agents and maintains the clause and wording libraries underpinning market contract certainty; the International Underwriting Association is the company market’s body.' },
        { type: 'mc',
          q: 'A client suffers an uninsured loss because its broker failed to place the cover it requested. What is the client’s primary legal recourse?',
          options: [
            'A claim on the Lloyd’s Central Fund',
            'A professional negligence claim against the broker — whose own professional indemnity insurance responds',
            'Demanding the insurer pay anyway',
            'None — placement failures are uninsurable'
          ],
          answer: 1,
          explain: 'The broker owes its client duties of skill and care; placement failures are broker E&O claims — one market’s professional duty is another market’s class of business.' }
      ]
    }
  ]
});
