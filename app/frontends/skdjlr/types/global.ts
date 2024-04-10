export type SchedulerRow = {
  /*
   * Unique id of data
   */
  id: string;
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
  id: string;
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

export type Business = {
  id: string;
  name: string;
  industry: string;
  // address information
};

export type Schedule = {
  id: string;
  /*
   * Name of the schedule. For example, "BOH", "FOH" or "Servers"
   */
  name: string;
  /*
   * The IDs for the roles included in this schedule. This is used to determine
   * which employees are eligible for this schedule.
   */
  rolesID: string[];
};

export type Role = {
  id: string;
  name: string;
};
export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  rolesID: string[];
  hourlyWage?: string;
  phoneNumber?: string;
  email?: string;
};

export type ShiftTime = {
  /*
   * Hour of the shift in 24hr format
   */
  hour: number;
  minute: number;
};

export type ShiftType = {
  id: string;
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
  id: string;
  employeeID: string;
  scheduleID: string;
  start: Date;
  end: Date;
  bgColor: string;
  published: boolean;
};
