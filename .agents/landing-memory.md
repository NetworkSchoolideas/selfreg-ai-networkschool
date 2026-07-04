# Landing Memory

- Public landing only: no technical implementation details, internal routes, demo mechanics, QA notes, or workflow descriptions in visible copy.
- Preserve approved semantic structures and wording whenever they already exist, especially the mission block and research logic.
- Treat the current platform as the baseline, not as draft material to overwrite. Every next change must be an incremental quality improvement over the existing version.
- No regression is acceptable in wording, structure, research logic, or public narrative. If a redesign weakens the text or removes a meaningful block, it is a failed change even if the visuals look cleaner.
- Before replacing a block, compare it against the current version and state what improves: readability, hierarchy, maturity, contrast, responsiveness, or publication readiness.
- Do not simplify by deletion when a working public block already carries meaning; improve layout, hierarchy, and readability first.
- After every visual edit, verify contrast on the real rendered background in both RU and EN versions. Dark theme is a separate release gate, not an optional check. Any unreadable text on translucent, image-backed, or dark cards is a blocking regression. Light panels must always force dark text, and dark panels must use high-contrast text tokens.
- Hybrid diagrams and embedded light panels must isolate their own component styles; their cards, badges, and captions must not inherit global dark-card backgrounds in dark theme.
- Treat duplicate meaning across sections as a blocking issue. If a point is already stated clearly once, reorganize instead of repeating it.

## Next Work Priority

1. Start with typography reset, not content rewrite: remove the overly heavy public display feel, reduce heading weights/sizes, preserve approved text.
2. Rebuild mission layout without changing wording: current eight ideas are semantically correct, but the narrow card grid makes them look immature.
3. Then quiet the visual system: fewer badge-like numbers, softer cards, calmer shadows, less bright CTA dominance.
4. Only after those changes run RU/EN browser QA and compare against the current committed baseline.
