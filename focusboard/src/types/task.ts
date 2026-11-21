export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date string: YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export interface FocusNote {
  id: number;
  step: string;
  title: string;
  description: string;
  cardTitle: string;
  cardProgress: number;
  cardCompleted?: boolean;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  completed: "Completed",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
