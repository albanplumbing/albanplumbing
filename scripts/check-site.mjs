import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = process.cwd();
const htmlFiles = [];
const problems = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (path.includes(`${join(root, "node_modules")}`)) continue;
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (extname(path) === ".html") {
      htmlFiles.push(path);
    }
  }
}

function localTarget(url) {
  if (!url || url.startsWith("#")) return null;
  if (/^(https?:|mailto:|tel:|sms:|whatsapp:)/.test(url)) return null;
  const clean = url.split("#")[0].split("?")[0];
  if (!clean) return null;
  if (clean.endsWith("/")) return join(root, clean, "index.html");
  return join(root, clean);
}

walk(root);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  if (/[�]/.test(html) || /â€|â€¢|Â/.test(html)) problems.push(`${file}: encoding artifact found`);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const target = localTarget(match[1]);
    if (!target) continue;
    if (!existsSync(resolve(target))) problems.push(`${file}: missing ${match[1]}`);
  }
}

for (const required of ["sitemap.xml", "robots.txt", "assets/css/styles.css", "assets/js/main.js"]) {
  if (!existsSync(join(root, required))) problems.push(`missing ${required}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. Local links and assets look good.`);
