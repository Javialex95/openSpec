export type Task = {
  id: string;
  title: string;
  createdAt: number;
  completed: boolean;
};

export type TaskFilter = "all" | "active" | "completed";
