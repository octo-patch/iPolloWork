const TEMPLATE_CATALOG_POLL_INTERVAL_MS = 5_000;

export function startTemplateCatalogPolling(
  refresh: () => void,
  schedule: (callback: () => void, intervalMs: number) => unknown = (callback, intervalMs) => window.setInterval(callback, intervalMs),
  cancel: (timer: unknown) => void = (timer) => window.clearInterval(timer as number),
): () => void {
  const timer = schedule(refresh, TEMPLATE_CATALOG_POLL_INTERVAL_MS);
  return () => cancel(timer);
}
