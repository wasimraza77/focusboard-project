import { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  RotateCcw,
  Clock,
  Inbox,
} from "lucide-react";
import type { Task, TaskStatus } from "../types/task";
import { STATUS_LABELS, PRIORITY_LABELS } from "../types/task";
import { useTasks } from "../providers/TaskProvider";

interface TaskListProps {
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskList({ onEdit, onDelete }: TaskListProps) {
  const { filteredTasks, clearFilters } = useTasks();

  if (filteredTasks.length === 0) {
    return (
      <div className="tasks-empty-state">
        <div className="empty-state-badge" aria-hidden="true">
          <Inbox />
        </div>
        <h3 className="empty-state-heading">No tasks found</h3>
        <p className="empty-state-message">
          No tasks match your current search and filter criteria. You can reset filters to view all tasks.
        </p>
        <button
          type="button"
          className="btn-reset-filters"
          onClick={clearFilters}
        >
          Reset all filters
        </button>
      </div>
    );
  }

  return (
    <div className="tasks-list-container" role="list" aria-label="Task items list">
      {filteredTasks.map((task) => (
        <TaskRowItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
        />
      ))}
    </div>
  );
}

// --- Individual Task Row ---
interface TaskRowItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

function TaskRowItem({ task, onEdit, onDelete }: TaskRowItemProps) {
  const { setTaskStatus } = useTasks();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Cycle status on check circle click: todo -> in-progress -> completed -> todo
  const handleToggleStatus = () => {
    let nextStatus: TaskStatus = "todo";
    if (task.status === "todo") nextStatus = "in-progress";
    else if (task.status === "in-progress") nextStatus = "completed";
    else if (task.status === "completed") nextStatus = "todo";
    setTaskStatus(task.id, nextStatus);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const date = new Date(
          parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10)
        );
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="task-row-item" role="listitem">
      {/* 1. Status Check Circle */}
      <button
        type="button"
        className={`task-status-toggle ${task.status}`}
        onClick={handleToggleStatus}
        aria-label={`Status is ${STATUS_LABELS[task.status]}. Click to change status.`}
        title={`Status: ${STATUS_LABELS[task.status]} (Click to advance)`}
      >
        {task.status === "completed" && <Check strokeWidth={3} />}
        {task.status === "in-progress" && <Clock strokeWidth={3} />}
      </button>

      {/* 2. Title & Description */}
      <div className="task-row-content">
        <div
          className={`task-row-title ${
            task.status === "completed" ? "completed" : ""
          }`}
        >
          {task.title}
        </div>
        {task.description && (
          <div className="task-row-desc">{task.description}</div>
        )}
      </div>

      {/* 3. Category Pill */}
      <span className={`category-pill ${task.category}`}>
        {task.category}
      </span>

      {/* 4. Priority Pill */}
      <span className={`priority-pill ${task.priority}`}>
        {PRIORITY_LABELS[task.priority]}
      </span>

      {/* 5. Due Date */}
      <div className="task-row-due-date" title={`Due: ${task.dueDate}`}>
        <CalendarIcon aria-hidden="true" />
        <span>{formatDate(task.dueDate)}</span>
      </div>

      {/* 6. Actions Dropdown Menu */}
      <div className="task-actions-wrapper" ref={menuRef}>
        <button
          type="button"
          className="task-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={`Options for task: ${task.title}`}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && (
          <div className="task-dropdown-menu" role="menu">
            <button
              type="button"
              className="task-dropdown-item"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onEdit();
              }}
            >
              <Pencil size={15} />
              <span>Edit task</span>
            </button>

            {task.status !== "todo" && (
              <button
                type="button"
                className="task-dropdown-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setTaskStatus(task.id, "todo");
                }}
              >
                <RotateCcw size={15} />
                <span>Mark as To do</span>
              </button>
            )}

            {task.status !== "in-progress" && (
              <button
                type="button"
                className="task-dropdown-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setTaskStatus(task.id, "in-progress");
                }}
              >
                <Clock size={15} />
                <span>Mark as In progress</span>
              </button>
            )}

            {task.status !== "completed" && (
              <button
                type="button"
                className="task-dropdown-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setTaskStatus(task.id, "completed");
                }}
              >
                <Check size={15} />
                <span>Mark as Completed</span>
              </button>
            )}

            <button
              type="button"
              className="task-dropdown-item danger"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onDelete();
              }}
            >
              <Trash2 size={15} />
              <span>Delete task</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
