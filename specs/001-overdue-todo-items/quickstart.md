# Quickstart: Validate Overdue Todo Items

## Prerequisites

- Node.js 16 or newer and npm 7 or newer.
- Project dependencies installed from the repository root.

## Automated validation

Run the frontend Jest and React Testing Library suite, including overdue date
boundary, date rollover, and rendered-card assertions:

```bash
npm test --workspace=frontend -- --watchAll=false --runInBand
```

Expected result: the frontend test suite passes, including cases for an
incomplete todo due yesterday, today, and tomorrow; a completed past-due todo;
a todo without a due date; and the visible overdue label and non-color
distinction. A clock-controlled test verifies that a todo due today becomes
overdue when the local date advances without editing the todo.

Build the frontend to validate the production bundle:

```bash
npm run build --workspace=frontend
```

Expected result: the frontend production build completes without errors.

## Manual browser check

1. Start the frontend and backend from the repository root:

   ```bash
   npm run start
   ```

2. Add an incomplete todo with yesterday's date as its due date. Confirm its
   card visibly identifies it as overdue with a text label, including when
   color is unavailable.
3. Add an incomplete todo due today and another due in the future. Confirm
   neither has an overdue indication.
4. Mark a past-due todo complete. Confirm the overdue indication is removed.
5. Leave a todo due today in the open list through the local date change or
   simulate the date rollover with the automated clock test. Confirm it becomes
   overdue without editing the todo.
6. Hide the page across a date change and restore it. Confirm the overdue
   status reflects the current local date.

For the entity shape and derived rule, see [data-model.md](./data-model.md).
For the exact user-visible behavior, see
[contracts/todo-list-overdue-ui.md](./contracts/todo-list-overdue-ui.md).
