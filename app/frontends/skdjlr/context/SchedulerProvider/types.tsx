import { ReactNode } from "react";

export type SchedulerContextType = {
  weekIndex: number;
  dayScheduleStarts: number;
  setWeekIndex: (index: number) => void;
  setDayScheduleStarts: (index: number) => void;
};

export type SchedulerProviderProps = {
  children: ReactNode;
};
