# Research: Support for Overdue Todo Items

## Decision: Compare date-only values as local calendar-date keys

- **Decision**: Keep due dates as canonical `YYYY-MM-DD` strings. Construct the
  current date key from the browser's local year, month, and day, then compare
  the two fixed-width strings. A due date is overdue only when it sorts before
  today's key and the todo is incomplete.
- **Rationale**: The string format already used by the app represents a
  calendar date rather than a point in time. Fixed-width Gregorian date strings
  sort chronologically, and local date fields honor the clarified user-local
  date boundary. The native date input exposes a normalized `yyyy-mm-dd`
  value. Parsing that date-only string as a JavaScript `Date` treats it as UTC,
  which can shift its calendar day in some local time zones.
- **Alternatives considered**:
  - Parsing date-only values with `new Date(dueDate)` or `Date.parse`: rejected
    because JavaScript interprets ISO date-only strings as UTC and can shift the
    calendar day when viewed locally.
  - `Temporal.PlainDate`: semantically appropriate, but browser support remains
    limited relative to the project's existing browser targets and would add
    compatibility work or a polyfill.

References:

- [MDN: Date.prototype.getFullYear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)
- [MDN: Date.prototype.getMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
- [MDN: `<input type="date">` value](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date#value)
- [MDN: Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
- [MDN: Less-than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than)
- [MDN: Temporal.PlainDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate)

## Decision: Refresh the displayed current date at local midnight and on resume

- **Decision**: Keep the current local date in frontend state. Schedule a
  one-shot timeout to the next local midnight, recompute the date when it runs,
  and clean up the timeout and event listeners when the owning effect is
  disposed. Recompute and reschedule when the page becomes visible and on
  `pageshow` so restored or suspended pages use the current date.
- **Rationale**: A date comparison alone will not update an already-rendered
  list. A midnight timeout satisfies the rollover requirement without polling;
  recomputing from the current clock handles delayed timers, and resume events
  cover background or suspended tabs. Compute the next boundary with local
  calendar components rather than adding 24 hours to account for daylight
  saving transitions. Browser timers may be delayed in background tabs, so the
  timeout is a boundary trigger, not a guarantee of exact execution time.
- **Alternatives considered**:
  - Recompute only during rendering: rejected because the list may not render
    again when midnight passes.
  - A fixed 24-hour timeout: rejected because local days can differ in length
    during daylight saving transitions.
  - A short repeating interval: workable, but performs needless checks and
    still must recompute from the current date after delayed callbacks.

References:

- [React: useEffect](https://react.dev/reference/react/useEffect)
- [MDN: setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
- [MDN: visibilitychange event](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event)
- [MDN: pageshow event](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event)
- [MDN: local Date constructor components](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#individual_date_and_time_component_values)
- [MDN: background-tab timer throttling](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#policies_in_place_to_aid_background_page_performance)
- [MDN: setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval)

## Decision: Keep overdue status derived and frontend-only

- **Decision**: Do not add a persisted `overdue` field, backend calculation, API
  contract, or database migration.
- **Rationale**: Overdue status changes as the user's local date advances even
  when todo data is unchanged. Computing it for display keeps persisted data
  authoritative and avoids storing a value that can become stale.
- **Alternatives considered**:
  - Persisting or returning overdue status from the API: rejected because a
    server-side date boundary may differ from the user's local date, and the
    value would require recalculation as time passes.

  ## Caveats

  - Compare only date keys in the existing fixed-width `YYYY-MM-DD` representation;
    malformed or noncanonical date inputs are outside this feature's scope.
  - Recompute when the page resumes instead of assuming a timeout ran while a
    page was suspended. A system clock or time-zone change while the page remains
    active may not emit a visibility event; the feature does not add periodic
    polling for that case.
