# Legacy anchor compatibility

Compatibility `<span id="..." class="legacy-anchor-alias">` elements live in
the Markdown/MDX source, next to their target headings. They are rendered by
both the server and client. Do not insert nodes into built HTML after SSG:
that changes the React tree and causes hydration errors on direct page loads.

`legacy-anchor-aliases.json` records original migration aliases;
`compiled-anchor-aliases.json` records the additional aliases previously
inserted by the post-build script, including local fragment repairs in all
eight locales. These files are read-only regression fixtures, not HTML writers.
When adding a new compatibility ID, put it in the appropriate source file and
add its ID/page to the fixtures. If the heading already supplies that ID, do not
add a second span. Preserve existing IDs when translating or renaming headings.

`npm run build` and `deploy.sh` check compatibility IDs, HTML integrity and
internal links. `check-anchor-aliases.mjs` never modifies output files.

The `stable-ssg` plugin uses React 18's Web Streams server renderer to avoid
UTF-8 corruption in `renderToPipeableStream` (React issue #31134). It only
aliases Docusaurus's server renderer, leaving browser bundles unchanged.
Keep this workaround until a dependency upgrade is verified with multilingual
HTML integrity, link and hydration checks. Do not strip NUL/replacement bytes
from generated HTML: corrupted text must instead be regenerated correctly.

## Hydration regression check

`scripts/check-hydration.mjs` runs the production bundles against all built
documentation pages in jsdom. It checks recoverable React errors and confirms
that aliases survive hydration. A positive control deliberately changes the
Chinese home page HTML and must trigger a hydration error first. This is a DOM
regression check, not a substitute for visual checks in a real browser.

The optional test dependency can be installed outside the project dependency
tree with `npm install --prefix scratch/anchor-validation --no-package-lock jsdom@24`.
Set `JSDOM_MODULE_URL` to the file URL of that installation's
`node_modules/jsdom/lib/api.js`, then run `node scripts/check-hydration.mjs`
from the repository root after building. No external resources are fetched
while running the check.

Avoid self-closing non-void HTML elements such as `<a />` in `.md` files.
Keep carousel CSS in `src/css/steamvr-carousel.css` rather than a literal MDX
`<style>` body: quoted CSS selectors can be HTML-escaped by SSR but interpreted
as raw text by the browser, causing hydration mismatches.
