/*
 * The Slip — course content.
 *
 * Block types inside a lesson body:
 *   "string"                    paragraph (supports **bold**)
 *   { h: "Heading" }            subheading
 *   { ul: [...] } / { ol: [...] } lists (ol only for real sequences)
 *   { terms: [[term, def]] }    definition list
 *   { analogy: "..." }          "Think of it like" callout
 *   { example: { title, text } } worked example
 *   { note: "..." }             "In practice" note
 *   { table: { head, rows } }   table
 *   { timeline: [[year, text]] }
 *   { chain: [[title, text]] }  stacked chain-of-security diagram
 *   { lab: "slip"|"tower"|"ratio", text }  link to an interactive tool
 */
window.SLIP_DATA = window.SLIP_DATA || {};
window.SLIP_DATA.modules = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: "m01",
    code: "01",
    title: "The London Market",
    short: "Market",
    blurb: "What it is, how it began, and why the world’s hardest risks still come to the City.",
    lessons: [
      {
        title: "What is the London Market?",
        minutes: 4,
        body: [
          "The **London Market** is the part of the UK insurance industry, clustered in a few streets of the City of London, that insures and reinsures large, complex and international risks. Think oil rigs, satellites, supertankers, airline fleets, cyber attacks on global banks, political violence and the catastrophe exposure of other insurers.",
          "It is separate from the UK’s everyday retail market of car and home insurance. Most of what London writes comes from outside the UK, and most of it is commercial: businesses, governments and other insurers buying protection, rather than individuals.",
          { h: "Four pillars" },
          {
            terms: [
              ["Lloyd’s", "A marketplace where syndicates underwrite risks, backed by their members’ capital. The best-known part of the market."],
              ["The company market", "Insurance and reinsurance companies writing wholesale business from London, many represented by the International Underwriting Association (IUA)."],
              ["Brokers", "Intermediaries who act for clients, bring risks into the market and negotiate terms with underwriters."],
              ["P&I clubs", "Mutual associations that cover shipowners’ liabilities. Several are managed from London."]
            ]
          },
          { analogy: "Picture a specialist hospital. Your local GP (a domestic insurer) handles everyday problems. When a case is rare, enormous or complicated, it gets referred to the specialists. London is where the world’s insurance referrals go." },
          "What makes London unusual is the **subscription market**. A single large risk is usually shared among many insurers, each taking a percentage. One underwriter leads and sets the terms; the others follow. You will meet this idea in almost every lesson.",
          { note: "You’ll hear it called the London Market, the specialty market or the wholesale market. They overlap but aren’t identical. Specialty describes the type of risk; wholesale describes how it is distributed, through brokers and often from other brokers." }
        ],
        takeaways: [
          "The London Market insures large, complex, mostly international commercial risks.",
          "Its main parts are Lloyd’s, the company market, brokers and P&I clubs.",
          "Risks are usually shared: a lead sets the terms and followers subscribe."
        ]
      },
      {
        title: "From coffee house to Lime Street",
        minutes: 5,
        body: [
          "In the late 1680s, **Edward Lloyd** ran a coffee house on Tower Street, near the Thames. Ship captains, merchants and shipowners gathered there for shipping news, and it became the place to arrange marine insurance. Lloyd moved to Lombard Street in 1691.",
          "Insurance was arranged person to person. A merchant’s broker wrote the details of a ship and voyage on a sheet of paper. Wealthy individuals willing to take a share of the risk wrote their names underneath, with the amount they would cover. That is where the word **underwriter** comes from.",
          { analogy: "It was crowdfunding with a quill. Instead of one backer funding everything, many backers each pledged a slice, and the list of names on the paper was the deal." },
          { h: "Milestones" },
          {
            timeline: [
              ["1688", "Edward Lloyd’s coffee house is first recorded."],
              ["1734", "Lloyd’s List starts publishing shipping news. It is one of the oldest continuously published journals in the world."],
              ["1774", "Underwriters move into the Royal Exchange, leaving coffee-house life behind."],
              ["1871", "The Lloyd’s Act incorporates the Society of Lloyd’s."],
              ["1906", "After the San Francisco earthquake, underwriter Cuthbert Heath tells his agents to pay policyholders in full. Lloyd’s reputation in the US is made."],
              ["1986", "The Richard Rogers building opens at One Lime Street."],
              ["1996", "Reconstruction and Renewal settles the losses of the 1980s and early 1990s, and Equitas is created."],
              ["2019", "Lloyd’s Brussels insurance company starts writing EU business, ready for Brexit."]
            ]
          },
          "**The Lutine Bell** was salvaged from HMS Lutine, which sank in 1799 carrying gold insured by Lloyd’s underwriters. It hangs in the Underwriting Room. It was once rung for news of overdue ships: once for a loss, twice for a safe arrival. Today it rings only on ceremonial occasions.",
          "The habit of trading face to face survives. Brokers still queue at underwriters’ **boxes** (desks) in the Underwriting Room, even as more business moves onto electronic platforms."
        ],
        takeaways: [
          "Lloyd’s began as a coffee house where marine risks were shared among individuals.",
          "“Underwriter” comes from writing your name under the description of the risk.",
          "Capital has shifted from individuals with unlimited liability to mostly corporate backers."
        ]
      },
      {
        title: "Why risks come to London",
        minutes: 4,
        body: [
          "Plenty of countries have big insurers. So why does a Brazilian airline or a Japanese insurer bring its risk to a few streets in London? Several reasons reinforce each other.",
          {
            terms: [
              ["Concentrated expertise", "Specialist underwriters, brokers, lawyers, loss adjusters and actuaries for niche classes all work within walking distance of each other."],
              ["Capacity", "By sharing risks, the market can assemble very large limits that no single insurer would want to carry alone."],
              ["Appetite for the unusual", "London underwriters are used to pricing risks with little data: a new satellite design, a film star’s voice, a war zone."],
              ["Licences and reach", "Lloyd’s can write business in more than 200 countries and territories through its licences and trading rights."],
              ["English law", "Policies are often written under English law, which has a deep body of insurance case law and respected courts and arbitration."],
              ["Financial strength", "Lloyd’s chain of security and strong ratings make its policies acceptable to clients and regulators worldwide."]
            ]
          },
          { analogy: "It works like a city’s antiques district. Dealers cluster on the same street because buyers know to go there, and buyers go there because the dealers are there. Each side’s presence keeps the other." },
          "This is a **network effect**, and it explains how London has kept its position for over three centuries despite competition from Bermuda, Zurich, Singapore, Dubai and the US surplus lines market.",
          { note: "The market isn’t only in London. Lloyd’s and London companies also write through offices in Europe, Asia, the Middle East and the Americas, and through local agents with delegated authority. “London Market” describes the hub and its way of doing business." }
        ],
        takeaways: [
          "Expertise, capacity and reach reinforce each other in a network effect.",
          "London specialises in risks that are large, rare or hard to price.",
          "English law and Lloyd’s financial strength make London policies widely accepted."
        ]
      }
    ],
    quiz: [
      {
        q: "What best describes the London Market?",
        options: [
          "The UK’s main market for personal car and home insurance",
          "A cluster of insurers, Lloyd’s syndicates and brokers handling large, complex, mainly international risks",
          "A government scheme that reinsures UK catastrophe losses",
          "The insurance arm of the London Stock Exchange"
        ],
        answer: 1,
        why: "London specialises in big, complex, mostly international commercial risks and reinsurance. UK retail insurance is a separate market."
      },
      {
        q: "Where does the word “underwriter” come from?",
        options: [
          "Backers wrote their names under the description of the risk, with the amount they would cover",
          "Policies were written in the basement under the coffee house",
          "It is Latin for “guarantor”",
          "The premium was written under the sum insured"
        ],
        answer: 0,
        why: "In Lloyd’s coffee house, people taking a share of a risk wrote their names beneath its description."
      },
      {
        q: "What was Edward Lloyd’s original business?",
        options: ["A bank", "A shipping line", "A coffee house", "A newspaper"],
        answer: 2,
        why: "His coffee house became the meeting place for marine insurance. Lloyd’s List came later."
      },
      {
        q: "In the subscription market, what does the lead underwriter do?",
        options: [
          "Takes 100% of the risk",
          "Sets the terms and price that the other underwriters follow",
          "Represents the client in negotiations",
          "Collects the premium from the client"
        ],
        answer: 1,
        why: "The leader negotiates the terms; followers take their own share on the same terms. The broker is the one who represents the client."
      },
      {
        q: "Which of these is NOT a reason risks come to London?",
        options: [
          "Concentrated specialist expertise",
          "The ability to build large capacity by sharing risks",
          "A legal rule that all marine risks worldwide must be insured in London",
          "Licences to write business in many countries"
        ],
        answer: 2,
        why: "There is no such rule. London wins business on expertise, capacity, reach and financial strength."
      },
      {
        q: "Traditionally, how many times was the Lutine Bell rung for good news?",
        options: ["Once", "Twice", "Three times", "Never; it was only rung for losses"],
        answer: 1,
        why: "Once signalled a loss, twice signalled good news such as an overdue ship arriving safely."
      }
    ]
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: "m02",
    code: "02",
    title: "Who’s who",
    short: "Players",
    blurb: "Lloyd’s, the company market, brokers, mutuals and the bodies that hold it together.",
    lessons: [
      {
        title: "Lloyd’s: a market, not an insurer",
        minutes: 4,
        body: [
          "The most common misunderstanding about Lloyd’s is that it is an insurance company. It isn’t. **Lloyd’s is a marketplace.** The insurance is written by **syndicates** that operate inside it.",
          {
            terms: [
              ["The Corporation of Lloyd’s", "Runs the market. It sets rules and standards, approves syndicates’ business plans, monitors performance, manages the Central Fund and holds the worldwide licences. It does not underwrite risks itself."],
              ["Syndicates", "The underwriting units. Each is a group of members whose capital backs the risks the syndicate writes. Every syndicate has a number."],
              ["Managing agents", "Companies that run syndicates. They employ the underwriters, handle claims and manage the business. One managing agent can run several syndicates."],
              ["Members", "The capital providers. Today they are mostly corporate members, such as insurance groups and investors, plus some individuals, historically called Names."]
            ]
          },
          "Around 50 managing agents run roughly 100 syndicates, which together write more than £50bn of premium a year.",
          { analogy: "Think of a farmers’ market. The operator owns the site, sets the rules, checks standards and decides who gets a stall, but it doesn’t grow or sell any vegetables. The stallholders (syndicates) do the trading, with produce from the farms behind them (the members’ capital)." },
          "Underwriters from each syndicate sit at a **box** in the Underwriting Room at One Lime Street. Brokers bring risks to them and negotiate face to face or electronically.",
          "Every syndicate shares the Lloyd’s brand, licences and ratings, so a policy from a small specialist syndicate carries the same backing as one from the largest. That shared strength comes from the **chain of security**, which you’ll meet in module 03."
        ],
        takeaways: [
          "Lloyd’s is a market. Syndicates do the underwriting.",
          "Managing agents run syndicates; members provide the capital.",
          "The Corporation oversees the market and holds its licences and central assets."
        ]
      },
      {
        title: "The company market",
        minutes: 3,
        body: [
          "Alongside Lloyd’s sits the **company market**: insurance and reinsurance companies writing wholesale and specialty business from London. They are ordinary limited companies with their own balance sheets, regulated by the PRA and FCA.",
          "Many are branches or subsidiaries of international groups from the US, Europe, Bermuda and Asia. Their trade body is the **International Underwriting Association (IUA)**.",
          "The two halves are closely intertwined. Many groups run both a Lloyd’s syndicate and a London insurance company and choose the platform that suits each risk. On a single slip you’ll often see syndicates and companies sharing the same risk.",
          { analogy: "If Lloyd’s is a farmers’ market of independent stalls, the company market is the row of established shops on the same street. Shoppers walk between both, and many families own a stall and a shop." },
          {
            table: {
              head: ["", "Lloyd’s syndicate", "London company"],
              rows: [
                ["Legal form", "Not a legal entity; its members are on risk", "Limited company"],
                ["Capital", "Members’ funds plus Lloyd’s central assets", "The company’s own balance sheet"],
                ["Licences", "Uses Lloyd’s worldwide licences", "Needs its own permissions"],
                ["Rating", "Shares the Lloyd’s market rating", "Has its own rating"],
                ["Trade body", "Lloyd’s Market Association (LMA)", "IUA"]
              ]
            }
          }
        ],
        takeaways: [
          "The company market is insurers writing wholesale risks from London.",
          "Companies stand on their own balance sheets and ratings.",
          "Syndicates and companies often share the same risk on one slip."
        ]
      },
      {
        title: "Brokers: the client’s agent",
        minutes: 4,
        body: [
          "Nearly all London Market business arrives through a **broker**. Under English law the broker is generally the **agent of the insured**, not the insurer. Their job is to get the best cover on the best terms for their client.",
          {
            ul: [
              "**Advising** the client on its risks and the cover it needs",
              "**Presenting** the risk to underwriters fairly and clearly",
              "**Negotiating** the terms, the price and who leads",
              "**Placing** the risk by collecting enough lines to reach 100%",
              "**Servicing** the policy: changes, premium collection and claims"
            ]
          },
          "A risk often passes through more than one broker. A **retail** or **producing** broker deals with the client locally, say in Texas or Malaysia. They pass it to a **wholesale** or **placing** broker with access to London, who takes it to underwriters. Only brokers accredited by Lloyd’s (**Lloyd’s brokers**) can place open market business directly with syndicates.",
          { analogy: "A broker is like a buyer’s agent in property. They work for you, know which sellers are worth your time and negotiate on your behalf. The seller still has to agree a price, but you didn’t have to knock on every door." },
          "Brokers are paid by **brokerage**, a percentage of the premium deducted before it reaches insurers, and sometimes by fees. The largest global brokers include Marsh, Aon, WTW, Gallagher and Howden, alongside many specialist firms.",
          { note: "Under a typical Terms of Business Agreement (TOBA), premium paid to a broker counts as paid to the insurer. This is called risk transfer, and it protects the client if the broker fails before passing the money on." }
        ],
        takeaways: [
          "Brokers act for the client, not the insurer.",
          "Risks often travel from a local retail broker to a London wholesale broker.",
          "Only accredited Lloyd’s brokers can place open market business with syndicates."
        ]
      },
      {
        title: "Mutuals, trade bodies and the back office",
        minutes: 4,
        body: [
          "A few more players complete the picture.",
          { h: "P&I clubs" },
          "**Protection and indemnity (P&I) clubs** are mutual associations owned by their shipowner members. They cover third-party liabilities such as crew injury, pollution, wreck removal and damage to cargo. Twelve clubs form the **International Group of P&I Clubs**. Together they insure around 90% of the world’s ocean-going tonnage and share large claims through a pooling arrangement.",
          { analogy: "A P&I club works like a mutual pot for a fleet. Owners pay in each year (calls), and the pot pays any member’s liabilities. If the pot runs short, members are asked to top it up." },
          { h: "Trade and market bodies" },
          {
            terms: [
              ["LMA", "Lloyd’s Market Association. Represents managing agents and produces standard wordings and clauses."],
              ["IUA", "International Underwriting Association. Represents London company market insurers."],
              ["LIIBA", "London & International Insurance Brokers’ Association. Represents Lloyd’s and London brokers."],
              ["LMG", "London Market Group. Brings these bodies and Lloyd’s together to promote the market."]
            ]
          },
          { h: "Processing" },
          "**Velonetic** (formerly Xchanging) provides much of the market’s back-office processing. It records contracts, accounts for premiums and settles money centrally between brokers and insurers.",
          "Around all of this work actuaries, loss adjusters, lawyers, catastrophe modellers, rating agencies and the two regulators, the **PRA** and the **FCA**."
        ],
        takeaways: [
          "P&I clubs are shipowner mutuals covering marine liabilities.",
          "The LMA, IUA and LIIBA represent syndicates, companies and brokers.",
          "Velonetic handles much of the market’s central processing."
        ]
      }
    ],
    quiz: [
      {
        q: "Which statement about Lloyd’s is correct?",
        options: [
          "Lloyd’s is an insurance company that issues policies in its own name",
          "Lloyd’s is a marketplace in which syndicates underwrite risks",
          "Lloyd’s is a broker that places risks with insurers",
          "Lloyd’s is the UK insurance regulator"
        ],
        answer: 1,
        why: "The Corporation runs the market, but the syndicates do the underwriting."
      },
      {
        q: "Who runs a Lloyd’s syndicate day to day?",
        options: ["The Council of Lloyd’s", "The lead broker", "A managing agent", "The PRA"],
        answer: 2,
        why: "Managing agents employ the underwriters and manage syndicates. The Corporation oversees the market as a whole."
      },
      {
        q: "In whose interest does a London broker mainly act?",
        options: ["The insurer’s", "The insured client’s", "Lloyd’s", "The regulator’s"],
        answer: 1,
        why: "Under English law a broker is generally the agent of the insured."
      },
      {
        q: "What do P&I clubs mainly cover?",
        options: [
          "Damage to the ship itself",
          "Shipowners’ third-party liabilities, such as pollution and crew injury",
          "Cargo owners’ goods in transit",
          "Ports against strike action"
        ],
        answer: 1,
        why: "Damage to the ship is hull insurance and goods in transit are cargo insurance. P&I covers liabilities."
      },
      {
        q: "Which body represents London company market insurers?",
        options: ["LMA", "IUA", "LIIBA", "FCA"],
        answer: 1,
        why: "The International Underwriting Association represents companies. The LMA represents Lloyd’s managing agents."
      },
      {
        q: "A Texas broker passes a risk to a London broker, who places it with underwriters. What is the London broker usually called?",
        options: ["The retail broker", "The wholesale or placing broker", "The coverholder", "The managing agent"],
        answer: 1,
        why: "The local firm is the retail or producing broker; the London firm is the wholesale or placing broker."
      }
    ]
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: "m03",
    code: "03",
    title: "Inside Lloyd’s",
    short: "Lloyd’s",
    blurb: "Capacity, capital, the chain of security and the three-year life of a syndicate year.",
    lessons: [
      {
        title: "Capacity and capital",
        minutes: 4,
        body: [
          "Each year, every syndicate has a **capacity**: the maximum premium, net of brokerage, it may accept. Capacity comes from its members’ commitments and is approved by Lloyd’s as part of the syndicate’s **business plan**.",
          "To support that premium, members must lodge capital with Lloyd’s, called **Funds at Lloyd’s (FAL)**. How much depends on how risky the business is. Each syndicate calculates its capital requirement under Solvency II, and Lloyd’s adds an uplift of 35% to set what members must provide. A riskier plan needs more capital per pound of premium.",
          { analogy: "Capacity is like the credit limit on a card, and FAL is the deposit you put down to get it. The riskier the things you plan to buy, the bigger the deposit Lloyd’s asks for." },
          "Lloyd’s reviews every syndicate’s plan each year: which classes it will write, at what rates, with what reinsurance. Plans can be cut back or rejected. This performance management is one way Lloyd’s protects the shared brand.",
          { h: "Where the capital comes from" },
          "Most capacity now comes from **corporate members**: insurance groups backing their own syndicates, and investors. Individuals still take part, but no new members have joined with unlimited liability since 2003. Individuals now usually participate through limited liability vehicles."
        ],
        takeaways: [
          "Capacity is the premium a syndicate may accept in a year.",
          "Members back capacity with Funds at Lloyd’s, sized to the risk.",
          "Lloyd’s approves every syndicate’s business plan each year."
        ]
      },
      {
        title: "The chain of security",
        minutes: 4,
        body: [
          "Why would a client in Argentina trust a policy from a syndicate they’ve never heard of? Because every Lloyd’s policy is backed by the **chain of security**: three links of assets standing behind a valid claim.",
          {
            chain: [
              ["Syndicate assets", "Premiums and reserves held in each syndicate’s premium trust funds. Claims are paid from here first."],
              ["Members’ funds at Lloyd’s", "The capital each member has lodged to support its underwriting."],
              ["Central assets", "The Lloyd’s Central Fund and other central resources, available if a member can’t meet its obligations."]
            ]
          },
          { analogy: "Picture a trapeze act with three safety nets stacked underneath. Most falls are caught by the first net. A very bad fall might go through to the second. The third, shared by every act in the circus, is there for the worst case." },
          "The shared third link is what lets Lloyd’s carry a single market-wide financial strength rating. It also gives every member an interest in the discipline of the others, which is why Lloyd’s polices underwriting standards so closely.",
          { note: "Members pay into the Central Fund each year, in proportion to the premium they write. It was used in the 1990s to meet the obligations of members who could not pay." }
        ],
        takeaways: [
          "Claims are met from syndicate assets first, then members’ FAL, then central assets.",
          "The mutual Central Fund lets Lloyd’s carry one market rating.",
          "Every member has a stake in the quality of everyone else’s underwriting."
        ]
      },
      {
        title: "Years of account and reinsurance to close",
        minutes: 5,
        body: [
          "A syndicate is technically an **annual venture**. Members join for a particular **year of account**. All policies that start in, say, 2026 belong to the 2026 year of account, however long their claims take to appear.",
          "Claims can take years to settle, so a year of account normally stays open for three years before its result is final. At the end of year three it closes by **reinsurance to close (RITC)**. The closing year pays a premium to the next year of account (or another syndicate), which takes over all its remaining liabilities. The members of the closed year then receive their profit or pay their loss.",
          { analogy: "RITC is a relay baton. The 2024 runners carry the race as far as they can. At the handover they pass the baton (the unsettled claims) to the 2025 team, with enough provisions to finish the race, and leave the track with their result." },
          { example: { title: "Worked example", text: "A syndicate’s 2024 year of account closes at 31 December 2026. Some claims are still open and some haven’t been reported yet. Actuaries estimate the remaining liabilities at £40m. The 2024 year pays an RITC premium of £40m to the 2025 year, which takes responsibility for any future claims. Whatever remains is the 2024 members’ profit." } },
          "If future liabilities are too uncertain to price, the year stays open in **run-off** until it can close. Run-off years tie up members’ capital, so nobody wants them.",
          "This is why London people talk about results by year of account, not just by calendar year."
        ],
        takeaways: [
          "Business belongs to the year of account in which the policy starts.",
          "A year normally closes after three years by reinsurance to close.",
          "A year that can’t be closed stays open in run-off."
        ]
      },
      {
        title: "When it went wrong: the 1990s crisis",
        minutes: 5,
        body: [
          "For most of its history, Lloyd’s capital came from wealthy individuals called **Names**. They backed syndicates with **unlimited liability**: they were liable down to their last cufflink. By the late 1980s there were more than 30,000 of them.",
          "Then several disasters arrived at once. There were huge, long-hidden claims for **asbestos** and **pollution** in the US, a run of catastrophes (Piper Alpha in 1988, Exxon Valdez and Hurricane Hugo in 1989), and the **LMX spiral**, in which excess of loss reinsurance was passed round and round between London syndicates until a few were left holding enormous losses.",
          { analogy: "The LMX spiral was pass-the-parcel with a ticking bomb. Each syndicate reinsured its large losses with another, which reinsured with another, until the same loss had circled the room several times. When the music stopped, the losses landed on whoever was holding the parcel." },
          "Losses between 1988 and 1992 ran into billions of pounds. Many Names were ruined, and there was widespread litigation against managing agents.",
          "In 1996 the **Reconstruction and Renewal** plan settled the disputes. A new company, **Equitas**, reinsured all the 1992 and earlier non-life liabilities of Lloyd’s Names, ring-fencing the past. In 2007 Berkshire Hathaway’s National Indemnity took over Equitas’s liabilities through reinsurance.",
          "The crisis reshaped Lloyd’s. Corporate capital was admitted from 1994, the chain of security was strengthened, and central oversight became much tighter."
        ],
        takeaways: [
          "Names with unlimited liability once provided most Lloyd’s capital.",
          "Asbestos, pollution, catastrophes and the LMX spiral caused huge losses.",
          "Reconstruction and Renewal (1996) created Equitas and opened the door to corporate capital."
        ]
      }
    ],
    quiz: [
      {
        q: "What is a syndicate’s capacity?",
        options: [
          "The largest sum insured it may take on any one risk",
          "The maximum premium, net of brokerage, it may accept in a year of account",
          "The total claims it can pay",
          "The number of underwriters it employs"
        ],
        answer: 1,
        why: "Capacity limits premium income, and members must back it with capital."
      },
      {
        q: "In the chain of security, which assets pay a valid claim first?",
        options: ["The Central Fund", "Members’ Funds at Lloyd’s", "Syndicate premium trust funds", "The Bank of England"],
        answer: 2,
        why: "Syndicate-level assets come first, then members’ FAL, then central assets."
      },
      {
        q: "A policy starts on 1 March 2025. Which year of account is it written into?",
        options: ["2025", "2026", "2027", "Whichever year is still open when a claim arrives"],
        answer: 0,
        why: "Policies are allocated to the year of account in which they start."
      },
      {
        q: "What does reinsurance to close (RITC) do?",
        options: [
          "Closes a syndicate permanently",
          "Transfers a year of account’s remaining liabilities to a later year or another syndicate, for a premium",
          "Cancels policies that have had no claims",
          "Reinsures the Central Fund"
        ],
        answer: 1,
        why: "RITC lets a year of account close so its members can take their result."
      },
      {
        q: "What was the LMX spiral?",
        options: [
          "A pricing model for marine risks",
          "Excess of loss reinsurance passed repeatedly among London syndicates, concentrating losses",
          "The design of the 1986 Lloyd’s building",
          "A way of signing down lines"
        ],
        answer: 1,
        why: "The same losses circled the market several times and ended up concentrated on a few syndicates."
      },
      {
        q: "Which company was created in 1996 to reinsure 1992 and earlier liabilities?",
        options: ["Equitas", "Velonetic", "Pool Re", "Lloyd’s Europe"],
        answer: 0,
        why: "Equitas ring-fenced the old liabilities as part of Reconstruction and Renewal."
      },
      {
        q: "What uplift does Lloyd’s apply to a syndicate’s Solvency II capital requirement to set members’ capital?",
        options: ["10%", "20%", "35%", "100%"],
        answer: 2,
        why: "The 35% uplift gives Lloyd’s an extra buffer above the regulatory minimum."
      }
    ]
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: "m04",
    code: "04",
    title: "Placing a risk",
    short: "Placing",
    blurb: "The slip, leaders and followers, and how a risk gets to 100%.",
    lessons: [
      {
        title: "The journey of a risk",
        minutes: 4,
        body: [
          "**Placement** is the process of getting a risk insured. In London it follows a familiar sequence. Here is a simplified version for a large property risk.",
          {
            ol: [
              "**Instructions.** The client, or its local broker, instructs a London broker, usually a few months before renewal.",
              "**Submission.** The broker prepares a presentation: schedules of values, loss history, engineering surveys and a draft contract.",
              "**Find a lead.** The broker asks selected underwriters to quote. The client picks a leader on price, terms, claims reputation and expertise.",
              "**Lead terms agreed.** The leader agrees the terms and writes a line, often between 10% and 30% of the risk.",
              "**Followers.** The broker takes the slip to other underwriters, who join on the same terms, until the lines add up to 100% or more.",
              "**Bind.** Cover is bound, ready for the start date. If the lines add up to more than 100%, they are signed down.",
              "**Documents and accounting.** The contract is finalised, premium is processed and paid, and policy documents are issued."
            ]
          },
          { analogy: "It’s like organising a group gift. One person (the leader) chooses the present and sets the price. Then the organiser (the broker) goes round the office collecting contributions until the cost is covered. Everyone pays toward the same gift on the same terms." },
          "Not everything is placed like this. Smaller, more standard risks often go through **delegated authority** (module 05), where an agent binds cover for underwriters without them seeing each risk."
        ],
        takeaways: [
          "The broker prepares a submission and finds a lead underwriter.",
          "Followers join on the leader’s terms until the risk is fully placed.",
          "Smaller risks are often bound under delegated authority instead."
        ]
      },
      {
        title: "The slip and the MRC",
        minutes: 5,
        body: [
          "The **slip** is the document at the heart of London placement. It used to be a folded card on which the broker typed the risk details and underwriters stamped and initialled their lines. That is called **scratching** the slip.",
          "Today the standard format is the **Market Reform Contract (MRC)**. It was introduced in the 2000s so that all terms are agreed and documented before cover starts, a principle known as **contract certainty**. MRCs are now mostly created and signed electronically.",
          { h: "What’s in an MRC" },
          {
            terms: [
              ["Risk Details", "The contract itself: insured, period, what is covered, limits, deductibles, conditions, clauses, choice of law and premium."],
              ["Information", "Facts presented to underwriters that are not contract terms."],
              ["Security Details", "Each insurer’s share (its line), its stamp and reference, and the statement that liability is several, not joint."],
              ["Subscription Agreement", "How the leader and followers work together: who can agree changes and claims, and how premium is paid."],
              ["Fiscal and Regulatory", "Taxes payable, regulatory classifications and how premium is allocated between countries."],
              ["Broker Remuneration and Deductions", "Brokerage and any other deductions from the premium."]
            ]
          },
          { analogy: "The MRC is a recipe card that every cook in the kitchen signs. The ingredients and method (the risk details) are the same for everyone, and each cook writes down which portion of the dish they are responsible for." },
          { note: "Lines are **several, not joint**. Each insurer is liable only for its own share. If one insurer fails, the others don’t pick up its portion, which is why brokers check the financial strength of every name on the slip, not just the leader." }
        ],
        takeaways: [
          "The slip records the risk and each underwriter’s share.",
          "The MRC is the standard contract format and supports contract certainty.",
          "Each insurer is liable only for its own share."
        ]
      },
      {
        title: "Leaders, followers and lines",
        minutes: 4,
        body: [
          "When an underwriter accepts part of a risk, they write a **line**: a percentage of the whole. A 15% line means the syndicate takes 15% of every claim and receives 15% of the premium.",
          "The first underwriter to write is the **leader**. The leader is expected to do the deepest analysis: assessing the risk, negotiating the wording and setting the price. Followers rely on that work, but still make their own decision on whether to join and how big a line to take.",
          "The subscription agreement, often using the market’s **General Underwriters Agreement (GUA)**, sets out which later changes the leader can agree for everyone and which need followers to agree too. Correcting a typo might be for the leader alone; extending the territory might need every follower.",
          { analogy: "The leader is like the head chef at the pass. Each dish (risk) is designed and tasted by the head chef, and the line cooks (followers) trust that judgement. They can refuse a dish they don’t like, but they won’t redesign it." },
          "Leading is valuable. Strong leaders see more business and build reputations in their class. Following lets an underwriter build a diversified portfolio by taking small lines on many risks. **Follow facilities**, which join risks automatically using set rules, have grown fast in recent years."
        ],
        takeaways: [
          "A line is a percentage share of the premium and the claims.",
          "The leader sets the terms; followers subscribe to them.",
          "The subscription agreement says which changes the leader can agree for everyone."
        ]
      },
      {
        title: "Written lines, signed lines and signing down",
        minutes: 4,
        body: [
          "Brokers usually aim to **oversubscribe** a risk, collecting lines that add up to more than 100%. That gives the client a buffer in case an underwriter drops out, and lets the broker reduce everyone’s share evenly at the end.",
          "The share an underwriter agrees is their **written line**. If the total is over 100%, every line is reduced in proportion to give its **signed line**, so that the total is exactly 100%. This is **signing down**.",
          { example: { title: "Worked example", text: "A broker collects four lines: 40%, 30%, 30% and 25%. Total written: 125%. Signing-down factor: 100 ÷ 125 = 0.8. Signed lines: 32%, 24%, 24% and 20%, which add up to 100%." } },
          { analogy: "Picture pre-orders for a limited run of 100 prints. If orders arrive for 125, the gallery doesn’t turn away the last customers. Everyone gets 80% of what they asked for, so each buyer keeps a fair share." },
          "An underwriter who doesn’t want to be reduced can mark their line **to stand**. Then only the other lines are signed down. Signing down must follow the slip’s terms and the client’s instructions, and is normally done at or soon after binding.",
          { lab: "slip", text: "Set written lines and watch signing down happen in the Slip builder." }
        ],
        takeaways: [
          "Written line: what the underwriter agrees. Signed line: what they end up with.",
          "Oversubscribed slips are signed down in proportion.",
          "A line marked “to stand” is not reduced."
        ]
      },
      {
        title: "After binding: changes, premium and settlement",
        minutes: 4,
        body: [
          "Binding isn’t the end of the broker’s work. The policy has to be documented, accounted for and kept up to date.",
          {
            terms: [
              ["Endorsements", "Changes to the contract after it starts, such as adding a location or extending the period. Agreed by the leader and, where needed, the followers."],
              ["Premium payment terms", "When premium must be paid, often within 30 to 90 days of the start date. A premium payment condition gives insurers rights if it is paid late."],
              ["Central accounting", "For much London business, the broker sends premium details to Velonetic, which checks them and records each insurer’s share."],
              ["Signing number and date", "The reference each processed transaction receives, used by brokers and insurers to match money to contracts."],
              ["Central settlement", "Premiums and claims between brokers and insurers are netted and paid through a central system, not one payment at a time."]
            ]
          },
          "Premium submissions have traditionally used a form called the **London Premium Advice Note (LPAN)**. The market’s digital programme aims to replace this paper-shaped data with structured digital records.",
          { analogy: "Central settlement is like a group of friends using an app to settle up after a holiday. Instead of everyone paying each other separately, the app nets out who owes what and makes one payment per person." }
        ],
        takeaways: [
          "Endorsements change the contract after it starts.",
          "Premium is processed centrally and settled net between brokers and insurers.",
          "Each processed transaction gets a signing number and date."
        ]
      }
    ],
    quiz: [
      {
        q: "Lines on a slip add up to 160%. An underwriter wrote 20%. What is their signed line?",
        options: ["20%", "16%", "12.5%", "10%"],
        answer: 2,
        why: "Signing-down factor = 100 ÷ 160 = 0.625, and 20% × 0.625 = 12.5%."
      },
      {
        q: "What does it mean that liability on a London slip is several?",
        options: [
          "Each insurer is liable only for its own share",
          "All insurers are jointly liable for the whole loss",
          "The leader pays everything and recovers from followers",
          "Liability is split equally between insurers"
        ],
        answer: 0,
        why: "If one insurer fails, the others don’t cover its share."
      },
      {
        q: "What is the main purpose of the MRC and contract certainty?",
        options: [
          "To make sure terms are fully agreed and documented before cover starts",
          "To let the leader change the terms after a loss",
          "To replace brokers with direct placement",
          "To fix premiums across the market"
        ],
        answer: 0,
        why: "Contract certainty means no surprises over what was agreed when a claim arrives."
      },
      {
        q: "An underwriter marks their line “to stand”. What happens if the slip is oversubscribed?",
        options: [
          "Their line is cancelled",
          "Their line isn’t signed down; the other lines are",
          "Their line is signed down first",
          "The slip becomes invalid"
        ],
        answer: 1,
        why: "A line to stand keeps its full written size; the others absorb the reduction."
      },
      {
        q: "Who usually sets the terms and price that followers accept?",
        options: ["The broker", "The lead underwriter", "Lloyd’s", "The last underwriter to sign"],
        answer: 1,
        why: "The leader does the deepest analysis and sets the terms."
      },
      {
        q: "What is an endorsement?",
        options: [
          "A recommendation from a rating agency",
          "A change to the policy after it starts",
          "The leader’s signature on the slip",
          "A claims payment"
        ],
        answer: 1,
        why: "Endorsements amend the contract, for example to add a location."
      },
      {
        q: "Why do brokers often aim to oversubscribe a risk?",
        options: [
          "To earn more brokerage",
          "To create a buffer and allow lines to be signed down evenly",
          "Because Lloyd’s requires 120% placement",
          "To avoid insurance premium tax"
        ],
        answer: 1,
        why: "Oversubscription protects the placement if someone drops out and spreads the risk evenly."
      }
    ]
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: "m05",
    code: "05",
    title: "Delegated authority",
    short: "Delegated",
    blurb: "How underwriters let others bind cover for them, and how they keep control.",
    lessons: [
      {
        title: "Open market vs delegated authority",
        minutes: 3,
        body: [
          "In the **open market**, an underwriter sees each risk individually. The broker presents it, and the underwriter assesses it and decides. That works for a refinery or a satellite, but not for 5,000 small Italian shops or 20,000 US homes.",
          "Under **delegated authority**, an insurer authorises another firm to accept risks, issue documents and sometimes handle claims on its behalf, within agreed limits. It lets London capacity reach local, smaller and more standard business far from Lime Street.",
          { analogy: "Delegated authority is a franchise. Head office (the syndicate) designs the menu, sets the prices and writes the hygiene rules. Local franchisees (coverholders) serve customers day to day, and head office checks the books and inspects the kitchens." },
          "Delegated authority makes up a large share of Lloyd’s premium. It is efficient, but it puts the insurer’s capital in someone else’s hands, so controls and oversight matter a great deal."
        ],
        takeaways: [
          "Open market: the underwriter assesses each risk.",
          "Delegated authority: another firm binds risks within agreed limits.",
          "It brings London capacity to smaller, local business."
        ]
      },
      {
        title: "Coverholders, binders and MGAs",
        minutes: 4,
        body: [
          {
            terms: [
              ["Binding authority (binder)", "The contract under which an insurer delegates authority. It sets the classes, territories, limits, rates, policy wordings and reporting rules."],
              ["Coverholder", "A company authorised by a Lloyd’s managing agent to enter into insurance contracts for its syndicates under a binder. Lloyd’s must approve every coverholder."],
              ["MGA", "Managing general agent: a specialist underwriting business with delegated authority, often holding binders from several insurers. Coverholder is the Lloyd’s term; MGA is the wider industry term."],
              ["TPA", "Third-party administrator: a firm authorised to handle and settle claims for the insurer."],
              ["Service company", "A company owned by a managing agent that acts as a coverholder for its own syndicates."]
            ]
          },
          "Binders vary in how much freedom they give. Some let the coverholder price and bind freely within guidelines. Others require referral to the underwriter for anything outside set limits, such as a property above a certain value or in a flood zone.",
          { analogy: "A binder is like giving a teenager a debit card with rules attached: a spending limit, approved shops, and send me the receipts every month. Within those rules they don’t need to ask before each purchase." },
          "MGAs have boomed, especially in the US, as underwriting talent has moved to nimble specialist firms and capital providers have sought access to their portfolios."
        ],
        takeaways: [
          "A binder sets the limits within which a coverholder can bind risks.",
          "Lloyd’s approves coverholders; MGA is the broader industry term.",
          "TPAs handle claims under delegated authority."
        ]
      },
      {
        title: "Bordereaux and oversight",
        minutes: 4,
        body: [
          "If an underwriter isn’t seeing risks one by one, how do they know what they’ve written? Through **bordereaux** (singular: bordereau): regular reports, usually monthly, listing the risks, premiums and claims under a binder.",
          {
            ul: [
              "**Risk bordereau:** each policy bound, with the insured, location, sum insured, premium and dates.",
              "**Premium bordereau:** premiums collected and due to insurers.",
              "**Claims bordereau:** claims notified, paid and reserved."
            ]
          },
          "Lloyd’s publishes **coverholder reporting standards** so bordereaux look the same across the market. Managing agents use them to monitor accumulations, check compliance and spot problems early.",
          "Oversight also means **due diligence** before appointing a coverholder, regular **audits**, and **referral rules**. A breach of authority can leave an insurer bound to risks it never wanted, so managing agents watch closely.",
          { analogy: "Bordereaux are the monthly statements from that teenager’s debit card. You don’t approve each purchase, but you do read the statement, and if something odd turns up, you have a conversation." },
          { note: "Data quality is a long-running headache. Bordereaux can arrive late, incomplete or in different formats, which is why market modernisation focuses on structured, standard data." }
        ],
        takeaways: [
          "Bordereaux report risks, premiums and claims under a binder.",
          "Standard reporting formats help insurers monitor delegated business.",
          "Due diligence, audits and referral rules keep delegated risk under control."
        ]
      },
      {
        title: "Facilities: lineslips and consortia",
        minutes: 3,
        body: [
          "Between pure open market and full delegation sit **facilities**: arrangements that let brokers place many risks with a pre-agreed panel of insurers.",
          {
            terms: [
              ["Lineslip", "A facility in which insurers delegate authority to one or more leading underwriters to accept risks for all participants. The broker shows each risk to the slip leaders only."],
              ["Consortium", "A group of syndicates, sometimes with companies, that write a class together, with one leader underwriting for the group."],
              ["Follow facility", "A facility that automatically joins a broker’s or leader’s placements across a portfolio by applying set rules, not individual underwriting."]
            ]
          },
          { analogy: "A lineslip is like friends pooling money for a season of football tickets and letting one friend choose the matches. They agreed the budget and rules up front; after that, they trust the person choosing." },
          "Facilities save time on high-volume classes, but concentrate decisions in a few hands. They are central to the debate about the future of the subscription market."
        ],
        takeaways: [
          "Lineslips let leaders bind risks for a panel of insurers.",
          "Consortia let syndicates write a class together under one leader.",
          "Follow facilities apply rules instead of individual underwriting."
        ]
      }
    ],
    quiz: [
      {
        q: "What is a coverholder?",
        options: [
          "A Lloyd’s broker placing open market risks",
          "A company authorised to enter into insurance contracts for Lloyd’s syndicates under a binding authority",
          "A member who provides capital",
          "A claims adjuster"
        ],
        answer: 1,
        why: "Coverholders bind risks on syndicates’ behalf within the limits of a binder, and need Lloyd’s approval."
      },
      {
        q: "What is a risk bordereau?",
        options: [
          "A periodic report listing risks bound under delegated authority",
          "A map of catastrophe exposures",
          "The lead underwriter’s stamp",
          "A type of reinsurance treaty"
        ],
        answer: 0,
        why: "Bordereaux are how insurers see what was written on their behalf."
      },
      {
        q: "Why is delegated authority used?",
        options: [
          "To bring London capacity efficiently to large numbers of smaller risks",
          "To avoid regulation",
          "To let brokers keep the premium",
          "Because open market placement is illegal outside the UK"
        ],
        answer: 0,
        why: "Underwriters can’t assess thousands of small risks one by one."
      },
      {
        q: "Under a lineslip, who usually sees and accepts each risk?",
        options: [
          "Every insurer on the facility",
          "The slip leaders, on behalf of all participants",
          "The client",
          "Lloyd’s"
        ],
        answer: 1,
        why: "Participants delegate authority to the leaders, which saves the broker visiting every insurer."
      },
      {
        q: "What is the broader industry term for a specialist underwriting firm with delegated authority?",
        options: ["MGA", "TPA", "LMA", "UMR"],
        answer: 0,
        why: "Managing general agent. Coverholder is the Lloyd’s-specific term."
      },
      {
        q: "What does a TPA do?",
        options: ["Underwrites risks", "Handles claims on the insurer’s behalf", "Provides capital", "Audits Lloyd’s"],
        answer: 1,
        why: "A third-party administrator handles and settles claims within agreed authority."
      }
    ]
  },

  /* ------------------------------------------------------------------ 06 */
  {
    id: "m06",
    code: "06",
    title: "Classes of business",
    short: "Classes",
    blurb: "Marine, aviation, energy, property, casualty and specialty: what London writes.",
    lessons: [
      {
        title: "Marine",
        minutes: 4,
        body: [
          "Marine is where it all began, and London remains the world’s biggest marine insurance centre. The main lines are:",
          {
            terms: [
              ["Hull and machinery", "Physical damage to the ship itself."],
              ["Cargo", "Goods in transit by sea, air or land, often covered warehouse to warehouse."],
              ["Marine liability", "Liabilities of ports, terminals, charterers, ship repairers and others. Shipowners’ own liabilities are mostly covered by P&I clubs."],
              ["War", "Damage from war, piracy, seizure and similar perils. Usually excluded from standard hull cover and bought separately."],
              ["Specie", "High-value goods in transit or storage: gold, cash, jewellery, fine art."],
              ["Yachts", "Pleasure craft and superyachts."]
            ]
          },
          "Marine has its own vocabulary. **General average** is an ancient principle. If cargo is thrown overboard or money spent to save the ship and cargo from a shared danger, everyone with an interest in the voyage shares the cost in proportion to their values. Insurers pay their client’s share.",
          { analogy: "General average is like hikers lightening their packs in a storm. If one person’s tent is thrown away so that everyone gets off the mountain safely, the whole group chips in to replace it." },
          "War cover can move fast. The **Joint War Committee**, made up of Lloyd’s and company underwriters, publishes **listed areas** where extra premium applies, and rates can be reviewed at short notice when conflicts flare, as in the Black Sea and the Red Sea in recent years."
        ],
        takeaways: [
          "Marine covers hull, cargo, liability, war and specie.",
          "General average shares sacrifices made to save a voyage.",
          "War risks are bought separately and priced by area."
        ]
      },
      {
        title: "Aviation and space",
        minutes: 4,
        body: [
          "Aviation insurance covers airlines, aircraft lessors, airports, manufacturers and private aircraft. A single airliner can be worth hundreds of millions of dollars, and the liability for a crash far more, so aviation suits the subscription market well.",
          {
            terms: [
              ["Hull", "Physical damage to the aircraft."],
              ["Aviation liability", "Passenger and third-party liability, often with very high limits."],
              ["Hull war", "War, hijacking, confiscation and terrorism, written separately."],
              ["Products liability", "For manufacturers of aircraft and parts."],
              ["Space", "Launch, in-orbit and third-party liability for satellites."]
            ]
          },
          "Aviation was shaken in 2022, when hundreds of leased aircraft were stranded in Russia after sanctions. Lessors claimed under their policies, leading to large losses and long-running cases in the London courts over which policies should pay.",
          { analogy: "Space insurance is like insuring a one-off concert on a stage built on top of a rocket. There is little track record to price from, so underwriters rely on engineering judgement about each launch vehicle and satellite." },
          "Space is a small, volatile class. A handful of losses in a year can wipe out the market’s whole premium. Few insurers write it, and many of them are in London."
        ],
        takeaways: [
          "Aviation covers hull, liability, war and products risks.",
          "Very large values and liabilities suit the subscription model.",
          "Space insurance prices one-off, high-severity risks with little data."
        ]
      },
      {
        title: "Energy",
        minutes: 3,
        body: [
          "Energy insurance covers the oil, gas and power industries, from exploration to refining, and increasingly renewables.",
          {
            terms: [
              ["Upstream", "Exploration and production: offshore platforms, drilling rigs and wells, including control of well cover for blowouts."],
              ["Midstream", "Pipelines, storage and transport."],
              ["Downstream", "Refineries, petrochemical plants and terminals."],
              ["Power and renewables", "Power stations, wind farms, solar parks and battery storage, including construction."]
            ]
          },
          "Values are huge and risks are concentrated. The Piper Alpha platform disaster in 1988 killed 167 people and was one of the largest insured losses of its time. A major refinery today can carry property values in the billions.",
          { analogy: "Insuring a refinery is like insuring a city block where every building is connected by pipes full of flammable liquid. A fire in one spot can spread to the rest, so underwriters care about separation distances, fire protection and maintenance." },
          "Renewables are the growth area. Offshore wind farms bring new engineering and weather risks, and insurers price both the construction phase and the years of operation."
        ],
        takeaways: [
          "Energy splits into upstream, midstream, downstream and power.",
          "Values are high and risks concentrated.",
          "Renewables are a fast-growing part of the class."
        ]
      },
      {
        title: "Property",
        minutes: 4,
        body: [
          "London writes large commercial and industrial property risks worldwide, often for multinationals or for properties with heavy catastrophe exposure.",
          {
            ul: [
              "**Direct and facultative (D&F) property:** large single risks placed in the open market, sometimes as facultative reinsurance for local insurers.",
              "**Binder property:** smaller commercial and residential risks written through coverholders, a big part of US business.",
              "**Business interruption:** lost profits after physical damage, which can be larger than the damage itself.",
              "**Terrorism and political violence:** often bought as standalone cover."
            ]
          },
          "Natural catastrophe is the dominant worry. Hurricanes, earthquakes, floods and wildfires can produce thousands of claims at once, so underwriters manage **aggregates**: their total exposure in a region. **Catastrophe models** estimate losses from thousands of simulated events.",
          { analogy: "Writing property in Florida is like selling umbrellas to everyone on the same street. Any one day of rain is fine, but a storm makes every customer claim at once. Underwriters keep count of how many umbrellas they’ve sold per street." }
        ],
        takeaways: [
          "London writes large property, D&F and binder business.",
          "Business interruption can exceed the physical damage.",
          "Catastrophe accumulation is the key property risk."
        ]
      },
      {
        title: "Casualty and financial lines",
        minutes: 5,
        body: [
          "**Casualty** means liability insurance: what a business must pay others for injury, damage or financial loss it causes.",
          {
            terms: [
              ["General liability", "Third-party injury and property damage, often for large companies, written as excess layers above local primary policies."],
              ["Professional indemnity (PI)", "Claims by clients for negligent advice or services, for example against lawyers, accountants or architects."],
              ["Directors’ and officers’ (D&O)", "Protects directors against claims over their management decisions, including shareholder class actions."],
              ["Financial institutions (FI)", "Packages for banks and asset managers, including crime, PI and D&O."],
              ["Medical malpractice", "Claims against doctors and hospitals."],
              ["Cyber", "Data breaches, ransomware, losses from IT outages and the related liabilities."]
            ]
          },
          "Casualty is called **long-tail** because claims can appear years or decades after the policy period. Asbestos is the classic example. That makes reserving harder and exposes insurers to **social inflation**: rising jury awards and legal costs, particularly in the US.",
          { analogy: "Short-tail business is like a parking ticket: you know quickly whether you got one and how much it is. Long-tail business is like a slow leak behind a wall. The damage started years ago and you’re only now finding out what it will cost." },
          "Cyber is one of London’s major growth classes. Lloyd’s requires syndicates to exclude losses from state-backed cyber attacks in standalone cyber policies, reflecting fears of a systemic catastrophe too big to insure."
        ],
        takeaways: [
          "Casualty covers liabilities to third parties.",
          "Long-tail claims can appear decades later.",
          "Cyber is a major growth class with systemic risk concerns."
        ]
      },
      {
        title: "Specialty",
        minutes: 4,
        body: [
          "London’s reputation for insuring the unusual lives in its specialty classes.",
          {
            terms: [
              ["Political risk", "Confiscation, expropriation, contract frustration and currency problems for companies investing abroad."],
              ["Trade credit", "Non-payment by buyers or borrowers."],
              ["Terrorism and political violence", "Damage from terrorism, riots, civil commotion, insurrection and war on land."],
              ["Kidnap and ransom (K&R)", "Ransom payments, crisis consultants and related costs."],
              ["Contingency", "Event cancellation and non-appearance, such as a festival or sporting event called off."],
              ["Fine art and specie", "Collections, museums, galleries and valuables."],
              ["Bloodstock", "Racehorses and other high-value animals."],
              ["Accident and health", "Personal accident, sports injury and travel-related cover."]
            ]
          },
          "COVID-19 was a defining event for contingency insurers, with large losses from cancelled events worldwide. Many wordings now exclude communicable disease.",
          { analogy: "Specialty underwriters are like bespoke tailors. There’s no off-the-peg size for insuring a racing driver’s contract or a mine in an unstable country, so each policy is cut to fit." }
        ],
        takeaways: [
          "Specialty covers political risk, credit, K&R, contingency, art and more.",
          "Many specialty risks have little data and rely on judgement.",
          "Big events like COVID-19 reshape wordings."
        ]
      }
    ],
    quiz: [
      {
        q: "Which cover protects a shipowner against damage to the vessel itself?",
        options: ["P&I", "Hull and machinery", "Cargo", "Specie"],
        answer: 1,
        why: "Hull and machinery covers the ship. P&I covers the owner’s liabilities."
      },
      {
        q: "What is general average?",
        options: [
          "The average premium for a class",
          "Sharing the cost of sacrifices made to save a voyage among everyone with an interest in it",
          "The average claim size in marine",
          "A form of reinsurance"
        ],
        answer: 1,
        why: "If cargo is jettisoned to save the ship, all interests share the cost in proportion to their values."
      },
      {
        q: "Which term describes refineries and petrochemical plants?",
        options: ["Upstream", "Midstream", "Downstream", "Offshore"],
        answer: 2,
        why: "Upstream is exploration and production; midstream is pipelines and storage; downstream is refining."
      },
      {
        q: "Why is casualty called long-tail?",
        options: [
          "Policies last longer than a year",
          "Claims can appear many years after the policy period",
          "Its policy wordings are long",
          "Premiums are paid in instalments"
        ],
        answer: 1,
        why: "Liability claims like asbestos can surface decades after the exposure."
      },
      {
        q: "What does contingency insurance typically cover?",
        options: ["Event cancellation and non-appearance", "Kidnap ransoms", "Crop failure", "Pipeline leaks"],
        answer: 0,
        why: "Contingency protects organisers against an event being cancelled or a key person not appearing."
      },
      {
        q: "What has Lloyd’s required syndicates to exclude from standalone cyber policies?",
        options: ["All ransomware", "Losses from state-backed cyber attacks", "Data breaches", "Business interruption"],
        answer: 1,
        why: "State-backed attacks could cause systemic losses across the whole market."
      },
      {
        q: "Business interruption insurance pays for:",
        options: [
          "Physical damage to buildings",
          "Lost profits following insured physical damage",
          "Employee injuries",
          "Fines and penalties"
        ],
        answer: 1,
        why: "BI covers the income lost while the business recovers from damage."
      }
    ]
  },

  /* ------------------------------------------------------------------ 07 */
  {
    id: "m07",
    code: "07",
    title: "Reinsurance",
    short: "Re\u00ADinsurance",
    blurb: "Insurance for insurers: treaty, facultative, layers, reinstatements and the renewal calendar.",
    lessons: [
      {
        title: "Insurance for insurers",
        minutes: 3,
        body: [
          "**Reinsurance** is insurance bought by an insurer. The insurer buying it is the **cedant**, because it cedes risk; the insurer selling it is the **reinsurer**. Reinsurers buy reinsurance too, which is called **retrocession**.",
          "Insurers buy reinsurance to:",
          {
            ul: [
              "**Protect capital** against catastrophes and large single losses",
              "**Increase capacity** to write bigger risks than their balance sheet alone allows",
              "**Smooth results** so a bad year doesn’t wipe out profits",
              "**Reduce capital requirements** under solvency rules",
              "**Gain expertise** in new classes or territories"
            ]
          },
          { analogy: "A bakery gets an order for a 2,000-slice wedding cake. It could bake it all, but if something goes wrong it’s ruined. So it subcontracts part of the order to a bigger bakery. The couple only deals with the first bakery, but the risk is shared behind the scenes." },
          "The original policyholder usually has no direct relationship with the reinsurer. If a reinsurer fails, the cedant must still pay its policyholders in full.",
          "London is one of the world’s main reinsurance centres, alongside Bermuda, Zurich and Munich, and Lloyd’s, taken as a whole, is one of the largest reinsurers in the world."
        ],
        takeaways: [
          "Reinsurance transfers risk from a cedant to a reinsurer.",
          "It protects capital, adds capacity and smooths results.",
          "Policyholders don’t usually have rights against the reinsurer."
        ]
      },
      {
        title: "Treaty vs facultative",
        minutes: 3,
        body: [
          "There are two ways to buy reinsurance.",
          {
            terms: [
              ["Facultative", "Reinsurance of a single risk, negotiated individually. The reinsurer has the faculty to accept or decline each risk."],
              ["Treaty", "An agreement covering a whole portfolio or class, for example all of an insurer’s German property policies for 2027. Risks within its scope are covered automatically."]
            ]
          },
          { analogy: "Facultative is buying a ticket for one match. Treaty is a season ticket: you commit up front, and every match in the season is included without a separate decision." },
          "Facultative suits unusual or very large risks that fall outside a treaty, or extra protection on one exposure. Treaty is the backbone of most insurers’ reinsurance and where most reinsurance premium flows.",
          "Both can be **proportional** or **non-proportional**, which the next two lessons cover."
        ],
        takeaways: [
          "Facultative reinsures one risk at a time.",
          "Treaty covers a whole portfolio automatically.",
          "Either can be proportional or non-proportional."
        ]
      },
      {
        title: "Proportional: quota share and surplus",
        minutes: 5,
        body: [
          "In **proportional** reinsurance, the reinsurer shares premiums and losses in a set proportion.",
          { h: "Quota share" },
          "The cedant cedes the same percentage of every policy. Under a 40% quota share, the reinsurer receives 40% of all premium and pays 40% of all claims.",
          { example: { title: "Quota share example", text: "An insurer writes £50m of premium and has £30m of claims. Under a 40% quota share it cedes £20m of premium and recovers £12m of claims. The reinsurer pays a ceding commission, say 30% of the ceded premium (£6m), towards the insurer’s acquisition and running costs." } },
          { analogy: "A quota share is like a business partner who puts in 40% and takes 40% of every sale and 40% of every bill. However big or small the order, the split is the same." },
          { h: "Surplus" },
          "In a **surplus** treaty, the cedant keeps a fixed amount on each risk, its retention or one line, and cedes the surplus above it, up to a set number of lines. The share ceded varies from risk to risk.",
          { example: { title: "Surplus example", text: "Retention £2m with a 9-line surplus, giving £18m of capacity above the retention. On a £10m risk the cedant keeps £2m (20%) and cedes £8m (80%). On a £1m risk it keeps everything. Premium and losses on each risk are shared in those percentages." } },
          "Proportional treaties help smaller or growing insurers with capital support and a ceding commission. The drawback is that the cedant also gives away a share of its profitable small risks."
        ],
        takeaways: [
          "Quota share: a fixed percentage of every risk.",
          "Surplus: the cedant keeps a fixed amount and cedes the rest, risk by risk.",
          "Reinsurers pay a ceding commission on proportional business."
        ]
      },
      {
        title: "Non-proportional: excess of loss",
        minutes: 5,
        body: [
          "In **non-proportional** reinsurance, the reinsurer pays only when losses go above a threshold. The most common form is **excess of loss (XL)**.",
          "An XL layer is written as **limit xs attachment**, for example £10m xs £5m. The cedant pays the first £5m of each loss (the **retention** or **attachment point**). The reinsurer pays the next £10m. Anything above £15m falls back on the cedant unless it has bought another layer.",
          { example: { title: "Excess of loss example", text: "Layer: £10m xs £5m. A £3m loss: the reinsurer pays nothing. A £12m loss: the reinsurer pays £7m (£12m − £5m). A £20m loss: the reinsurer pays £10m, its full limit, and the cedant pays its £5m retention plus the £5m above the layer." } },
          { analogy: "An XL layer is like a car insurance excess turned inside out. You (the cedant) pay the first slice of any claim yourself. The reinsurer pays the middle slice, up to a cap. If the claim is bigger still, the top is yours again unless you bought another layer." },
          {
            terms: [
              ["Per risk XL", "Pays when a single risk’s loss exceeds the retention, such as one factory fire."],
              ["Catastrophe XL", "Pays when the total from one event, such as a hurricane, exceeds the retention."],
              ["Aggregate or stop loss", "Pays when total losses for a year exceed a threshold, often expressed as a loss ratio."]
            ]
          },
          "XL premium is often quoted as **rate on line (ROL)**: premium ÷ limit. A £10m layer costing £1.5m has a 15% rate on line. Low layers, which are hit often, have high rates on line; high layers have low ones.",
          { lab: "tower", text: "Watch a loss climb a reinsurance programme in the Layer tower." }
        ],
        takeaways: [
          "XL pays the part of a loss above the attachment, up to the limit.",
          "Per risk, catastrophe and aggregate covers respond to different triggers.",
          "Rate on line = premium ÷ limit."
        ]
      },
      {
        title: "Catastrophe programmes and renewals",
        minutes: 5,
        body: [
          "Insurers stack XL layers into a **tower** or **programme**, for example £50m xs £50m, £100m xs £100m and £200m xs £200m. Different reinsurers take shares of each layer, using the same subscription idea as the London slip.",
          "**Reinstatements** restore cover after a layer is used. A layer with one reinstatement at 100% can be used twice in the year. After the first loss, the cedant pays an extra premium to reinstate the limit, usually in proportion to how much of the limit was used.",
          { example: { title: "Reinstatement example", text: "A £20m xs £20m layer costs £2m. A hurricane uses £8m of it. With one reinstatement at 100%, pro rata as to amount, the cedant pays £2m × (8 ÷ 20) = £0.8m to restore the full £20m for the rest of the year." } },
          "An **hours clause** defines a single event for catastrophe cover, for example all windstorm losses within 72 consecutive hours. That matters because each event has its own retention.",
          { analogy: "An hours clause is like a one-visit rule at a garage. Everything fixed within a set window counts as one job with one call-out fee, however many faults you mention." },
          { h: "The renewal calendar" },
          {
            table: {
              head: ["Date", "What renews"],
              rows: [
                ["1 January", "The biggest renewal: Europe and much of the world, including many global programmes"],
                ["1 April", "Japan, plus Korea and India"],
                ["1 June", "Florida, ahead of hurricane season"],
                ["1 July", "Australia, New Zealand and parts of the US"]
              ]
            }
          }
        ],
        takeaways: [
          "Catastrophe programmes stack XL layers into a tower.",
          "Reinstatements restore cover after a loss, for an extra premium.",
          "The main renewals fall on 1 January, 1 April, 1 June and 1 July."
        ]
      },
      {
        title: "Alternative capital and ILS",
        minutes: 4,
        body: [
          "Not all reinsurance capital comes from insurers. **Insurance-linked securities (ILS)** let investors such as pension funds take on insurance risk directly, attracted by returns that don’t move with stock markets.",
          {
            terms: [
              ["Catastrophe bond", "A bond whose investors lose some or all of their principal if a defined catastrophe happens. Otherwise they earn a coupon."],
              ["Collateralised reinsurance", "Reinsurance fully backed by cash held in trust, so the cedant takes no credit risk."],
              ["Sidecar", "A vehicle funded by investors that takes a quota share of a reinsurer’s book."],
              ["Industry loss warranty (ILW)", "Pays when the whole industry’s loss from an event exceeds a trigger, not the buyer’s own loss."],
              ["Parametric cover", "Pays a fixed amount when a measurable parameter is hit, such as a wind speed or earthquake magnitude."]
            ]
          },
          "London has its own ILS framework. Lloyd’s set up **London Bridge Risk PCC**, a vehicle that lets investors back Lloyd’s syndicates through separate cells.",
          { analogy: "A cat bond is like lending money with a weather condition attached. Investors collect interest while skies are calm. If a big enough storm hits a defined area, they lose some or all of the loan, and that money pays the insurer’s claims." }
        ],
        takeaways: [
          "ILS brings capital-markets money into reinsurance.",
          "Cat bonds pay investors a coupon unless a defined catastrophe happens.",
          "Parametric and industry-loss triggers pay on measured events, not actual losses."
        ]
      }
    ],
    quiz: [
      {
        q: "What is a cedant?",
        options: [
          "A reinsurer",
          "The insurer that buys reinsurance and passes on risk",
          "A reinsurance broker",
          "A catastrophe model"
        ],
        answer: 1,
        why: "The cedant cedes risk to the reinsurer."
      },
      {
        q: "An insurer has a 30% quota share. It has a £10m claim. How much does the reinsurer pay?",
        options: ["£0", "£3m", "£7m", "£10m"],
        answer: 1,
        why: "A quota share pays the same percentage of every claim: 30% of £10m is £3m."
      },
      {
        q: "Layer: £20m xs £10m. A £25m loss occurs. What does the reinsurer pay?",
        options: ["£10m", "£15m", "£20m", "£25m"],
        answer: 1,
        why: "£25m minus the £10m retention is £15m, which is within the £20m limit."
      },
      {
        q: "A £10m layer costs £2m. What is the rate on line?",
        options: ["2%", "5%", "20%", "50%"],
        answer: 2,
        why: "Rate on line = premium ÷ limit = £2m ÷ £10m = 20%."
      },
      {
        q: "What is the difference between facultative and treaty reinsurance?",
        options: [
          "Facultative covers single risks; treaty covers a portfolio automatically",
          "Facultative is always non-proportional",
          "Treaty is only used for life insurance",
          "There is no difference"
        ],
        answer: 0,
        why: "Facultative is risk by risk; a treaty covers everything within its scope."
      },
      {
        q: "Which is the largest reinsurance renewal date?",
        options: ["1 January", "1 April", "1 June", "1 July"],
        answer: 0,
        why: "1 January covers Europe and many global programmes."
      },
      {
        q: "What is retrocession?",
        options: [
          "Cancelling a reinsurance contract",
          "Reinsurance bought by reinsurers",
          "Returning premium after a loss-free year",
          "Signing down lines"
        ],
        answer: 1,
        why: "Reinsurers protect themselves with retrocession cover."
      }
    ]
  },

  /* ------------------------------------------------------------------ 08 */
  {
    id: "m08",
    code: "08",
    title: "Claims",
    short: "Claims",
    blurb: "From notification to settlement: who decides, how reserves work and getting money back.",
    lessons: [
      {
        title: "The life of a claim",
        minutes: 4,
        body: [
          "Claims are where an insurer proves its worth. In London they are often complex, international and shared among many insurers.",
          {
            ol: [
              "**Notification.** The insured tells its broker, who notifies the leader and the market. Policies require notice within a set time or as soon as practicable.",
              "**Investigation.** Insurers appoint **loss adjusters** to investigate the cause and size of the loss, and sometimes lawyers, forensic accountants or engineers.",
              "**Coverage review.** Does the policy respond? Is the peril covered? Do exclusions or conditions apply? Insurers may issue a **reservation of rights** while they investigate.",
              "**Reserving.** Insurers set a reserve: their estimate of what the claim will cost.",
              "**Interim payments.** On big losses, insurers often pay on account so the insured can rebuild or keep trading.",
              "**Settlement.** The claim is agreed and paid, usually through the broker and central settlement."
            ]
          },
          { analogy: "A loss adjuster is like a surveyor after a flood. They don’t decide whether you’re insured. They establish what happened and what it will cost to put right, so the insurer can make that decision." },
          "A **loss assessor**, by contrast, is hired by the insured to prepare and negotiate the claim on its side."
        ],
        takeaways: [
          "Claims run from notification through investigation, coverage and reserving to settlement.",
          "Loss adjusters work for insurers; loss assessors work for insureds.",
          "Interim payments help insureds recover while big claims are resolved."
        ]
      },
      {
        title: "Who decides? Claims lead arrangements",
        minutes: 4,
        body: [
          "With 15 insurers on a slip, an insured can’t negotiate a claim with each one. Market agreements give the **claims leader**, usually the slip leader, authority to agree claims for the followers.",
          "Under the **Lloyd’s Claims Lead Arrangements**, many claims can be agreed by the leader alone. More complex or larger claims also need a second agreement party. The company market has similar arrangements, and **Single Claims Agreement Party** arrangements let one leader agree claims for the whole slip on eligible contracts.",
          "Which decisions need more than the leader depends on the arrangement written into the contract’s subscription agreement. Followers are kept informed and are involved in major decisions.",
          { analogy: "It’s like a group holiday booking. When something goes wrong at the hotel, one person speaks to the manager for the group. For small problems they sort it out alone; for big ones, they check with a second member of the group before agreeing anything." },
          { h: "Claims systems" },
          "Claims are recorded and agreed electronically. Lloyd’s uses systems such as the **Electronic Claims File (ECF)** and **CLASS**, so brokers, leaders and followers work from the same documents and decisions."
        ],
        takeaways: [
          "The claims leader agrees claims on behalf of followers.",
          "Complex claims may need a second agreement party.",
          "Market systems keep everyone working from one claim file."
        ]
      },
      {
        title: "Reserves and IBNR",
        minutes: 4,
        body: [
          "Insurers must estimate what they will eventually pay for claims long before every claim is settled. These estimates are **reserves**, usually the biggest number on an insurer’s balance sheet.",
          {
            terms: [
              ["Case reserve", "An estimate for a specific reported claim, set by claims handlers."],
              ["IBNR", "Incurred but not reported: claims that have happened but haven’t been notified yet, plus expected growth on known claims. Estimated by actuaries."],
              ["Ultimate loss", "The final total cost once every claim is settled: paid claims + case reserves + IBNR."],
              ["Reserve development", "How estimates change over time. Releases boost profits; strengthening reduces them."]
            ]
          },
          { analogy: "IBNR is like estimating the bills still to arrive after a big party. You know what you’ve paid and which invoices are on your desk, but past parties tell you a few more will land next month. You set money aside for them now." },
          "Actuaries project ultimate losses using **loss development triangles**: tables showing how past years’ claims grew over time. Long-tail classes need large IBNR because claims surface slowly.",
          "Reserves feed straight into a syndicate’s result and into the RITC premium when a year of account closes."
        ],
        takeaways: [
          "Reserves are estimates of claims still to be paid.",
          "IBNR covers claims that have happened but aren’t yet reported.",
          "Ultimate loss = paid + case reserves + IBNR."
        ]
      },
      {
        title: "Recoveries: subrogation, contribution and salvage",
        minutes: 3,
        body: [
          "Once an insurer has paid, it may be able to get some of the money back.",
          {
            terms: [
              ["Subrogation", "Having paid, the insurer steps into the insured’s shoes and can pursue whoever caused the loss. If a contractor’s negligence burns down a warehouse, the property insurer can sue the contractor."],
              ["Contribution", "Where two policies cover the same loss, the insurers share it, so the insured can’t recover twice."],
              ["Salvage", "After paying a total loss, the insurer takes ownership of the damaged property and sells what it can. In marine, salvage also means the reward paid to those who save a ship or cargo."],
              ["Reinsurance recoveries", "Claiming from reinsurers under the cedant’s treaties and facultative covers."]
            ]
          },
          { analogy: "Subrogation is like a friend paying your dry-cleaning bill after a waiter spills soup on you, then taking it up with the restaurant themselves. You’re made whole; they chase whoever was responsible." },
          "These rights come from the principle of **indemnity**: insurance should put the insured back where they were before the loss, no better and no worse."
        ],
        takeaways: [
          "Subrogation lets insurers pursue third parties who caused a loss.",
          "Contribution shares a loss between overlapping policies.",
          "Recoveries uphold the principle of indemnity."
        ]
      }
    ],
    quiz: [
      {
        q: "What does IBNR stand for?",
        options: ["Insured but not reinsured", "Incurred but not reported", "Indemnity before notice received", "Interim benefit not released"],
        answer: 1,
        why: "IBNR covers claims that have happened but haven’t been reported yet."
      },
      {
        q: "Who does a loss adjuster normally work for?",
        options: ["The insured", "The insurer", "The broker", "The court"],
        answer: 1,
        why: "Adjusters are appointed by insurers. A loss assessor works for the insured."
      },
      {
        q: "An insurer pays for a warehouse fire caused by a contractor, then sues the contractor. This is:",
        options: ["Contribution", "Subrogation", "Salvage", "General average"],
        answer: 1,
        why: "Subrogation lets the insurer take over the insured’s rights against the party at fault."
      },
      {
        q: "Ultimate loss equals:",
        options: ["Paid claims only", "Paid + case reserves + IBNR", "Premium minus claims", "Case reserves minus IBNR"],
        answer: 1,
        why: "Ultimate loss is everything paid plus everything still expected to be paid."
      },
      {
        q: "Why do claims lead arrangements exist?",
        options: [
          "So the insured doesn’t have to negotiate with every insurer on the slip",
          "To let followers refuse all claims",
          "To transfer claims to Lloyd’s",
          "To delay claims for three years"
        ],
        answer: 0,
        why: "The leader, sometimes with a second insurer, agrees claims for the whole slip."
      },
      {
        q: "What is a reservation of rights?",
        options: [
          "Notice that the insurer is investigating but hasn’t yet accepted cover",
          "A reinsurance clause",
          "A premium refund",
          "A coverholder’s authority"
        ],
        answer: 0,
        why: "It lets the insurer investigate without giving up its right to decline later."
      }
    ]
  },

  /* ------------------------------------------------------------------ 09 */
  {
    id: "m09",
    code: "09",
    title: "Law and principles",
    short: "Law",
    blurb: "Utmost good faith, the Insurance Act 2015, warranties and policy triggers.",
    lessons: [
      {
        title: "Core principles",
        minutes: 4,
        body: [
          "Insurance law rests on a few principles, many of them developed by English courts in marine cases.",
          {
            terms: [
              ["Insurable interest", "You must stand to lose financially from the event insured. You can insure your own warehouse, but not a stranger’s."],
              ["Utmost good faith", "Both parties must act honestly and openly. It was historically very strict on the insured: any non-disclosure of a material fact could void the policy."],
              ["Indemnity", "Insurance puts the insured back in its pre-loss position, no better and no worse. Some covers, like personal accident, pay fixed sums instead."],
              ["Proximate cause", "The dominant or effective cause of a loss decides whether it is covered, not simply the last event in time."],
              ["Contribution and subrogation", "Rules that follow from indemnity and stop the insured profiting from a loss."]
            ]
          },
          { analogy: "Proximate cause is like working out why a row of dominoes fell. The last domino hit the floor, but the cause was whoever knocked the first one. Courts look for that effective cause." },
          "The **Marine Insurance Act 1906** codified much of this law, and many of its principles are applied to non-marine insurance too."
        ],
        takeaways: [
          "Insurable interest, utmost good faith, indemnity and proximate cause are core principles.",
          "Proximate cause looks for the dominant cause, not the last event.",
          "The Marine Insurance Act 1906 codified much of the law."
        ]
      },
      {
        title: "The Insurance Act 2015: fair presentation",
        minutes: 5,
        body: [
          "The **Insurance Act 2015**, in force since August 2016, modernised the law for business insurance. At its centre is the **duty of fair presentation**, which replaced the old duty of disclosure.",
          "Before the contract is made, the insured must:",
          {
            ul: [
              "Disclose every **material circumstance** it knows or ought to know, or at least enough to put a prudent insurer on notice that it should ask more questions",
              "Present it in a **reasonably clear and accessible** way, which means no dumping thousands of documents on the underwriter",
              "Make sure every material statement of fact is **substantially correct**, and every statement of expectation or belief is made in good faith"
            ]
          },
          "What the insured knows includes what its **senior management** and the people responsible for its insurance know, and what a **reasonable search** would reveal. Insurers, for their part, are expected to know what is common knowledge in their class and to ask questions when a presentation raises flags.",
          { analogy: "Fair presentation is like selling a used car to an expert buyer. You must mention the gearbox problem, and you can’t hide it in a box of 400 receipts. You don’t have to explain what a gearbox is, and if the buyer spots a warning light, it’s their job to ask." },
          { note: "Consumer insurance is different. Under the Consumer Insurance (Disclosure and Representations) Act 2012, consumers only need to take reasonable care not to make a misrepresentation when answering the insurer’s questions." }
        ],
        takeaways: [
          "Business insureds owe a duty of fair presentation before the contract.",
          "Material facts must be disclosed clearly, not buried.",
          "Insurers are expected to ask questions when something raises a flag."
        ]
      },
      {
        title: "Remedies and warranties",
        minutes: 5,
        body: [
          "Under the old law, any breach of the duty of disclosure let an insurer **avoid** the policy, treating it as if it never existed. The Insurance Act 2015 introduced **proportionate remedies**.",
          {
            table: {
              head: ["If the breach was", "And the insurer would have", "Then"],
              rows: [
                ["Deliberate or reckless", "Any response", "Avoid the policy, refuse all claims and keep the premium"],
                ["Innocent or careless", "Declined the risk", "Avoid the policy but return the premium"],
                ["Innocent or careless", "Used different terms", "Treat the contract as if those terms applied"],
                ["Innocent or careless", "Charged more premium", "Reduce claims in proportion"]
              ]
            }
          },
          { example: { title: "Proportionate reduction", text: "An insured carelessly fails to mention a previous fire. The insurer would have charged £150,000 instead of £100,000. The insured then claims £1m. The insurer pays in proportion: 100,000 ÷ 150,000 = two-thirds, so £666,667." } },
          { h: "Warranties" },
          "A **warranty** is a promise by the insured, for example that a sprinkler system will be maintained. Under the old law, any breach automatically ended the insurer’s liability from that moment, even if the breach had nothing to do with a later loss.",
          "The 2015 Act changed this. A breach of warranty now **suspends** cover only until it is put right. And under section 11, if a term is meant to reduce the risk of a particular kind of loss, the insurer can’t rely on a breach if the insured shows it could not have increased the risk of the loss that actually happened.",
          { analogy: "Under the old law, forgetting to set a burglar alarm was a red card: you were off for the rest of the match. Now it’s a sin bin. You’re off the pitch while the breach lasts and back on once you fix it. And if the loss was a flood, the alarm doesn’t matter at all." },
          "**Basis of the contract clauses**, which turned every answer on a proposal form into a warranty, are abolished. Business parties can contract out of some of the Act, but only if the change is clear and the insured is made aware of it. Since 2017, insurers must also pay valid claims within a reasonable time, or risk paying damages for late payment."
        ],
        takeaways: [
          "Remedies for unfair presentation are now proportionate.",
          "A breach of warranty suspends cover rather than ending it.",
          "Section 11 stops insurers relying on irrelevant breaches."
        ]
      },
      {
        title: "Policy triggers",
        minutes: 4,
        body: [
          "When does a policy respond? It depends on its **trigger**, and getting this wrong is a classic cause of gaps in cover.",
          {
            terms: [
              ["Losses occurring", "Covers losses that happen during the policy period, whenever they are reported. Common for property."],
              ["Claims made", "Covers claims first made against the insured during the policy period, whenever the underlying event happened, subject to any retroactive date. Common for PI and D&O."],
              ["Risks attaching", "In reinsurance: covers losses on original policies that start during the reinsurance period, even if the loss happens later."],
              ["Losses occurring during", "In reinsurance: covers losses that happen during the reinsurance period, whenever the original policy started."]
            ]
          },
          { analogy: "Losses occurring is like a gym membership: what counts is when you used the gym. Claims made is like a warranty helpline: what counts is when you call, not when the fault developed." },
          { example: { title: "Spot the gap", text: "A firm moves its claims-made PI policy to a new insurer, whose retroactive date is the start of the new policy. A claim arrives about advice given two years ago. The old policy has expired, and the new one excludes work before its retroactive date. No cover. Brokers avoid this by keeping the original retroactive date or buying run-off cover." } }
        ],
        takeaways: [
          "Losses occurring: when the loss happens.",
          "Claims made: when the claim is first made.",
          "Reinsurance uses risks attaching or losses occurring during."
        ]
      },
      {
        title: "Disputes, courts and arbitration",
        minutes: 3,
        body: [
          "Most London Market contracts choose **English law** and either the English courts or arbitration in London. The **Commercial Court** in London hears many of the world’s biggest insurance disputes.",
          "Reinsurance disputes often go to **arbitration**, which is private and lets the parties choose arbitrators who know the market. ARIAS (UK) is a specialist body for insurance and reinsurance arbitration.",
          "Landmark London judgments shape wordings worldwide. In the **FCA business interruption test case** in 2021, the UK Supreme Court ruled on how business interruption policies covered pandemic losses, affecting hundreds of thousands of policyholders.",
          { analogy: "Choosing English law is like agreeing which rulebook a game will be played under before kick-off. Everyone knows the rules, and decades of past decisions show how the referee reads them." },
          "Other routes include **mediation**, which settles disputes without a ruling, and **ex gratia** payments, which an insurer may make without admitting liability, often to keep a client relationship."
        ],
        takeaways: [
          "Most London contracts use English law and London courts or arbitration.",
          "The Commercial Court and arbitrators hear major insurance disputes.",
          "Test cases like the FCA business interruption case shape wordings worldwide."
        ]
      }
    ],
    quiz: [
      {
        q: "Under the Insurance Act 2015, what replaced the old duty of disclosure for business insureds?",
        options: ["The duty of utmost good faith", "The duty of fair presentation", "The duty of care", "The duty of reasonable enquiry"],
        answer: 1,
        why: "The duty of fair presentation sets out what the insured must disclose and how."
      },
      {
        q: "A breach was careless. The insurer would have charged 25% more premium. What remedy applies?",
        options: [
          "Avoid the policy and keep the premium",
          "Avoid the policy and return the premium",
          "Reduce claims in proportion",
          "No remedy"
        ],
        answer: 2,
        why: "The insurer pays the proportion of the claim that the premium charged bears to the premium it would have charged."
      },
      {
        q: "Under the 2015 Act, what is the effect of a breach of warranty?",
        options: [
          "The insurer is discharged from all liability",
          "Cover is suspended until the breach is put right",
          "The policy is void from the start",
          "The premium doubles"
        ],
        answer: 1,
        why: "Suspension replaced automatic discharge."
      },
      {
        q: "A PI policy covers claims first made during the policy period. What trigger is this?",
        options: ["Losses occurring", "Claims made", "Risks attaching", "Losses occurring during"],
        answer: 1,
        why: "Claims-made policies respond to when the claim is made, not when the work was done."
      },
      {
        q: "Proximate cause means:",
        options: [
          "The last event before the loss",
          "The dominant or effective cause of the loss",
          "The nearest cause geographically",
          "Whichever cause the insured chooses"
        ],
        answer: 1,
        why: "Courts look for the effective cause, not just the most recent one."
      },
      {
        q: "Dumping thousands of documents on an underwriter breaches which requirement?",
        options: ["Insurable interest", "Presenting information in a reasonably clear and accessible way", "Indemnity", "Contribution"],
        answer: 1,
        why: "Fair presentation requires disclosure to be clear and accessible, not buried."
      },
      {
        q: "A treaty written on a risks attaching basis covers:",
        options: [
          "Losses on policies that start during the treaty period",
          "Only losses that happen during the treaty period",
          "Claims first made during the period",
          "Only catastrophe losses"
        ],
        answer: 0,
        why: "Risks attaching follows the start date of the original policies."
      }
    ]
  },

  /* ------------------------------------------------------------------ 10 */
  {
    id: "m10",
    code: "10",
    title: "The numbers",
    short: "Numbers",
    blurb: "Written and earned premium, combined ratios, the underwriting cycle and capital.",
    lessons: [
      {
        title: "Premium: written, earned, gross and net",
        minutes: 4,
        body: [
          {
            terms: [
              ["Gross written premium (GWP)", "Total premium on policies written in a period, before reinsurance."],
              ["Net written premium (NWP)", "GWP minus premium paid to reinsurers."],
              ["Earned premium", "The part of the premium that relates to cover already provided. Premium is earned over the policy period."],
              ["Unearned premium", "Premium received for cover still to come. It sits on the balance sheet as a liability."]
            ]
          },
          { example: { title: "Earning premium", text: "A 12-month policy starts on 1 October with a premium of £120,000. By 31 December, three months have passed, so £30,000 is earned and £90,000 is unearned." } },
          { analogy: "Premium is like a gym membership paid up front. On day one the gym has your cash, but it hasn’t earned it until it provides the months of access. Each month, one twelfth moves from owed to earned." },
          "Not all policies earn evenly. Hurricane cover written in January earns more in the autumn hurricane season, and construction risks earn as the project grows."
        ],
        takeaways: [
          "GWP is before reinsurance; NWP is after.",
          "Premium is earned over the period of cover.",
          "Unearned premium is a liability on the balance sheet."
        ]
      },
      {
        title: "Loss, expense and combined ratios",
        minutes: 4,
        body: [
          "The most quoted number in insurance is the **combined ratio**.",
          {
            terms: [
              ["Loss ratio", "Claims incurred ÷ earned premium."],
              ["Expense ratio", "Acquisition costs (brokerage and commission) plus running costs ÷ earned premium."],
              ["Combined ratio", "Loss ratio + expense ratio. Below 100% is an underwriting profit; above 100% is an underwriting loss."]
            ]
          },
          { example: { title: "Calculating a combined ratio", text: "Earned premium £200m. Claims incurred £120m. Expenses £66m. Loss ratio 60%, expense ratio 33%, combined ratio 93%. For every £1 of premium, the insurer kept 7p as underwriting profit, before investment income." } },
          { analogy: "Think of a café. If every £1 of sales costs 60p in ingredients (claims) and 33p in rent and wages (expenses), you keep 7p. A combined ratio over 100% is a café selling coffee for less than it costs to make." },
          "Insurers also earn **investment income** on premium they hold before paying claims, called the **float**. Long-tail classes generate more float, so a combined ratio a little above 100% can still be profitable overall when interest rates are high.",
          "Lloyd’s reported a combined ratio of 84.0% for 2023, one of its strongest results in years. In heavy loss years such as 2017 and the pandemic year 2020, its combined ratio was above 100%.",
          { lab: "ratio", text: "Move premium, claims and expenses in the Combined ratio tool." }
        ],
        takeaways: [
          "Combined ratio = loss ratio + expense ratio.",
          "Below 100% is an underwriting profit.",
          "Investment income on the float adds to the result."
        ]
      },
      {
        title: "The underwriting cycle",
        minutes: 4,
        body: [
          "Insurance prices move in a cycle between **soft** and **hard** markets.",
          {
            terms: [
              ["Soft market", "Plenty of capital chasing business. Prices fall, terms widen and underwriters compete for share. Margins get thin."],
              ["Hard market", "After heavy losses or a capital shortage, prices rise, terms tighten and capacity shrinks. Margins recover."]
            ]
          },
          "A typical cycle runs like this: profits attract new capital, competition pushes prices down, losses eventually exceed premiums, capital leaves or is used up, prices rise, profits return, and new capital arrives again.",
          { analogy: "It’s like renting in a university town. When lots of new flats are built, landlords cut rents to fill them. When supply dries up or demand surges, rents jump. Insurance capacity behaves like housing supply." },
          "London felt this sharply. After years of soft pricing, Lloyd’s launched a performance review in 2018 that required syndicates to fix or exit their worst-performing business. A hard market followed from 2019, driven by catastrophe losses, the pandemic, inflation and rising reinsurance costs.",
          "Underwriting discipline means holding rates and terms when competitors chase volume. It’s easy to describe and hard to do."
        ],
        takeaways: [
          "Soft markets: plenty of capital and falling prices.",
          "Hard markets: scarce capacity and rising prices.",
          "Flows of capital drive the cycle."
        ]
      },
      {
        title: "Capital and solvency",
        minutes: 4,
        body: [
          "Insurers must hold enough capital to survive bad years. In the UK the rules come from **Solvency II**, now adapted as **Solvency UK** and supervised by the **PRA**.",
          {
            terms: [
              ["Solvency Capital Requirement (SCR)", "The capital needed to survive a 1-in-200-year loss over one year, a 99.5% confidence level."],
              ["Own funds", "The capital an insurer actually holds against its SCR."],
              ["Solvency ratio", "Own funds ÷ SCR. Regulators expect it to be comfortably above 100%."],
              ["Internal model", "A firm’s own approved model for calculating its SCR, used by Lloyd’s and many larger insurers."]
            ]
          },
          { analogy: "The SCR is like building a sea wall to the height of a 1-in-200-year storm surge. Most years the water never comes close, but the wall has to be ready for the rare one." },
          "Each syndicate calculates its capital requirement with a model that Lloyd’s reviews, and Lloyd’s adds a 35% uplift to set members’ Funds at Lloyd’s. Lloyd’s also runs **Realistic Disaster Scenarios (RDS)**: standard catastrophes, such as a major US hurricane or a Californian earthquake, that every syndicate must model, so it can see the whole market’s exposure."
        ],
        takeaways: [
          "The SCR is set to survive a 1-in-200-year loss.",
          "Solvency ratio = own funds ÷ SCR.",
          "Realistic Disaster Scenarios test the market’s catastrophe exposure."
        ]
      }
    ],
    quiz: [
      {
        q: "Earned premium £100m, claims £65m, expenses £30m. What is the combined ratio?",
        options: ["35%", "65%", "95%", "105%"],
        answer: 2,
        why: "Loss ratio 65% + expense ratio 30% = 95%."
      },
      {
        q: "A combined ratio of 104% means:",
        options: [
          "An underwriting profit of 4%",
          "An underwriting loss equal to 4% of earned premium",
          "Claims were 104% of premium",
          "Expenses were 4% of premium"
        ],
        answer: 1,
        why: "Claims plus expenses came to 104% of earned premium, so underwriting lost 4p per £1."
      },
      {
        q: "A 12-month policy with £24,000 premium starts on 1 July. How much is earned by 31 December?",
        options: ["£6,000", "£12,000", "£18,000", "£24,000"],
        answer: 1,
        why: "Six of the twelve months have passed, so half the premium is earned."
      },
      {
        q: "What characterises a hard market?",
        options: [
          "Falling prices and broad terms",
          "Rising prices, tighter terms and less capacity",
          "No new business written",
          "Prices fixed by government"
        ],
        answer: 1,
        why: "Hard markets follow losses or capital shortages."
      },
      {
        q: "The Solvency II SCR is calibrated to:",
        options: ["A 1-in-10-year loss", "A 1-in-100-year loss", "A 1-in-200-year loss over one year", "The worst loss in history"],
        answer: 2,
        why: "The SCR targets a 99.5% confidence level over one year."
      },
      {
        q: "What is the float?",
        options: [
          "Premium held and invested before claims are paid",
          "A floating interest rate",
          "The unplaced part of a slip",
          "Reinsurance commission"
        ],
        answer: 0,
        why: "Insurers invest premium between receiving it and paying claims."
      }
    ]
  },

  /* ------------------------------------------------------------------ 11 */
  {
    id: "m11",
    code: "11",
    title: "The market today",
    short: "Today",
    blurb: "Regulation, tax, sanctions, global reach and the push to go digital.",
    lessons: [
      {
        title: "Who regulates whom",
        minutes: 4,
        body: [
          "The UK splits financial regulation between two regulators, sometimes called twin peaks.",
          {
            terms: [
              ["PRA", "Prudential Regulation Authority, part of the Bank of England. Supervises insurers’ safety and soundness: capital, reserves and governance."],
              ["FCA", "Financial Conduct Authority. Supervises conduct: how firms treat customers, market integrity and financial crime. Regulates brokers."],
              ["Lloyd’s", "Regulated by both, and in turn oversees managing agents and coverholders through its own rules and standards."]
            ]
          },
          "Managing agents and London insurers are **dual-regulated** by the PRA and FCA. Brokers are regulated by the FCA alone. Lloyd’s adds a third layer of oversight for its own market.",
          { analogy: "It’s like a building with two inspectors. One checks that the structure won’t fall down (the PRA). The other checks that tenants are treated fairly and the fire exits work (the FCA). Lloyd’s is the landlord, with its own house rules on top." },
          "The FCA’s **Consumer Duty**, in force since July 2023, raised standards for firms whose products reach retail customers, which includes some London Market products sold through delegated authority.",
          "Overseas, Lloyd’s and London insurers must also satisfy local regulators wherever they write business."
        ],
        takeaways: [
          "The PRA covers financial soundness; the FCA covers conduct.",
          "Managing agents are dual-regulated; brokers are regulated by the FCA.",
          "Lloyd’s oversees its own market on top of the regulators."
        ]
      },
      {
        title: "Tax, sanctions and financial crime",
        minutes: 4,
        body: [
          { h: "Insurance premium tax" },
          "UK risks attract **Insurance Premium Tax (IPT)** on top of the premium. The standard rate is 12%, and a higher 20% rate applies to some products such as travel insurance. Other countries charge their own premium taxes, so London policies must allocate premium by country to get the tax right.",
          { h: "Sanctions" },
          "London insurers must not provide cover that breaches **sanctions**, including UK sanctions enforced by the **Office of Financial Sanctions Implementation (OFSI)**, and often US, EU and UN rules too. Marine is especially exposed: ships, cargoes and owners can be sanctioned, and the price cap on Russian oil has required insurers to collect confirmations about cargo prices.",
          "Policies include **sanctions clauses** that suspend cover or payments where they would breach sanctions.",
          { analogy: "Sanctions screening is like a door supervisor with a list of people who must not be let in. Insurers check names, vessels and countries before binding and before paying claims, because the list changes all the time." },
          { h: "Financial crime" },
          "Firms must prevent **money laundering**, **bribery** (under the UK Bribery Act 2010) and fraud. Broker commissions, delegated authority and high-risk territories get extra scrutiny."
        ],
        takeaways: [
          "UK insurance premium tax is 12%, or 20% for some products.",
          "Sanctions compliance is critical, especially in marine.",
          "Anti-bribery and anti-money laundering rules apply across the market."
        ]
      },
      {
        title: "Going global",
        minutes: 3,
        body: [
          "Most London business comes from abroad, so access to overseas markets is vital. Lloyd’s can write business in more than 200 countries and territories through licences and trading rights negotiated centrally.",
          {
            terms: [
              ["Lloyd’s Europe", "Lloyd’s Insurance Company S.A. in Brussels, set up so the market could keep writing EU business after Brexit. It started writing policies in 2019."],
              ["Lloyd’s Asia", "A platform in Singapore that lets syndicates write regional business locally."],
              ["Lloyd’s China", "A platform in Shanghai for reinsurance and direct business."],
              ["Lloyd’s Dubai", "A platform in the Dubai International Financial Centre for Middle East business."],
              ["US surplus lines", "Lloyd’s is a major writer of US excess and surplus lines: risks that standard US insurers won’t take."]
            ]
          },
          { analogy: "Lloyd’s licences work like an airline’s landing rights. One carrier negotiates permission to land at hundreds of airports, and every plane in its fleet can use them." },
          "The US is Lloyd’s largest market, at around half of its premium, so US regulation, litigation trends and catastrophes have an outsized effect on London’s results."
        ],
        takeaways: [
          "Lloyd’s holds licences and trading rights in more than 200 territories.",
          "Lloyd’s Europe in Brussels serves EU business after Brexit.",
          "The US is London’s largest market."
        ]
      },
      {
        title: "Going digital",
        minutes: 4,
        body: [
          "For a market that still values face-to-face negotiation, going digital has been a long road. The key pieces:",
          {
            terms: [
              ["Electronic placing", "Platforms such as PPL and Whitespace let brokers and underwriters negotiate and bind MRC contracts electronically. They have replaced most paper slips."],
              ["Blueprint Two", "The market’s programme to digitise processing around structured data, with a Core Data Record that captures contract details once and reuses them for accounting, tax and claims. Its timetable has shifted several times."],
              ["Lloyd’s Lab", "An accelerator for insurtech start-ups working with the market."],
              ["ACORD standards", "Common data formats that let brokers’ and insurers’ systems talk to each other."]
            ]
          },
          { analogy: "Moving from paper slips to structured data is like going from recipes scribbled on cards to a shared recipe app. With cards, every cook copies the ingredients by hand and mistakes creep in. In the app, the recipe is entered once and everyone sees the same version." },
          "The aim is to cut London’s cost of doing business, often said to be high compared with rival centres, and to speed up premium and claims payments, while keeping the expertise and subscription model that make London distinctive."
        ],
        takeaways: [
          "Electronic placing platforms have replaced most paper slips.",
          "Blueprint Two aims to digitise processing around structured data.",
          "Lower costs are key to London’s competitiveness."
        ]
      },
      {
        title: "Emerging risks",
        minutes: 4,
        body: [
          "London’s edge has always been its willingness to insure new risks. Some of today’s big themes:",
          {
            terms: [
              ["Climate change", "More intense catastrophes, more damage from floods and wildfires, and transition risks as economies decarbonise."],
              ["Cyber", "Fast-growing demand, with the challenge of systemic events that could hit thousands of policyholders at once."],
              ["Geopolitics", "Wars, sanctions and political violence affecting marine, aviation, political risk and terrorism cover."],
              ["Artificial intelligence", "New liabilities from AI errors and misuse, alongside AI tools that help underwriters and claims handlers."],
              ["Parametric insurance", "Fast payouts triggered by data, which help close protection gaps in developing countries."],
              ["Protection gap", "The share of economic losses that is uninsured. Narrowing it is a shared aim of insurers and governments."]
            ]
          },
          "Government-backed schemes cover some risks the private market can’t carry alone: **Pool Re** for UK terrorism and **Flood Re** for UK household flood, for example.",
          { analogy: "Underwriting emerging risks is like charting a coastline while sailing along it. There’s no complete map yet, so you take soundings, move carefully and share what you learn." }
        ],
        takeaways: [
          "Climate, cyber, geopolitics and AI are reshaping demand.",
          "Parametric cover can help close the protection gap.",
          "Pool Re and Flood Re back UK terrorism and household flood risk."
        ]
      }
    ],
    quiz: [
      {
        q: "Which regulator supervises insurers’ capital and financial soundness in the UK?",
        options: ["FCA", "PRA", "OFSI", "Lloyd’s"],
        answer: 1,
        why: "The PRA, part of the Bank of England, is the prudential regulator."
      },
      {
        q: "What is the standard rate of UK Insurance Premium Tax?",
        options: ["5%", "12%", "20%", "25%"],
        answer: 1,
        why: "12% is standard; 20% applies to some products such as travel insurance."
      },
      {
        q: "Why was Lloyd’s Insurance Company S.A. set up in Brussels?",
        options: [
          "To lower UK tax",
          "To keep writing EU business after Brexit",
          "To run Lloyd’s claims processing",
          "To replace the Corporation of Lloyd’s"
        ],
        answer: 1,
        why: "After Brexit, Lloyd’s needed an EU-authorised insurer to keep serving EU clients."
      },
      {
        q: "Which country is Lloyd’s largest market?",
        options: ["United Kingdom", "China", "United States", "Germany"],
        answer: 2,
        why: "The US accounts for around half of Lloyd’s premium."
      },
      {
        q: "What is Pool Re?",
        options: [
          "A reinsurance pool for UK household flood",
          "A government-backed reinsurer for UK terrorism risk",
          "A P&I club",
          "A Lloyd’s syndicate"
        ],
        answer: 1,
        why: "Pool Re covers UK terrorism; Flood Re covers UK household flood."
      },
      {
        q: "What does Blueprint Two aim to do?",
        options: [
          "Rebuild the Lloyd’s building",
          "Digitise market processing around structured data",
          "Replace brokers with algorithms",
          "Merge Lloyd’s with the company market"
        ],
        answer: 1,
        why: "It aims to capture contract data once and reuse it across accounting, tax and claims."
      },
      {
        q: "OFSI is responsible for:",
        options: ["UK financial sanctions", "Insurance premium tax", "Lloyd’s capital", "Claims arbitration"],
        answer: 0,
        why: "The Office of Financial Sanctions Implementation enforces UK financial sanctions."
      }
    ]
  }
];
