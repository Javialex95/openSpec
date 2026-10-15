import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string) => void;
};

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="New task title"
        aria-label="Task title"
        className="flex-1 rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        type="submit"
        className="rounded bg-foreground px-4 py-2 text-background"
      >
        Add
      </button>
    </form>
  );
}
