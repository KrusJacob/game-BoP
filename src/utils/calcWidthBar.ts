export const calcWidthBar = (bar: HTMLDivElement, maxHP: number, currentHP: number) => {
  // @ts-ignore
  const factor = bar.parentNode.clientWidth / maxHP;
  const res = factor * currentHP;
  bar.style.width = `${Math.max(res, 0)}px`;
};
