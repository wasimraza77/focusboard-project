import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  onCreateTask: () => void;
}

export default function DashboardHeader({ onCreateTask }: DashboardHeaderProps) {
  return (
    <>
      {/* Desktop Top Breadcrumb & User Avatar */}
      <div className="top-bar">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <span>Application</span>
          <span aria-hidden="true">&gt;</span>
          <span className="current">Overview</span>
        </div>
        <div className="top-bar-right">
          <button
            type="button"
            className="user-avatar-btn"
            aria-label="User profile John Doe"
            title="John Doe"
          >
            JD
          </button>
        </div>
      </div>

      {/* Greeting Title & Quick Action */}
      <header className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Your work, in focus.</h1>
          <p>Plan your day, stay organized, and get things done.</p>
        </div>
        <button
          type="button"
          className="btn-primary-action"
          onClick={onCreateTask}
          aria-label="Create new task"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>New task</span>
        </button>
      </header>
    </>
  );
}
