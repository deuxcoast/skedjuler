import { UUID } from "crypto";
import { Dayjs } from "dayjs";

export type SchedulerRow = {
  /*
   * Unique id of data
   */
  id: UUID;
};

export type SchedulerRowLabel = {
  /*
   * The employee's first name
   */
  firstName: string;
  /*
   * The employee's last name
   */
  lastName: string;
};

export type SchedulerProjectData = {
  /*
   * Unique id of data
   */
  id: UUID;
  /*
   * The start date from which the cell will render
   */
  startDate: Date;
  /*
   * The end date to which the cell will render
   */
  endDate: Date;
};

export type Day = {
  dayName: string;
  dayOfMonth: number;
  weekOfYear: number;
  monthName: string;
  month: number;
  isCurrentDay: boolean;
  year: number;
};

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

export type Business = {
  id: UUID;
  name: string;
  industry: string;
  /*
   * What is day of the week do schedules for this business begin on?
   * TODO: Should this information be stored at the Schedule level?
   */
  startOfWorkWeek: DayOfWeek;
  // address information
};

/** A Schedule represents a user created schedule. Schedules have names and
 * roles associated with them.
 *
 * Each Schedule has a one-to-many relationship with WeeklySchedule objects.
 *
 * The Schedule type does not contain shift information - that is stored in
 * WeeklySchedule.
 */
export type Schedule = {
  id: UUID;
  /*
   * Name of the schedule. For example, "BOH", "FOH" or "Servers"
   */
  name: string;
  /*
   * The IDs for the roles included in this schedule. This is used to determine
   * which employees are eligible for this schedule.
   */
  roles: UUID[];
};

export type WeeklySchedule = {
  id: UUID;
  /*
   * The parent schedule which this WeeklySchedule belongs to.
   */
  scheduleID: UUID;
  start: Dayjs;
};

export type Role = {
  id: UUID;
  name: string;
};
export type Employee = {
  id: UUID;
  firstName: string;
  lastName: string;
  rolesID: string[];
  hourlyWage?: string;
  phoneNumber?: string;
  email?: string;
};

type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;

export type THourMinuteTime = `${THours}:${TMinutes}`;

export type THourMinutePeriodTuple = [number, number, string];

export type ShiftTemplate = {
  id: UUID;
  name: string;
  roleID: string;
  start: THourMinuteTime;
  end: THourMinuteTime;
  /*
   * TODO: We are going to create a pallete of selectable colors and define them
   * as CSS variables. The color field of the shift will be a const representing
   * the CSS variable. For the time being, it's just a string.
   *
   * const SHIFT_COLORS = {
   *   YELLOW: 'shift-yellow',
   *   BLUE: 'shift-blue',
   *   GREEN: 'shift-green',
   *   // etc...
   * } as const;
   */
  bgColor: string;
};

export type Shift = {
  id: UUID | "";
  clientID: UUID;
  employeeID: string;
  scheduleID: string;
  start: Dayjs;
  end: Dayjs;
  // bgColor: string;
  published: boolean;
};
