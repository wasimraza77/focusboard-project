# AI Usage Disclosure

## Tools Used
- **Antigravity AI Assistant** (Claude / Gemini powered)

---

## Representative Prompts

1. *"Read all 10 Markdown files in this project carefully before writing any code. Follow 00_ANTIGRAVITY_START_HERE.md as the primary implementation instruction. Use Design imitate the actual provided figma link below: https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-%E2%80%94-Dashboard-References?node-id=0-1&p=f"*
2. *"Inspect the Figma design thumbnail and extract exact copy for the three Focus Notes slides, the 3 stat overview cards, the status pills, priority pills, and task list layout."*
3. *"Write a comprehensive Vitest test suite testing all functional acceptance criteria in 07_ACCEPTANCE_TESTS.md, including localStorage persistence, task mutations, and composite search/status/priority filtering."*

---

## AI-Assisted Areas

1. **Figma Reference Extraction**:
   - Downloaded and decoded the public Figma thumbnail metadata to inspect the exact layout, colors, typography, and slide copy:
     - Slide 1: *"Make today count."* / *"A little focus goes a long way."* (01 / 03)
     - Slide 2: *"Small steps, big progress."* / *"Keep your momentum going."* (02 / 03)
     - Slide 3: *"Celebrate the wins."* / *"Every finished task moves you forward."* (03 / 03)
     - Exact Overview Cards: *Total tasks* (12), *In progress* (5), *Completed* (7).

2. **Architecture & State Management**:
   - Scaffolded the React + TypeScript structure using `useReducer` + Context.
   - Designed the composite filtering predicate composing search query, status tabs, and priority dropdown.
   - Handled storage hydration and guarded against sample data overwriting saved data.

3. **Styling & Responsive Design**:
   - Authored `globals.css` design tokens and `app.css` responsive layout for 1440px desktop, 768px tablet, and 390px mobile screens.

4. **Testing & Quality Assurance**:
   - Built the Vitest test suite (`acceptanceTests.test.tsx`) covering 16 verification scenarios.

---

## Human Review — Suggestion Checked, Corrected, or Rejected

### Corrected: `localStorage` Hydration Overwriting Saved Empty State
- **Initial AI Pattern**:
  The initial `loadTasks` helper checked:
  ```ts
  if (Array.isArray(parsed) && parsed.length > 0) {
    return parsed;
  }
  return sampleTasks;
  ```
- **Correction Applied**:
  If a user intentionally deletes all tasks from their board (leaving an empty array `[]`), refreshing the page would have re-seeded `sampleTasks` because `parsed.length > 0` was false.
  This was corrected so that any valid array in `localStorage` (including empty `[]`) is honored:
  ```ts
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed as Task[];
    }
  }
  return sampleTasks;
  ```
  This ensures sample data strictly acts as initial seed data and never overwrites user actions.

---

## Understanding and Verification

I confirm that I have reviewed all code, understand the state machine and component hierarchy, verified all acceptance criteria with an automated test suite, and can explain the implementation or make live changes on demand.
