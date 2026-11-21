import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useTasks } from "../providers/TaskProvider";
import type { Task } from "../types/task";
import { PRIORITY_LABELS } from "../types/task";

interface CalendarViewProps {
  onCreateTask: () => void;
  onEditTask: (task: Task) => void;
}

export default function CalendarView({
  onCreateTask,
  onEditTask,
}: CalendarViewProps) {
  const { tasks, setTaskStatus } = useTasks();

  // Pick month & year (default to November 2025 where sample tasks are set, or current date)
  const [currentDate, setCurrentDate] = useState(() => new Date(2025, 10, 1)); // Nov 2025
  const [selectedDateStr, setSelectedDateStr] = useState<string>("2025-11-22");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    const pad = (n: number) => String(n).padStart(2, "0");
    setSelectedDateStr(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
  };

  // Build calendar matrix (Sunday to Saturday)
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = month === 0 ? 11 : month - 1;
      const prevY = month === 0 ? year - 1 : year;
      const pad = (n: number) => String(n).padStart(2, "0");
      days.push({
        day: d,
        dateStr: `${prevY}-${pad(prevM + 1)}-${pad(d)}`,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const pad = (n: number) => String(n).padStart(2, "0");
      days.push({
        day: d,
        dateStr: `${year}-${pad(month + 1)}-${pad(d)}`,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill 35 or 42 cells
    const remaining = 35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month === 11 ? 0 : month + 1;
      const nextY = month === 11 ? year + 1 : year;
      const pad = (n: number) => String(n).padStart(2, "0");
      days.push({
        day: d,
        dateStr: `${nextY}-${pad(nextM + 1)}-${pad(d)}`,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  // Group tasks by dueDate
  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {};
    tasks.forEach((t) => {
      if (!map[t.dueDate]) map[t.dueDate] = [];
      map[t.dueDate].push(t);
    });
    return map;
  }, [tasks]);

  const selectedTasks = tasksByDate[selectedDateStr] || [];

  return (
    <div className="calendar-view" aria-label="Task calendar view">
      {/* View Header */}
      <div className="view-title-header">
        <div>
          <h1>Calendar</h1>
          <p>Schedule, track, and plan your tasks by due date.</p>
        </div>
        <button
          type="button"
          className="btn-primary-action"
          onClick={onCreateTask}
          aria-label="Create new task"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>New task</span>
        </button>
      </div>

      <div className="calendar-layout-grid">
        {/* Main Calendar Panel */}
        <div className="calendar-panel-card">
          <div className="calendar-toolbar">
            <div className="calendar-month-indicator">
              <CalendarIcon size={18} className="calendar-header-icon" />
              <h2>{monthName}</h2>
            </div>
            <div className="calendar-nav-group">
              <button
                type="button"
                className="btn-calendar-today"
                onClick={goToToday}
              >
                Today
              </button>
              <button
                type="button"
                className="btn-calendar-arrow"
                onClick={goToPrevMonth}
                aria-label="Previous month"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="btn-calendar-arrow"
                onClick={goToNextMonth}
                aria-label="Next month"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="calendar-weekdays-row" role="row">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day} className="calendar-weekday-header">
                {day}
              </span>
            ))}
          </div>

          {/* Day Grid */}
          <div className="calendar-cells-grid" role="grid">
            {calendarDays.map((item) => {
              const dayTasks = tasksByDate[item.dateStr] || [];
              const isSelected = item.dateStr === selectedDateStr;
              return (
                <button
                  key={item.dateStr}
                  type="button"
                  className={`calendar-day-cell ${
                    !item.isCurrentMonth ? "other-month" : ""
                  } ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedDateStr(item.dateStr)}
                  aria-label={`${item.dateStr}, ${dayTasks.length} tasks`}
                  aria-selected={isSelected}
                >
                  <span className="day-number">{item.day}</span>
                  {dayTasks.length > 0 && (
                    <div className="day-tasks-pill-list">
                      {dayTasks.slice(0, 2).map((t) => (
                        <span
                          key={t.id}
                          className={`day-task-chip ${t.status}`}
                          title={t.title}
                        >
                          {t.title}
                        </span>
                      ))}
                      {dayTasks.length > 2 && (
                        <span className="day-more-chip">
                          +{dayTasks.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details Sidebar */}
        <div className="calendar-date-sidebar">
          <div className="date-sidebar-header">
            <h3>Tasks for {selectedDateStr}</h3>
            <span className="badge-task-count">
              {selectedTasks.length} {selectedTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {selectedTasks.length === 0 ? (
            <div className="date-empty-state">
              <AlertCircle size={28} className="empty-date-icon" />
              <p>No tasks scheduled for this date.</p>
              <button
                type="button"
                className="btn-create-for-date"
                onClick={onCreateTask}
              >
                + Add task for this day
              </button>
            </div>
          ) : (
            <div className="date-tasks-list" role="list">
              {selectedTasks.map((t) => (
                <div key={t.id} className="date-task-card" role="listitem">
                  <div className="date-task-top">
                    <button
                      type="button"
                      className={`task-status-toggle ${t.status}`}
                      onClick={() => {
                        const next =
                          t.status === "todo"
                            ? "in-progress"
                            : t.status === "in-progress"
                            ? "completed"
                            : "todo";
                        setTaskStatus(t.id, next);
                      }}
                      title="Click to toggle status"
                    >
                      {t.status === "completed" && <CheckCircle2 size={14} />}
                      {t.status === "in-progress" && <Clock size={14} />}
                    </button>
                    <span
                      className={`date-task-title ${
                        t.status === "completed" ? "completed" : ""
                      }`}
                    >
                      {t.title}
                    </span>
                  </div>
                  {t.description && (
                    <p className="date-task-desc">{t.description}</p>
                  )}
                  <div className="date-task-bottom">
                    <span className={`category-pill ${t.category}`}>
                      {t.category}
                    </span>
                    <span className={`priority-pill ${t.priority}`}>
                      {PRIORITY_LABELS[t.priority]}
                    </span>
                    <button
                      type="button"
                      className="btn-edit-date-task"
                      onClick={() => onEditTask(t)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
