import { createContext } from "react";
import { SchedulerContextType } from "./types";

const SchedulerContext = createContext<SchedulerContextType>({
  weekIndex: 0,
  setWeekIndex: () => {},
  dayScheduleStarts: 0,
  setDayScheduleStarts: () => {},
});
export default SchedulerContext;
