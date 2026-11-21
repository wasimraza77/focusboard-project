import {
  LayoutGrid,
  CheckSquare,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export default function Sidebar({
  activeTab = "overview",
  onSelectTab = () => {},
}: SidebarProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "tasks", label: "My tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "settings", label: "Settings", icon: SlidersHorizontal },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="sidebar-header">
        <a href="#dashboard" className="sidebar-logo" aria-label="FocusBoard Home">
          <div className="sidebar-logo-icon" aria-hidden="true">
            <LayoutGrid size={18} strokeWidth={2.5} />
          </div>
          <span className="sidebar-logo-text">FocusBoard</span>
        </a>
      </div>

      <div className="sidebar-section-title">Navigation</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="sidebar-avatar" aria-hidden="true">
            JD
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">John Doe</div>
            <div className="sidebar-user-role">Product Designer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
