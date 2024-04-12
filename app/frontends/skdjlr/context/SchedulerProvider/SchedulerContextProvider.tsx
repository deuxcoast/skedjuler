"use client";

import { useContext, useState } from "react";
import SchedulerContext from "./SchedulerContext";
import { SchedulerProviderProps } from "./types";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

export default function SchedulerContextProvider({
  children,
}: SchedulerProviderProps) {
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [dayScheduleStarts, setDayScheduleStarts] = useState(4);
  return (
    <SchedulerContext.Provider
      value={{
        weekIndex,
        setWeekIndex,
        dayScheduleStarts,
        setDayScheduleStarts,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export function useScheduler() {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error(
      "useScheduler must be used with a SchedulerContextProvider",
    );
  }
  return context;
}
