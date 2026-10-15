# Design

## Context

Tasks are `{ id, title, createdAt }` held in `useTasks` (`src/hooks/useTasks.ts`), which loads from localStorage key `tasks` after mount and persists on every change. `TaskManager` (client component) renders `TaskForm` and `TaskList`; `TaskList` is presentational. `readTasks` currently discards the whole list if any item fails `isTask`. See proposal.md for motivation and the spec delta for requirements.

`AGENTS.md` requires reading the relevant guide in `node_modules/next/dist/docs/` before writing code; no new Next.js features are used here, only client-side React.

## Goals / Non-Goals

**Goals:**
- Smallest change that adds toggling, strikethrough, and filtering.
- Existing saved tasks keep working without a manual migration.

**Non-Goals:**
- Persisting the selected filter.
- A reducer, context, or storage abstraction.

## Decisions

- **Data shape**: add `completed: boolean` to `Task`. Alternative: a separate set of completed ids; rejected because it splits one task's state across two places.
- **Backward compatibility**: `isTask` no longer requires `completed`; after validating `id`, `title`, `createdAt`, `readTasks` maps each item to `{ ...item, completed: item.completed === true }`. Alternative: keep the strict check; rejected because it would wipe every previously saved task (violates the "not discarded" scenario). A non-boolean `completed` is treated as `false`.
- **Toggle**: `useTasks` exposes `toggleTask(id)` that flips `completed` immutably by id. Persistence already runs on `tasks` changes, so no extra storage code.
- **Filter state**: `type TaskFilter = "all" | "active" | "completed"` in `src/types/task.ts`, held in `useState` inside `TaskManager` and defaulting to `"all"`. The filtered array is derived during render, not stored. Filter lives in the component, not the hook, since it is view state and is not persisted.
- **Components**: new `TaskFilter.tsx` (three buttons, `aria-pressed` on the selected one). `TaskList` receives `onToggle` and `emptyMessage`; each row gets a checkbox labelled with the task title and `line-through` on the title when completed. `TaskManager` picks the empty message: "No tasks yet." when `tasks` is empty, otherwise "No tasks match this filter."
- **Control choice**: native checkbox for the toggle, for free keyboard and screen-reader support.

## Risks / Trade-offs

- [Old stored data shape] → Defaulting `completed` on read; covered by a spec scenario.
- [A task disappears from view right after being toggled under Active/Completed] → Intended per spec; no extra UI.
- [Loosened validation accepts items with a bad `completed` value] → Coerced to `false` rather than discarding data.
