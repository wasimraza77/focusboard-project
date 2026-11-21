import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  activeTab?: string;
  onCreateTask: () => void;
}

export default function DashboardHeader({
  activeTab = "overview",
  onCreateTask,
}: DashboardHeaderProps) {
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "tasks":
        return "My tasks";
      case "calendar":
        return "Calendar";
      case "settings":
        return "Settings";
      default:
        return "Overview";
    }
  };

  return (
    <>
      {/* Desktop Top Breadcrumb & User Avatar */}
      <div className="top-bar">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <span>Application</span>
          <span aria-hidden="true">&gt;</span>
          <span className="current">{getTabLabel(activeTab)}</span>
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

      {/* Greeting Title & Quick Action (shown on overview and tasks) */}
      {(activeTab === "overview" || activeTab === "tasks") && (
        <header className="dashboard-header">
          <div className="dashboard-title-group">
            <h1>
              {activeTab === "overview" ? "Your work, in focus." : "My tasks"}
            </h1>
            <p>
              {activeTab === "overview"
                ? "Plan your day, stay organized, and get things done."
                : "Manage, filter, and track all your tasks in one place."}
            </p>
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
      )}
    </>
  );
}
