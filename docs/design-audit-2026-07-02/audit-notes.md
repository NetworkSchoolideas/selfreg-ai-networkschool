# SelfReg AI Landing Design Audit

Date: 2026-07-02
Surface: local landing page, EN desktop/narrow browser state
Evidence: screenshots `01-desktop-hero.png` through `06-desktop-risks.png`

## Audit Scope

The audit covers the landing page presentation layer: navigation, hero, mission, model/research blocks, media/future areas, risk section, typography, contrast, and responsive behavior in the current local browser viewport.

Content is treated as approved source material. The goal is not to rewrite the project meaning, but to make the existing structure read as a mature product and research presentation.

## User Goal And Accessibility Target

The page must support public presentation before grants, competitions, and product review. A visitor should quickly understand what SelfReg AI is, why it matters, what the model stands on, and how the pedagogical role differs from a generic chatbot.

Accessibility target for this pass: readable contrast on real backgrounds, stable responsive reflow, non-overlapping text, clear hierarchy, and keyboard-visible controls. Full WCAG compliance still requires semantic and keyboard testing beyond screenshots.

## Strengths

1. The CSS rewrite created a single token system and removed the previous cascade conflict.
2. The approved mission text is present and not duplicated.
3. The research diagram is visually useful and should remain part of the page.
4. RU/EN switching and light/dark theme controls are visible and functional.
5. The page now has a coherent navy/teal/blue direction, even though the execution is not yet mature enough.

## UX Risks

1. **Navigation feels like a row of large app buttons.** On the captured viewport, each nav item has a heavy bordered pill. This makes the public site feel like a rough interface prototype instead of a polished landing.
2. **Hero lacks product confidence.** The first viewport is mostly empty text on a pale background. The generated background is too muted to carry the section, while the supporting product visual is hidden on narrower screens.
3. **Mission becomes a long wall.** The mission statement and all key ideas use the same dark-card language. Strong formulations lose priority because every idea competes at the same visual weight.
4. **Too many repeated cards.** Problem, mission, model, evidence, future, and risks all rely on similar rectangular cards. This creates a template feeling and weakens trust.
5. **Research is not editorially organized.** The evidence image is important, but the surrounding statistics, cluster profiles, and interpretation still read as stacked UI blocks rather than a clear research exhibit.
6. **Typography feels heavy.** Headings and card titles often use high weight and large scale. On a dense academic/product page this creates a student-prototype feel.
7. **Mobile/narrow desktop state is not intentionally designed.** Several sections simply collapse into vertical cards, which preserves layout but not hierarchy.

## Accessibility Risks

1. **Contrast depends on background images.** Text often sits on semi-transparent surfaces or image-backed bands. Every visual change must be checked against the actual rendered background.
2. **Horizontal nav requires careful keyboard and scroll testing.** The nav is scrollable on narrow widths, but screenshot evidence cannot confirm focus visibility and discoverability.
3. **Dense cards increase cognitive load.** Many similarly weighted panels make scanning difficult, especially for users who zoom text or read through assistive technology.
4. **Small chart labels may be unreadable.** The research diagram is useful visually, but its labels are too small in narrow browser states.

## Opportunity Areas

1. Replace the button-like navigation with a calmer product header: compact text links, active underline, smaller language/theme controls.
2. Rebuild hero as an editorial product opening: stronger title block, one primary CTA, one secondary anchor, and a restrained visual proof panel that remains visible on tablet/narrow desktop.
3. Convert mission from equal cards into an editorial system: mission statement, grouped principles, and one featured closing idea.
4. Convert research into a real evidence module: figure, compact metrics, cluster profiles, and interpretation in distinct visual roles.
5. Reduce card repetition by using bands, lists, tables, callouts, and feature rows where appropriate.
6. Lower typographic weight and tighten spacing to create a more serious research/product tone.

## Recommendations

1. **Design package direction: "Mature research product."**
   Use a restrained editorial layout: fewer filled cards, clearer white/dark bands, structured evidence panels, and consistent typographic scale.

2. **Immediate implementation priority.**
   First redesign the visible system shared across the page: navigation, hero, mission cards, and research blocks. These are the parts most responsible for the immature impression.

3. **Do not change approved content during this pass.**
   Keep `index.html` and `i18n.js` text stable except for structural markup needed for better layout. Avoid new public claims and avoid technical/internal language.

4. **QA rule.**
   Every visual edit must be checked in the browser on the real background. Text contrast and line separation are blocking issues, not polish.

## Step Notes

1. `01-desktop-hero.png` - Health: weak. The hero is readable but visually underpowered and generic.
2. `02-desktop-mission.png` - Health: mixed. The text is strong, but the structure turns it into a long dark stack.
3. `03-desktop-model.png` - Health: mixed. Individual cards are readable, but the repeated pattern weakens hierarchy.
4. `04-desktop-research.png` - Health: weak. Research material is present, but the section still reads as generic cards.
5. `05-desktop-media-future.png` - Health: acceptable structure, weak polish. The steps are readable but too plain.
6. `06-desktop-risks.png` - Health: mixed. The evidence figure helps, but the surrounding section needs stronger editorial framing.
