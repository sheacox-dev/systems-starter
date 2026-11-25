# v1 tasks

**Status: revised plan approved Nov 24, 2026. Task 0 checked. Task 1 is built and committed, passed Claude's check in the running app on Nov 24, and is waiting for the student to check it. Task 2 is built, passes its tests, and is waiting for the student to check it. It is not committed. The first plan was approved Nov 23, 2026.**

Design: [Mockup B](../design/mockups/b-two-sided-week.html). Criteria IDs are in [user-stories.md](user-stories.md).
Stack: Next.js, TypeScript, and Tailwind in `app/`. Data in localStorage. Tests use Vitest.

How we work: build one task, stop, and check its criteria in the browser. A box is checked only after the student has seen it work.

## Decisions (approved Nov 23, 2026)

- **D1. Dates outside this week.** Show today and the next 6 days, earlier days that still have unfinished items, and Earlier and Later buttons. Without this, "+ Add" can't reach an assignment due in two weeks. Now S1-AC9, S1-AC14, and S1-AC15.
- **D2. Time of day.** An optional time on the form. No time means 11:59 PM that day. S3 and the 48-hour rule need a time to compare. Now S1-AC10.
- **D3. Past shifts.** A shift stops being numbered once its start time passes. Otherwise an unchecked old shift stays number 1. Now S3-AC4.

## Decisions P1 to P5 (approved Nov 24, 2026)

