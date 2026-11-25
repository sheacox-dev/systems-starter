export type ItemType = "assignment" | "shift" | "internship";
export type Side = "school" | "work";

export type Item = {
  id: string;
  name: string;
  /** Always set with sideForType, so it can't disagree with type (P1). */
  side: Side;
  type: ItemType;
  /** YYYY-MM-DD, the day that was clicked. For a shift, the day it starts. */
  dueDate: string;
  /** HH:MM (24-hour), or null if no time was entered. For a shift, its start time. */
  dueTime: string | null;
  done: boolean;
  /** ISO date and time. */
  createdAt: string;
};

/** The only place that decides which side a type belongs on. */
export function sideForType(type: ItemType): Side {
  return type === "assignment" ? "school" : "work";
}
