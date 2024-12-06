export const calcWidthBar = (bar: HTMLDivElement, max: number, current: number) => {
  // @ts-ignore
  const factor = bar.parentNode.clientWidth / max;
  const res = factor * current;
  bar.style.width = `${Math.max(res, 0)}px`;
};
