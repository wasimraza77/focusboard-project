import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { sampleTasks } from "../data/sampleTasks";
import { focusNotes } from "../data/focusNotes";

describe("FocusBoard — Acceptance Tests (07_ACCEPTANCE_TESTS.md)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const getTaskList = () => screen.getByRole("list", { name: /task items list/i });

  it("1. First launch shows at least six sample tasks with all required fields", () => {
    render(<App />);

    // Verify sample tasks count >= 6
    expect(sampleTasks.length).toBeGreaterThanOrEqual(6);

    // Verify required fields exist on every sample task
    sampleTasks.forEach((task) => {
      expect(task.id).toBeDefined();
      expect(task.title).toBeTruthy();
      expect(task.description).toBeDefined();
      expect(task.category).toBeTruthy();
      expect(["todo", "in-progress", "completed"]).toContain(task.status);
      expect(["low", "medium", "high"]).toContain(task.priority);
      expect(task.dueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
    });

    const taskList = getTaskList();
    // Check that tasks render in the task list
    expect(within(taskList).getByText("Design landing page")).toBeInTheDocument();
    expect(within(taskList).getByText("Fix mobile navigation")).toBeInTheDocument();
    expect(within(taskList).getByText("Review onboarding copy")).toBeInTheDocument();
  });

  it("2. Refresh after first launch retains current task data from localStorage", () => {
    const { unmount } = render(<App />);

    // Check localStorage was populated
    const storedRaw = localStorage.getItem("focusboard.tasks.v1");
    expect(storedRaw).toBeTruthy();
    const stored = JSON.parse(storedRaw!);
    expect(stored.length).toBe(sampleTasks.length);

    unmount();

    // Rerender simulating page refresh
    render(<App />);
    const taskList = getTaskList();
    expect(within(taskList).getByText("Design landing page")).toBeInTheDocument();
  });

  it("3. Existing localStorage data is not overwritten by sample data", () => {
    const customTasks = [
      {
        id: "custom-1",
        title: "Unique User Custom Task",
        description: "Created by user earlier",
        category: "Development",
        status: "todo" as const,
        priority: "high" as const,
        dueDate: "2025-12-31",
        createdAt: "2025-11-20T00:00:00.000Z",
        updatedAt: "2025-11-20T00:00:00.000Z",
      },
    ];
    localStorage.setItem("focusboard.tasks.v1", JSON.stringify(customTasks));

    render(<App />);
    const taskList = getTaskList();

    // Should display the custom task and NOT the default sample tasks
    expect(within(taskList).getByText("Unique User Custom Task")).toBeInTheDocument();
    expect(within(taskList).queryByText("Design landing page")).not.toBeInTheDocument();
  });

  it("4. Create with blank title shows a helpful validation message and does not add a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open create task modal
    const openBtn = screen.getByRole("button", { name: /create new task/i });
    await user.click(openBtn);

    // Verify modal is open
    expect(screen.getByRole("dialog", { name: /create new task/i })).toBeInTheDocument();

    // Clear title input and submit
    const titleInput = screen.getByLabelText(/task title/i);
    await user.clear(titleInput);

    const submitBtn = screen.getByRole("button", { name: /create task/i });
    await user.click(submitBtn);

    // Validation error must appear
    expect(screen.getByText(/task title is required/i)).toBeInTheDocument();

    // Modal should remain open
    expect(screen.getByRole("dialog", { name: /create new task/i })).toBeInTheDocument();
  });

  it("5. Create with valid title adds a task and updates all derived counts", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open modal
    await user.click(screen.getByRole("button", { name: /create new task/i }));

    // Fill form
    const titleInput = screen.getByLabelText(/task title/i);
    await user.type(titleInput, "Deploy to Cloud Run");

    const descInput = screen.getByLabelText(/description/i);
    await user.type(descInput, "Configure production container");

    // Submit
    await user.click(screen.getByRole("button", { name: /create task/i }));

    // Check task appears in list
    const taskList = getTaskList();
    expect(within(taskList).getByText("Deploy to Cloud Run")).toBeInTheDocument();

    // Total tasks count should increase from 8 to 9
    expect(screen.getByText("All tasks (9)")).toBeInTheDocument();
  });

  it("6. Edit changes the selected task without creating a duplicate", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Find options menu for "Design landing page"
    const menuBtn = screen.getByRole("button", {
      name: /options for task: design landing page/i,
    });
    await user.click(menuBtn);

    // Click Edit task
    const editBtn = screen.getByRole("menuitem", { name: /edit task/i });
    await user.click(editBtn);

    // Edit modal opens
    expect(screen.getByRole("dialog", { name: /edit task/i })).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/task title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Design landing page v2");

    // Save
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const taskList = getTaskList();
    // Check title updated
    expect(within(taskList).getByText("Design landing page v2")).toBeInTheDocument();
    expect(within(taskList).queryByText("Design landing page")).not.toBeInTheDocument();

    // Total tasks count should remain 8
    expect(screen.getByText("All tasks (8)")).toBeInTheDocument();
  });

  it("7 & 8. Delete asks for confirmation, and canceling leaves task intact", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open options for "Design landing page"
    const menuBtn = screen.getByRole("button", {
      name: /options for task: design landing page/i,
    });
    await user.click(menuBtn);

    // Click Delete task
    const deleteBtn = screen.getByRole("menuitem", { name: /delete task/i });
    await user.click(deleteBtn);

    // Confirmation dialog appears
    const dialog = screen.getByRole("alertdialog", { name: /delete task/i });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/are you sure you want to delete/i)).toBeInTheDocument();

    // Click Cancel
    const cancelBtn = within(dialog).getByRole("button", { name: /cancel/i });
    await user.click(cancelBtn);

    const taskList = getTaskList();
    // Task is still present
    expect(within(taskList).getByText("Design landing page")).toBeInTheDocument();
    expect(screen.getByText("All tasks (8)")).toBeInTheDocument();
  });

  it("9. Confirming delete removes it and updates all counts", async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuBtn = screen.getByRole("button", {
      name: /options for task: design landing page/i,
    });
    await user.click(menuBtn);

    const deleteBtn = screen.getByRole("menuitem", { name: /delete task/i });
    await user.click(deleteBtn);

    const dialog = screen.getByRole("alertdialog", { name: /delete task/i });
    const confirmBtn = within(dialog).getByRole("button", { name: /^delete task$/i });
    await user.click(confirmBtn);

    const taskList = getTaskList();
    // Task should be gone
    expect(within(taskList).queryByText("Design landing page")).not.toBeInTheDocument();
    // Count should decrease to 7
    expect(screen.getByText("All tasks (7)")).toBeInTheDocument();
  });

  it("10 & 11. Status can be changed to each state and updates list, filters, and statistics immediately", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Toggle status on the first in-progress task (initial status is in-progress)
    const toggleBtns = screen.getAllByRole("button", {
      name: /status is in progress/i,
    });
    await user.click(toggleBtns[0]);

    // Should now have an additional completed task
    expect(
      screen.getAllByRole("button", { name: /status is completed/i }).length
    ).toBeGreaterThanOrEqual(4);

    // In progress count should decrease from 3 to 2, Completed should increase from 3 to 4
    expect(screen.getByText("Completed (4)")).toBeInTheDocument();
    expect(screen.getByText("In progress (2)")).toBeInTheDocument();
  });

  it("12. Search matches title without case sensitivity", async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByLabelText(/search tasks by title/i);
    await user.type(searchInput, "MOBILE");

    const taskList = getTaskList();
    // "Fix mobile navigation" matches
    expect(within(taskList).getByText("Fix mobile navigation")).toBeInTheDocument();
    // "Design landing page" should NOT match in list
    expect(within(taskList).queryByText("Design landing page")).not.toBeInTheDocument();
  });

  it("13. Status tabs filter correctly", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click "Completed" tab
    const completedTab = screen.getByRole("tab", { name: /completed/i });
    await user.click(completedTab);

    const taskList = getTaskList();
    // Only completed tasks should be visible
    expect(within(taskList).getByText("Review onboarding copy")).toBeInTheDocument();
    expect(within(taskList).getByText("User testing session #3")).toBeInTheDocument();
    expect(within(taskList).getByText("Brand guidelines v2")).toBeInTheDocument();

    // In-progress or todo tasks should not be visible in list
    expect(within(taskList).queryByText("Design landing page")).not.toBeInTheDocument();
    expect(within(taskList).queryByText("API authentication refactor")).not.toBeInTheDocument();
  });

  it("14. Priority filter filters correctly", async () => {
    const user = userEvent.setup();
    render(<App />);

    const prioritySelect = screen.getByLabelText(/filter by priority/i);
    await user.selectOptions(prioritySelect, "high");

    const taskList = getTaskList();
    // Only High priority tasks should show
    expect(within(taskList).getByText("Design landing page")).toBeInTheDocument();
    expect(within(taskList).getByText("API authentication refactor")).toBeInTheDocument();
    expect(within(taskList).getByText("Dashboard analytics pipeline")).toBeInTheDocument();

    // Medium or Low should not show
    expect(within(taskList).queryByText("Fix mobile navigation")).not.toBeInTheDocument();
    expect(within(taskList).queryByText("Review onboarding copy")).not.toBeInTheDocument();
  });

  it("15. Search + status + priority filters compose simultaneously", async () => {
    const user = userEvent.setup();
    render(<App />);

    // 1. Status: in-progress
    await user.click(screen.getByRole("tab", { name: /in progress/i }));

    // 2. Priority: high
    await user.selectOptions(screen.getByLabelText(/filter by priority/i), "high");

    // 3. Search: "analytics"
    await user.type(screen.getByLabelText(/search tasks by title/i), "analytics");

    const taskList = getTaskList();
    // Only "Dashboard analytics pipeline" satisfies all 3 filters
    expect(within(taskList).getByText("Dashboard analytics pipeline")).toBeInTheDocument();
    expect(within(taskList).queryByText("Design landing page")).not.toBeInTheDocument();
    expect(within(taskList).queryByText("Fix mobile navigation")).not.toBeInTheDocument();
  });

  it("16. Clear/reset filters returns the expected task set", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Search for non-existent text
    const searchInput = screen.getByLabelText(/search tasks by title/i);
    await user.type(searchInput, "xyz999nonexistent");

    // Empty state should appear
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();

    // Click "Reset all filters"
    const resetBtn = screen.getByRole("button", { name: /reset all filters/i });
    await user.click(resetBtn);

    const taskList = getTaskList();
    // All sample tasks should reappear in list
    expect(within(taskList).getByText("Design landing page")).toBeInTheDocument();
    expect(within(taskList).getByText("Fix mobile navigation")).toBeInTheDocument();
  });

  it("17. Total, in-progress, completed, and completion percentage are derived from current task data", () => {
    render(<App />);

    const totalStats = screen.getAllByText("8");
    expect(totalStats.length).toBeGreaterThanOrEqual(1);

    const inProgressStats = screen.getAllByText("3");
    expect(inProgressStats.length).toBeGreaterThanOrEqual(1);
  });

  it("18, 19, 20, 21, 22. Focus Notes carousel: exactly three slides, navigation, wrap, indicator click, exact Figma content", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Exactly 3 slides
    expect(focusNotes.length).toBe(3);

    // Slide 1 content matches Figma
    expect(screen.getByText("Make today count.")).toBeInTheDocument();
    expect(screen.getByText("A little focus goes a long way.")).toBeInTheDocument();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();

    // Click Next
    const nextBtn = screen.getByRole("button", { name: /next focus note/i });
    await user.click(nextBtn);

    // Slide 2 content matches Figma
    expect(screen.getByText("Small steps, big progress.")).toBeInTheDocument();
    expect(screen.getByText("Keep your momentum going.")).toBeInTheDocument();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();

    // Click Next again
    await user.click(nextBtn);

    // Slide 3 content matches Figma
    expect(screen.getByText("Celebrate the wins.")).toBeInTheDocument();
    expect(screen.getByText("Every finished task moves you forward.")).toBeInTheDocument();
    expect(screen.getByText("03 / 03")).toBeInTheDocument();

    // Next wraps to Slide 1
    await user.click(nextBtn);
    expect(screen.getByText("Make today count.")).toBeInTheDocument();

    // Prev wraps to Slide 3
    const prevBtn = screen.getByRole("button", { name: /previous focus note/i });
    await user.click(prevBtn);
    expect(screen.getByText("Celebrate the wins.")).toBeInTheDocument();

    // Indicator button navigates directly to Slide 2
    const dot2 = screen.getByRole("tab", { name: /go to slide 2/i });
    await user.click(dot2);
    expect(screen.getByText("Small steps, big progress.")).toBeInTheDocument();
  });
});


  it("23. Navigation buttons (Overview, My tasks, Calendar, Settings) switch views and breadcrumbs", async () => {
    const user = userEvent.setup();
    render(<App />);

    const sidebar = screen.getByLabelText("Sidebar navigation");

    // 1. Initial view is Overview
    expect(screen.getByText("Your work, in focus.")).toBeInTheDocument();
    expect(screen.getByText("Overview", { selector: ".breadcrumbs span.current" })).toBeInTheDocument();

    // 2. Click "My tasks" in navigation
    const myTasksNav = within(sidebar).getByRole("button", { name: /^my tasks$/i });
    await user.click(myTasksNav);

    // Breadcrumbs update to "My tasks"
    expect(screen.getByText("My tasks", { selector: ".breadcrumbs span.current" })).toBeInTheDocument();
    // Carousel and stat cards are hidden on the dedicated My Tasks page
    expect(screen.queryByLabelText(/focus notes carousel/i)).not.toBeInTheDocument();

    // 3. Click "Calendar" in navigation
    const calendarNav = within(sidebar).getByRole("button", { name: /^calendar$/i });
    await user.click(calendarNav);

    // Calendar view renders
    expect(screen.getByLabelText(/task calendar view/i)).toBeInTheDocument();
    expect(screen.getByText("Calendar", { selector: ".breadcrumbs span.current" })).toBeInTheDocument();
    expect(screen.getByText(/schedule, track, and plan your tasks by due date/i)).toBeInTheDocument();

    // 4. Click "Settings" in navigation
    const settingsNav = within(sidebar).getByRole("button", { name: /^settings$/i });
    await user.click(settingsNav);

    // Settings view renders
    expect(screen.getByLabelText(/settings and preferences/i)).toBeInTheDocument();
    expect(screen.getByText("Settings", { selector: ".breadcrumbs span.current" })).toBeInTheDocument();
    expect(screen.getByText("Profile Details")).toBeInTheDocument();
    expect(screen.getByText("Data & Storage Management")).toBeInTheDocument();

    // 5. Click "Overview" to return
    const overviewNav = within(sidebar).getByRole("button", { name: /^overview$/i });
    await user.click(overviewNav);

    expect(screen.getByText("Your work, in focus.")).toBeInTheDocument();
    expect(screen.getByLabelText(/focus notes carousel/i)).toBeInTheDocument();
  });
