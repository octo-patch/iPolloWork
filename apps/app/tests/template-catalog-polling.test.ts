import { describe, expect, test } from "bun:test";

import { startTemplateCatalogPolling } from "../src/react-app/domains/session/templates/template-catalog-polling";

describe("template catalog polling", () => {
  test("refreshes in the background and clears the timer when the market closes", () => {
    let scheduled: (() => void) | undefined;
    let delay = 0;
    let cleared: unknown;
    let refreshes = 0;
    const timer = { id: 1 };

    const stop = startTemplateCatalogPolling(
      () => { refreshes += 1; },
      (callback, intervalMs) => {
        scheduled = callback;
        delay = intervalMs;
        return timer;
      },
      (value) => { cleared = value; },
    );

    expect(delay).toBe(5_000);
    scheduled?.();
    expect(refreshes).toBe(1);
    stop();
    expect(cleared).toBe(timer);
  });
});
