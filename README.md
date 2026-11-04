# The Slip

A pocket course in London Market insurance, built as an iPhone web app. You can add it to your home screen and it works offline.

- **Learn:** 11 modules and 50 short lessons, from Lloyd’s coffee-house origins to reinsurance, claims, the Insurance Act 2015 and the market today. Every lesson has a “think of it like this” analogy, worked examples and key takeaways.
- **Practice:** 72 quiz questions with explanations, a 10-question quick-fire mode, and 120 flashcards that bring back the terms you miss.
- **Glossary:** searchable definitions of market jargon, each linked to its module.
- **Lab:** three interactive tools: a slip builder (written lines and signing down), an excess of loss layer tower, and a combined ratio calculator.

It is designed for the **iPhone Duo**. On the 5.4-inch cover screen it works like a normal iPhone app. Unfold it and the app opens like a book: a left page and a right page, with the gap between them on the fold, so no text sits on the crease. For example, a lesson's outline stays on the left while you read on the right, a quiz question sits opposite its answers, and the Lab tools put the controls on the left and the results on the right. Folding or unfolding mid-lesson keeps your place. Other phones, iPads and desktop browsers get the same layouts at their own widths.

Your progress shows on the home screen as a London slip, with each module stamped once you finish it. Progress is stored in the browser on your device (`localStorage`).

## Put it on your iPhone

The app is plain static files, so any static host works. With GitHub Pages:

1. In the repository on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute, open the Pages URL (`https://<your-username>.github.io/london-market-insurance/`) in **Safari** on your iPhone.
4. Tap **Share → Add to Home Screen**. On an iPhone Duo you can do this folded or unfolded; the installed app adapts as you fold.

It then opens full screen like a native app, and works without a connection after the first visit.

GitHub Pages on a private repository needs a paid GitHub plan. Otherwise, make the repository public or use another static host such as Netlify or Cloudflare Pages.

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
| `js/content.js` | Modules, lessons and quizzes |
| `js/glossary.js` | Glossary entries (also the flashcard deck) |
| `js/app.js` | Routing, progress, quizzes, flashcards and Lab tools |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest`, `icons/` | Install metadata and icons |
| `scripts/make-icons.mjs` | Renders `icons/icon.svg` to PNGs (needs Playwright) |
| `scripts/build-artifact.mjs` | Inlines everything into one HTML fragment in `dist/` |

### Editing content

Lessons live in `js/content.js` as plain data. A lesson body is a list of blocks: strings are paragraphs (`**bold**` works), and objects add headings, lists, definition lists, analogies, worked examples, notes, tables, timelines and links to Lab tools. The comment at the top of the file lists every block type.

When you change any app file, bump `VERSION` in `sw.js` so installed copies pick up the update.

## A note on accuracy

The content reflects market practice and law as generally understood at the time of writing. It is a learning aid, not legal or professional advice. Market practice, figures and regulations change, so check current sources before relying on a detail at work.
