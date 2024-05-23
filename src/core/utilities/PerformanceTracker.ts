export class PerformanceTracker {
  public static timestamp(): number {
    return performance.now();
  }

  public static format(start: number, stop: number): string {
    return (stop - start).toFixed(2) + 'ms';
  }
}
