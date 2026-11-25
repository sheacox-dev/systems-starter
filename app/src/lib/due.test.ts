import { describe, expect, it } from "vitest";
import { dueAt } from "@/lib/due";

function parts(moment: Date | null) {
  if (!moment) return null;
  return [
    moment.getFullYear(),
    moment.getMonth() + 1,
    moment.getDate(),
    moment.getHours(),
    moment.getMinutes(),
  ];
}

describe("dueAt: time (S1-AC10)", () => {
  it("uses the time entered", () => {
    expect(parts(dueAt("2026-11-30", "17:00"))).toEqual([2026, 11, 30, 17, 0]);
  });

  it("keeps midnight as midnight", () => {
    expect(parts(dueAt("2026-11-30", "00:00"))).toEqual([2026, 11, 30, 0, 0]);
  });

  it.each([null, "", undefined])("means 11:59 PM when the time is %j", (time) => {
    expect(parts(dueAt("2026-11-30", time))).toEqual([2026, 11, 30, 23, 59]);
  });

  it.each(["24:00", "9:00", "12:60", "noon", 900])(
    "means 11:59 PM when the saved time is damaged: %j",
    (time) => {
      expect(parts(dueAt("2026-11-30", time))).toEqual([2026, 11, 30, 23, 59]);
    },
  );
});

describe("dueAt: date", () => {
  it.each([
    ["first of a month", "2026-12-01", [2026, 12, 1, 23, 59]],
    ["last day of a year", "2026-12-31", [2026, 12, 31, 23, 59]],
    ["leap day", "2028-02-29", [2028, 2, 29, 23, 59]],
    ["day clocks go forward in the US", "2027-03-14", [2027, 3, 14, 23, 59]],
    ["day clocks go back in the US", "2026-11-01", [2026, 11, 1, 23, 59]],
  ])("stays on the same local day: %s", (_label, date, expected) => {
    expect(parts(dueAt(date, null))).toEqual(expected);
  });

  it.each([
    "2026-02-30",
    "2027-02-29",
    "2026-13-01",
    "2026-00-10",
    "2026-11-00",
    "11/30/2026",
    "2026-11-30T17:00",
    "not a date",
    "",
    null,
    undefined,
    20261130,
  ])("gives nothing for an invalid date: %j (S3-AC5)", (date) => {
    expect(dueAt(date, "17:00")).toBeNull();
  });
});
