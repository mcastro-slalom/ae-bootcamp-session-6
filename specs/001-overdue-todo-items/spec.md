# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todo-items`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "As a todo application user, I want to easily identify and distinguish overdue tasks in my todo list so that I can prioritize my work and quickly see which tasks are past their due date. Users need a clear, visual way to identify todos that have not been completed by their due date. Automated tests must cover overdue determination logic and its display, following the existing Jest patterns in the repository."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identify overdue todos (Priority: P1)

As a todo application user, I want overdue, incomplete tasks to be clearly distinguished in my todo list so I can prioritize work without manually comparing due dates with today's date.

**Why this priority**: Recognizing overdue work is the complete value of this feature and lets users make prioritization decisions quickly.

**Independent Test**: Display a list containing incomplete todos with past, current, and future due dates, as well as a completed todo with a past due date and a todo without a due date. Verify that only the past-due incomplete todo is identified as overdue and that the distinction is apparent in the list. Automated tests verify both the date-based determination and the visible overdue distinction.

**Acceptance Scenarios**:

1. **Given** an incomplete todo whose due date is before today's calendar date, **When** the user views the todo list, **Then** the todo is identified with a clear overdue label and visual distinction.
2. **Given** an incomplete todo due today or in the future, **When** the user views the todo list, **Then** it is not identified as overdue.
3. **Given** a completed todo with a past due date, **When** the user views the todo list, **Then** it is not identified as overdue.
4. **Given** a todo without a due date, **When** the user views the todo list, **Then** it is not identified as overdue.
5. **Given** an incomplete todo due today, **When** the calendar date advances to the following day and the user views the todo list, **Then** it is identified as overdue without the user changing the todo.
6. **Given** the overdue rules and list presentation, **When** automated test coverage is reviewed, **Then** it verifies the overdue boundary cases and the visible overdue distinction using existing repository conventions.

### Edge Cases

- A todo due on today's calendar date is not overdue, regardless of the time of day it is viewed.
- A completed todo remains non-overdue even if its due date is in the past.
- A todo with no due date is never identified as overdue.
- The overdue distinction remains understandable without relying on color alone.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST identify a todo as overdue when it is incomplete and its due date is earlier than the current calendar date.
- **FR-002**: The application MUST NOT identify a todo as overdue when it is complete, has no due date, or has a due date equal to or later than the current calendar date.
- **FR-003**: The todo list MUST make overdue todos visually distinct and provide a clear text label identifying them as overdue.
- **FR-004**: The overdue distinction MUST remain understandable without relying on color alone.
- **FR-005**: The application MUST reflect the change to overdue status when the calendar date advances, without requiring the user to edit the todo.
- **FR-006**: Automated tests MUST cover overdue determination and the overdue distinction shown in the todo list, following the repository's existing test conventions.

### Key Entities

- **Todo**: A task with a completion state and an optional due date. Its overdue status is determined by its completion state and due date relative to the current calendar date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All five specified combinations (incomplete with a past, current, or future due date; completed with a past due date; and no due date) produce the correct overdue or not-overdue outcome.
- **SC-002**: Every overdue todo displayed in the list is identifiable by both an explicit text label and a visual distinction that does not depend on color alone.
- **SC-003**: Users can identify overdue todos from the list without manually comparing each due date with today's date.

## Assumptions

- Due dates are interpreted at calendar-date granularity: a todo becomes overdue on the day after its due date, not later on the due date itself.
- Existing todo creation, editing, completion, and list behavior remain unchanged apart from the overdue indication.
- Automated coverage will use the repository's established test conventions for both the overdue rule and its list presentation.
