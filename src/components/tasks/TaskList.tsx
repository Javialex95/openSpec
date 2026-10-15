import type { Task } from "@/src/types/task";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-zinc-500">No tasks yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="rounded border border-zinc-200 px-3 py-2 dark:border-zinc-800"
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}
