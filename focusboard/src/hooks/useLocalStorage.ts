import type { Task } from "../types/task";
import { sampleTasks } from "../data/sampleTasks";

const STORAGE_KEY = "focusboard.tasks.v1";

export function loadTasks(): Task[] {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return sampleTasks;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed as Task[];
      }
    }
  } catch (err) {
    console.warn("Could not read tasks from localStorage, using initial sample data.", err);
  }
  return sampleTasks;
}

export function saveTasks(tasks: Task[]): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  } catch (err) {
    console.warn("Could not save tasks to localStorage.", err);
  }
}
