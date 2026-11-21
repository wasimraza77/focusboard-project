# FocusBoard — Requirements Extracted from Assignment PDF

Source: `FocusBoard_Frontend_Trainee_Assignment.pdf` (4 pages). This document records the assignment's stated requirements, not additional assumptions.

## 1. Assignment overview (PDF page 1)
- Build a responsive, functional task dashboard from the current Figma reference.
- Use React or Next.js.
- Demonstrate frontend fundamentals, state management, working interactions, and attention to design.
- Timebox: 24 hours from receiving the task.
- Frontend only; no backend required.
- Public submission: live URL + GitHub.
- The PDF names three primary Figma frames:
  - Desktop dashboard, 1440 × 1000: sidebar navigation, header, overview statistics, task rows, search, filters, Focus Notes carousel.
  - Mobile dashboard, 390 × 1128: responsive layout, readable card content, navigation, touch-friendly task controls.
  - Create-task form, 760 × 822: title, description, status, priority, due date, create/cancel interactions.
- Deliverable must be functional. A static copy is insufficient; data and controls must update.
- Visual acceptance criteria:
  - Pixel-perfect UI as closely as practical: spacing, layout, typography, colors, card sizes, badges, radii, hierarchy.
  - Responsive at 390px, 768px, and 1440px; no horizontal overflow, overlapping controls, or unreadable forms.
  - Buttons, task forms, tabs, search, filters, and carousel navigation must work.

## 2. Functional implementation scope (PDF page 2)
### Project and task data
- Use React + Vite or Next.js, JavaScript or TypeScript, and reusable components.
- Provide at least six sample tasks.
- Every sample task has a unique ID, title, description, category, status, priority, and due date.

### Task operations
- Create task using the Figma form fields.
- Validate required title and show helpful error messages.
- Edit a task.
- Delete a task with appropriate confirmation before destructive changes.
- Support statuses: `To do`, `In progress`, `Completed`.
- Status changes must immediately update the dashboard.

### Search and filtering
- Case-insensitive title search.
- Status tabs.
- Priority filtering.
- Search, status, and priority filters must work together.

### Derived dashboard statistics
- Derive total tasks, in-progress count, completed count, and completion percentage from task data.
- Do not hardcode the values shown in the Figma.

### Focus Notes carousel
- Implement all three Figma Focus Notes slides.
- Previous/next controls must work.
- Show active-slide indicators.
- Responsive behavior is required.
- Displayed slide content must remain consistent with the Figma design.
- Automatic rotation is not necessary (PDF page 3).

### Persistence
- Save task updates in `localStorage`.
- Restore saved state after refresh.
- Sample data must not overwrite saved data.

### Accessibility
- Semantic markup.
- Accessible labels.
- Visible focus indicators.
- Keyboard-accessible navigation and form controls.

## 3. State-management expectations (PDF page 2)
- No specific state library is mandatory. React hooks/Context, Zustand, Redux Toolkit, or another sensible approach is acceptable.
- Explain the state-management choice in README.
- Maintain a single source of truth for task data across cards, rows, statistics, filters, and forms.
- Implement add/edit/delete/status mutations predictably without direct mutation.
- Derive counts, progress, search results, and filters automatically from current state.
- Track carousel active slide and keep the visible slide and indicators synchronized.
- Read and write browser storage safely, preserving work across refreshes.
- Technical scope excludes backend, account login, cloud database, and third-party task API.
- CSS, CSS Modules, and Tailwind are allowed.
- Avoid complete prebuilt dashboard templates.

## 4. Figma details and responsive behavior (PDF page 3)
- The three Focus Notes slides are part of the current Figma file.
- Implement their content and visual treatment.
- Do not build additional screens that are not part of the assessment.
- Desktop 1440px: sidebar, top navigation, summary cards, carousel, and task list alignment.
- Tablet 768px: reflow multi-column sections and controls with sensible spacing and no clipping.
- Mobile 390px: readable stacked cards, usable navigation pattern, sufficiently large touch targets.
- Task form: all fields and actions usable without horizontal scrolling.
- Carousel: slide content must fit without cutting labels; navigation controls must be easy to use.
- The PDF says to inspect source Figma frames at desktop and mobile widths.
- Any unlinked functionality outside scope may remain a visual placeholder only if clearly identified in README.

## 5. Evaluation rubric (PDF page 4)
| Criterion | Marks |
|---|---:|
| React / Next.js fundamentals | 15 |
| Functional features, including carousel | 20 |
| State management and data flow | 10 |
| Responsiveness — mobile, tablet, desktop | 20 |
| Pixel-perfect UI — Figma fidelity | 20 |
| Code quality and accessibility | 10 |
| AI usage disclosure and code understanding | 5 |
| **Total** | **100** |

## 6. Handoff requirements (PDF page 4)
- Publicly accessible HTTPS hosted application URL; no login required. Vercel, Netlify, or equivalent are suggested.
- Public GitHub repository containing source code, package files, `.gitignore`, and version history.
- `README.md` documenting setup, implementation, state-management choice, hosted URL, and limitations.
- One desktop screenshot and one mobile screenshot.
- `AI_USAGE.md` identifying tools used (or `None`), including 2–5 representative prompts if applicable, AI-assisted areas, and one suggestion checked, corrected, or rejected.
- Candidate should be prepared to explain implementation and make a small change live.
- Deadline: 24 hours after task receipt.
- Both live hosting URL and public GitHub repository URL are mandatory.

## 7. Important conflict to acknowledge
The assignment explicitly awards 20 marks for Figma visual fidelity and asks for a close visual match. The requested alternative design direction intentionally does **not** imitate the supplied Figma visuals. Functional scope and responsive requirements can still be met, but visual-fidelity scoring may be reduced. Do not describe the alternative design as pixel-perfect Figma reproduction.
