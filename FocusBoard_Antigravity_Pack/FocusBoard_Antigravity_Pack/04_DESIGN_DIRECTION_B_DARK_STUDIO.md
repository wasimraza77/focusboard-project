# Design Direction B — Dark Studio / Focus Console

## Concept
A high-contrast, immersive workspace for people who prefer a focused, dark interface. The visual language is closer to a creative studio console than a standard task-management dashboard.

## Visual identity
- Background: near-black blue `#10151C`.
- Main panels: `#18212B`.
- Raised surfaces: `#202C38`.
- Primary text: `#F1F4F6`.
- Muted text: `#9BA8B4`.
- Accent: electric cyan `#5ED6D1`.
- Secondary accent: soft violet `#A99AF7`.
- Warning/urgent: warm orange `#F2A65A`.
- Typography: geometric sans-serif throughout; use weight and scale rather than serif contrast.
- Use fine luminous borders sparingly, no excessive glow.
- Rounded geometry: 10–14px, tighter and more technical than Direction A.

## Layout proposal
- Header across the top with app name, current date, search, and quick-create action.
- A compact vertical navigation rail on desktop.
- Main area starts with a “Focus session” panel showing completion progress as a horizontal segmented meter.
- Metrics appear as a single compact strip rather than large cards.
- Focus Notes becomes a “Signal” carousel with a dark gradient panel and clear numbered pagination.
- Tasks appear in grouped lanes or a dense table-like list with strong row separators.
- On mobile, use a top app bar and bottom navigation; task rows become stacked panels.
- Create/edit form appears in a modal with clear field grouping and high-contrast input states.

## Motion
- Short 120–180ms transitions.
- Progress meter animates only when task data changes.
- No automatic carousel rotation.
- Respect reduced-motion preferences.

## Distinctiveness guardrails
- Do not reuse the Figma reference's light visual treatment.
- Do not copy its card composition or spacing.
- Maintain the same task data, required controls, and information hierarchy.
