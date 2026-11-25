import { describe, expect, it } from "vitest";
import { sideForType } from "@/lib/item";

describe("sideForType (P1)", () => {
  it("puts assignments on the School side", () => {
    expect(sideForType("assignment")).toBe("school");
  });

  it("puts shifts and internship tasks on the work side", () => {
    expect(sideForType("shift")).toBe("work");
    expect(sideForType("internship")).toBe("work");
  });
});
