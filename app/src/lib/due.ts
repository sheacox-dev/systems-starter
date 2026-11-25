const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME = /^([01]\d|2[0-3]):([0-5]\d)$/;

/**
 * The moment an item is due, in the student's own time zone.
 *
 * - No usable time means 11:59 PM that day (S1-AC10).
 * - No valid date means null (S3-AC5).
 *
 * The inputs are `unknown` because saved data can be damaged.
 */
export function dueAt(dueDate: unknown, dueTime: unknown): Date | null {
  const date = typeof dueDate === "string" ? DATE.exec(dueDate) : null;
  if (!date) return null;

  const year = Number(date[1]);
  const month = Number(date[2]);
  const day = Number(date[3]);

  // Date turns Feb 30 into Mar 2, so check that we got the day we asked for.
  const noon = new Date(year, month - 1, day, 12);
  if (
    noon.getFullYear() !== year ||
    noon.getMonth() !== month - 1 ||
    noon.getDate() !== day
  ) {
    return null;
  }

  const time = typeof dueTime === "string" ? TIME.exec(dueTime) : null;
  const hours = time ? Number(time[1]) : 23;
  const minutes = time ? Number(time[2]) : 59;
  return new Date(year, month - 1, day, hours, minutes);
}
