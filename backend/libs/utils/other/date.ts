import { DateTime } from 'luxon';

export const TIME_IN_DAY = 1000 * 60 * 60 * 24;
export const TIME_IN_WEEK = TIME_IN_DAY * 7;

export function getCurrentDate(): string {
  return new Date().toISOString().slice(0, 10);
}
export function getWeekId(key: string, year: number, weekOfYear: number): string {
  return `${key.toLowerCase()}-week-${year}-${weekOfYear}`;
}
export function getCurrentWeekId(key: string): string {
  const year = new Date().getFullYear();
  const weekOfYear = +DateTime.now().toFormat('WW');

  return getWeekId(key, year, weekOfYear);
}
export function getMonthId(key: string, year: number, monthOfYear: number): string {
  return `${key.toLowerCase()}-month-${year}-${monthOfYear}`;
}
export function getCurrentMonthId(key: string): string {
  const year = new Date().getFullYear();
  const monthOfYear = new Date().getMonth() + 1;

  return getMonthId(key, year, monthOfYear);
}
