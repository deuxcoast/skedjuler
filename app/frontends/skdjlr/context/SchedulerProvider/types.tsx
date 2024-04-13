import { ShiftTemplate } from "@/types/global";
import { Dayjs } from "dayjs";
import { ReactNode } from "react";

export type SchedulerContextType = {
  weekIndex: number;
  daySelected: Dayjs;
  dayScheduleStarts: number;
  defaultShiftStartHour: number;
  defaultShiftEndHour: number;
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
