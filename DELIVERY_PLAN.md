# Release Audit Plan

Updated: 2026-07-12

## Release rule

The landing is not ready for public release until every P0 item is closed and
the validation gate is passed. Approved public wording, the mission structure,
and the research block are preserved; corrections must improve precision and
accessibility rather than remove meaningful content.

## P0 — Release blockers

### 1. Research claims and teen-facing language — in progress

- [x] Verify the published statistics against the two supplied source documents.
- [x] Separate the working base (`N=82`) from the analytic subsample (`n=77`).
- [x] Mark the mediation result as exploratory: the indirect effect is not
  statistically confirmed in the supplied article.
- [x] Replace diagnostic or causal public wording that is not supported by the
  supplied documents.
- [ ] Obtain an approved public research reference or publication URL for the
  quantitative claims. Do not publish private participant material.

### 2. Privacy and data-processing disclosure — blocked on app-side materials

- [x] Remove landing claims that imply an already documented collection,
  retention, consent, or teacher-view workflow.
- [x] Check the linked application for public privacy and terms pages: the code
  contains consent and deletion mechanics, but no publishable `/privacy` or
  `/terms` page was found on 2026-07-13.
- [ ] Verify the application privacy notice, terms, retention/deletion rules,
  responsible contact, and minor-consent process with the application team.
- [ ] Add only approved public links and wording after that verification.

## P1 — Required before release

### 3. Accessibility and semantic structure — in progress

- [x] Restore the `main` / `footer` landmark boundary and add a skip link.
- [x] Replace the low-contrast focus treatment with a visible dual-ring focus state.
- [ ] Add accurate captions and text transcripts for every RU and EN video/audio item.

### 4. Media integrity — pending

- [ ] Confirm RU/EN media pairing, duration, editorial scope, and file sizes.
- [ ] Optimise or replace assets only after editorial confirmation; do not delete
  language assets on the basis of duration alone.

### 5. Legal footer — in progress

- [x] Remove the unsupported MIT licence statement and broken link.
- [ ] Add an approved legal/privacy destination once it exists.

### 6. Reproducible release verification — pending

- [ ] Define the applicable static checks for this dependency-free landing.
- [ ] Verify RU/EN, light/dark, desktop/mobile, keyboard focus, anchors, media,
  and browser console.

## P2 — Publication polish

- [x] Localise document title, description, theme-toggle accessibility text, and
  language URL state.
- [x] Make the research diagram responsive without hidden horizontal overflow.
- [ ] Add approved canonical, Open Graph, social preview, icons, and sitemap metadata.
- [ ] Review project instructions and ignored planning files for intentional tracking.

## Evidence record used for P0.1

- `Статья_по_базе_анализ_v6.docx`: working base `N=82`; correlations and
  cluster table use `n=77`; clusters are 23, 35, and 19; `r_s=0.590`;
  `R²=0.293`; the mediation indirect-effect confidence interval crosses zero.
- `ZPAteam From Statistics to Personality in Real Time Work Design Repor(РУ).docx`:
  the additional study reports `N=174`, ages 17–61, with the lowest reported
  indicator values in the 17–23 group.
