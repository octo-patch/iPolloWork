export class BackgroundTaskQueue {
  private readonly active = new Set<string>();

  schedule(key: string, task: () => Promise<void>): boolean {
    if (this.active.has(key)) return false;
    this.active.add(key);
    void Promise.resolve()
      .then(task)
      .catch(() => undefined)
      .finally(() => this.active.delete(key));
    return true;
  }
}
