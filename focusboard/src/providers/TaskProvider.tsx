import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import { loadTasks, saveTasks } from "../hooks/useLocalStorage";

// --- Action types ---
type TaskAction =
  | { type: "task/add"; payload: Omit<Task, "id" | "createdAt" | "updatedAt"> }
  | { type: "task/update"; payload: Task }
  | { type: "task/delete"; payload: string }
  | { type: "task/set-status"; payload: { id: string; status: TaskStatus } }
  | { type: "tasks/hydrate"; payload: Task[] };

function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function taskReducer(state: Task[], action: TaskAction): Task[] {
  const now = new Date().toISOString();
  switch (action.type) {
    case "task/add": {
      const newTask: Task = {
        ...action.payload,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      return [newTask, ...state];
    }
    case "task/update": {
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...action.payload, updatedAt: now }
          : t
      );
    }
    case "task/delete": {
      return state.filter((t) => t.id !== action.payload);
    }
    case "task/set-status": {
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, status: action.payload.status, updatedAt: now }
          : t
      );
    }
    case "tasks/hydrate": {
      return action.payload;
    }
    default:
      return state;
  }
}

// --- Filter state ---
export interface FilterState {
  search: string;
  statusTab: TaskStatus | "all";
  priority: TaskPriority | "all";
}

interface TaskStats {
  total: number;
  inProgress: number;
  completed: number;
  todo: number;
  completionPercentage: number;
}

interface TaskContextValue {
  tasks: Task[];
  filteredTasks: Task[];
  filters: FilterState;
  stats: TaskStats;
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  setSearch: (search: string) => void;
  setStatusTab: (status: TaskStatus | "all") => void;
  setPriorityFilter: (priority: TaskPriority | "all") => void;
  clearFilters: () => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const [filters, setFilters] = useReducer(
    (state: FilterState, partial: Partial<FilterState>) => ({
      ...state,
      ...partial,
    }),
    { search: "", statusTab: "all", priority: "all" }
  );

  const stats = useMemo<TaskStats>(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const completionPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      inProgress,
      completed,
      todo,
      completionPercentage,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const query = filters.search.trim().toLowerCase();
      const matchesSearch =
        query === "" || task.title.toLowerCase().includes(query);
      const matchesStatus =
        filters.statusTab === "all" || task.status === filters.statusTab;
      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  const addTask = useCallback(
    (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
      dispatch({ type: "task/add", payload: task });
    },
    []
  );

  const updateTask = useCallback((task: Task) => {
    dispatch({ type: "task/update", payload: task });
  }, []);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "task/delete", payload: id });
  }, []);

  const setTaskStatus = useCallback((id: string, status: TaskStatus) => {
    dispatch({ type: "task/set-status", payload: { id, status } });
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters({ search });
  }, []);

  const setStatusTab = useCallback((statusTab: TaskStatus | "all") => {
    setFilters({ statusTab });
  }, []);

  const setPriorityFilter = useCallback((priority: TaskPriority | "all") => {
    setFilters({ priority });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: "", statusTab: "all", priority: "all" });
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filters,
        stats,
        addTask,
        updateTask,
        deleteTask,
        setTaskStatus,
        setSearch,
        setStatusTab,
        setPriorityFilter,
        clearFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return ctx;
}
