# FocusBoard — Antigravity Build Brief

## Mission
Build a polished, responsive, single-user task dashboard named **FocusBoard** using React + Vite (preferred) or Next.js. The result must be a working frontend, not a static mockup. Use the assessment PDF as the functional source of truth.

**Important design instruction from the candidate:** Do not reproduce the visual design of the supplied Figma references. Create a distinct, original visual identity using one of the alternative design directions in this pack. Keep the required screens, information architecture, task fields, interactions, responsive behavior, and carousel content requirements. This intentionally trades some Figma pixel-fidelity marks for originality; the assignment rubric allocates 20/100 marks to Figma fidelity, so make the visual divergence deliberate rather than accidental.

## Read these files first
1. `01_SOURCE_REQUIREMENTS.md` — requirements transcribed and organized from the 4-page assignment PDF.
2. `02_FIGMA_REFERENCE_LINKS.md` — all six frame links and the parent Figma file link extracted from the PDF.
3. `03_DESIGN_DIRECTION_A_EDITORIAL.md` — recommended original design direction.
4. `04_DESIGN_DIRECTION_B_DARK_STUDIO.md` — alternative visual direction.
5. `05_DESIGN_DIRECTION_C_WARM_PLANNER.md` — alternative visual direction.
6. `06_COMPONENTS_AND_INTERACTIONS.md` — component architecture and behavior.
7. `07_ACCEPTANCE_TESTS.md` — testable completion checklist.
8. `08_HANDOFF_README_TEMPLATE.md` — final project README outline.
9. `09_AI_USAGE_TEMPLATE.md` — required AI disclosure structure.

## Recommended implementation choice
- React + Vite + TypeScript.
- React hooks and Context or a small reducer for the single source of truth. Do not add a state library unless it materially simplifies the app.
- Plain CSS Modules or a well-organized global CSS system. Avoid prebuilt dashboard templates.
- `localStorage` persistence with a versioned key and safe parsing.
- Lucide icons (or another consistent icon set) only where they improve clarity.

## Build sequence
1. Inspect all Figma frames manually using the links in `02_FIGMA_REFERENCE_LINKS.md`. The automated browser may not be able to render Figma; if so, open them in a browser where the candidate has access. The PDF describes the frame intent but does not expose all slide copy or pixel-level styling.
2. Scaffold the app and define the task model.
3. Implement persistence and task mutations before building derived UI.
4. Build the responsive shell and dashboard.
5. Build create/edit form, search, status tabs, priority filter, delete confirmation, and status changes.
6. Implement the three-slide Focus Notes carousel. Obtain the exact slide text and treatment from the Figma file; do not invent replacement copy while claiming it is Figma content.
7. Test at 390px, 768px, and 1440px.
8. Add README, AI_USAGE, screenshots, and deployment instructions.

## Non-negotiable quality rules
- Every visible control must work, or be clearly marked as a non-functional placeholder in README.
- Never hardcode statistics; derive them from the task array.
- Never mutate React state directly.
- Search and filters must compose (not overwrite one another).
- Sample data must only initialize an empty store; it must not overwrite saved tasks.
- Do not create extra product screens beyond the assessment scope.
- Use semantic HTML, visible focus styles, accessible labels, and keyboard-operable controls.
- Keep the code explainable: the candidate must be able to explain the state model and make a small live change.
