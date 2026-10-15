import type { Task } from "@/src/types/task";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  emptyMessage: string;
};

export default function TaskList({
  tasks,
  onToggle,
  emptyMessage,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-zinc-500">{emptyMessage}</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="rounded border border-zinc-200 px-3 py-2 dark:border-zinc-800"
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span className={task.completed ? "line-through" : undefined}>
              {task.title}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
