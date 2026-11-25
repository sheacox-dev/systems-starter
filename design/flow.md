# Process flow

## S1, put everything in one place

This flow covers S1 in [`specs/user-stories.md`](../specs/user-stories.md): opening the week, adding an item, checking it off, and moving between weeks. A shorter overview of S1 to S3 is at the end. Screen: [Mockup B](mockups/b-two-sided-week.html).

There is one role (the student), and browser storage is part of the app, so there are no swimlanes.

```mermaid
flowchart TD
  OPEN(["Student opens or reloads the app"]) --> READ{"Saved data present and readable as a whole? (S1-AC11)"}
  READ -- No --> BAD["Error state: saved data missing or unreadable. Open an empty week without crashing (S1-AC11)"]
  BAD --> EMPTY
  READ -- Yes --> ANY{"Any saved items? (S1-AC8)"}
  ANY -- No --> EMPTY["Empty week, today and next 6 days: Nothing here yet. Add your first assignment or shift. (S1-AC8, S1-AC9)"]
  ANY -- Yes --> LOAD["Load every saved item, including whether it is done (S1-AC7)"]
  LOAD --> EARLY{"Any unfinished items on an earlier day? (S1-AC14)"}
  EARLY -- Yes --> OLD["Week view: today and next 6 days, plus those earlier days, checkbox on each item (S1-AC6, S1-AC9, S1-AC14)"]
  EARLY -- No --> WEEK["Week view: today and next 6 days, checkbox on each item (S1-AC6, S1-AC9)"]

  EMPTY --> ADD
  OLD --> ADD
  WEEK --> ADD

  ADD{"Student clicks + Add? (S1-AC1, S1-AC2)"}
  ADD -- Yes --> SIDE{"School side? (S1-AC1, S1-AC2)"}
  SIDE -- Yes --> FS["Open Assignment form on that day, optional time, no type or date asked (S1-AC1, S1-AC10)"]
  SIDE -- No --> FW["Open form on that day, asks Work shift or Internship, optional time, no date asked (S1-AC2, S1-AC10)"]
  FS --> FORM["Form open: student fills it in"]
  FW --> FORM

  FORM --> CANCEL{"Student clicks Cancel? (S1-AC17)"}
  CANCEL -- Yes --> CLOSE["Close the form without saving (S1-AC17)"]
  CLOSE --> ADD
  CANCEL -- No --> CLICK["Student clicks Save"]
  CLICK --> NAME{"Name filled in? (S1-AC4)"}
  NAME -- No --> ENAME["Error, not saved: Give it a name, like 'Econ problem set' (S1-AC4)"]
  ENAME -- "Form stays open, retry" --> FORM
  NAME -- Yes --> WORK{"Work-and-internship side? (S1-AC5)"}
  WORK -- Yes --> TYPE{"Type chosen? (S1-AC5)"}
  TYPE -- No --> ETYPE["Error, not saved: Choose Work shift or Internship (S1-AC5)"]
  ETYPE -- "Form stays open, retry" --> FORM
  WORK -- No --> TIME
  TYPE -- Yes --> TIME{"Time entered? (S1-AC10)"}
  TIME -- No --> NOTIME["Treat as due at 11:59 PM that day (S1-AC10)"]
  TIME -- Yes --> KEEP["Use the time entered (S1-AC10)"]
  NOTIME --> SAVE
  KEEP --> SAVE
  SAVE{"Browser saved it? (S1-AC12)"}
  SAVE -- No --> ESAVE["Error: Couldn't save. Try again. (S1-AC12)"]
  ESAVE -- "Form stays open, retry" --> FORM
  SAVE -- Yes --> SHOWN["Item appears on that side of that day, labeled with its type (S1-AC3)"]
  SHOWN --> ADD

  ADD -- No --> CHECK{"Student clicks an item's checkbox? (S1-AC6, S1-AC13)"}
  CHECK -- Yes --> DONE{"Item already done? (S1-AC6, S1-AC13)"}
  DONE -- No --> MARK["Mark done, keep on its day, crossed out (S1-AC6)"]
  DONE -- Yes --> UNMARK["Mark unfinished, remove crossing-out (S1-AC13)"]
  MARK --> KEPT{"Browser saved the change? (S1-AC7, S1-AC16)"}
  UNMARK --> KEPT
  KEPT -- No --> ECHECK["Undo the check. Error: Couldn't save. Try again. (S1-AC16)"]
  ECHECK -- "Back to the week, retry" --> ADD
  KEPT -- Yes --> ADD

  CHECK -- No --> NAV{"Student clicks Later or Earlier? (S1-AC15)"}
  NAV -- Yes --> MOVE["Show following or previous 7 days, + Add on every day (S1-AC15)"]
  MOVE --> ADD
  NAV -- No --> RELOAD{"Student reloads the page? (S1-AC7)"}
  RELOAD -- Yes --> OPEN
  RELOAD -- No --> STOP(["Student finishes looking at the week"])
```

