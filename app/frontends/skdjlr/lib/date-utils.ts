import { DAYS_IN_A_WEEK } from "@/types/WeekDay";
import dayjs from "dayjs";

// TODO: Write tests for this function, because I am not extremely confident
// that it is robust.
//
/**
 * Returns an array of Dayjs date objects for a given week in the year.
 *
 * @param dayScheduleStarts - the day of the week on which the schedule begins,
 * represented as a number 0 (Sunday) - 6 (Saturday).
 *
 * @param week - The week of the year for which the function will return the
 * dates, represented as a number 1-52
 * @returns An array of length 7 containing Dayjs Date objects representing the
 * desired week.
 *
 */
export function getWeek(dayScheduleStarts: number, week = dayjs().week()) {
  const year = dayjs().year();
  const today = dayjs().day();

  let firstDayOfWeek = dayjs(new Date(year, 0, 0)).week(week);
  const prevWeekDifferential = DAYS_IN_A_WEEK - dayScheduleStarts;

  if (dayScheduleStarts > 0 && dayScheduleStarts <= today) {
    firstDayOfWeek = firstDayOfWeek.add(dayScheduleStarts, "day");
  } else if (dayScheduleStarts > today) {
    firstDayOfWeek = firstDayOfWeek.subtract(prevWeekDifferential, "day");
  }

  let dayCount = firstDayOfWeek.date();

  const weekDates = new Array(DAYS_IN_A_WEEK)
    .fill(null)
    .map(() => dayjs(new Date(year, firstDayOfWeek.month(), dayCount++)));

  return weekDates;
}
