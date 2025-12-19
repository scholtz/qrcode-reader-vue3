import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { indempotent, eventOn, timeout } from "../../src/misc/util";

describe("indempotent", () => {
  it("reuses the result of the first invocation", () => {
    const action = vi.fn((value: number) => value * 2);
    const memoized = indempotent(action);

    const first = memoized(3);
    const second = memoized(20);

    expect(first).toBe(6);
    expect(second).toBe(6);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("shares the same promise for concurrent calls", async () => {
    const action = vi.fn(async (value: number) => value * 3);
    const memoized = indempotent(action);

    const [first, second] = await Promise.all([
      memoized(2),
      memoized(5),
    ]);

    expect(first).toBe(6);
    expect(second).toBe(6);
    expect(action).toHaveBeenCalledTimes(1);
  });
});

describe("eventOn", () => {
  it("resolves with the dispatched event", async () => {
    const target = new EventTarget();
    const promise = eventOn(target, "ready");
    const payload = new Event("ready");

    target.dispatchEvent(payload);

    await expect(promise).resolves.toBe(payload);
  });
});

describe("timeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("waits for the specified delay", async () => {
    const promise = timeout(1000);

    vi.advanceTimersByTime(999);
    let resolved = false;
    promise.then(() => {
      resolved = true;
    });

    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1);
    await expect(promise).resolves.toBeUndefined();
    expect(resolved).toBe(true);
  });
});
