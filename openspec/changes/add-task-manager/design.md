# Design

## Context

The repo is a fresh Create Next App (App Router, TypeScript strict, Tailwind) with only `app/page.tsx` and `app/layout.tsx`. There is no `src/` directory yet, and the `@/*` path alias in `tsconfig.json` maps to the project root (`./*`). Project conventions call for components in `src/components` and types in `src/types`. See proposal.md for motivation.

`AGENTS.md` warns that this Next.js version has breaking changes, so the relevant guide in `node_modules/next/dist/docs/` must be read before writing code (notably for Client Components).

## Goals / Non-Goals

**Goals:**
- Smallest possible implementation of create + list + persist.
- Follow the project conventions (Server Components by default, one component per file, no `any`).

**Non-Goals:**
- A reusable storage abstraction or state library; one hook is enough.
- Cross-tab sync.

## Decisions

- **Folder layout**: create `src/components`, `src/types` and `src/hooks`, and import them with `@/src/...` via the existing alias. Alternative: change the alias or move `app/` into `src/`; rejected as unrelated churn.
- **Task shape**: `{ id: string; title: string; createdAt: number }` in `src/types/task.ts`. `id` comes from `crypto.randomUUID()`. `createdAt` is kept so later features (sorting, editing) need no data migration. Array order is insertion order, which gives "oldest first".
- **Components**: `app/page.tsx` stays a Server Component and renders one client component, `TaskManager` (`"use client"`), which owns the state via the hook. `TaskForm` and `TaskList` are presentational. Only `TaskManager` needs the client because of state and localStorage.
- **Persistence**: a `useTasks` hook reads localStorage key `tasks` in an effect after mount and writes on every change. Reading in an effect, not in initial state, avoids a server/client hydration mismatch because the server has no localStorage. Alternative: `useSyncExternalStore`; more complex than this feature needs.
- **Validation of stored data**: parse inside try/catch and check for an array of objects with string `id` and `title`; otherwise fall back to an empty list (spec scenario "Unreadable stored data").
- **Don't overwrite on first render**: the hook tracks a `loaded` flag and only persists once it is true, so the empty initial state never replaces saved tasks.

## Risks / Trade-offs

- [Brief empty-state flash before stored tasks load] → Render the list only once `loaded` is true.
- [localStorage unavailable or full (private mode, quota)] → Wrap reads/writes in try/catch; the app keeps working in memory.
- [Two tabs overwrite each other] → Accepted; out of scope.
