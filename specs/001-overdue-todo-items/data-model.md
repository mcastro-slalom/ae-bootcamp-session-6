# Data Model: Support for Overdue Todo Items

## Todo

Existing todo record; no schema change is planned.

| Field | Type / shape | Constraints and use |
|---|---|---|
| `id` | Numeric identifier | Existing unique record identifier. |
| `title` | String | Required; at most 255 characters. |
| `dueDate` | `YYYY-MM-DD` string or `null` | Optional calendar date, with no time or timezone stored. |
| `completed` | Boolean-like value (`0`/`1` in the current API) | Completed todos are never overdue. |
| `createdAt` | Timestamp | Existing creation timestamp; unchanged by this feature. |

### Derived status: overdue

`overdue` is not a stored field. For the user's browser-local date key
`today` (`YYYY-MM-DD`), a todo is overdue when all of the following hold:

1. `completed` is false (`0`).
2. `dueDate` is present.
3. `dueDate` is earlier than `today`.

The canonical, fixed-width date-only format allows chronological string
comparison. Do not parse a due-date string as a JavaScript timestamp to
determine its calendar day. Refresh `today` at local midnight and when the
browser page resumes so the derived status does not remain stale while the
list is open or suspended.

