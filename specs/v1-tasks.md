# v1 tasks

**Status: plan approved Nov 23, 2026. Task 0 checked. Task 1 is built and waiting for the student to check it.**

Design: [Mockup B](../design/mockups/b-two-sided-week.html). Criteria IDs are in [user-stories.md](user-stories.md).
Stack: Next.js, TypeScript, and Tailwind in `app/`. Data in localStorage. Tests use Vitest.

How we work: build one task, stop, and check its criteria in the browser. A box is checked only after the student has seen it work.

## Decisions (approved Nov 23, 2026)

- **D1. Dates outside this week.** Show today and the next 6 days, earlier days that still have unfinished items, and Earlier and Later buttons. Without this, "+ Add" can't reach an assignment due in two weeks. Now S1-AC9.
- **D2. Time of day.** An optional time on the form. No time means 11:59 PM that day. S3 and the 48-hour rule need a time to compare. Now S1-AC10.
- **D3. Past shifts.** A shift stops being numbered once its start time passes. Otherwise an unchecked old shift stays number 1. Now S3-AC4.

## Tasks

| Done | # | Task | Satisfies | Min |
|---|---|---|---|---|
| [x] | 0 | Update `design/flow.md` and leftover Today wording in `v1-spec.md` to match B; add D1 to D3 to the stories; list all assumptions under Open questions | Supports S1, S2, S3 | 20 |
| [ ] | 1 | Create the Next.js app in `app/` with Git setup turned off. If `app/.git` appears anyway, delete only that folder. Show a page title | Setup for S1, S2, S3 | 20 |
| [ ] | 2 | Set up Vitest; define the Item type; write and test the function that lists the week's days | Supports S1-AC1, S1-AC2 | 25 |
| [ ] | 3 | Show the empty two-sided week with today marked and "+ Add" on both sides (not working yet) | S1-AC8 | 25 |
| [ ] | 4 | School "+ Add" opens a form and saves an Assignment on that day | S1-AC1, S1-AC3 (School side) | 25 |
| [ ] | 5 | Work-side "+ Add" asks Work shift or Internship and saves | S1-AC2, S1-AC3 (work side) | 20 |
| [ ] | 6 | Show form errors for an empty name and no type | S1-AC4, S1-AC5 | 15 |
| [ ] | 7 | Save to and load from localStorage, including when stored data is missing or damaged | S1-AC7 (items) | 25 |
| [ ] | 8 | Checkbox marks an item done or unfinished and is saved | S1-AC6, S1-AC7 (done) | 20 |
| [ ] | 9 | Optional time on the form, 11:59 PM if blank | S1-AC10 (D2) | 20 |
| [ ] | 10 | Earlier days with unfinished items, plus Earlier and Later buttons | S1-AC9 (D1) | 30 |
| [ ] | 11 | Busy day marker, with tests | S2-AC1, S2-AC2 | 15 |
| [ ] | 12 | Due soon and Overdue banner, with tests for the 48-hour edge | S2-AC3, S2-AC4 | 30 |
| [ ] | 13 | Numbers 1 to 3 and their key, with tests for ties and past shifts | S3-AC1, S3-AC4 (D3) | 30 |
| [ ] | 14 | Renumber when an item is marked done or unfinished | S3-AC2 | 15 |
| [ ] | 15 | "Nothing urgent. Nice." message, with a test | S3-AC3 | 15 |
| [ ] | 16 | Narrow-screen and keyboard check; make "+ Add" quiet (decision.md, heuristics #6 and #8) | Supports S1-AC1, S1-AC2, S3-AC1 | 25 |
| [ ] | 17 | Enter the mockup's sample week, check every criterion, run `npm test` | All of S1, S2, S3 | 30 |
| [ ] | 18 | Deploy to Vercel (needs the student's account; ask first) | Supports S1, S2, S3 | 20 |

Total: about 7 hours.
