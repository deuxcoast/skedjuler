import { createContext } from "react";
import { SchedulerContextType, ShiftActions } from "./types";
import { WeeklySchedule } from "@/types/global";
import dayjs from "dayjs";

const SchedulerContext = createContext<SchedulerContextType>({
  weekIndex: 0,
  dayScheduleStarts: 0,
  daySelected: dayjs(),
  defaultShiftStart: "00:00",
  defaultShiftEnd: "00:00",
  shiftTemplates: [],
  employees: [],
  schedules: [],
  currentScheduleEmployees: [],
  selectedSchedule: 0,

  setWeekIndex: () => {},
  setDayScheduleStarts: () => {},
  setDaySelected: () => {},
  setDefaultShiftStart: () => {},
  setDefaultShiftEnd: () => {},
  setShiftTemplates: () => {},
  setEmployees: () => {},
  setSchedules: () => {},
  setCurrentScheduleEmployees: () => {},
  setSelectedSchedule: () => {},

  dispatchShift: () => {},
});
export default SchedulerContext;
