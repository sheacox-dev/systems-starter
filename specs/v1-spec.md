# <System name> v1, spec

> TODO: pick a name.

## Intent

This is for a college student who has assignments, work shifts, and internship tasks overlapping "pretty much every week" [Interview 2, Q3]. Today their information is "spread out across different apps" [Interview 2, Q4]. The job it does: put those responsibilities in one place, show where schoolwork and work collide, and number the first few things to do. The goal is that an assignment doesn't get forgotten during a busy work stretch [Interview 2, Q1]. See [`discovery/requirements.md`](../discovery/requirements.md), Problem B.

## Stories and acceptance criteria

See [`specs/user-stories.md`](user-stories.md):

- **S1 (FR-B1):** Put everything in one place
- **S2 (FR-B2, FR-B4):** See where deadlines collide
- **S3 (FR-B3, FR-B5):** Know what to do first, without a huge list

## Screens and flow

- Flow: [`design/flow.md`](../design/flow.md)
- Chosen mockup: [Mockup B, two-sided week](../design/mockups/b-two-sided-week.html)
- Why it was chosen: [`design/decision.md`](../design/decision.md)
- One screen: the **week view**. It has the Due soon and Overdue banner, School on one side of each day and Work and internship on the other, Busy day markers, numbers 1 to 3, and an add form that opens inside a day.

## Data

For v1, everything lives in the browser's localStorage. There are no accounts. The one thing stored is a list of Items. localStorage holds only text, so dates are saved as strings.

**Item**

| Field | Type | Notes | Used by |
|---|---|---|---|
| `id` | string | generated | No AC names it. Needed to check off the right item when two look alike (S1-AC6, S1-AC13, S1-AC16) |
| `name` | string | required, not empty | S1-AC3, S1-AC4 |
| `side` | `"school" \| "work"` | from the side clicked. Always `"school"` for an assignment and `"work"` for a shift or internship | S1-AC3, S2-AC1, S2-AC2 |
| `type` | `"assignment" \| "shift" \| "internship"` | required | S1-AC1, S1-AC2, S1-AC3, S1-AC5, S2-AC1, S2-AC3, S2-AC4, S3-AC1, S3-AC4 |
| `dueDate` | string, `YYYY-MM-DD` | required, from the day clicked. For a shift, the day it starts | S1-AC1, S1-AC2, S1-AC3, S1-AC9, S1-AC14, S1-AC15, S2-AC1 to S2-AC4, S3-AC1, S3-AC3, S3-AC4, S3-AC5 |
| `dueTime` | string, `HH:MM`, or null | optional. Null means 11:59 PM that day. For a shift, its start time | S1-AC10, S2-AC3, S2-AC4, S3-AC1, S3-AC3, S3-AC4 |
| `done` | boolean | default `false` | S1-AC6, S1-AC7, S1-AC13, S1-AC14, S1-AC16, S2-AC3, S2-AC4, S3-AC1 to S3-AC4 |
| `createdAt` | string, ISO date and time | generated | S3-AC1 (which item was added earlier) |

The saved list as a whole is what S1-AC7, S1-AC8, S1-AC11, and S1-AC12 are about.

Not stored:

- **Worked out from the items when the app runs:** "Busy day", "Due soon", "Overdue", the numbers 1 to 3, and "Nothing urgent. Nice."
- **Read from the device's clock:** the current date and time (S1-AC9, S1-AC14, S2-AC3, S2-AC4, S3-AC3, S3-AC4).
- **On screen only:** which week is showing (S1-AC15), what is typed in an open form (S1-AC1, S1-AC2, S1-AC17), and error messages (S1-AC4, S1-AC5, S1-AC12, S1-AC16).

## Decisions already made

Reasons marked **(draft)** were not recorded anywhere and need the student's confirmation.

- **Stack:** Next.js (TypeScript) with Tailwind, deployed to Vercel. Reason: it is the course stack, set in `CLAUDE.md`.
- **Problem B over Problem A.** Reason **(draft)**: the student described an actual recent failure, a forgotten assignment [Interview 2, Q1], while the manager described difficulty but no split that went wrong [Interview 1, Q2, Q5].
- **localStorage for v1.** Reason: nothing needs a sign-in or a server.
- **Due soon means an unfinished Assignment due between now and 48 hours from now, including exactly 48.** Reason **(draft)**: a forgotten assignment is the main failure [Interview 2, Q1], and two days leaves time to act on it. (Assumption, S2-AC3.)
- **Tie-break: soonest due first, then Assignment first, then the item added earlier.** Reason: it's simple, predictable, and easy to test. (Assumption, S3-AC1.)
- **A failed save undoes the check.** Reason **(draft)**: the screen should never show a change that wasn't saved. (S1-AC16.)
- **At most 3** items are numbered. Reason: long lists overwhelmed the student [FR-B5, NFR-B2; Interview 2, Q5]. The week view still shows every item (see the risk in [`design/decision.md`](../design/decision.md)).
- **Busy day** is any calendar day with an Assignment plus a Work shift or Internship item. Reason: this is the overlap the student described [Interview 2, Q2].
- **The week view shows today and the next 6 days**, plus earlier days with unfinished items, with Earlier and Later buttons. Reason: without them, "+ Add" can't reach later dates. (Assumption, S1-AC9, S1-AC14, S1-AC15.)
- **Time is optional and defaults to 11:59 PM.** Reason: S3 and the 48-hour rule need a time to compare. (Assumption, S1-AC10.)
- **A shift loses its number once it starts.** Reason: otherwise an unchecked old shift stays number 1. Upcoming shifts do count toward the 3. (Assumption, S3-AC4.)
- **Cancel closes the form without saving.** Reason: without it, a student whose saves keep failing can't leave the form. (S1-AC17.)

