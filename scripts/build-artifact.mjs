// Inlines the app into a single HTML fragment (no <html>/<head>/<body>), for hosts that
// wrap the page in their own document skeleton. Scripts are inlined in the order index.html loads them.
// Usage: node scripts/build-artifact.mjs [output-path]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2] || path.join(root, "dist/the-slip.html");
const read = (p) => readFile(path.join(root, p), "utf8");

const html = await read("index.html");
const css = await read("css/app.css");
const body = html.split("<!-- app:start -->")[1].split("<!-- app:end -->")[0].trim();
const srcs = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const missing = srcs.filter((s) => !existsSync(path.join(root, s)));
if (missing.length) throw new Error(`index.html loads missing files: ${missing.join(", ")}`);
const guard = (js) => js.replace(/<\/script/gi, "<\\/script");
const scripts = [];
for (const src of srcs) scripts.push(`<script>\n${guard(await read(src))}\n</script>`);

const page = `<title>The Slip</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
${css}
</style>
${body}
<script>window.SLIP_ARTIFACT = true;</script>
${scripts.join("\n")}
`;

await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, page);
console.log(`wrote ${out} (${(page.length / 1024).toFixed(0)} KB, ${srcs.length} scripts)`);
