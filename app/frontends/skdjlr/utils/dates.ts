import { DAYS_IN_A_WEEK } from "@/types/WeekDay";
import { THourMinutePeriodTuple, THourMinuteTime } from "@/types/global";
import dayjs from "dayjs";

// import weekOfYear from "dayjs/plugin/weekOfYear";
// import timezone from "dayjs/plugin/timezone";
// import utc from "dayjs/plugin/utc";
// import advancedFormat from "dayjs/plugin/advancedFormat";
//
// dayjs.extend(weekOfYear);
// dayjs.extend(timezone);
// dayjs.extend(utc);
// dayjs.extend(advancedFormat);
/**
 * Returns an array of Dayjs date objects for a given week in the year.
 *
 * @param dayScheduleStarts - the day of the week on which the schedule begins,
 * represented as a number 0 (Sunday) - 6 (Saturday).
 *
 * @param week - The week of the year for which the function will return the
 * dates, represented as a number 1-52
 * @returns An array of length 7 containing ISO Strings representing the days
 * in the desired week.
 *
 */
export function getWeek(dayScheduleStarts: number, week = dayjs().week()) {
  console.log("week:", week);
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
    .map(() =>
      dayjs(new Date(year, firstDayOfWeek.month(), dayCount++)).toISOString(),
    );

  return weekDates;
}

/** A small helper function that returns the shiftTemplate time as a formatted
 * string using the Dayjs format string syntax.
 *
 * @param shiftTime - A string in the format of "HH:mm"
 * @param formatString - A format string to feed into the Dayjs format function
 */
export function formatShiftTemplateTime(
  shiftTime: THourMinuteTime,
  formatString: string,
): string {
  const [hour, minute] = parseShiftTimeString(shiftTime);
  const time = dayjs().hour(hour).minute(minute);
  return time.format(formatString);
}

/** Parse a string in the form of HH:mm into an array representing the hour (0 -23)
 * and minute of the time.
 *
 * @param shiftTime - A string in the form of "HH:mm"
 * @returns An array of numbers in the form of `[HH, mm]`.
 */
export function parseShiftTimeString(shiftTime: THourMinuteTime): number[] {
  const time = shiftTime.split(":");
  return [Number(time[0]), Number(time[1])];
}

/** Parse a string in the form of HH:mm into an array representing the hour (1 -12),
 * minute and AM/PM of the time.
 *
 * @param shiftTime - A string in the form of "HH:mm"
 * @returns An array in the form of `[h, mm, A]`, where h and mm are numbers and
 * A is a string (either "AM" or "PM").
 */
export function parseShiftTimeIntoTwelveHour(
  shiftTime: THourMinuteTime,
): THourMinutePeriodTuple {
  const [hour, minute] = parseShiftTimeString(shiftTime);
  const time = dayjs().hour(hour).minute(minute);
  const [twelveHour, min] = time.format("h:mm").split(":");
  const period = time.format("A");
  return [Number(twelveHour), Number(min), period];
}

export function parseTwelveHourIntoDayjs(
  hour: number,
  minute: number,
  ampm: string,
) {
  const time = hour.toString().concat(":", minute.toString(), " ", ampm);
  return dayjs(time, "h:mm A");
}

/** Represent two shifts as a string in the form of "h:mm a - h:mm a".
 *
 *
 * @param startShiftTime - A string in the form of "HH:mm"
 * @param endShiftTime - A string in the form of "HH:mm"
 * @returns A string representing the range between startShiftTime and
 * endShiftTime.
 */
export function formatShiftTimeStartToEnd(
  startShiftTime: THourMinuteTime,
  endShiftTime: THourMinuteTime,
): string {
  const startString = formatShiftTemplateTime(startShiftTime, "h:mm a");
  const endString = formatShiftTemplateTime(endShiftTime, "h:mm a");
  return startString.concat(" - ", endString);
}
