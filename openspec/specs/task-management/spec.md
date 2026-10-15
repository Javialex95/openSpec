# task-management Specification

## Purpose

Lets users keep a simple list of tasks identified by a title, so they can add tasks, see them, and find them again after reloading the page.

## Requirements

### Requirement: Create a task with a title
The system SHALL let the user create a task by entering a title and submitting the form.

#### Scenario: Successful creation
- **WHEN** the user enters "Buy milk" and submits the form
- **THEN** a task titled "Buy milk" appears in the task list
- **AND** the title input is cleared

#### Scenario: Surrounding whitespace is trimmed
- **WHEN** the user submits "  Buy milk  "
- **THEN** the task is shown with the title "Buy milk"

### Requirement: Reject empty titles
The system SHALL NOT create a task when the title is empty or contains only whitespace.

#### Scenario: Empty title
- **WHEN** the user submits the form with an empty or whitespace-only title
- **THEN** no task is added and the task list is unchanged

### Requirement: Display the list of tasks
The system SHALL display all tasks in the order they were created, oldest first, and an empty-state message when there are none.

#### Scenario: Tasks are listed
- **WHEN** the user has created "Task A" and then "Task B"
- **THEN** the list shows "Task A" above "Task B"

#### Scenario: No tasks yet
- **WHEN** there are no tasks
- **THEN** the page shows a message indicating that there are no tasks yet

### Requirement: Tasks persist across page reloads
The system SHALL store tasks in the browser's localStorage and restore them when the page is loaded.

#### Scenario: Reload keeps tasks
- **WHEN** the user creates tasks and then refreshes the page
- **THEN** the same tasks are shown in the same order

#### Scenario: Unreadable stored data
- **WHEN** the stored data is missing or is not valid task data
- **THEN** the page shows an empty task list without an error
