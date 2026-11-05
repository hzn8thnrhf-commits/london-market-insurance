# The Slip

A pocket course in London Market insurance, built as an iPhone web app and designed for the iPhone Duo. You can add it to your home screen, and it works offline.

## What is in the course

The course is written as a British textbook: each module opens with learning outcomes, and each lesson has flowing explanations with key terms in bold, a “think of it like this” analogy, worked examples, “Be aware” notes on common pitfalls, “Consider this” questions with answers you can reveal, and key points to finish.

| Part | Modules |
| --- | --- |
| 1 · The market | The London Market · Who’s who · Inside Lloyd’s |
| 2 · Writing the business | Placing a risk · Law and principles · Delegated authority · Classes of business · Claims |
| 3 · Reinsurance | Reinsurance · Treaty underwriting |
| 4 · Running an insurance business | The numbers · Business planning · Portfolio management · MGAs and multiple carriers |
| 5 · The market today | Regulation, tax and sanctions, global reach, digital change, emerging risks |

In total: 15 modules, 85 lessons (about nine hours of reading), 107 quiz questions with explanations, 169 glossary terms and 45 figures.

The most detailed topics are **business planning** (strategy and risk appetite, the premium and loss ratio plans, gross to net, capital and return, planning at Lloyd’s, monitoring and remediation), **portfolio management** (technical price and rate adequacy, accumulation and catastrophe, diversification, steering the mix, reinsurance as a portfolio tool, governance), and **MGAs with multiple carriers** (the business model, finding capacity, panels, splits and fronting, the MGA plan as the MGA and each carrier see it, binder economics and profit commission, alignment of interest, and managing a portfolio across carriers). **Treaty underwriting** covers submissions, assessing the cedant, pricing proportional and excess of loss treaties, catastrophe pricing, wordings, the renewal season, claims and run-off.

## Features

- **Learn:** modules grouped into parts, learning outcomes, lessons with figures, and a mind map for every module plus a course map.
- **Practice:** module quizzes, a 10-question quick-fire quiz, a **Revise your mistakes** quiz built from every question you have answered wrongly, and flashcards that bring back the terms you miss.
- **Search:** the Glossary tab searches lesson text as well as terms, with highlighted snippets.
- **Lab:** a slip builder (written lines and signing down), an excess of loss layer tower and a combined ratio calculator.
- **Reading:** a text size setting, and San Francisco, the iPhone’s own font, throughout. The app loads no web fonts.
- **Progress:** shown on the home screen as a London slip, with each module stamped once you finish it. Progress is stored in the browser on your device (`localStorage`).

## Designed for the iPhone Duo

On the 5.4-inch cover screen the app works like a normal iPhone app. Unfold it and it opens like a book: a left page and a right page, with the gap between them on the fold, so no text sits on the crease.

- In a lesson, its figures sit on the left page beside the text, followed by the module’s lesson list.
- In a quiz, the question sits opposite its answers.
- In the Lab, the controls are on the left and the results on the right.
- Mind maps fill both pages, with their trunk running down the fold and lessons branching off either side.

Folding or unfolding keeps your place, and figures redraw their arrows to fit. Other phones, iPads and desktop browsers get the same layouts at their own widths.

## Put it on your iPhone

The app is plain static files, so any static host works. With GitHub Pages:

1. In the repository on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch and `/ (root)`, and save.
3. After a minute, open the Pages URL (`https://<your-username>.github.io/london-market-insurance/`) in **Safari** on your iPhone.
4. Tap **Share → Add to Home Screen**. On an iPhone Duo you can do this folded or unfolded; the installed app adapts as you fold.

It then opens full screen like a native app and works without a connection after the first visit. GitHub Pages on a private repository needs a paid GitHub plan; otherwise make the repository public or use another static host such as Netlify or Cloudflare Pages.

## Run it locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Project layout

| Path | What it is |
| --- | --- |
| `index.html` | App shell and iOS home-screen metadata |
| `css/app.css` | All styles, with light and dark themes |
| `js/course.js` | The parts of the course and the order of modules |
| `js/modules/m01.js` … `m15.js` | One file per module: outcomes, lessons and quiz |
| `js/glossary.js` | Glossary entries (also the flashcard deck) |
| `js/figures.js` | Lesson figures as plain data |
| `js/app.js` | Routing, progress, quizzes, flashcards, search, figures, mind maps and Lab tools |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest`, `icons/` | Install metadata and icons |
| `scripts/make-icons.mjs` | Renders `icons/icon.svg` to PNGs (needs Playwright) |
| `scripts/build-artifact.mjs` | Inlines everything into one HTML fragment in `dist/` |

### Editing content

Each module is a plain data file in `js/modules/`. Module ids are stable because they key saved progress; the numbers shown in the app come from the order in `js/course.js`. A lesson body is a list of blocks: strings are paragraphs (`**bold**` and `*italic*` work), and objects add headings, lists, definition lists, analogies (`analogy`), worked examples (`example`), notes (`note`), pitfalls (`aware`), questions with answers (`think`), tables, timelines, figures (`fig`) and links to Lab tools. Each lesson also lists its `keys`, the ideas shown on the mind maps.

Figures are described in `js/figures.js`: diagrams of boxes and arrows (`graph`), stacked bars (`bars`), timelines, layer towers (`stack`), waterfalls, line charts and a 2 × 2 matrix (`quadrant`). The comment at the top of that file explains the options. Chart colours use a categorical palette checked for colour-blind separation and contrast in both light and dark mode.

When you change any app file, bump `VERSION` in `sw.js` so installed copies pick up the update.

## A note on accuracy

The content reflects market practice and law as generally understood at the time of writing, and figures marked as illustrative use invented numbers chosen to teach. The Slip is a learning aid, not legal or professional advice. Market practice, figures and regulations change, so check current sources before relying on a detail at work.
