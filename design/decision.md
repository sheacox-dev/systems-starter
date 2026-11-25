# Design decision: main screen

**Chosen:** [Mockup B, two-sided week](mockups/b-two-sided-week.html)
**Rejected:** [Mockup A, Today first](mockups/a-today-first.html) and [Mockup C, guided check-in](mockups/c-guided-check-in.html)

Citations match `discovery/requirements.md`. The evidence for Problem B is one interview, and no mockup has been tested with a user yet.

## Why I chose B

- **It shows the overlap.** The student doesn't know what to prioritize "especially when assignments and work deadlines overlap" [FR-B2; Interview 2, Q2]. B puts school on one side of each day and work and internship on the other, so a collision is a row filled on both sides.
- **An assignment stays in view during a busy work stretch.** The student forgot one while focused on work [FR-B4; Interview 2, Q1]. In B, every assignment this week is on the same screen as the shifts.
- **It is one place.** Information is "spread out across different apps" [FR-B1; Interview 2, Q4], and the overlap happens "pretty much every week" [Interview 2, Q3].
- **It still says what to do first.** The numbers 1, 2, and 3 mark the soonest-due unfinished items [FR-B3; Interview 2, Q2].
- **Adding takes fewer steps.** The date and type come from where the student clicks. This may help with not remembering to update a planner [NFR-B1; Interview 2, Q5], but it does not remove that risk.

## Why I rejected A and C

**A, Today first.** It is the calmest screen and keeps strictly to the 3-item limit [FR-B5, NFR-B2; Interview 2, Q5]. But it puts the overlap on a second screen, and overlap is part of the hardest part [Interview 2, Q2]. In the sample week, a shift and an internship task took two of the three places and pushed the Econ problem set out of the list, leaving it only in the banner. That is close to what went wrong in Interview 2, Q1. A also assumes mostly phone use: no evidence yet.

**C, guided check-in.** It is the best answer to forgetting to update [NFR-B1; Interview 2, Q5], and choosing B gives that up. But it adds three questions before the student sees their work, and it shows one thing at a time, which hides the overlap [FR-B2; Interview 2, Q2]. Whether the student would answer the questions each time: no evidence yet.

## Main risk: a whole week could overwhelm

The student "add[s] too many things" to daily lists and gets overwhelmed when they can't finish everything [Interview 2, Q5; FR-B5, NFR-B2]. B shows every item in the week, and the sample week has 11. B is also close to the "full planner or calendar grid" the v1 spec rejected for the same reason.

What limits the risk: one row per day, only 3 numbered items, and no month or hour-by-hour grid. B does not limit how many items the student can add, so it only partly meets FR-B5.

How I'll know: in the usability test, show a full week and ask "What would you do first?" If the student scans the whole week instead of going to number 1, or says it feels like too much, go back to A's short list for the main screen.

## Heuristic check

Nielsen's usability heuristics, checked against the mockup by reading it, not by testing.

**#6 Recognition rather than recall: mostly passes.** The student doesn't have to remember what is due, what type it is, or which days collide, because all of it is on screen. They also don't have to re-enter the date when adding.

- Problem: nothing on the screen explains the numbers 1 to 3. The explanation is only in the caption outside it. Fix: add a short key, "1 to 3: do first".
- Problem: anything due after the visible days must be remembered. Fix: decide how the student reaches later dates.

**#8 Aesthetic and minimalist design: partly passes.** There is one screen, no menu, and one line of detail per item.

- Problem: "+ Add" on both sides of every day means at least 14 buttons. Fix: make them small and quiet.
- Problem: assignments in the banner also appear in the week. I'm keeping this repeat on purpose, because a forgotten assignment is the main failure [FR-B4; Interview 2, Q1].
- Problem: each item now needs a checkbox, which the mockup doesn't show and which adds to the clutter.
