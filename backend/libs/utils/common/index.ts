export function randomSort(): number {
  return Math.random() - 0.5;
}
export function sortDesc(a: number, b: number): number {
  return a > b ? -1 : 1;
}
export function reduceSum(acc: number, el: number): number {
  return acc + el;
}
export const sortAsc = (a: number, b: number) => {
  return a < b ? -1 : 1;
};
