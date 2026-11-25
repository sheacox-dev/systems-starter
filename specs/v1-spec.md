# <System name> v1, spec

> TODO: pick a name.

## Intent

This is for a college student who has assignments, work shifts, and internship tasks overlapping "pretty much every week" [Interview 2, Q3]. Today their information is "spread out across different apps" [Interview 2, Q4]. The job it does: put those responsibilities in one place, show where schoolwork and work collide, and give a short list of what to do first. The goal is that an assignment doesn't get forgotten during a busy work stretch [Interview 2, Q1]. See [`discovery/requirements.md`](../discovery/requirements.md), Problem B.

## Stories and acceptance criteria

See [`specs/user-stories.md`](user-stories.md):

- **S1 (FR-B1):** Put everything in one place
- **S2 (FR-B2, FR-B4):** See where deadlines collide
- **S3 (FR-B3, FR-B5):** Know what to do first, without a huge list

## Screens and flow

- Flow: [`design/flow.md`](../design/flow.md)
- Chosen mockup: [Mockup B, two-sided week](../design/mockups/b-two-sided-week.html). Why: [`design/decision.md`](../design/decision.md).
- One screen: the **week view**. It has the Due soon and Overdue banner, School on one side of each day and Work and internship on the other, Busy day markers, numbers 1 to 3, and an add form that opens inside a day.

## Data

For v1, everything is stored in the browser (localStorage). There are no accounts.

**Item**

| Field | Type | Notes |
|---|---|---|
| `id` | string | generated |
| `title` | string | required, not empty |
| `type` | `"assignment" \| "shift" \| "internship"` | required |
| `due` | date, optional time | date comes from the day clicked. No time means 11:59 PM that day. For a shift, this is its date and start time |
| `done` | boolean | default `false` |
| `createdAt` | timestamp | generated |

"Busy day", "Due soon", "Overdue", and the numbers 1 to 3 are worked out from the items when the app runs. They are not stored.

## Decisions already made

- Stack: Next.js (TypeScript) with Tailwind, deployed to Vercel.
- Store data in localStorage for v1, so nothing needs a sign-in or a server.
- **At most 3** items are numbered. FR-B5 and NFR-B2 say long lists overwhelmed the student [Interview 2, Q5], so the cap is deliberate. The week view still shows every item (see the risk in [`design/decision.md`](../design/decision.md)).
- Priority rule: soonest due first, with Assignments first on ties. It's simple, predictable, and easy to test. (Assumption, see Open questions.)
- A "Busy day" is any calendar day with an Assignment plus a Work shift or Internship item. This is the overlap the student described [Interview 2, Q2].
- The week view shows today and the next 6 days, plus earlier days with unfinished items, with Earlier and Later buttons. Without them, "+ Add" can't reach later dates. (Assumption, S1-AC9.)
- Time is optional and defaults to 11:59 PM. (Assumption, S1-AC10.)
- A shift loses its number once it starts. Upcoming shifts do count toward the 3. (Assumption, S3-AC4.)
- TODO: add your own decisions here, and why.

## Considered and rejected

- **Importing from Canvas and Google Calendar.** This would address NFR-B1 (not relying on the student to remember updates). It was rejected for v1 because it needs sign-in/OAuth or calendar-feed parsing on a server, which is too much for one sprint. It's the strongest candidate for v2.
- **A full planner or calendar grid.** The student already tried a planner and stopped updating it [Interview 2, Q5]. A heavier tool repeats that failure. Mockup B is close to this, so it stays to one row per day, with no month or hour-by-hour grid.
- **Unlimited daily to-do list.** Rejected because of FR-B5 [Interview 2, Q5].
- **Smart or AI prioritization.** We have no evidence for how the student actually ranks work. A rule they can predict is easier to trust and to test.

## Out of scope for v1

- Imports or syncing from Canvas, Google Calendar, Notes, or phone reminders
- Push notifications or reminders
- Accounts, sync across devices, sharing
- Recurring items (for example, a weekly shift)
- Problem A (tip splitting)

## Open questions

- **Riskiest assumption:** will the student keep entering items by hand, given they "don't always remember to update" a planner [Interview 2, Q5]? v1 doesn't solve this. The usability test and a week of real use should show whether it matters.
- Is "soonest due first" how the student actually decides what to do? [Interview 2, Q2] says they don't know how to prioritize, but not what rule they would trust.
- Should Assignments come first on ties? A guess.
- Is numbering 3 items right, and is 48 hours the right window for "Due soon"? Both are guesses.
- Should shifts take one of the 3 numbers, since they are attended and not worked on?
- Should done items stay visible, crossed out (S1-AC6)? Does a finished assignment still make a day "Busy" (S2-AC1 says yes)?
- Is the "Choose Work shift or Internship" wording clear (S1-AC5)?
- Are today plus 6 days (S1-AC9), the 11:59 PM default (S1-AC10), and dropping started shifts from the numbers (S3-AC4) right? All three are guesses.
- Should an old shift the student never checked off keep its day on screen? S1-AC9 says yes.
- Where are internship tasks tracked today? (Already marked "No evidence yet" in requirements.)
- Which device do they use most, phone or laptop? This affects the layout.
- Success measure: still "No evidence yet". One candidate is "no forgotten assignments over two weeks of use".
