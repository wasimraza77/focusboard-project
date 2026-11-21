import { useState, useCallback } from "react";
import {
  LayoutGrid,
  CheckSquare,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import { TaskProvider, useTasks } from "./providers/TaskProvider";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import FocusNotesCarousel from "./components/FocusNotesCarousel";
import TaskToolbar from "./components/TaskToolbar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";
import type { Task } from "./types/task";
import "./styles/globals.css";
import "./styles/app.css";

function DashboardMain() {
  const { deleteTask } = useTasks();
  const [activeTab, setActiveTab] = useState("overview");
  const [formTask, setFormTask] = useState<{ open: boolean; task: Task | null }>({
    open: false,
    task: null,
  });
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const handleOpenCreate = useCallback(() => {
    setFormTask({ open: true, task: null });
  }, []);

  const handleOpenEdit = useCallback((task: Task) => {
    setFormTask({ open: true, task });
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormTask({ open: false, task: null });
  }, []);

  const handleRequestDelete = useCallback((task: Task) => {
    setDeletingTask(task);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setDeletingTask(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(null);
    }
  }, [deletingTask, deleteTask]);

  return (
    <div className="app-shell">
      {/* 1. Desktop Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 2. Mobile Top Bar */}
      <header className="mobile-top-bar" aria-label="Mobile navigation header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" aria-hidden="true">
            <LayoutGrid size={18} strokeWidth={2.5} />
          </div>
          <span className="sidebar-logo-text">FocusBoard</span>
        </div>
        <button
          type="button"
          className="user-avatar-btn"
          aria-label="User profile John Doe"
        >
          JD
        </button>
      </header>

      {/* 3. Main Dashboard Canvas */}
      <main className="app-main" id="main-content">
        <DashboardHeader onCreateTask={handleOpenCreate} />
        <FocusNotesCarousel />
        <StatsCards />

        <section className="tasks-section" aria-label="Tasks management">
          <TaskToolbar />
          <TaskList
            onEdit={handleOpenEdit}
            onDelete={handleRequestDelete}
          />
        </section>
      </main>

      {/* 4. Mobile Bottom Fixed Navigation */}
      <nav className="mobile-bottom-nav" aria-label="Mobile bottom navigation">
        <button
          type="button"
          className={`mobile-nav-item ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
          aria-current={activeTab === "overview" ? "page" : undefined}
        >
          <LayoutGrid />
          <span>Overview</span>
        </button>
        <button
          type="button"
          className={`mobile-nav-item ${activeTab === "tasks" ? "active" : ""}`}
          onClick={() => setActiveTab("tasks")}
          aria-current={activeTab === "tasks" ? "page" : undefined}
        >
          <CheckSquare />
          <span>Tasks</span>
        </button>
        <button
          type="button"
          className={`mobile-nav-item ${activeTab === "calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("calendar")}
          aria-current={activeTab === "calendar" ? "page" : undefined}
        >
          <Calendar />
          <span>Calendar</span>
        </button>
        <button
          type="button"
          className={`mobile-nav-item ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
          aria-current={activeTab === "settings" ? "page" : undefined}
        >
          <SlidersHorizontal />
          <span>Settings</span>
        </button>
      </nav>

      {/* 5. Create / Edit Task Modal */}
      {formTask.open && (
        <TaskForm task={formTask.task} onClose={handleCloseForm} />
      )}

      {/* 6. Confirm Delete Modal */}
      {deletingTask && (
        <ConfirmDialog
          title="Delete task"
          message={`Are you sure you want to delete "${deletingTask.title}"? This action cannot be undone.`}
          confirmLabel="Delete task"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <DashboardMain />
    </TaskProvider>
  );
}
