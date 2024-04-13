import { UUID } from "crypto";

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
   */
  startOfWorkWeek: DayOfWeek;
  // address information
};

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

export type ShiftTime = {
  /*
    Hour of the shift from 0-23
   */
  hour: number;
  /*
   * Minute of the shift from 0-59
   */
  minute: number;
};

export type ShiftTemplate = {
  id: UUID;
  name: string;
  roleID: string;
  startTime: ShiftTime;
  endTime: ShiftTime;
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
  id: UUID;
  employeeID: string;
  scheduleID: string;
  start: Date;
  end: Date;
  bgColor: string;
  published: boolean;
};
