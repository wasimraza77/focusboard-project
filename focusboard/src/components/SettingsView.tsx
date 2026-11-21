import { useState } from "react";
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  User,
  Database,
  CheckCircle2,
} from "lucide-react";
import { useTasks } from "../providers/TaskProvider";
import { sampleTasks } from "../data/sampleTasks";

export default function SettingsView() {
  const { tasks } = useTasks();

  // Profile local state
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("focusboard.profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      name: "John Doe",
      email: "john@focusboard.io",
      role: "Product Designer",
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("focusboard.profile", JSON.stringify(profile));
    showToast("Profile settings saved successfully!");
  };

  // Export tasks as JSON
  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `focusboard-tasks-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Tasks exported successfully as JSON!");
  };

  // Import tasks from JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          localStorage.setItem("focusboard.tasks.v1", JSON.stringify(parsed));
          showToast(`Successfully imported ${parsed.length} tasks! Refreshing...`);
          setTimeout(() => window.location.reload(), 1000);
        } else {
          alert("Invalid file format. Please upload a JSON array of tasks.");
        }
      } catch {
        alert("Failed to parse the imported JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Reset to default sample tasks
  const handleResetSampleTasks = () => {
    if (
      window.confirm(
        "Are you sure you want to reset tasks to the default sample set? Any custom tasks will be replaced."
      )
    ) {
      localStorage.setItem(
        "focusboard.tasks.v1",
        JSON.stringify(sampleTasks)
      );
      showToast("Reset tasks to initial sample set! Refreshing...");
      setTimeout(() => window.location.reload(), 800);
    }
  };

  // Clear all tasks
  const handleClearAllTasks = () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL tasks? This action cannot be undone."
      )
    ) {
      localStorage.setItem("focusboard.tasks.v1", JSON.stringify([]));
      showToast("All tasks cleared! Refreshing...");
      setTimeout(() => window.location.reload(), 800);
    }
  };

  return (
    <div className="settings-view" aria-label="Settings and preferences">
      {/* View Header */}
      <div className="view-title-header">
        <div>
          <h1>Settings & Preferences</h1>
          <p>Customize your profile, preferences, and manage your local data.</p>
        </div>
      </div>

      {toastMessage && (
        <div className="settings-toast-alert" role="status">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="settings-cards-stack">
        {/* Profile Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon purple">
              <User size={18} />
            </div>
            <div>
              <h2>Profile Details</h2>
              <p>Update your personal information displayed on FocusBoard.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="form-two-cols">
              <div className="form-field-group">
                <label htmlFor="settings-name" className="form-field-label">
                  Full name
                </label>
                <input
                  id="settings-name"
                  type="text"
                  className="form-text-input"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="settings-email" className="form-field-label">
                  Email address
                </label>
                <input
                  id="settings-email"
                  type="email"
                  className="form-text-input"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-field-group">
              <label htmlFor="settings-role" className="form-field-label">
                Role / Title
              </label>
              <input
                id="settings-role"
                type="text"
                className="form-text-input"
                value={profile.role}
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
              />
            </div>

            <div className="settings-form-actions">
              <button type="submit" className="btn-primary-action">
                <Save size={16} />
                <span>Save changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Data & Storage Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon blue">
              <Database size={18} />
            </div>
            <div>
              <h2>Data & Storage Management</h2>
              <p>
                FocusBoard operates locally in your browser using <code>localStorage</code>.
              </p>
            </div>
          </div>

          <div className="settings-storage-info">
            <div className="storage-metric-pill">
              <span className="metric-label">Stored Tasks:</span>
              <span className="metric-val">{tasks.length}</span>
            </div>
            <div className="storage-metric-pill">
              <span className="metric-label">Storage Key:</span>
              <span className="metric-val">focusboard.tasks.v1</span>
            </div>
          </div>

          <div className="settings-action-buttons-grid">
            <button
              type="button"
              className="btn-settings-action"
              onClick={handleExportJSON}
            >
              <Download size={16} />
              <span>Export tasks (JSON)</span>
            </button>

            <label className="btn-settings-action upload-label">
              <Upload size={16} />
              <span>Import tasks (JSON)</span>
              <input
                type="file"
                accept=".json"
                className="sr-only"
                onChange={handleImportJSON}
              />
            </label>

            <button
              type="button"
              className="btn-settings-action"
              onClick={handleResetSampleTasks}
            >
              <RotateCcw size={16} />
              <span>Reset to sample data</span>
            </button>

            <button
              type="button"
              className="btn-settings-action danger"
              onClick={handleClearAllTasks}
            >
              <Trash2 size={16} />
              <span>Clear all tasks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
