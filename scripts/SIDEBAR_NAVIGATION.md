# Localized sidebar

`sidebars.structure.ts` defines the shared hierarchy approved in Chinese.
`sidebar-labels.json` supplies the 37 explicit navigation labels for each of
the eight locales. `sidebars.ts` applies those labels and locale URL prefixes.
Page titles/first headings are not used as navigation labels.

Each folder category links to its landing document and has a separate toggle.
Do not repeat that landing document among its children. Keep the six-/fifteen-
tracker tutorials and all canonical doc IDs when reorganizing the hierarchy.
When adding a category, update the shared structure and every locale's label
map. The old Dhub `navigation.json` is retained for its separate tooling but no
longer determines the published sidebar.

`node scripts/check-sidebars.mjs` checks that every default-locale document has
exactly one translated navigation entry, categories have localized landing
links and independent toggles, and all directory links have a target. It also
compares the Chinese sidebar with the reviewed structure. Run this after a
complete multilingual build, together with `check-internal-links.mjs`.
