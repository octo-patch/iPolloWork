import { describe, expect, test } from "bun:test";

import { BackgroundTaskQueue } from "./template-localization-queue.js";

describe("template localization queue", () => {
  test("runs only one background task for the same catalog and locale", async () => {
    const queue = new BackgroundTaskQueue();
    let calls = 0;
    let release!: () => void;
    const pending = new Promise<void>((resolve) => { release = resolve; });

    expect(queue.schedule("personal:zh", async () => {
      calls += 1;
      await pending;
    })).toBe(true);
    expect(queue.schedule("personal:zh", async () => { calls += 1; })).toBe(false);

    await Promise.resolve();
    expect(calls).toBe(1);
    release();
    await pending;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(queue.schedule("personal:zh", async () => { calls += 1; })).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(calls).toBe(2);
  });
});
