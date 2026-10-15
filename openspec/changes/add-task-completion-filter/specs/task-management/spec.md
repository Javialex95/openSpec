## ADDED Requirements

### Requirement: Toggle task completion
The system SHALL let the user mark any task as completed and mark a completed task as not completed again. New tasks SHALL start as not completed.

#### Scenario: Mark a task as completed
- **WHEN** the user activates the completion control of a not completed task
- **THEN** the task is shown as completed

#### Scenario: Mark a task as not completed
- **WHEN** the user activates the completion control of a completed task
- **THEN** the task is shown as not completed

#### Scenario: New task is not completed
- **WHEN** the user creates a task
- **THEN** the task is shown as not completed

### Requirement: Completed tasks are visually distinct
The system SHALL display the title of a completed task with a line through it, and SHALL NOT do so for a task that is not completed.

#### Scenario: Completed title is struck through
- **WHEN** a task is completed
- **THEN** its title is shown with a line through it

#### Scenario: Reopened title is not struck through
- **WHEN** the user marks a completed task as not completed
- **THEN** its title is shown without a line through it

### Requirement: Filter tasks by completion status
The system SHALL provide a filter with the options All, Active, and Completed, with All selected by default. All SHALL show every task, Active SHALL show only tasks that are not completed, and Completed SHALL show only completed tasks. Tasks keep their creation order within any filter.

#### Scenario: Default filter
- **WHEN** the page is loaded
- **THEN** the All option is selected and every task is shown

#### Scenario: Active filter
- **WHEN** the user has one completed and one not completed task and selects Active
- **THEN** only the not completed task is shown

#### Scenario: Completed filter
- **WHEN** the user has one completed and one not completed task and selects Completed
- **THEN** only the completed task is shown

#### Scenario: Task leaves the view when its status changes
- **WHEN** the Active filter is selected and the user marks a task as completed
- **THEN** that task is no longer shown in the list

#### Scenario: Filter does not change stored tasks
- **WHEN** the user selects Completed and then selects All
- **THEN** all tasks are shown again

## MODIFIED Requirements

### Requirement: Display the list of tasks
The system SHALL display tasks in the order they were created, oldest first, subject to the selected filter. When there are no tasks, it SHALL show a message indicating that there are no tasks yet. When tasks exist but none match the selected filter, it SHALL show a message indicating that no tasks match.

#### Scenario: Tasks are listed
- **WHEN** the user has created "Task A" and then "Task B"
- **THEN** the list shows "Task A" above "Task B"

#### Scenario: No tasks yet
- **WHEN** there are no tasks
- **THEN** the page shows a message indicating that there are no tasks yet

#### Scenario: No tasks match the filter
- **WHEN** tasks exist but none of them match the selected filter
- **THEN** the page shows a message indicating that no tasks match, and not the "no tasks yet" message

### Requirement: Tasks persist across page reloads
The system SHALL store tasks, including their completion status, in the browser's localStorage and restore them when the page is loaded. Stored tasks that have no completion status SHALL be restored as not completed.

#### Scenario: Reload keeps tasks
- **WHEN** the user creates tasks and then refreshes the page
- **THEN** the same tasks are shown in the same order

#### Scenario: Reload keeps completion status
- **WHEN** the user marks a task as completed and then refreshes the page
- **THEN** the task is still shown as completed

#### Scenario: Tasks saved before completion existed
- **WHEN** the stored tasks have no completion status
- **THEN** they are shown as not completed and are not discarded

#### Scenario: Unreadable stored data
- **WHEN** the stored data is missing or is not valid task data
- **THEN** the page shows an empty task list without an error
