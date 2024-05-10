import { DAYS_IN_A_WEEK } from "@/types/constants";
import { THourMinutePeriodTuple, THourMinuteTime } from "@/types/global";
import dayjs from "dayjs";

import weekOfYear from "dayjs/plugin/weekOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
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
  const year = dayjs().year();
  const today = dayjs().day();

  let firstDayOfWeek = dayjs.utc().year(year).date(0).week(week).hour(0);

  const prevWeekDifferential = DAYS_IN_A_WEEK - dayScheduleStarts;

  if (dayScheduleStarts > 0 && dayScheduleStarts <= today) {
    firstDayOfWeek = firstDayOfWeek.add(dayScheduleStarts, "day");
  } else if (dayScheduleStarts > today) {
    firstDayOfWeek = firstDayOfWeek.subtract(prevWeekDifferential, "day");
  }

  let dayCount = firstDayOfWeek.date();

  const weekDates = new Array(DAYS_IN_A_WEEK).fill(null).map(() => {
    const day = dayjs()
      .year(year)
      .month(firstDayOfWeek.month())
      .date(dayCount++);
    const dayISO = day.toISOString();
    return dayISO;
  });
  // console.log(weekDates);

  return weekDates;
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

/** Takes a ISO string and returns an array in the form of [hh, mm]
 * hour: 0-23
 * minute: 0-59
 *
 * @param isoString - A string representing a timestamp in ISO 8601 format
 */
export function parseIsoIntoHourMin(
  isoString: string,
): [hour: number, minute: number] {
  const day = dayjs(isoString);
  const hour = day.hour();
  const min = day.minute();
  return [hour, min];
}

/** Represent two shifts as a string in the form of "h:mm a - h:mm a". */
export function formatShiftTimeStartToEnd(
  startShiftTime: string,
  endShiftTime: string,
): string {
  const startString = dayjs(startShiftTime).format("h:mm a");
  const endString = dayjs(endShiftTime).format("h:mm a");
  return startString.concat(" - ", endString);
}