- **P1. Does Item store `side`?** Yes, as the spec says now (the student's choice; the proposal was no). Because `type` also decides the side, set `side` in one place from `type`, so the two can't disagree.
- **P2. Name and type both missing (gap 3).** Show the name error first, as the flow does.
- **P3. Unreadable saved data (S1-AC11).** Open an empty week and keep no copy, as the criteria say now. The next save replaces the old data.
- **P4. An item with no valid due date (S3-AC5).** Leave it out of the week, since it has no day. The form can't create one, so it only comes from damaged data. This strains S1-AC7, "every item saved".
- **P5. Tests.** Add only Vitest. Put the rules in plain functions and test those, and check screens by hand. The Next.js guide also adds jsdom and React Testing Library, which v1 can do without.

## Tasks

| Done | # | Task | Satisfies | Min |
|---|---|---|---|---|
| [x] | 0 | Update `design/flow.md` and leftover Today wording in `v1-spec.md` to match B; add D1 to D3 to the stories; list all assumptions under Open questions | Supports S1, S2, S3 | 20 |
| [ ] | 1 | Create the Next.js app in `app/` with Git setup turned off. If `app/.git` appears anyway, delete only that folder. Show a page title | Setup for S1, S2, S3 | 20 |
| [ ] | 2 | Set up Vitest; define the Item type from the spec's Data section, with `side` (P1); write and test the function that turns a date and optional time into a moment, with 11:59 PM if blank and nothing if invalid | Supports S1-AC10, S3-AC5 | 25 |
| [ ] | 3 | Show the empty two-sided week, today and the next 6 days, with "+ Add" on both sides (not working yet). Load it only in the browser, so "today" comes from the student's device | S1-AC8, S1-AC9 | 25 |
| [ ] | 4 | School "+ Add" opens a form and saves an Assignment on that day | S1-AC1, S1-AC3 (School side) | 25 |
| [ ] | 5 | Work-side "+ Add" asks Work shift or Internship and saves | S1-AC2, S1-AC3 (work side) | 20 |
| [ ] | 6 | Show form errors for an empty name and no type (P2) | S1-AC4, S1-AC5 | 15 |
| [ ] | 7 | Save to and load from localStorage, including when stored data is missing or unreadable, with tests (P3) | S1-AC7 (items), S1-AC11 | 25 |
| [ ] | 8 | Checkbox marks an item done or unfinished and is saved | S1-AC6, S1-AC7 (done), S1-AC13 | 20 |
| [ ] | 9 | Optional time on the form, 11:59 PM if blank | S1-AC10 (D2) | 20 |
| [ ] | 10 | Show earlier days that have unfinished items when the app opens, with a test | S1-AC14 (D1) | 20 |
| [ ] | 11 | Busy day marker, with tests | S2-AC1, S2-AC2 | 15 |
| [ ] | 12 | Due soon and Overdue banner, with tests for the 48-hour edge | S2-AC3, S2-AC4 | 30 |
| [ ] | 13 | Numbers 1 to 3 and their key, with tests for order, ties, and fewer than 3 | S3-AC1 | 25 |
| [ ] | 14 | Renumber when an item is marked done or unfinished | S3-AC2 | 15 |
| [ ] | 15 | "Nothing urgent. Nice." message, with a test | S3-AC3 | 15 |
| [ ] | 16 | Narrow-screen and keyboard check; make "+ Add" quiet (decision.md, heuristics #6 and #8) | Supports S1-AC1, S1-AC2, S3-AC1 | 25 |
| [ ] | 17 | Enter the mockup's sample week, moved to this week's dates, and check every S1 criterion, including the forced failures below | All of S1 (S1-AC1 to S1-AC17) | 30 |
| [ ] | 18 | Deploy to Vercel (needs the student's account; ask first) | Supports S1, S2, S3 | 20 |
| [ ] | 19 | Write and test the function that lists the week's days, including month ends and clock changes | Supports S1-AC9, S1-AC15 | 20 |
| [ ] | 20 | Cancel on both forms closes the form and saves nothing | S1-AC17 | 10 |
| [ ] | 21 | When a form save fails, keep the form open and show the error, with a test | S1-AC12 | 15 |
| [ ] | 22 | When a checkbox change can't be saved, undo it and show the error, with a test for checking and unchecking | S1-AC16 | 15 |
| [ ] | 23 | Later and Earlier buttons move by 7 days, with "+ Add" on every day | S1-AC15 (D1) | 20 |
| [ ] | 24 | Re-read the clock every minute, so labels and numbers change while the app stays open | Supports S2-AC3, S2-AC4, S3-AC3, S3-AC4 | 15 |
| [ ] | 25 | Stop numbering started shifts and skip items with no valid due date, with tests (P4) | S3-AC4 (D3), S3-AC5 | 20 |
| [ ] | 26 | Check every S2 and S3 criterion, then run `npm test`, `npm run lint`, and `npm run build` | All of S2 (S2-AC1 to S2-AC4) and S3 (S3-AC1 to S3-AC5) | 25 |

Total left after tasks 0 and 1: 510 minutes, about 8.5 hours.

## Build order

Task numbers never change, so new tasks are 19 to 26. Build in this order:

1 → 2 → 19 → 3 → 4 → 5 → 20 → 6 → 7 → 21 → 8 → 22 → 9 → 10 → 23 → 24 → 11 → 12 → 13 → 25 → 14 → 15 → 16 → 17 → 26 → 18

## Build notes

- **Task 2 (Nov 24, 2026).** Uses Vitest 4, because Vitest 5 needs newer Node types than this app has. `npm test` runs once and stops. A saved time that is blank or damaged counts as 11:59 PM, so an item with a valid date keeps its day. Files: `app/src/lib/item.ts`, `app/src/lib/due.ts`, their tests, and `app/vitest.config.mts`.

## Forced failures, for checking by hand

Open the browser's developer tools (`Cmd+Option+I` in Chrome) on the running app.

- **Saving fails (S1-AC12, S1-AC16):** in the Console, run `Storage.prototype.setItem = () => { throw new Error("full") }`, then save an item or click a checkbox. Reload to undo it.
- **Saved data is unreadable (S1-AC11):** in Application, Local Storage, change the app's value to `not json`, then reload.
- **Saved data is missing (S1-AC11):** delete the app's value there, then reload.
