/* Module 1 — The London Market */
window.LMA_MODULES = window.LMA_MODULES || [];
window.LMA_MODULES.push({
  id: 'market',
  icon: '🏛️',
  title: 'The London Market',
  tagline: 'How the world’s specialist insurance marketplace works',
  cii: 'LM1 · LM2',
  blurb: 'Who the players are — Lloyd’s, syndicates, company market insurers, brokers, coverholders — and how a risk actually gets placed, signed and settled.',
  badge: { icon: '🏛️', name: 'Room Regular', desc: 'Master “The London Market” module.' },
  lessons: [
    {
      id: 'what-is-it',
      title: 'What the London market is (and is not)',
      minutes: 7,
      body: `
<p>The London market is the world’s largest marketplace for <strong>specialist commercial insurance and reinsurance</strong>. It is not one company: it is a cluster of insurers, reinsurers and brokers, concentrated within a few streets of the City of London, that together write over £100 billion of premium a year. Business comes to London precisely because it is difficult: complex, large, unusual or internationally mobile risks that a local insurer cannot or will not absorb alone — an offshore wind farm, an airline fleet, a Fortune 500 company’s liability programme, a Caribbean island’s hurricane cover.</p>
<h3>The two halves of the market</h3>
<p>The market has two pillars that operate side by side and often share the same risks:</p>
<ul>
<li><strong>Lloyd’s of London</strong> — not an insurer but a <em>market and regulator of its members</em>. Underwriting is done by around 80–100 <strong>syndicates</strong>, each a grouping of capital that accepts risk. Lloyd’s provides the brand, the licences to trade in over 200 territories, oversight of syndicate plans, and a mutual safety net called the Central Fund.</li>
<li><strong>The company market</strong> — insurance and reinsurance companies (many of them London arms of global groups) that write similar business on their own balance sheets. Many are members of the <strong>International Underwriting Association</strong>, the company market’s trade body.</li>
</ul>
<p>A single large risk is very commonly shared across both: a Lloyd’s syndicate might lead, with other syndicates and company market insurers each taking a share.</p>
<h3>A subscription market</h3>
<p>The defining feature of London is <strong>subscription</strong>: several insurers each take a percentage share (“a line”) of the same risk on the same terms. No single carrier has to stomach a £500 million exposure alone; instead one insurer <strong>leads</strong> — setting terms and price — and others <strong>follow</strong> that lead with their own smaller shares. Risk is spread, capacity is pooled, and a broker can build cover for almost anything.</p>
<h3>A broker-driven, wholesale market</h3>
<p>Almost all business arrives through <strong>brokers</strong>, who act for the buyer, not the insurer. London is also largely <em>wholesale</em>: the client is often another insurance intermediary or even another insurer (buying reinsurance), rather than a member of the public. Personal lines like home or private car insurance are rare here.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A Chilean mining company needs US$800 million of property cover for its facilities. No Chilean insurer will hold that alone. Its local broker passes the risk to a London wholesale broker, who negotiates terms with a lead underwriter at a Lloyd’s syndicate. The lead takes a 15% line; nine other syndicates and company market carriers take between 5% and 12% each until 100% of the risk is covered. Each insurer is liable <em>only for its own share</em> — a crucial point: subscription shares are several, not joint.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>London’s edge is <strong>capacity plus expertise in one place</strong>: dozens of specialist underwriters within walking distance, able to jointly absorb risks nobody would take alone — with each participant liable only for its own percentage share.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Which statement best describes Lloyd’s of London?',
          options: [
            'A single large insurance company with many branches',
            'A marketplace and supervisory framework in which separate syndicates underwrite risk',
            'A government regulator of all United Kingdom insurers',
            'A broker that places risks with insurers worldwide'
          ],
          answer: 1,
          explain: 'Lloyd’s itself does not insure anything. Syndicates — separate ventures backed by their own capital — do the underwriting, while Lloyd’s provides the market infrastructure, licences and oversight.' },
        { type: 'mc',
          q: 'In a subscription placement, each insurer’s liability for a claim is…',
          options: [
            'Joint — any one insurer can be made to pay the whole claim',
            'Several — each pays only its own percentage share',
            'Decided by the lead underwriter after the loss',
            'Capped at the premium it received'
          ],
          answer: 1,
          explain: 'Liability in a subscription market is several, not joint. An insurer with a 10% line pays 10% of the claim — no more, even if another subscriber fails.' },
        { type: 'num',
          q: 'A risk is insured for £250 million. A syndicate takes a 12% line. A total loss occurs. How much does that syndicate pay, in £ millions?',
          answer: 30, tol: 0.01, unit: '£ millions',
          explain: '12% of £250m = £30m. Each subscribing insurer pays only its own share.' },
        { type: 'num',
          q: 'A placement needs 100% coverage. The lead writes 15% and eight followers each write 9.5%. What percentage of the risk is still unplaced?',
          answer: 9, tol: 0.01, unit: '% of the risk',
          explain: '15% + (8 × 9.5%) = 15% + 76% = 91% placed, so 9% remains. The broker must find more capacity or the client accepts less than full cover.' },
        { type: 'mc',
          q: 'Why does specialist risk flow to London rather than staying with local insurers?',
          options: [
            'London insurers are legally allowed to charge lower prices',
            'Local insurers are prohibited from insuring large risks',
            'London concentrates capacity, specialist expertise and the subscription mechanism for sharing very large or unusual risks',
            'All international risks must by treaty be reinsured in London'
          ],
          answer: 2,
          explain: 'Nothing legally forces business to London. It comes because the subscription market can absorb size and complexity that local markets cannot, with deep specialist underwriting knowledge.' }
      ]
    },
    {
      id: 'inside-lloyds',
      title: 'Inside Lloyd’s: syndicates, managing agents and the chain of security',
      minutes: 8,
      body: `
<p>Lloyd’s has a structure unlike anywhere else in insurance, and its vocabulary matters because the whole market uses it daily.</p>
<h3>The cast of characters</h3>
<ul>
<li><strong>Members (capital providers)</strong> — the investors whose money stands behind the underwriting. Today these are mostly corporate groups (insurers, private equity, family offices); historically they were wealthy individuals known as “Names”, a few of whom remain.</li>
<li><strong>Syndicates</strong> — the underwriting ventures, each identified by a number (for example “Syndicate 2001”). A syndicate is technically an annual venture, re-formed each year of account, through which members take a share of the underwriting. It is where underwriters sit and risks are accepted.</li>
<li><strong>Managing agents</strong> — the companies that actually run syndicates: they employ the underwriters, claims staff and actuaries, set strategy, and are accountable to Lloyd’s. One managing agent may run several syndicates.</li>
<li><strong>Members’ agents</strong> — advisers to the remaining individual members on which syndicates to back.</li>
<li><strong>The Corporation of Lloyd’s</strong> — the central body that oversees the market: approving business plans, setting capital, managing the licences, and running market-wide services.</li>
</ul>
<h3>Business plans and oversight</h3>
<p>Every year each syndicate must submit a <strong>syndicate business plan</strong> to Lloyd’s, setting out what classes it will write, how much premium, at what expected profitability, and with how much reinsurance protection. Lloyd’s approves — or trims — the plan, and underwriting beyond the approved plan needs fresh permission. This central oversight is unusual: in the company market, an insurer’s board answers only to its shareholders and the regulator, not to a marketplace.</p>
<h3>The chain of security</h3>
<p>When a policyholder wonders “will Lloyd’s pay?”, the answer rests on three links, used strictly in order:</p>
<ol>
<li><strong>Syndicate-level assets</strong> — premiums are held in trust funds and used first to pay that syndicate’s claims.</li>
<li><strong>Members’ funds at Lloyd’s</strong> — capital each member must lodge centrally to support its underwriting, sized by Lloyd’s capital-setting process (covered in the Capital module).</li>
<li><strong>The Central Fund</strong> — a mutual pool built from levies on all members. If a member cannot pay valid claims, the Central Fund steps in so the policyholder is still paid.</li>
</ol>
<p>This chain is why the whole of Lloyd’s shares a single, strong financial-strength rating: the weakest syndicate’s policyholders are still protected by the mutual layer.</p>
<div class="diagram">
<div class="d-title">The chain of security — used strictly in order</div>
<div class="flow-h">
<span class="fnode">1️⃣ Syndicate assets<small>premium trust funds</small></span><span class="farrow">→</span>
<span class="fnode">2️⃣ Funds at Lloyd’s<small>member capital</small></span><span class="farrow">→</span>
<span class="fnode gold">3️⃣ Central Fund<small>mutual backstop</small></span>
</div>
<div class="d-caption">A claim only reaches the next link when the previous one is exhausted — the policyholder is paid either way.</div>
</div>
<div class="example">
<div class="ex-label">Worked example</div>
<p>Syndicate 9999 has a catastrophic year: £900m of claims against £600m of syndicate-level assets. The shortfall of £300m is called first from its members’ funds at Lloyd’s, say £250m lodged. The remaining £50m would be met by the Central Fund — policyholders are paid in full, and Lloyd’s then pursues the member for reimbursement. The failure hurts the member, not the claimant.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Remember the division of labour: <strong>members provide capital, syndicates accept risk, managing agents run the show, and the Corporation of Lloyd’s polices the market</strong> — with the Central Fund as the mutual backstop that protects policyholders and the Lloyd’s rating.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Who employs the underwriters who accept risk on behalf of a Lloyd’s syndicate?',
          options: [
            'The Corporation of Lloyd’s',
            'The syndicate’s managing agent',
            'The members’ agent',
            'The broker'
          ],
          answer: 1,
          explain: 'Managing agents run syndicates day to day — employing underwriters, claims staff and actuaries — under the oversight of Lloyd’s.' },
        { type: 'mc',
          q: 'Which is the correct order of the Lloyd’s chain of security when paying claims?',
          options: [
            'Central Fund → members’ funds at Lloyd’s → syndicate assets',
            'Members’ funds at Lloyd’s → Central Fund → syndicate assets',
            'Syndicate-level assets → members’ funds at Lloyd’s → Central Fund',
            'All three pools pay proportionately at the same time'
          ],
          answer: 2,
          explain: 'Syndicate premium trust funds pay first, then the capital that member lodged centrally, and only then the mutual Central Fund.' },
        { type: 'num',
          q: 'A syndicate faces £480m of claims. It holds £350m of syndicate-level assets and its members have £100m of funds at Lloyd’s. How much, in £ millions, falls to the Central Fund?',
          answer: 30, tol: 0.01, unit: '£ millions',
          explain: '£480m − £350m − £100m = £30m. The Central Fund tops up only after the first two links are exhausted.' },
        { type: 'mc',
          q: 'What must every syndicate get approved by Lloyd’s each year before it can underwrite?',
          options: [
            'A syndicate business plan covering classes, volumes and profitability',
            'A list of every individual policy it intends to write',
            'The employment contract of its active underwriter',
            'Its brokers’ commission rates'
          ],
          answer: 0,
          explain: 'The annual syndicate business plan is the cornerstone of Lloyd’s oversight — premium volumes, class mix, expected performance and reinsurance all need central approval.' }
      ]
    },
    {
      id: 'placement',
      title: 'Brokers, slips and how a risk gets placed',
      minutes: 8,
      body: `
<p>Nothing reaches an underwriter in London without a broker. Understanding placement — the journey from client need to bound insurance contract — is essential to understanding everything downstream: premium, claims, even capital.</p>
<h3>The slip: the market’s contract document</h3>
<p>The broker distils the risk into a standardised contract document — historically a folded paper “slip”, today the electronic <strong>Market Reform Contract</strong>. It sets out the insured, the interest covered, the period, limits and deductibles, premium, brokerage, and all conditions. When an underwriter agrees to participate they “write a line” on it — committing to a stated percentage share. Most placements now happen on the electronic placing platform <strong>PPL (Placing Platform Limited)</strong> rather than face to face, though the underwriting Room at Lloyd’s still operates.</p>
<h3>Lead and follow</h3>
<p>The broker first approaches a respected specialist to act as <strong>lead (slip leader)</strong>. The lead scrutinises the risk, negotiates terms and price, and writes the first — usually the largest — line. Followers then rely substantially on the lead’s judgement, adding their own lines at the same terms. A good lead is valuable: followers grant leads influence because a well-priced lead line lets the whole placement complete quickly.</p>
<h3>Written lines versus signed lines</h3>
<p>Brokers deliberately gather more commitments than 100% — an oversubscription cushion. If underwriters write 130% of the risk in total, every line is proportionally reduced (“signed down”) so the shares sum to exactly 100%:</p>
<p style="text-align:center"><strong>signed line = written line × (100 ÷ total written)</strong></p>
<p>An underwriter’s premium and claim share follow the <em>signed</em> line, not what they originally wrote. (The signing-down mechanics get a full lesson in the Premium module.)</p>
<div class="diagram">
<div class="d-title">How a risk gets placed</div>
<div class="flow-h">
<span class="fnode">🏭 Insured<small>needs cover</small></span><span class="farrow">→</span>
<span class="fnode">🤝 Local broker<small>client’s agent</small></span><span class="farrow">→</span>
<span class="fnode">🎩 London broker<small>builds the slip</small></span><span class="farrow">→</span>
<span class="fnode gold">✍️ Lead underwriter<small>sets terms &amp; price</small></span><span class="farrow">→</span>
<span class="fnode">👥 Followers<small>subscribe lines</small></span><span class="farrow">→</span>
<span class="fnode">✅ 100% bound<small>signed down pro rata</small></span>
</div>
<div class="d-caption">Every later stage — premium, claims, capital — flows back through this chain: each carrier’s share of everything is its signed line.</div>
</div>
<h3>Binding and after</h3>
<p>Once 100% is subscribed the contract is bound. Details flow to the market’s central processing bureau for checking, signing and settlement (next lessons), premium moves from client through broker to insurers, and the policy takes effect. If a claim later arises, the same lead-and-follow logic applies to agreeing it.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A broker places a £60m marine cargo programme. The lead writes 20%; by closing, total written lines reach 125%. Every line signs down by the factor 100/125 = 0.8. The lead’s signed line becomes 20% × 0.8 = <strong>16%</strong>. If the annual premium is £3m, the lead receives 16% × £3m = £480,000 (before brokerage is deducted), and would pay 16% of any claim.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>The broker works for the <strong>client</strong>. The lead sets terms; followers subscribe at those terms; oversubscribed lines are signed down pro rata. Your economics always follow your <strong>signed</strong> line.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'On whose behalf does a London market broker act when placing a risk?',
          options: [
            'The lead underwriter',
            'The insurance buyer (the client)',
            'Lloyd’s',
            'Whichever party pays the higher fee on that placement'
          ],
          answer: 1,
          explain: 'The broker is the buyer’s agent — negotiating the best available terms for the client, even though brokerage is deducted from premium paid to insurers.' },
        { type: 'num',
          q: 'Total written lines on a placement come to 140%. An underwriter wrote a 21% line. What is their signed line, in %?',
          answer: 15, tol: 0.05, unit: '%',
          explain: 'Signed line = 21% × (100 ÷ 140) = 15%. Everyone is scaled down proportionally so shares total exactly 100%.' },
        { type: 'num',
          q: 'A risk carries £2,400,000 of premium. After signing down, a follower holds a 7.5% signed line. What premium is attributable to that follower, in £ (ignore brokerage)?',
          answer: 180000, tol: 500, unit: '£',
          explain: '7.5% × £2.4m = £180,000. Premium follows the signed line.' },
        { type: 'mc',
          q: 'Why do followers often accept a lead’s terms with limited independent analysis?',
          options: [
            'Lloyd’s rules forbid followers from doing their own analysis',
            'The lead is legally liable for followers’ losses',
            'They rely on the specialist lead’s scrutiny and pricing, which makes subscription efficient — though they remain responsible for their own decisions',
            'Followers never see the contract terms'
          ],
          answer: 2,
          explain: 'Follow capacity leverages the lead’s expertise to make the subscription model fast and efficient. Followers still carry their own underwriting responsibility and their own several liability.' },
        { type: 'mc',
          q: 'What is the Market Reform Contract?',
          options: [
            'The regulation that created electronic trading at Lloyd’s',
            'The standardised contract document (the modern slip) recording all terms of a London market placement',
            'A reinsurance treaty wording',
            'The agreement between a syndicate and its members'
          ],
          answer: 1,
          explain: 'The Market Reform Contract is the standardised successor to the paper slip — one document holding the risk details, terms, premium and each insurer’s participation.' }
      ]
    },
    {
      id: 'delegated',
      title: 'Delegated authority: coverholders and binding authorities',
      minutes: 8,
      body: `
<p>Not every risk is large enough to justify a bespoke London placement. A £20,000 premium for a Florida homeowner cannot support a broker walking it around the market — yet in aggregate, tens of thousands of such policies are exactly the kind of business London wants. The answer is <strong>delegated authority</strong>: an insurer grants an outside party the pen to write policies on its behalf.</p>
<h3>The binding authority</h3>
<p>The core contract is a <strong>binding authority (a “binder”)</strong>: an agreement under which a <strong>coverholder</strong> — typically a specialist agency or broker abroad — may accept risks, issue documents and sometimes handle small claims in the insurer’s name, within tightly defined limits: classes, territories, maximum line sizes, pricing rules and referral triggers. The coverholder earns commission; the insurer gets distribution into local markets it could never reach risk by risk. Around a third of Lloyd’s premium arrives this way, so this is not a side channel — it is a pillar of the market.</p>
<h3>Managing general agents</h3>
<p>A large, sophisticated coverholder is often called a <strong>managing general agent</strong> — an underwriting business in everything but the balance sheet, with its own underwriters, pricing models and claims staff, but writing on other insurers’ capital.</p>
<h3>Related structures</h3>
<ul>
<li><strong>Lineslip</strong> — a standing facility where a group of insurers pre-agrees to accept risks of a defined type introduced by a specific broker, with the lead underwriter approving each risk. Faster than open-market placement, but underwriter judgement is retained on each risk.</li>
<li><strong>Consortium</strong> — several insurers agree that one of them underwrites on behalf of the group, combining their capacity into one larger line under the consortium leader’s pen.</li>
</ul>
<h3>The control problem</h3>
<p>Delegation trades underwriting control for reach, so oversight is everything. The insurer never sees each risk before it is bound; it discovers what it wrote from <strong>bordereaux</strong> — periodic (usually monthly) reports listing risks bound, premiums and claims. Weak coverholder controls have caused some of the market’s worst losses, which is why binder management — due diligence, audits, aggregate monitoring, timely bordereaux — attracts intense regulatory and Lloyd’s scrutiny.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A syndicate grants a Texas coverholder a binding authority for small commercial property: maximum limit US$2m any one risk, wind-exposed coastal counties excluded, target rate no lower than filed rating guidelines, US$25m annual premium cap, 22% coverholder commission. In month one the bordereau shows 312 policies and US$1.9m of gross premium. The syndicate booked none of these individually — its underwriting decision was the <em>binder</em> itself, and its controls are the terms, the bordereaux and an annual on-site audit.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>In delegated authority the real underwriting decision is <strong>choosing and controlling the coverholder</strong>. The insurer prices a portfolio it hasn’t seen yet — so the binder terms, data quality and audit regime are the underwriting.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'Under a binding authority, who accepts individual risks?',
          options: [
            'The Lloyd’s underwriter, risk by risk',
            'The coverholder, within limits set out in the binding authority',
            'The policyholder’s local regulator',
            'The central market bureau'
          ],
          answer: 1,
          explain: 'That is the essence of delegation: the coverholder binds individual risks in the insurer’s name, within the authority’s limits, and reports them back via bordereaux.' },
        { type: 'mc',
          q: 'What is a bordereau?',
          options: [
            'The legal wording of a binding authority',
            'A periodic report from a coverholder listing risks bound, premiums and claims',
            'The commission statement a broker sends a client',
            'The Lloyd’s licence to write overseas business'
          ],
          answer: 1,
          explain: 'Bordereaux are the insurer’s window into delegated business — the periodic listing of everything bound, earned and claimed under the binder.' },
        { type: 'num',
          q: 'A coverholder writes US$18m of gross premium under a binder with 22% coverholder commission. How much commission does the coverholder earn, in US$ millions?',
          answer: 3.96, tol: 0.02, unit: 'US$ millions',
          explain: '22% × US$18m = US$3.96m. Commission compensates the coverholder for distribution, underwriting and administration.' },
        { type: 'num',
          q: 'A binder has a US$25m annual premium cap. After eight months the coverholder has bound US$19.5m at an even monthly pace. If that pace continues, by how much (US$ millions) would the year-end total exceed the cap?',
          answer: 4.25, tol: 0.1, unit: 'US$ millions',
          explain: 'Pace = 19.5 ÷ 8 = US$2.4375m per month; full year = 29.25m; excess over 25m = US$4.25m. Monitoring bordereaux against caps is a core binder-management control.' },
        { type: 'mc',
          q: 'Which structure lets several insurers combine capacity so one of them can write a single larger line on behalf of the group?',
          options: ['A lineslip', 'A consortium', 'A bordereau', 'A members’ agent'],
          answer: 1,
          explain: 'A consortium pools several carriers’ capacity under one underwriting pen. A lineslip, by contrast, is a broker-specific facility where the lead still approves each risk.' }
      ]
    },
    {
      id: 'back-office',
      title: 'Behind the scenes: bureau processing, settlement and years of account',
      minutes: 7,
      body: `
<p>Placement is only half the machine. London’s other distinctive feature is its shared back office — central services that check, register and settle business for the whole market, so that a placement subscribed by ten carriers doesn’t require ten separate accounting relationships.</p>
<h3>The central bureau</h3>
<p>Premium and claims processing for most of the market flows through a shared bureau service (operated for many years by Xchanging, today by <strong>Velonetic</strong>). When a risk is bound, its details are submitted for checking; the bureau assigns a unique <strong>signing number and date</strong> that identifies the transaction across every subscribing carrier’s systems. Insurers then receive standardised electronic messages telling them what premium to expect and what claims to pay — one consistent record for the whole subscription.</p>
<h3>Central settlement</h3>
<p>Rather than the broker paying each of ten carriers separately, money moves through <strong>central settlement</strong>: netted movements between each broker and each carrier across all their joint business, in each currency. A carrier receives one net settlement covering thousands of transactions. This is a huge efficiency — and it is why data quality at submission matters so much: an error propagates to every carrier on the slip.</p>
<h3>Years of account</h3>
<p>Lloyd’s attaches every policy to a <strong>year of account</strong> — the accounting year in which the policy incepts, which is also the year whose capital providers take the profit or loss. A policy incepting in November 2025 belongs to the 2025 year of account even though most of its exposure runs through 2026. Traditionally a year of account stays open for 36 months before its result is declared and closed — usually by <strong>reinsurance to close</strong>, where the next year of account takes over the remaining liabilities in exchange for a premium (explored properly in the Regulation & Accounting module). The company market instead uses conventional annual accounting.</p>
<h3>Why it matters to you</h3>
<p>Almost every dataset you will meet in a London market carrier — premium bookings, claims movements, reinsurance recoveries — carries bureau identifiers, signing dates, year-of-account tags and settlement currencies. Understanding that plumbing explains why the data looks the way it does: premiums arriving months after inception, transactions in original currency versus settlement currency, and results tracked by year of account rather than calendar year.</p>
<div class="example">
<div class="ex-label">Worked example</div>
<p>A policy incepts 1 December 2025, premium US$1.2m, subscribed by six carriers. The broker submits the signed slip; the bureau checks it, allocates signing number/date in January 2026, and each carrier’s share is notified electronically. Cash then arrives via January’s central settlement netting. In each carrier’s books this is 2025 year-of-account business (inception date governs), even though cash moved in 2026 — a timing wrinkle you will constantly see in premium data.</p>
</div>
<div class="keypoint">
<div class="ex-label">Key point</div>
<p>Shared bureau processing and central settlement are what make a ten-carrier subscription administratively viable — <strong>one checked record, one netted cash flow</strong> — and the year of account is the axis on which Lloyd’s results, capital and profit distribution all turn.</p>
</div>`,
      quiz: [
        { type: 'mc',
          q: 'What does central settlement do?',
          options: [
            'It guarantees payment of claims if an insurer fails',
            'It nets all premium and claim movements between each broker and carrier into consolidated periodic payments',
            'It sets the exchange rates used by the market',
            'It approves syndicate business plans'
          ],
          answer: 1,
          explain: 'Central settlement replaces thousands of separate payments with netted movements between each broker–carrier pair, per currency — the guarantee role belongs to the Central Fund, not settlement.' },
        { type: 'mc',
          q: 'A policy incepts on 15 November 2025 and expires 14 November 2026. To which Lloyd’s year of account does it belong?',
          options: ['2024', '2025', '2026', 'It is split between 2025 and 2026'],
          answer: 1,
          explain: 'Year of account follows inception date. The 2025 year of account carries this policy in full, even though most exposure sits in calendar 2026.' },
        { type: 'num',
          q: 'A carrier is owed £4.6m of premium by a broker and owes £1.9m of claims to that broker’s clients this month. Under central settlement netting, what single amount (£ millions) moves to the carrier?',
          answer: 2.7, tol: 0.01, unit: '£ millions',
          explain: '£4.6m − £1.9m = £2.7m net to the carrier. Netting per broker–carrier pair, per currency, is the point of central settlement.' },
        { type: 'mc',
          q: 'How long does a Lloyd’s year of account traditionally stay open before its result is declared?',
          options: ['12 months', '24 months', '36 months', '60 months'],
          answer: 2,
          explain: 'Three years — allowing most premium to be signed and claims to develop — after which the year normally closes by reinsurance to close into the next year of account.' }
      ]
    }
  ]
});