### Which ACs each path covers

| Path | ACs |
|---|---|
| Open, saved data missing or unreadable, empty week | S1-AC11, then S1-AC8 and S1-AC9 |
| Open, data readable but no items, empty week | S1-AC8, S1-AC9 |
| Open or reload with saved items | S1-AC6 (checkbox shown), S1-AC7, S1-AC9, S1-AC14 |
| Add on the School side | S1-AC1, S1-AC3, S1-AC10 |
| Add on the Work-and-internship side | S1-AC2, S1-AC3, S1-AC10 |
| Empty name, retry | S1-AC4 |
| No type chosen, retry | S1-AC5 |
| Save fails, retry | S1-AC12 |
| Cancel the form | S1-AC17 |
| Check or uncheck an item | S1-AC6, S1-AC7, S1-AC13 |
| Checkbox change can't be saved, retry | S1-AC16 |
| Later or Earlier | S1-AC15 |

### ACs the flow doesn't reach

**None.** S1-AC1 to S1-AC17 each appear on at least one node.

S2 and S3 criteria are not in this flow, because it covers S1 only. Their main steps are in the overview below.

### Open questions

These have no S1 criterion, so the diagram doesn't invent an answer:

- **Both errors at once.** If the name and type are both missing, the diagram checks the name first. No criterion sets that order.
- **First visit.** A new student has no saved data, so they take the S1-AC11 "missing" path. It looks the same as the normal empty week, but so does lost data.
- **Later items after a reload.** S1-AC7 says every saved item still shows, but S1-AC9 shows only 7 days. Items further out need Later.

## Overview: S1–S3

This is the earlier diagram of the whole v1 loop, unchanged. It leaves out some newer S1 rules, such as save failures and Cancel. Where the two differ, follow the S1 flow above and [`specs/user-stories.md`](../specs/user-stories.md).

```mermaid
flowchart TD
  A[Student opens the app] --> B{Any items saved?}
  B -- No --> C[Week view with message: Nothing here yet. Add your first assignment or shift.]
  B -- Yes --> D{Unfinished assignment due within 48h or overdue?}
  D -- Yes --> D1[Due soon or Overdue banner at top]
  D -- No --> W
  D1 --> W[Week view: today and next 6 days, plus earlier days with unfinished items]

  W --> W1{Day has items on both sides?}
  W1 -- Yes --> W2[Mark day Busy day]
  W1 -- No --> W3[Show day normally]

  W --> N2[Number up to 3 unfinished items, soonest due first, Assignment first on ties, skipping started shifts]
  W --> N{Any unfinished item overdue or due today or in the next 6 days, not counting started shifts?}
  N -- No --> N1[Message: Nothing urgent. Nice.]
  N -- Yes --> N3[No message]

  W --> M[Student checks an item]
  M --> M1[Item stays on its day, crossed out, and the rest are renumbered] --> D

  W --> L[Student clicks Earlier or Later]
  L --> L1[Show previous or following 7 days]

  C --> E[Student clicks + Add on one side of a day]
  W --> E
  L1 --> E
  E --> S{Which side?}
  S -- School --> F1[Form: name, optional time. Type is Assignment]
  S -- Work and internship --> F2[Form: name, Work shift or Internship, optional time]
  F1 --> G1{Name filled in?}
  G1 -- No --> X1[Error: Give it a name, like Econ problem set] --> F1
  G1 -- Yes --> I
  F2 --> G2{Name filled in?}
  G2 -- No --> X2[Error: Give it a name, like Econ problem set] --> F2
  G2 -- Yes --> H{Type chosen?}
  H -- No --> X3[Error: Choose Work shift or Internship] --> F2
  H -- Yes --> I[Save to browser storage] --> D
```
