import {
  Employee,
  Schedule,
  Shift,
  ShiftTemplate,
  THourMinuteTime,
  WeeklySchedule,
} from "@/types/global";
import { Dayjs } from "dayjs";

export enum UserAction {
  ADD = "ADD",
  ADD_MULTIPLE = "ADD_MULTIPLE",
  EDIT = "EDIT",
  REMOVE = "REMOVE",
  REMOVE_MULTIPLE = "REMOVE_MULTIPLE",
  CLEAR = "CLEAR",
  REPLACE_ALL = "REPLACE_ALL",
}

export type ShiftId = {
  id: Shift["id"];
};

export type ShiftActions =
  | { type: UserAction.ADD; payload: Shift }
  | { type: UserAction.ADD_MULTIPLE; payload: Shift[] }
  | { type: UserAction.EDIT; payload: Shift | Partial<Shift> }
  | { type: UserAction.REMOVE; payload: ShiftId }
  | { type: UserAction.REMOVE_MULTIPLE; payload: ShiftId[] }
  | { type: UserAction.CLEAR }
  | { type: UserAction.REPLACE_ALL; payload: Shift[] };

export type SchedulerContextType = {
  weekIndex: number;
  daySelected: Dayjs;
  dayScheduleStarts: number;
  defaultShiftStart: THourMinuteTime; // "HH:mm"
  defaultShiftEnd: THourMinuteTime; // "HH:mm"
  shiftTemplates: ShiftTemplate[];
  employees: Employee[];
  schedules: Schedule[];
  currentScheduleEmployees: Employee[];
  selectedSchedule: number; // index into schedules array

  setWeekIndex: (index: number) => void;
  setDaySelected: (day: Dayjs) => void;
  setDayScheduleStarts: (index: number) => void;
  setDefaultShiftStart: (time: THourMinuteTime) => void;
  setDefaultShiftEnd: (time: THourMinuteTime) => void;
  setShiftTemplates: (shiftTemplates: ShiftTemplate[]) => void;
  setEmployees: (employees: Employee[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setCurrentScheduleEmployees: (employees: Employee[]) => void;
  setSelectedSchedule: (index: number) => void;

  dispatchShift: (action, payload) => void;
};
