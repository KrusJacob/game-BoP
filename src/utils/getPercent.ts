export function getPercent(value: number, percent: number) {
  return Math.floor(value * (Math.min(percent, 100) / 100));
}
