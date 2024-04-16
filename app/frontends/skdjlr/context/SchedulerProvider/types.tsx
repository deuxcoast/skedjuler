import { ShiftTemplate, THourMinuteTime } from "@/types/global";
import { Dayjs } from "dayjs";
import { ReactNode } from "react";

export type SchedulerContextType = {
  weekIndex: number;
  daySelected: Dayjs;
  dayScheduleStarts: number;
  defaultShiftStart: THourMinuteTime; // "HH:mm"
  defaultShiftEnd: THourMinuteTime; // "HH:mm"
  shiftTemplates: ShiftTemplate[];
  setWeekIndex: (index: number) => void;
  setDaySelected: (day: Dayjs) => void;
  setDayScheduleStarts: (index: number) => void;
  setDefaultShiftStartHour: (hour: number) => void;
  setDefaultShiftEndHour: (hour: number) => void;
  setShiftTemplates: (shiftTemplates: ShiftTemplate[]) => void;
};

export type SchedulerProviderProps = {
  children: ReactNode;
};
