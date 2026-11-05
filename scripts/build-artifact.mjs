// Inlines the app into a single HTML fragment (no <html>/<head>/<body>), for hosts that
// wrap the page in their own document skeleton. Usage:
//   node scripts/build-artifact.mjs [output-path]
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2] || path.join(root, "dist/the-slip.html");
const read = (p) => readFile(path.join(root, p), "utf8");

const [html, css, content, glossary, figures, app] = await Promise.all([
  read("index.html"),
  read("css/app.css"),
  read("js/content.js"),
  read("js/glossary.js"),
  read("js/figures.js"),
  read("js/app.js")
]);

const body = html.split("<!-- app:start -->")[1].split("<!-- app:end -->")[0].trim();
const guard = (js) => js.replace(/<\/script/gi, "<\\/script");

const page = `<title>The Slip</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
${css}
</style>
${body}
<script>window.SLIP_ARTIFACT = true;</script>
<script>
${guard(content)}
</script>
<script>
${guard(glossary)}
</script>
<script>
${guard(figures)}
</script>
<script>
${guard(app)}
</script>
`;

await import("node:fs/promises").then((fs) => fs.mkdir(path.dirname(out), { recursive: true }));
await writeFile(out, page);
console.log(`wrote ${out} (${(page.length / 1024).toFixed(0)} KB)`);
