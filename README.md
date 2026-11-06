# The Slip

A pocket course in London Market insurance, built as an iPhone web app and designed for the iPhone Duo. You can add it to your home screen, and it works offline.

## How the lessons work

Every lesson is a diagram, not a page of text. A short introduction sets the question, and the diagram answers it:

- **Tap any box** to open an explanation written the way a university lecturer would talk you through it: what it is, why it matters, and often an analogy. The box lights up with its arrows and neighbours, and everything else fades back.
- **How it connects:** under each explanation, every arrow into or out of the box is listed with a sentence on why the two are linked. Tap one to jump to the box at the other end. Arrow labels in the diagram can be tapped too.
- **Walk me through it** steps through the diagram in teaching order with Back and Next. A gold dot marks each idea you haven’t opened; open them all and the lesson is stamped as learned.
- **Try it:** most lessons end with a model driven by sliders, with a live chart, a few headline numbers and a running explanation of cause and effect. Move a retention and watch who pays a loss; push claims inflation and watch a burning cost jump; lose an MGA’s biggest carrier and watch its fixed costs bite.

Some lessons have two diagrams, or two models, shown as tabs.

| Part | Modules |
| --- | --- |
| 1 · The market | The London Market · Who’s who · Inside Lloyd’s |
| 2 · Writing the business | Placing a risk · Law and principles · Delegated authority · Classes of business · Claims |
| 3 · Reinsurance | Reinsurance · Treaty underwriting |
| 4 · Running an insurance business | The numbers · Business planning · Portfolio management · MGAs and multiple carriers |
| 5 · The market today | Regulation, tax and sanctions, global reach, digital change, emerging risks |

In total: 15 modules and 85 lessons, built from 93 diagrams with 662 ideas to tap and 637 explained connections, 57 slider models, 107 quiz questions with explanations and 169 glossary terms.

The most detailed topics are **business planning** (strategy and risk appetite, the premium and loss ratio plans, gross to net, capital and return, planning at Lloyd’s, monitoring and remediation), **portfolio management** (technical price and rate adequacy, accumulation and catastrophe, diversification, steering the mix, reinsurance as a portfolio tool, governance), and **MGAs with multiple carriers** (the business model, finding capacity, panels, splits and fronting, the MGA plan as the MGA and each carrier see it, binder economics and profit commission, alignment of interest, and managing a portfolio across carriers). **Treaty underwriting** covers submissions, assessing the cedant, pricing proportional and excess of loss treaties, catastrophe pricing, wordings, the renewal season, claims and run-off.

## Features

- **Learn:** modules grouped into parts, learning outcomes, diagram lessons with models to try, and a mind map for every module plus a course map.
- **Practice:** module quizzes, a 10-question quick-fire quiz, a **Revise your mistakes** quiz built from every question you have answered wrongly, and flashcards that bring back the terms you miss.
- **Search:** the Glossary tab searches every explanation in the diagrams as well as the terms, with highlighted snippets.
- **Lab:** all 57 models from the lessons, grouped by module, plus a slip builder, an excess of loss layer tower and a combined ratio calculator.
- **Reading:** a text size setting, and San Francisco, the iPhone’s own font, throughout. The app loads no web fonts.
- **Progress:** shown on the home screen as a London slip, with each module stamped once you finish it. Progress is stored in the browser on your device (`localStorage`).

## Designed for the iPhone Duo

On the 5.4-inch cover screen the app works like a normal iPhone app. Unfold it and it opens like a book: a left page and a right page, with the gap between them on the fold, so no text sits on the crease.

- In a lesson, the diagram fills the left page and the explanation sits on the right page, so you tap on one side and read on the other. With nothing selected, the right page shows the introduction and a list of every idea in the diagram.
- In a model, the chart and the running explanation are on the left page and the sliders on the right, so you can watch the effect as you move the cause.
- In a quiz, the question sits opposite its answers.
- Mind maps fill both pages, with their trunk running down the fold and lessons branching off either side.

On the cover screen and other phones, the explanation rises from the bottom as a sheet with Back and Next at your thumb, and the diagram scrolls to keep the chosen box in view above it. A model’s chart stays pinned above its sliders.

Folding or unfolding keeps your place, and diagrams redraw their arrows to fit. Other phones, iPads and desktop browsers get the same layouts at their own widths.

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
| `js/modules/m01.js` … `m15.js` | One file per module: outcomes, diagram lessons and quiz |
| `js/explore.js` | The slider models (“Try it”) |
| `js/glossary.js` | Glossary entries (also the flashcard deck) |
| `js/app.js` | Routing, progress, the diagram and model engines, quizzes, flashcards, search, mind maps and Lab tools |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest`, `icons/` | Install metadata and icons |
| `scripts/make-icons.mjs` | Renders `icons/icon.svg` to PNGs (needs Playwright) |
| `scripts/build-artifact.mjs` | Inlines everything into one HTML fragment in `dist/` |

### Editing content

Each module is a plain data file in `js/modules/`. Module ids, and the order of lessons within a module, are stable because they key saved progress; the numbers shown in the app come from the order in `js/course.js`.

A lesson has a `title`, `minutes`, `keys` (the ideas shown on the mind maps), an `intro`, a `diagram` (or a list of diagrams, each with a `name` for its tab and its own `intro`), an optional `explore` model id (or list of ids), an optional `think` question and answer, and `takeaways`. Text can use `**bold**` and `*italic*`, and a blank line starts a new paragraph.

A diagram lays its boxes on a grid: `cols` sets the number of columns, and each node has an `id`, a grid position `at: [row, column]`, an optional `span`, a `label`, a short `sub`, a `tone` (`ink`, `tint`, `brass`, `good`, `bad` or `q`), its explanation `teach` and an optional analogy `like`. Edges join two node ids, with an optional short `label` and the explanation `teach` that appears under “How it connects”. Arrows are measured and drawn after layout; `fromSide`, `toSide`, `fromAt`, `toAt`, `bend` and `at` (where the label sits along the arrow) fine-tune awkward ones, and `gapX` widens the gap between columns when a sideways arrow carries a label. Diagrams are designed for a width of about 330 pixels, the phone and the unfolded Duo’s left page alike.

Models live in `js/explore.js`. Each has a `title`, a one-line `blurb` for the Lab, an `ask` that frames the question, `inputs` (sliders with a range, a step, a starting value and a unit, or a list of `values` for uneven steps), optional `presets`, and a `compute` function that returns headline `readouts`, a `chart` (horizontal bars, a waterfall, a line chart, a timeline or a 2 × 2 matrix) and an `insight` explaining what just happened. Chart colours use a categorical palette checked for colour-blind separation and contrast in both light and dark mode.

When you change any app file, bump `VERSION` in `sw.js` so installed copies pick up the update.

## A note on accuracy

The content reflects market practice and law as generally understood at the time of writing, and figures marked as illustrative use invented numbers chosen to teach. The Slip is a learning aid, not legal or professional advice. Market practice, figures and regulations change, so check current sources before relying on a detail at work.
