# FocusBoard — Component Architecture and Interaction Contract

## Suggested project structure
```text
src/
  app/
    App.tsx
    providers/
      TaskProvider.tsx
  components/
    AppShell/
    Sidebar/
    MobileNavigation/
    DashboardHeader/
    ProgressOverview/
    MetricSummary/
    FocusNotesCarousel/
    TaskToolbar/
    TaskList/
    TaskCard/
    TaskStatusControl/
    PriorityFilter/
    TaskForm/
    ConfirmDialog/
    EmptyState/
  hooks/
    useTasks.ts
    useLocalStorage.ts
  data/
    sampleTasks.ts
    focusNotes.ts
  types/
    task.ts
  styles/
    tokens.css
    globals.css
```

## Task model
```ts
type TaskStatus = "todo" | "in-progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date string: YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
};
```

## Required task behavior
- Create: title is required after trimming whitespace; show an inline error and focus the title field when invalid.
- Edit: same form as create, prefilled with selected task; save updates the existing ID.
- Delete: ask for confirmation; cancel must leave the task unchanged.
- Status: allow moving among To do, In progress, Completed; reflect change immediately everywhere.
- Search: case-insensitive substring match against title.
- Status tabs: All, To do, In progress, Completed (the PDF requires status tabs; All is a useful aggregate view).
- Priority filter: All, Low, Medium, High.
- Combined filtering: visible tasks are the intersection of search, status, and priority predicates.
- Sort order may be stable by due date or creation order; do not silently reorder on every keystroke.

## Derived values
Given `tasks`:
- `total = tasks.length`
- `inProgress = tasks.filter(t => t.status === "in-progress").length`
- `completed = tasks.filter(t => t.status === "completed").length`
- `completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100)`

These values must be computed, never stored as separately mutable state.

## State and persistence
- Prefer a reducer or context provider as the single source of truth.
- Actions: `task/add`, `task/update`, `task/delete`, `task/set-status`, `tasks/hydrate`.
- Every mutation returns a new array and new changed task object.
- Suggested storage key: `focusboard.tasks.v1`.
- On initial load:
  1. Read localStorage inside a guarded effect or initializer.
  2. Parse and validate shape.
  3. If a valid saved task array exists, use it.
  4. Otherwise seed sample data once.
- Do not write initial sample data over saved data before hydration completes.
- Guard browser storage access for SSR and privacy/security exceptions.
- Persist after successful task-state changes.

## Carousel
- Exactly three slides.
- Previous/next controls.
- Active slide indicator; indicator buttons should also navigate.
- No autoplay required.
- Keep content from the Figma reference. The PDF does not contain the actual three slide texts, so retrieve them from the linked Figma frames before finalizing.
- Add accessible labels such as “Previous focus note”, “Next focus note”, and “Show focus note 2”.
- On mobile, text must wrap and controls must remain reachable.

## Accessibility and responsive behavior
- Use `<button>` for actions and `<label>` for fields.
- Use `aria-label` only where visible text does not adequately name a control.
- Use dialog semantics for modal/drawer forms and delete confirmation.
- Trap focus in modal if implementing a custom dialog; restore focus to the trigger on close.
- Visible `:focus-visible` styles.
- Touch targets around 44px minimum.
- Breakpoints should be content-driven; test exact widths 390, 768, 1440.
- Avoid horizontal page overflow.
- Provide an empty state when filters return no tasks.
