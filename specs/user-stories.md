# User stories (v1)

Problem B from `discovery/requirements.md`: balancing school, work, and internship responsibilities.
Sources cite the requirement ID and the interview question, for example [FR-B1; Interview 2, Q4].

Assumptions that have no interview evidence yet are marked **(assumption)**. They also appear under Open questions in `specs/v1-spec.md`.

The stories match the chosen design, [Mockup B](../design/mockups/b-two-sided-week.html): one week view with School on one side of each day and Work and internship on the other. There is no Today screen. Each criterion has an ID, like S1-AC1, so tasks and tests can point to it.

---

### S1 (FR-B1): Put everything in one place

As a **college student**, I want **to add my assignments, work shifts, and internship tasks to one week**
so that **I don't have to check Canvas, Google Calendar, Notes, and reminders separately** [Interview 2, Q4].

Acceptance criteria:
- **S1-AC1:** WHEN the student clicks "+ Add" on the School side of a day THE SYSTEM SHALL open a form there for an Assignment on that day, without asking for a type or date.
- **S1-AC2:** WHEN the student clicks "+ Add" on the Work-and-internship side of a day THE SYSTEM SHALL open a form there for that day that asks Work shift or Internship, without asking for a date.
- **S1-AC3:** WHEN the student saves a valid item THE SYSTEM SHALL show it on that side of that day, labeled with its type.
- **S1-AC4:** IF the student saves an item with an empty name THE SYSTEM SHALL keep the form open, not save the item, and show "Give it a name, like 'Econ problem set'".
- **S1-AC5:** IF the student saves on the Work-and-internship side without choosing a type THE SYSTEM SHALL keep the form open, not save the item, and show "Choose Work shift or Internship". **(assumption: wording)**
- **S1-AC6:** THE SYSTEM SHALL show a checkbox on each item, and WHEN the student checks it THE SYSTEM SHALL mark the item done and keep it visible on its day, crossed out. **(assumption: done items stay visible)**
- **S1-AC7:** WHEN the student reloads the page THE SYSTEM SHALL still show every item saved before the reload, including whether it is done.
- **S1-AC8:** IF there are no items THE SYSTEM SHALL show "Nothing here yet. Add your first assignment or shift." with the "+ Add" buttons in the week.
- **S1-AC9:** WHEN the student opens the app THE SYSTEM SHALL show today and the next 6 days. **(assumption)**
- **S1-AC10:** THE SYSTEM SHALL offer an optional time on the form, and IF the student saves without one THE SYSTEM SHALL treat the item as due at 11:59 PM that day. **(assumption)**
- **S1-AC11:** IF the saved data is missing or unreadable as a whole THE SYSTEM SHALL open an empty week without crashing.
- **S1-AC12:** IF the browser can't save THE SYSTEM SHALL keep the form open and show "Couldn't save. Try again." **(assumption: wording)**
- **S1-AC13:** WHEN the student unchecks a done item THE SYSTEM SHALL mark it unfinished and remove the crossing-out.
- **S1-AC14:** WHEN the student opens the app and an earlier day has unfinished items THE SYSTEM SHALL also show that day. **(assumption)**
- **S1-AC15:** WHEN the student clicks Later or Earlier THE SYSTEM SHALL show the following or previous 7 days, with "+ Add" on every day. **(assumption)**
- **S1-AC16:** IF a checkbox change can't be saved THE SYSTEM SHALL undo the check and show "Couldn't save. Try again."
- **S1-AC17:** WHEN the student clicks Cancel on the form THE SYSTEM SHALL close it without saving.

### S2 (FR-B2, FR-B4): See where deadlines collide

As a **college student**, I want **to see which days have both schoolwork and work or internship commitments**
so that **an assignment doesn't slip while I'm focused on work** [Interview 2, Q1, Q2].

Acceptance criteria:
- **S2-AC1:** WHEN a day has at least one Assignment AND at least one Work shift or Internship item THE SYSTEM SHALL mark that day "Busy day" in the week view.
- **S2-AC2:** WHEN a day has items on only one side THE SYSTEM SHALL NOT mark it "Busy day".
- **S2-AC3:** WHEN an unfinished Assignment is due between now and 48 hours from now (exactly 48 hours counts) THE SYSTEM SHALL show it in a "Due soon" banner at the top of the week view, whatever else is in the week. **(assumption: 48 hours, including exactly 48)**
- **S2-AC4:** IF an Assignment's due date has passed and it is not marked done THE SYSTEM SHALL show it in the banner as "Overdue" instead of hiding it.

### S3 (FR-B3, FR-B5): Know what to do first, without a huge list

As a **college student**, I want **the first few things to do numbered in my week**
so that **I know what to prioritize and don't get overwhelmed by a long to-do list** [Interview 2, Q2, Q5].

Acceptance criteria:
- **S3-AC1:** THE SYSTEM SHALL number the 3 unfinished items with the soonest due dates 1, 2, 3 in the week view (ties: Assignment first, then the item added earlier). If fewer than 3 are unfinished, it numbers only those. **(assumption: 3 items, ordered by due date, Assignment first on ties, then the item added earlier)**
- **S3-AC2:** WHEN the student marks a numbered item done THE SYSTEM SHALL remove its number and renumber, so at most 3 items are numbered.
- **S3-AC3:** IF there are items, but no unfinished ones are overdue or due today or in the next 6 days (not counting shifts that have started) THE SYSTEM SHALL show "Nothing urgent. Nice." above the week.
- **S3-AC4:** WHEN a Work shift's start time passes THE SYSTEM SHALL stop numbering it, even if it is not marked done. **(assumption)**
- **S3-AC5:** IF a saved item has no valid due date THE SYSTEM SHALL leave it unnumbered and still number the other items. **(assumption)**
