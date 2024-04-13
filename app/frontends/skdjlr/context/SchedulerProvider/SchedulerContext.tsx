import { createContext } from "react";
import { SchedulerContextType } from "./types";
import dayjs from "dayjs";

const SchedulerContext = createContext<SchedulerContextType>({
  weekIndex: 0,
  dayScheduleStarts: 0,
  daySelected: dayjs(),
  defaultShiftStartHour: 0,
  defaultShiftEndHour: 0,
  shiftTemplates: [],
  setWeekIndex: () => {},
  setDayScheduleStarts: () => {},
  setDaySelected: () => {},
  setDefaultShiftStartHour: () => {},
  setDefaultShiftEndHour: () => {},
  setShiftTemplates: () => {},
});
export default SchedulerContext;
