# Process flow: the main loop (S1 to S3)

This flow covers the student's main task: get everything into one place, then see what to do first. Everything happens on one screen, the two-sided week in [Mockup B](mockups/b-two-sided-week.html). It includes the empty state, the validation errors, and what happens when the list runs out.

There is one role (the student) and no other system in v1, so the diagram needs no swimlanes. If Canvas or Google Calendar import is added later, give each one a subgraph.

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
