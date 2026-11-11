# The Slip

A step-by-step course in London Market insurance, built as an iPhone web app and designed for the iPhone Duo. You can add it to your home screen, and it works offline.

## How it teaches

Each chapter is a short run of steps. A step makes one point: a few sentences, and a picture that shows it. Most steps then do one of two things:

- **Ask first.** A question you answer before the explanation appears, so you commit to a view and then see why it holds or doesn’t.
- **Let you move something.** A slider or switch wired to the picture, used only where changing a number is the clearest way to see the idea: how a pool of risks steadies as it grows, what a retention does to a bad year, why “1 in 200” is not “never”.

Every chapter ends with a five-line recap. Progress is saved on your device, and the home screen takes you back to where you stopped.

## What it covers

The course follows the three London Market syllabuses of the Chartered Insurance Institute, written afresh in plain English with its own examples, then applies them to one business: an MGA managing a portfolio for several carriers.

| Part | Chapters |
| --- | --- |
| **LM1** · London Market insurance essentials | Risk and insurance · Legal principles · Classes of business and reinsurance · The insurance cycle · The London Market · Regulation · Sanctions, data and financial crime · Broking and placing |
| **LM2** · Principles and practices | Reinsurance methods · Market security · Law, consumers and tax · Intermediaries · Underwriting · Conduct of business · Delegated underwriting · Claims |
| **LM3** · Underwriting principles | The market framework · Contracts and wordings · Risk appetite and capital · Building the business plan · Reading the accounts · Statistics for underwriters · Pricing a risk · Exposure and accumulation · Writing and distributing business |
| **MGA** · Portfolio management for an MGA | The MGA and its carriers · Managing the book across carriers · Reporting, renewal and resilience |

In total: 28 chapters, 237 steps, 117 predict-first questions, 80 interactive models and a searchable glossary of 169 terms.

## Designed for the iPhone Duo

Unfolded, the app opens like a book. The picture sits on the left page with its running explanation; the text, question and controls sit on the right page, with Back and Next at your thumb. The gap between the pages lies on the fold, so nothing is printed on the crease. You move a slider on one page and watch the effect on the other.

Folded, and on other phones, the picture stays pinned at the top while the text and controls scroll beneath it. Folding or unfolding keeps your place. Swipe left or right to change step.

The app uses the iPhone’s own fonts, follows light and dark mode, and loads nothing from the network after the first visit.

## Put it on your iPhone

The app is plain static files, so any static host works. With GitHub Pages:

1. In the repository on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch and `/ (root)`, and save.
3. After a minute, open the Pages URL in **Safari** on your iPhone.
4. Tap **Share → Add to Home Screen**.

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
| `js/kit.js` | The small set of picture builders the chapters share: bars, columns, line plots, waterfalls, flow diagrams, stat tiles |
| `js/chapters/c01.js` … `c28.js` | One file per chapter |
| `js/glossary.js` | Glossary entries |
| `js/app.js` | Routing, progress, the step player and the glossary |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest`, `icons/` | Install metadata and icons |
| `scripts/build-artifact.mjs` | Inlines everything into one HTML file |

### Editing content

A chapter has an `id`, a `part` (`LM1`, `LM2`, `LM3` or `MGA`), a `title`, a `blurb`, `minutes`, starting values for its controls in `init`, and a list of `steps`. Chapter ids key saved progress, so keep them stable.

A step has a heading `h`, text `say`, and a `scene` function that returns the picture for the current values. It may add an `ask` (question, options, the index of the right answer and the explanation), `ctl` (sliders with a range and step, or a set of options), and `live`, a sentence or two that changes with the controls. Text can use `**bold**` and `*italic*`, and a blank line starts a new paragraph.

When you change any app file, bump `VERSION` in `sw.js` so installed copies pick up the update.

## A note on accuracy

The structure of the first three parts follows the CII study texts for LM1, LM2 and LM3, and the MGA part goes beyond them; the words, examples and numbers are The Slip’s own, and figures in the models are invented to teach. Law and regulation change, and some limits and rates in older editions of the texts have since moved. The Slip is a learning aid, not legal or professional advice, and not a substitute for the current study text if you are sitting an exam.