## Considered and rejected

Mockups. Reasons for A and C come from [`design/decision.md`](../design/decision.md). That file was written before D, E, and F, so their reasons are **(draft)**, from reading the mockups and not from testing.

- **[Mockup A, Today first](../design/mockups/a-today-first.html).** It puts the overlap on a second screen and pushed the Econ problem set out of the list.
- **[Mockup C, guided check-in](../design/mockups/c-guided-check-in.html).** It asks three questions before the student sees their work, and showing one thing at a time hides the overlap.
- **[Mockup D, urgency board](../design/mockups/d-urgency-board.html) (draft).** Columns by time left split a Busy day: Wednesday's shift and assignment land in different columns [FR-B2].
- **[Mockup E, capture line](../design/mockups/e-capture-line.html) (draft).** The app has to guess the type and date from typed text, which adds work and a new way to be wrong.
- **[Mockup F, Busy days first](../design/mockups/f-busy-days-first.html) (draft).** It shows collisions well [FR-B2], but today's shift is far down the screen.
- D, E, and F also have no School and Work sides to click, so S1-AC1 and S1-AC2 would have to change.

Other ideas:

- **Problem A (tip splitting).** It is a different problem with a different user, and there is no evidence one system should solve both ([`discovery/requirements.md`](../discovery/requirements.md)). Why B was picked instead is under Decisions.
- **Importing from Canvas and Google Calendar.** This would address NFR-B1 (not relying on the student to remember updates). It was rejected for v1 because it needs sign-in/OAuth or calendar-feed parsing on a server, which is too much for one sprint. It's the strongest candidate for v2.
- **A full planner or calendar grid.** The student already tried a planner and stopped updating it [Interview 2, Q5]. A heavier tool repeats that failure. Mockup B is close to this, so it stays to one row per day, with no month or hour-by-hour grid.
- **Unlimited daily to-do list.** Rejected because of FR-B5 [Interview 2, Q5].
- **Smart or AI prioritization.** We have no evidence for how the student actually ranks work. A rule they can predict is easier to trust and to test.

## Out of scope for v1

The MVP scope in [`discovery/requirements.md`](../discovery/requirements.md) says "Out of scope: No evidence yet." The first item is the MVP candidates there that v1 leaves out. The rest are choices made for v1.

- Problem A (tip splitting): FR-A1, FR-A2, FR-A3, FR-A4, and FR-A6, plus FR-A5, which was not an MVP candidate
- Canvas and Google Calendar import, and syncing from Notes or phone reminders
- Push notifications or reminders
- Accounts, sync across devices, sharing
- Recurring items (for example, a weekly shift)

## Open questions

From the gaps in [`design/flow.md`](../design/flow.md):

- **Gap 3, both errors at once.** If the name and type are both missing, which error shows? The flow checks the name first, but no AC sets that order.
- **Gap 4, first visit.** A new student and one whose data was lost both see the same empty week (S1-AC8, S1-AC11). Should they?
- **Gap 5, later items after a reload.** S1-AC7 says every saved item still shows, but S1-AC9 shows only 7 days. Does "still show" include items reached with Later?

Unconfirmed assumptions:

- **Riskiest assumption:** will the student keep entering items by hand, given they "don't always remember to update" a planner [Interview 2, Q5]? v1 doesn't solve this. The usability test and a week of real use should show whether it matters.
- Is "soonest due first" how the student actually decides what to do? [Interview 2, Q2] says they don't know how to prioritize, but not what rule they would trust.
- Should Assignments come first on ties (S3-AC1)? A guess.
- When two items of the same type are due at the same time, should the one added earlier come first (S3-AC1)? A guess.
- Is numbering 3 items right, and is 48 hours the right window for "Due soon"? Both are guesses.
- Should exactly 48 hours count as Due soon (S2-AC3)? A guess.
- Should shifts take one of the 3 numbers, since they are attended and not worked on?
- Should done items stay visible, crossed out (S1-AC6)? Does a finished assignment still make a day "Busy" (S2-AC1 says yes)?
- Is the "Choose Work shift or Internship" wording clear (S1-AC5)?
- Is the "Couldn't save. Try again." wording clear (S1-AC12, S1-AC16)?
- "Undo the check" (S1-AC16): if unchecking fails, does the item stay done? Assumed yes.
- Are today plus 6 days (S1-AC9), the 11:59 PM default (S1-AC10), moving by 7 days with Earlier and Later (S1-AC15), and dropping started shifts from the numbers (S3-AC4) right? All are guesses.
- Should an old shift the student never checked off keep its day on screen? S1-AC14 says yes.
- Should an item with no valid due date just go unnumbered (S3-AC5)? If so, where does it appear, since it has no day in the week?

Still undecided:

- If saved data is unreadable (S1-AC11), should a copy be kept? Otherwise the next save replaces it.
- Does Item need `side`? `type` already decides it, so storing both means they could disagree.
- Are the reasons marked **(draft)** under Decisions and Considered and rejected right? Should `design/decision.md` cover D, E, and F?
- Where are internship tasks tracked today? (Already marked "No evidence yet" in requirements.)
- Which device do they use most, phone or laptop? This affects the layout.
- Success measure: still "No evidence yet". One candidate is "no forgotten assignments over two weeks of use".
