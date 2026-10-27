# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todo-items/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Required for this feature. Write the overdue logic and list presentation tests before implementation per the repository's Jest and React Testing Library conventions.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the frontend structure and test scaffolding needed for the overdue work.

- [ ] T001 [P] Confirm the existing React frontend layout and test locations in packages/frontend/src/App.js, packages/frontend/src/components/TodoList.js, and packages/frontend/src/components/TodoCard.js
- [ ] T002 [P] Create the overdue date utility test scaffold in packages/frontend/src/utils/__tests__/todoDateUtils.test.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the reusable local-date logic and visual treatment required before the overdue story can be implemented.

- [ ] T003 Create the shared local-date helper in packages/frontend/src/utils/todoDateUtils.js
- [ ] T004 [P] Add the current local-date refresh logic and resume/midnight recomputation in packages/frontend/src/App.js
- [ ] T005 [P] Define the overdue visual styling and accessible text treatment in packages/frontend/src/App.css

**Checkpoint**: Foundation ready - User Story 1 can now proceed independently.

---

## Phase 3: User Story 1 - Identify overdue todos (Priority: P1) 🎯 MVP

**Goal**: Show overdue, incomplete tasks with a text label and a non-color visual distinction while preserving the existing todo behavior.

**Independent Test**: Render a list containing past-due, current-date, future-due, completed past-due, and no-due-date todos. Verify that only the incomplete past-due item is labeled overdue and that the visible distinction is present without relying on color alone.

### Tests for User Story 1

- [ ] T006 [P] [US1] Add overdue comparison boundary tests for past, current, and future local dates in packages/frontend/src/utils/__tests__/todoDateUtils.test.js
- [ ] T007 [P] [US1] Add rendered list tests for the visible overdue label and non-color marker in packages/frontend/src/components/__tests__/TodoList.test.js

### Implementation for User Story 1

- [ ] T008 [P] [US1] Implement `getTodayKey`, `isTodoOverdue`, and related date guards in packages/frontend/src/utils/todoDateUtils.js
- [ ] T009 [US1] Update packages/frontend/src/App.js to compute and refresh the local current date and pass the derived overdue data through the list flow
- [ ] T010 [US1] Update packages/frontend/src/components/TodoList.js to derive the overdue state per todo and forward it to each card
- [ ] T011 [US1] Update packages/frontend/src/components/TodoCard.js to render the explicit "Overdue" label and a non-color visual distinction while keeping the existing todo actions intact
- [ ] T012 [US1] Apply the overdue styling and accessibility treatment in packages/frontend/src/App.css
- [ ] T013 [US1] Run the frontend Jest suite and fix any regressions in packages/frontend/src/components/__tests__ and packages/frontend/src/utils/__tests__

**Checkpoint**: At this point, User Story 1 should be fully functional and independently testable.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, consistency checks, and release-readiness review.

- [ ] T014 [P] Review the quickstart validation plan in specs/001-overdue-todo-items/quickstart.md and confirm the overdue UI matches the browser manual checks
- [ ] T015 [P] Run the frontend production build with `npm run build --workspace=frontend` in packages/frontend/package.json to confirm the package still compiles cleanly
- [ ] T016 Confirm the overdue feature preserves existing create, edit, toggle, and delete behaviors across packages/frontend/src/App.js, packages/frontend/src/components/TodoList.js, and packages/frontend/src/components/TodoCard.js

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion and must finish before User Story 1
- **User Story 1 (Phase 3)**: Depends on Foundational completion and is the MVP for this feature
- **Polish (Phase 4)**: Depends on the completed overdue story and validation steps

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories; this feature is a single-story MVP

### Within Each User Story

- Tests are written before implementation and cover boundary cases
- Date utility work precedes presentation work
- Presentation logic is implemented before final polish and release checks

### Parallel Opportunities

- Setup tasks T001 and T002 can run in parallel
- Foundation tasks T003/T004/T005 can proceed in parallel where the team is staffed for separate edits
- User Story 1 tests T006 and T007 can run in parallel
- User Story 1 implementation tasks T008 and T011 can be developed in parallel once the date-utility and UI contract are clear
- Polish tasks T014 and T015 can be executed in parallel as independent validation steps

---

## Parallel Example: User Story 1

```bash
# Run the overdue logic tests and list-rendering tests together
Task: "Add overdue comparison boundary tests in packages/frontend/src/utils/__tests__/todoDateUtils.test.js"
Task: "Add rendered list tests for visible overdue label and non-color marker in packages/frontend/src/components/__tests__/TodoList.test.js"

# Implement the utility and UI layers in parallel after the contract is agreed
Task: "Implement getTodayKey and isTodoOverdue in packages/frontend/src/utils/todoDateUtils.js"
Task: "Update packages/frontend/src/components/TodoCard.js to render the overdue label and non-color marker"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the overdue rule and UI with the targeted tests
5. Finish Phase 4: Polish and production validation

This keeps the feature narrowly scoped to the user-local overdue date behavior and allows it to ship as a single MVP without broader backend or storage changes.
