# London Market Academy 🏛️

An installable, offline-capable web app that teaches how the **London insurance market** works — built for people who work in or around insurance but aren't underwriters.

## What's inside

**14 modules · 70 lessons · ~290 quiz questions (numeric + qualitative) · 32 achievements · 130+ term glossary — plus a Connections map, inline diagrams and a built-in quiz calculator**

| # | Module | Covers |
|---|--------|--------|
| 1 | The London Market | Lloyd's, syndicates, managing agents, brokers, slips, subscription, signing down, delegated authority, bureau & central settlement |
| 2 | Premium: From Gross to Net | The premium waterfall, written/earned/unearned, estimates & adjustments, reinstatement premium, subscription maths, trust funds & currency |
| 3 | Pricing & Underwriting | Loss/expense/combined ratios, rate on line & burning cost, experience vs exposure rating, rate change, terms & conditions, the underwriting cycle |
| 4 | Capital & Solvency | The one-in-200 standard, Solvency UK, internal models, Lloyd's capital setting (Economic Capital Assessment, Funds at Lloyd's), diversification, return on capital, ratings & the Central Fund |
| 5 | Outwards Reinsurance | Treaty vs facultative, quota share & surplus, excess of loss & reinstatements, stop loss, programme design, recoveries & reinsurer credit risk |
| 6 | Exposure Management | Aggregation, catastrophe models & exceedance-probability curves, Lloyd's realistic disaster scenarios, clash, cyber & casualty accumulation |
| 7 | Claims & Reserving | The subscription claims process, case reserves & incurred-but-not-reported, development triangles, chain ladder, Bornhuetter–Ferguson |
| 8 | Classes I (shorter tail) | Property direct & facultative, marine (incl. general average), energy (incl. control of well), aviation (incl. vertical placements), terrorism/political violence & property treaty |
| 9 | Classes II (long tail & specialty) | Casualty, professional & financial lines, cyber, political risk/credit/surety, accident & health, contingency |
| 10 | Regulation & The Big Picture | Regulators, three-year accounting & reinsurance to close, modern reporting, conduct/sanctions/financial crime, and an end-to-end capstone |
| 11 | Pens & Paper: The Underwriter–Capital Split | Managing general underwriters & framework economics, fronting, MGA platforms/incubators, catastrophe bonds/sidecars/collateralised reinsurance, lead-vs-follow economics |
| 12 | Bespoke & Structured Risk Solutions | One-off deal underwriting, credit enhancement & bank capital relief, transactional liability (warranty & indemnity, tax, contingent legal), loss portfolio transfers & adverse development covers, a deal-lifecycle capstone |
| 13 | Advanced Practitioner | Exposure curves & increased limit factors, sliding scales & swing rates, capital allocation (co-measures, one-year vs ultimate), reserving diagnostics & tail factors, contract law (fair presentation, follow the settlements), float & discounting economics |
| 14 | Advanced Practitioner II | Building a view of catastrophe risk (model blending & validation), catastrophe layer pricing from the curve, reserve ranges (Mack & bootstrap), the syndicate planning year, portfolio management information, global programmes & captives |

Plus a **Connections** tab: pick a class of business and follow it end to end — client → brokers → placement → premium → exposure management → capital → outwards reinsurance → claims → reserving — with class-specific idiosyncrasies at each stage and links into the relevant lessons. Numeric quiz questions include a built-in mini calculator, and key lessons carry inline flow diagrams (placement chain, premium waterfall, reinsurance tower, chain of security, capital chain, IBNR iceberg).

Every lesson has worked numeric examples, a key-point summary, and a "test your knowledge" quiz (pass at 70%+). Acronyms are avoided or defined where first used, and the glossary explains every market term in plain English. Progress and awards are saved on your device (browser local storage) — no account, no server.

## Run it

It's a fully static site — no build step, no dependencies.

```bash
cd london-market-insurance
python3 -m http.server 8000
# open http://localhost:8000
```

Or host it anywhere static (GitHub Pages works out of the box: Settings → Pages → deploy from branch).

## Install on iPhone / iPad

1. Open the hosted URL in **Safari**.
2. Tap the **Share** button → **Add to Home Screen**.
3. Launch from the home-screen icon — it runs full-screen like a native app and works offline after first load (service-worker cached).

## Structure

```
index.html              app shell (iOS web-app meta, tab bar)
css/style.css           iOS-style design system, light + dark mode
js/app.js               router, quiz engine, progress, achievements
js/content/*.js         course content (one file per module) + glossary
sw.js                   offline cache
manifest.webmanifest    installability
icons/                  app icons
```

To add or edit content, edit the module files in `js/content/` — lessons are plain HTML strings and quiz questions are simple objects (`mc` multiple-choice or `num` numeric with tolerance).
