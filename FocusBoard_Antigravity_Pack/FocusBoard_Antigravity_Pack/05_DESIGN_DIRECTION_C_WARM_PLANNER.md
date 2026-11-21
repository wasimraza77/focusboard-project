# Design Direction C — Warm Paper Planner

## Concept
A tactile digital planner that borrows from paper notebooks, index cards, and desk stationery. The dashboard should feel friendly and personal without looking childish.

## Visual identity
- Background: parchment `#F2EBDD`.
- Paper surfaces: `#FFFCF5`.
- Text: dark umber `#332D27`.
- Muted text: `#82786D`.
- Accent: forest `#3F6B52`.
- Secondary accent: brick `#B65E48`.
- Highlight: pale butter `#F3D98B`.
- Typography: humanist sans-serif for UI, sturdy slab-serif or rounded display face for headings.
- Use subtle paper-like texture only if it does not reduce contrast or performance.
- Use 1px warm borders, small corner radii (8–12px), occasional ruled dividers.

## Layout proposal
- Desktop uses a “planner spread”: left navigation column, broad central task page, and narrow right-side note column.
- Page heading resembles a dated planner entry.
- Summary is a single “weekly progress” block with a hand-drawn-style progress line (CSS only; do not use inaccessible decorative SVG text).
- Task list uses index-card rows with a small category marker and clear status action.
- Focus Notes becomes a rotating “margin note” card with slide dots and previous/next buttons.
- Create/edit form resembles a paper sheet with labeled fields and a sticky action footer.
- Mobile turns the planner spread into one vertical column; navigation becomes a bottom bar.

## Interaction details
- Use color sparingly for category and priority.
- Keep all controls conventional and predictable despite the tactile styling.
- Ensure contrast meets WCAG AA for normal text.
- Avoid handwriting fonts for body copy or form labels.
