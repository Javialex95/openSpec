# Proposal

## Why

The app is still the Create Next App starter. To learn OpenSpec on something real, we need a first small feature: a basic task manager where users can add tasks and see them, with data that survives a page refresh.

## What Changes

- Replace the starter home page with a task manager page.
- Add a form to create a task with a title.
- Show the list of existing tasks (empty state when there are none).
- Persist tasks in the browser's `localStorage` and load them on page load.
- Reject empty/whitespace-only titles.

## Capabilities

### New Capabilities
- `task-management`: creating tasks with a title, listing tasks, and persisting them in localStorage across reloads.

### Modified Capabilities
<!-- None: no existing specs. -->

## Impact

- `app/page.tsx`: replaced with the task manager page.
- New `src/components` (task form, task list) and `src/types` (Task type), per project conventions.
- New small localStorage persistence hook.
- No new dependencies, no backend, no auth.

## Out of Scope

- Editing, deleting, or completing tasks.
- Sync across devices/tabs, database, authentication.
- Task fields other than title (description, due date, priority).
