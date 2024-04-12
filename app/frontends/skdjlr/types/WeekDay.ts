export const DAY_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

type ObjectValues<T> = T[keyof T];

export type DayOfWeek = ObjectValues<typeof DAY_OF_WEEK>;

export const DAYS_IN_A_WEEK_ZERO_INDEX = 6;

export const DAYS_IN_A_WEEK = 7;
