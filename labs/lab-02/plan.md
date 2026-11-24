# Plan: problem status and status filter

## Context

The Problem Tracker records problems but not whether they've been dealt with. This adds a status to each problem (Open, In progress, Solved) and a way to show only one status at a time. Solved problems are grayed out so open ones stand out.

Your choices:
- Status can be set in the add form and changed in the list.
- The filter is a dropdown: All, Open, In progress, Solved.
- A problem disappears right away if a status change means it no longer matches the filter.
- Solved problems look faded in the list.

## How it will behave

- **Add form:** a Status dropdown after Frequency, starting on Open and returning to Open after each add.
- **Problems you've already saved:** treated as Open. Nothing is rewritten in storage until you change a problem's status.
- **Solved problems:** gray text, a gray Delete button, and a card background that blends into the page. Their position doesn't change, and their controls still work. Open and In progress look the way problems do now. Solved ones are also faded when you filter to Solved.
- **Search and filter together:** a problem must match both.
- **Adding a problem:** clears the search (as it does now) and resets the filter to All, so the new problem is always visible.
- **Reloading the page:** the filter goes back to All, as search already does.
- **No matches:** the message becomes "No matching problems.", since either control could be the cause.
- **Filter label:** "Filter by status" instead of the mockup's "Status". This matches "Search by title" and avoids two identical labels on the page.

## Changes (only `index.html`)

1. **Markup**
   - Form: add a Status label and `<select id="status">` after Frequency.
   - List: add a "Filter by status" label and `<select id="status-filter" autocomplete="off">` below the search box.

2. **Status data:** next to `FREQUENCIES`, add `STATUSES` with the values `open`, `in-progress` and `solved`. Add:
   - `isStatus(value)`, like `isFrequency`.
   - `getStatus(problem)`, which returns `open` if the status is missing or invalid.
   - `fillStatusOptions(select, selected)`, with the selected option marked as the default so `form.reset()` returns to Open. The filter puts an "All" option (empty value) first.

3. **Saving:** turn `updateFrequency(id, frequency)` into `updateField(id, field, value)`, used for both fields. It keeps the same error handling and shows "The frequency/status couldn't be saved."

4. **Status in each list item:** add `createStatusField(problem)`, modelled on `createFrequencyField`, including going back to the old value if saving fails.
   - If the problem still matches the filter, don't redraw, so keyboard focus stays put. Add or remove the `solved` class on its card in place, after the save succeeds.
   - If it no longer matches, call `refresh()` and move focus to the nearest remaining status dropdown.

5. **Focus:** move the focus code in `deleteProblem` into `focusNearby(selector, position)`, shared by deletes and status changes. If nothing is left in the list, focus goes to the search box if it has text, then to the filter if one is set, then to the title field.

6. **Filtering:** add `matchesStatus(problem)`. `render()` uses it together with `matchesSearch`, and the new filter calls `refresh` on change.

7. **Submit handler:** check the status with `isStatus`, save it on the new problem, and reset the search and filter.

8. **CSS:** put Frequency and Status in a small `.fields` group inside `.actions`. They sit side by side when there's room and stack on phones. Other existing styles are reused.

9. **Fading:** `createProblemItem` adds a `solved` class to the card when `getStatus(problem)` is `solved`. The `.problem.solved` styles use the existing `--muted` and `--bg` colors, which already adapt to dark mode. I'd avoid `opacity`, because it would also wash out the dropdowns and the focus outline and make text harder to read.

No libraries, build step or server. Typed text still goes through `textContent`.

## Known trade-off

On some systems, arrow keys on a closed dropdown save at each step. With a filter on, a keyboard user going from Open to Solved could see the problem disappear at In progress. This comes with "disappears right away". The problem can still be found by switching the filter.

## Not included

- Status counts, other status colors, sorting by status, or remembering the filter after a reload.
- `CLAUDE.md`: its overview doesn't mention search, and wouldn't mention status either. I'd only update it if you ask.

## Verification

Run the page in macOS WebKit with temporary data, as I did for search, and check:
1. Adding with each status works, and the form returns to Open.
2. Saved problems with no status or an invalid one show as Open, and aren't rewritten on load.
3. Each filter option shows the right problems, alone and combined with search.
4. Marking a problem Solved while viewing Open removes it, saves it, and moves focus sensibly, including for the last one.
5. Changing status under All keeps the list and focus in place.
6. Adding while filtered resets the search and filter.
7. A failed save restores the old status and shows the error.
8. Frequency changes, deletes and search still work.
9. A solved problem is faded on load and as soon as it's marked Solved, returns to normal when reopened, and doesn't change if the save fails.

Also take WebKit snapshots at desktop and phone widths, in light and dark mode, to check that the layout works and that faded text is clearly different but still readable (contrast of at least 4.5:1).
