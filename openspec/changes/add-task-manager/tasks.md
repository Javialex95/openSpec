# Tasks

## 1. Types and persistence

- [x] 1.1 Read the Next.js docs in `node_modules/next/dist/docs/` on Client Components, then create `src/types/task.ts` with the `Task` type; verify `npx tsc --noEmit` passes
- [x] 1.2 Create `src/hooks/useTasks.ts` that loads tasks from localStorage key `tasks` after mount, validates the data, falls back to `[]` on bad data, and persists only after loading; verify with `npx tsc --noEmit` and `npm run lint`
- [x] 1.3 Add `addTask(title)` to the hook that trims the title, ignores empty titles, and appends a task with a UUID and `createdAt`; verify that `"  "` adds nothing and `" a "` adds a task titled `a`

## 2. UI

- [x] 2.1 Create `src/components/TaskForm.tsx` (title input + submit button, clears input on submit); verify it renders in the browser
- [x] 2.2 Create `src/components/TaskList.tsx` showing tasks oldest first, with an empty-state message; verify both states render in the browser
- [x] 2.3 Create `src/components/TaskManager.tsx` (`"use client"`) wiring the hook, form and list; replace the starter content in `app/page.tsx` with it and update the page title in `app/layout.tsx`; verify `npm run build` succeeds

## 3. Final check

- [x] 3.1 Manually test in the browser with `npm run dev`: add tasks, try an empty and a whitespace-only title, refresh and confirm tasks persist in order, corrupt the `tasks` value in DevTools and confirm the page loads with an empty list, and check for no hydration or console errors
