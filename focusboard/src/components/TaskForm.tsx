import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import { useTasks } from "../providers/TaskProvider";

interface TaskFormProps {
  task: Task | null; // null = Create, Task = Edit
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const { addTask, updateTask } = useTasks();
  const isEdit = task !== null;
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    title: task?.title ?? "",
    description: task?.description ?? "",
    category: task?.category ?? "Design",
    status: task?.status ?? "todo",
    priority: task?.priority ?? "medium",
    dueDate: task?.dueDate ?? new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  useEffect(() => {
    // Focus title input on mount
    titleInputRef.current?.focus();

    // Trap escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const validate = (): boolean => {
    const newErrors: { title?: string; dueDate?: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      titleInputRef.current?.focus();
      return;
    }

    if (isEdit && task) {
      updateTask({
        ...task,
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
      });
    } else {
      addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
      });
    }
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit task" : "Create new task"}
    >
      <div className="modal-card">
        <div className="modal-header-section">
          <div className="modal-header-titles">
            <h2>{isEdit ? "Edit task" : "Create new task"}</h2>
            <p>
              {isEdit
                ? "Update your task details below."
                : "Add your task details to stay on top of your work."}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-icon-btn"
            onClick={onClose}
            aria-label="Close modal dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-scroll-body">
            {/* Task Title */}
            <div className="form-field-group">
              <label htmlFor="modal-task-title" className="form-field-label">
                Task title <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="modal-task-title"
                ref={titleInputRef}
                type="text"
                className={`form-text-input ${errors.title ? "has-error" : ""}`}
                placeholder="e.g., Update marketing website"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                  if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                aria-required="true"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-validation-error" : undefined}
              />
              {errors.title && (
                <span id="title-validation-error" className="form-error-feedback" role="alert">
                  {errors.title}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="form-field-group">
              <label htmlFor="modal-task-desc" className="form-field-label">
                Description
              </label>
              <textarea
                id="modal-task-desc"
                className="form-textarea-input"
                placeholder="Add notes or details about this task..."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>

            {/* Status & Priority */}
            <div className="form-two-cols">
              <div className="form-field-group">
                <label htmlFor="modal-task-status" className="form-field-label">
                  Status
                </label>
                <select
                  id="modal-task-status"
                  className="form-select-input"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as TaskStatus,
                    }))
                  }
                >
                  <option value="todo">To do</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-field-group">
                <label htmlFor="modal-task-priority" className="form-field-label">
                  Priority
                </label>
                <select
                  id="modal-task-priority"
                  className="form-select-input"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: e.target.value as TaskPriority,
                    }))
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Category & Due Date */}
            <div className="form-two-cols">
              <div className="form-field-group">
                <label htmlFor="modal-task-category" className="form-field-label">
                  Category
                </label>
                <select
                  id="modal-task-category"
                  className="form-select-input"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Content">Content</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Research">Research</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-field-group">
                <label htmlFor="modal-task-due-date" className="form-field-label">
                  Due date <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  id="modal-task-due-date"
                  type="date"
                  className={`form-text-input ${errors.dueDate ? "has-error" : ""}`}
                  value={formData.dueDate}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, dueDate: e.target.value }));
                    if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: undefined }));
                  }}
                  aria-required="true"
                  aria-invalid={!!errors.dueDate}
                  aria-describedby={errors.dueDate ? "due-date-validation-error" : undefined}
                />
                {errors.dueDate && (
                  <span id="due-date-validation-error" className="form-error-feedback" role="alert">
                    {errors.dueDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer-section">
            <span className="modal-footer-note">* Required field</span>
            <div className="modal-footer-buttons">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn-modal-submit">
                {isEdit ? "Save changes" : "Create task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
