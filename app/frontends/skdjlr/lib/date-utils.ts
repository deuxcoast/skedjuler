import { DAYS_IN_A_WEEK } from "@/types/WeekDay";
import { ShiftTime } from "@/types/global";
import dayjs from "dayjs";

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

/** A small helper function that returns the shiftTemplate time as a formatted
 * string using the Dayjs format string syntax.
 *
 * @param shiftTime - An objecting representing time in hours and minutes
 * @param formatString - A format string to feed into the Dayjs format function
 */
export function formatShiftTemplateTime(
  shiftTime: ShiftTime,
  formatString: string,
): string {
  const time = dayjs().hour(shiftTime.hour).minute(shiftTime.minute);
  return time.format(formatString);
}
