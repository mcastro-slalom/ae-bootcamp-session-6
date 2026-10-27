# Todo List Overdue UI Contract

This contract describes the user-visible todo-list behavior. The feature does
not change the backend API or persisted todo shape.

## Overdue presentation

- An incomplete todo with a due date earlier than the user's current local
  calendar date is identified by the visible text label **Overdue**.
- Its card has an additional visual distinction that remains understandable
  without color (for example, a border treatment or a non-color marker).
- Existing todo content, completion controls, and actions remain available.

## Non-overdue presentation

The **Overdue** label and overdue visual distinction are absent when the todo:

- is complete, regardless of due date;
- has no due date; or
- is due today or later in the user's local calendar.

## Date rollover

When the user's local calendar date advances past an incomplete todo's due
date, the list updates the todo's presentation without requiring a todo edit.
The current local date is refreshed at local midnight and when the page resumes.

## Accessibility

The overdue state is conveyed in visible text as well as a visual cue; color is
not the sole means of identifying it.
