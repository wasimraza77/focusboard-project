# Design Direction A — Editorial / Productive Workspace (Recommended)

## Concept
A calm, editorial productivity workspace inspired by modern reading apps and premium note-taking tools. It should feel intentional and content-first, not like a conventional admin dashboard.

## Visual identity
- Canvas: warm off-white `#F6F5F1`.
- Main surfaces: white `#FFFFFF`.
- Ink: deep charcoal `#202522`.
- Muted text: `#777D76`.
- Accent: vivid persimmon `#E56B4A`.
- Secondary accent: muted sage `#A9B9A2`.
- Borders: soft stone `#E8E6DF`.
- Use restrained shadows; prefer thin borders and generous whitespace.
- Typography: expressive serif display face for page title and note headlines, paired with a highly readable sans-serif for UI and controls.
- Shape language: medium rounded cards (14–18px), pill status labels, simple 1px dividers.
- Avoid the Figma reference's exact palette, geometry, spacing, and dashboard composition.

## Layout proposal
### Desktop
- Narrow left rail with wordmark, icon navigation, and a small profile footer.
- Main content begins with a large editorial heading: “Make room for focused work”.
- A compact date/context line sits above the heading.
- Use one wide “Today at a glance” panel with the completion percentage as the dominant visual.
- Place two smaller metric tiles alongside or below it, not as a direct copy of the reference's stat-card arrangement.
- Focus Notes appears as a full-width “Field note” feature panel with a large typographic quote/title, subtle abstract illustration, and compact slide controls.
- Task workspace uses a two-column composition: primary task list and a narrow “Your filters” / “Priority queue” rail.
- Create/edit form opens in a centered modal or right-side drawer, not as a clone of the supplied form frame.

### Tablet
- Collapse the left rail into a top navigation strip.
- Metrics become a two-column grid.
- Task list remains full width; filter controls wrap to a second line.
- Form drawer becomes a full-width overlay panel.

### Mobile
- Use a compact top bar with wordmark and menu control.
- Navigation can become a bottom tab bar or accessible menu.
- Stack metrics vertically or in a 2-column compact grid.
- Task items become roomy cards with title, due date, priority, and a clear status control.
- Search and filters stack without horizontal overflow.
- Form uses a full-screen sheet with persistent bottom actions.

## Interaction details
- Accent color is reserved for primary actions and active states.
- Status colors: To do = cool slate, In progress = amber, Completed = sage/green. Pair color with text labels; never rely on color alone.
- Priority levels should be explicit text chips.
- Hover and focus states use subtle background shifts and visible outlines.
- Empty state should offer a clear “Create your first task” action.

## Do not do
- Do not reproduce the original Figma's exact sidebar, top bar, stat cards, task-row styling, carousel styling, or form layout.
- Do not add unrelated screens or features.
- Do not sacrifice legibility for decorative typography.
