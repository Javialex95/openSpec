"use client";

import { useTasks } from "@/src/hooks/useTasks";
import TaskForm from "@/src/components/tasks/TaskForm";
import TaskList from "@/src/components/tasks/TaskList";

export default function TaskManager() {
  const { tasks, loaded, addTask } = useTasks();

  return (
    <div className="flex flex-col gap-6">
      <TaskForm onAdd={addTask} />
      {loaded && <TaskList tasks={tasks} />}
    </div>
  );
}
