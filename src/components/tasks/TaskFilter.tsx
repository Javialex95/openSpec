import type { TaskFilter as TaskFilterValue } from "@/src/types/task";

type TaskFilterProps = {
  value: TaskFilterValue;
  onChange: (filter: TaskFilterValue) => void;
};

const OPTIONS: { value: TaskFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className="rounded border border-zinc-300 px-3 py-1 text-sm aria-pressed:bg-zinc-900 aria-pressed:text-white dark:border-zinc-700 dark:aria-pressed:bg-zinc-100 dark:aria-pressed:text-zinc-900"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
