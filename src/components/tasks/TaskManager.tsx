"use client";

import { useState } from "react";
import { useTasks } from "@/src/hooks/useTasks";
import type { TaskFilter as TaskFilterValue } from "@/src/types/task";
import TaskFilter from "@/src/components/tasks/TaskFilter";
import TaskForm from "@/src/components/tasks/TaskForm";
import TaskList from "@/src/components/tasks/TaskList";

export default function TaskManager() {
  const { tasks, loaded, addTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilterValue>("all");

  const visibleTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "completed"
        ? task.completed
        : !task.completed,
  );
  const emptyMessage =
    tasks.length === 0 ? "No tasks yet." : "No tasks match this filter.";

  return (
    <div className="flex flex-col gap-6">
      <TaskForm onAdd={addTask} />
      <TaskFilter value={filter} onChange={setFilter} />
      {loaded && (
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          emptyMessage={emptyMessage}
        />
      )}
    </div>
  );
}
