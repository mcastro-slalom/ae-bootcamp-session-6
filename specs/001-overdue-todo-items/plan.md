# Implementation Plan: Support for Overdue Todo Items

**Branch**: `001-overdue-todo-items` | **Date**: 2026-10-27 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-overdue-todo-items/spec.md`

## Summary

Identify overdue todos in the React list by comparing each incomplete todo's
`YYYY-MM-DD` due-date string with the browser's current local calendar-date key.
Keep overdue status derived rather than persisted, refresh it at local midnight
and when the page resumes, and display a text label plus a non-color visual
distinction. No API, database, or new dependency changes are needed.

## Technical Context

**Language/Version**: JavaScript, Node.js 16+ (per project overview)

**Primary Dependencies**: React 18, Jest, React Testing Library; no new dependencies

**Storage**: Existing backend SQLite `todos` table; no schema or persistence changes

**Testing**: Jest and React Testing Library in `packages/frontend`

**Target Platform**: Browser targets in the frontend package's Browserslist

**Project Type**: JavaScript monorepo web application (`packages/frontend` and `packages/backend`)

**Performance Goals**: No feature-specific latency or throughput target; date comparison is per todo during list rendering.

**Constraints**: Use the user's browser-local calendar date; due dates remain date-only values. Preserve backend persistence, existing todo behavior, keyboard access, WCAG AA contrast, responsive layout, and the single-user scope.

**Scale/Scope**: Single-user todo application; derived status and presentation in the frontend only.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Single Responsibility and Simplicity — PASS**: Reuse the frontend list/card flow; avoid persistence or API changes and additional dependencies.
- **II. Behavior-First Testing — PASS**: Add focused date-rule and rendered-list tests, including the date boundary and date rollover behavior.
- **III. Reliable Data and Failure Handling — PASS**: Todo data remains persisted by the backend; overdue status is derived display state and does not change write operations.
- **IV. Accessible and Consistent Interaction — PASS**: Show an explicit overdue text label and a visual treatment not reliant on color, following existing responsive and theme styling.
- **V. Scope-Focused Delivery — PASS**: No authentication, collaboration, reminders, filtering, or other excluded feature is introduced.

No gate violations or complexity exceptions are required.

### Post-design re-check

- **I. Single Responsibility and Simplicity — PASS**: Date comparison remains a focused frontend utility, with current-date refresh owned by the existing application/list flow.
- **II. Behavior-First Testing — PASS**: Design includes isolated comparison tests and rendered UI tests for overdue criteria and date rollover.
- **III. Reliable Data and Failure Handling — PASS**: No persisted or server-derived status is introduced; existing API writes and failure handling remain unchanged.
- **IV. Accessible and Consistent Interaction — PASS**: The design requires text plus a non-color visual cue and preserves theme, keyboard, contrast, and responsive expectations.
- **V. Scope-Focused Delivery — PASS**: The design is confined to local-date computation and todo-list presentation.

The design passes all constitution gates; no exceptions are required.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todo-items/
├── plan.md              # This file
├── research.md          # Date handling and design decisions
├── data-model.md        # Existing todo fields and derived overdue status
├── quickstart.md        # Feature validation guide
├── contracts/
│   └── todo-list-overdue-ui.md
└── tasks.md             # Created later by /speckit-tasks
```

### Source Code (repository root)

```text
packages/frontend/src/
├── App.js
├── App.css
├── components/
│   ├── TodoCard.js
│   ├── TodoList.js
│   └── __tests__/
│       ├── TodoCard.test.js
│       └── TodoList.test.js
└── utils/
    ├── todoDateUtils.js
    └── __tests__/
        └── todoDateUtils.test.js

packages/backend/src/
└── app.js               # No changes planned
```

**Structure Decision**: Keep behavior in the frontend because overdue is a
user-local, date-derived display status. Put calendar-date conversion and
comparison in a small frontend utility. Keep the current local date key in
application state, update it at the next local midnight and on page-resume
events, then pass it through the existing list/card presentation path. The
user-facing list behavior is specified in `contracts/todo-list-overdue-ui.md`;
backend persistence and API contracts remain unchanged.

## Complexity Tracking

No constitution violations.
