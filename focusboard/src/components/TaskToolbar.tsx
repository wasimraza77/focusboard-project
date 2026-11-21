import { Search } from "lucide-react";
import { useTasks } from "../providers/TaskProvider";
import type { TaskStatus, TaskPriority } from "../types/task";

export default function TaskToolbar() {
  const { filters, stats, setSearch, setStatusTab, setPriorityFilter } = useTasks();

  const tabs: { id: TaskStatus | "all"; label: string; count: number }[] = [
    { id: "all", label: "All tasks", count: stats.total },
    { id: "in-progress", label: "In progress", count: stats.inProgress },
    { id: "completed", label: "Completed", count: stats.completed },
    { id: "todo", label: "To do", count: stats.todo },
  ];

  return (
    <>
      <div className="tasks-section-header">
        <div className="tasks-section-title-group">
          <h2>My tasks</h2>
          <p>Manage and track your tasks in one place.</p>
        </div>
      </div>

      <div className="tasks-toolbar">
        {/* Status Filter Tabs */}
        <div className="status-filter-tabs" role="tablist" aria-label="Filter tasks by status">
          {tabs.map((tab) => {
            const isActive = filters.statusTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`status-filter-tab ${isActive ? "active" : ""}`}
                onClick={() => setStatusTab(tab.id)}
                role="tab"
                aria-selected={isActive}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Search & Priority Controls */}
        <div className="toolbar-controls-right">
          <div className="search-box-wrapper">
            <Search className="search-box-icon" aria-hidden="true" />
            <input
              type="search"
              className="search-box-input"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tasks by title"
            />
          </div>

          <label htmlFor="priority-select" className="sr-only">
            Filter by priority
          </label>
          <select
            id="priority-select"
            className="priority-dropdown-select"
            value={filters.priority}
            onChange={(e) =>
              setPriorityFilter(e.target.value as TaskPriority | "all")
            }
            aria-label="Filter by priority"
          >
            <option value="all">Priority: All</option>
            <option value="high">Priority: High</option>
            <option value="medium">Priority: Medium</option>
            <option value="low">Priority: Low</option>
          </select>
        </div>
      </div>
    </>
  );
}
