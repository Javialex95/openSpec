# Proposal

## Why

Tasks can only be added and listed today, so users cannot track progress. Marking tasks as done and filtering by status is the smallest step that makes the list useful for day-to-day work.

## What Changes

- Add a completed flag to each task and a control to toggle it between completed and not completed.
- Show completed tasks with a line through the title.
- Add a filter with three options: All, Active, Completed. Default is All.
- Persist completion status in localStorage together with the task.
- Tasks stored before this change (without the flag) are treated as not completed.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `task-management`: adds requirements for toggling completion, visual style of completed tasks, filtering by status, and persisting completion; the empty-state requirement is extended to a filtered list with no matches.

## Impact

- `src/types/task.ts`: add `completed: boolean`.
- `src/hooks/useTasks.ts`: validate and default the new field, add `toggleTask`.
- `src/components/tasks/TaskList.tsx`: checkbox and strikethrough styling.
- `src/components/tasks/TaskManager.tsx`: filter state and filtered list.
- New `src/components/tasks/TaskFilter.tsx`.
- No new dependencies.

## Out of scope

- Editing or deleting tasks.
- Persisting the selected filter across reloads.
- Task counts, bulk actions ("clear completed", "mark all"), or sorting by status.
