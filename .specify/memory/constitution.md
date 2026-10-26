<!--
Sync Impact Report
Version change: unversioned scaffold -> 1.0.0 (initial adoption)
Modified principles: None (initial constitution)
Added sections: Core Principles (five), Product and Technical Constraints,
	Development Workflow and Quality Gates
Removed sections: None
Follow-up TODOs: Confirm the original ratification date and replace
	TODO(RATIFICATION_DATE).
-->

# Copilot Bootcamp Session 6 Constitution

## Core Principles

### I. Single Responsibility and Simplicity
Modules, components, and functions MUST have a clear, focused responsibility. Implementations
MUST favor readable, straightforward solutions, reuse shared behavior where it removes duplication,
and avoid speculative abstractions or premature optimization. This keeps changes understandable
and maintainable across the frontend and backend.

### II. Behavior-First Testing
Every change to observable behavior MUST include or update tests that verify that behavior rather
than internal implementation details. Tests MUST use descriptive names, isolate their data and
dependencies, and remain understandable. Changes spanning the frontend and backend MUST include
integration coverage for their interactions. Contributors MUST review coverage reports against the
project's 80% coverage target.

### III. Reliable Data and Failure Handling
The backend API MUST validate incoming data at system boundaries and remain the persistence source
for todo changes. The interface MUST report operation failures with meaningful feedback and MUST
not present a failed change as successfully persisted. Errors MUST be handled at operations that
can fail, with enough context to support diagnosis without exposing implementation details to users.

### IV. Accessible and Consistent Interaction
Interactive controls MUST be keyboard accessible, have associated labels or descriptive accessible
names, and provide visible focus indicators. Text and controls MUST meet the project's WCAG AA
contrast requirement. UI changes MUST follow the established design system and responsive layout
guidance so core workflows remain usable across supported viewport sizes.

### V. Scope-Focused Delivery
Changes MUST address approved product requirements and MUST NOT introduce features explicitly
listed as out of scope without an approved requirement change. The initial product remains a
single-user todo application; authentication, collaboration, categories, reminders, advanced
filtering, and bulk operations are excluded. This keeps delivery focused on reliable core workflows.

## Product and Technical Constraints

The application is a JavaScript monorepo using npm workspaces, a React frontend, and an Express.js
backend API. Todo creation, viewing, editing, completion changes, and deletion MUST use the backend
persistence mechanism. Todos have a required title of at most 255 characters, an optional due date,
and a completion state; newly created todos are incomplete and appear newest first. Deletion
requires user confirmation. The application is single-user and does not require user-specific data
isolation.

The UI follows the documented visual system and responsive layout guidance. No additional
mobile-specific product features are required. Changes MUST preserve these product boundaries and
the established frontend/backend architecture unless this constitution is amended.

## Development Workflow and Quality Gates

Tests MUST be written before or alongside implementation and run for affected packages before a
change is submitted for review. Unit tests cover isolated behavior; integration tests cover
component interactions and frontend-to-backend communication. End-to-end tests are not required for
the initial development scope. Where linting is configured, contributors MUST resolve lint errors
before review.

Changes MUST be organized into focused commits with descriptive messages and submitted through a
pull request for review. Reviewers MUST check principle compliance, relevant tests, error handling,
and user-visible behavior. Project documentation in `docs/` supplies the detailed coding, testing,
functional, and UI guidance that implements these principles.

## Governance

This constitution governs project decisions and supersedes conflicting local practices. Amendments
MUST be proposed with their rationale and impact, reviewed through the project's pull request
process, and reflected in this document before dependent work relies on them. Each amendment MUST
update the last-amended date and increment the version using semantic versioning: MAJOR for
incompatible governance changes, MINOR for added principles or materially expanded guidance, and
PATCH for clarifications and non-semantic refinements.

Every pull request MUST be reviewed for compliance with the principles and applicable constraints.
Any exception MUST be explicit in the pull request, justified, and approved by the reviewers.
The constitution MUST be reviewed when product scope, architecture, or quality requirements change.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date is unknown; confirm with maintainers. | **Last Amended**: 2026-10-26
