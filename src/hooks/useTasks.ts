import { useCallback, useEffect, useState } from "react";
import type { Task } from "@/src/types/task";

const STORAGE_KEY = "tasks";

type StoredTask = Omit<Task, "completed"> & { completed?: unknown };

function isStoredTask(value: unknown): value is StoredTask {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.createdAt === "number"
  );
}

function readTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isStoredTask)) return [];
    // Tasks saved before completion existed have no `completed` field.
    return parsed.map((item) => ({ ...item, completed: item.completed === true }));
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Read after mount: the server has no localStorage, so reading during
  // the first render would cause a hydration mismatch.
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setTasks(readTasks());
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist only after loading so the empty initial state never
  // overwrites saved tasks.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Storage unavailable or full: keep working in memory.
    }
  }, [tasks, loaded]);

  const addTask = useCallback((title: string) => {
    const trimmed = title.trim();
    if (trimmed === "") return;
    setTasks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: trimmed,
        createdAt: Date.now(),
        completed: false,
      },
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  return { tasks, loaded, addTask, toggleTask };
}
