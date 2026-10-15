# Tasks

## 1. Data model and persistence

- [x] 1.1 Add `completed: boolean` to `Task` and a `TaskFilter` type (`"all" | "active" | "completed"`) in `src/types/task.ts`; verify `npx tsc --noEmit` reports only the expected errors in code not yet updated
- [ ] 1.2 In `src/hooks/useTasks.ts`, create new tasks with `completed: false` and make `readTasks` default a missing or non-boolean `completed` to `false` without discarding the list; verify by seeding localStorage with an old-shape task and confirming it loads as not completed
- [x] 1.3 Add `toggleTask(id)` to `useTasks` and return it; verify `npx tsc --noEmit` passes

## 2. Completion toggle UI

- [x] 2.1 Update `src/components/tasks/TaskList.tsx` to render a checkbox per task (labelled with the title), accept `onToggle`, and apply `line-through` to completed titles; verify the types check
- [ ] 2.2 Wire `toggleTask` into `TaskManager` and pass it to `TaskList`; verify a task can be toggled on and off and the strikethrough follows, and that it survives a reload

## 3. Filter

- [x] 3.1 Create `src/components/tasks/TaskFilter.tsx` with All / Active / Completed buttons and `aria-pressed` on the selected one; verify it type-checks
- [ ] 3.2 In `TaskManager`, hold the filter state (default All), derive the filtered list, and show "No tasks yet." vs "No tasks match this filter." via an `emptyMessage` prop on `TaskList`; verify each filter shows the right tasks in creation order and both empty messages appear in the right cases
- [x] 3.3 Run `npm run lint` and `npm run build`; verify both pass

## 4. Manual verification

- [ ] 4.1 Manually test in the browser (`npm run dev`): add tasks, toggle them, check strikethrough, switch All/Active/Completed, reload to confirm completion persists, and confirm tasks saved in the old shape (set via DevTools) still load as not completed
