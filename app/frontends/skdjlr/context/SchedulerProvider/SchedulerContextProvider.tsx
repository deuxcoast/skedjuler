"use client";

import { useContext, useState } from "react";
import SchedulerContext from "./SchedulerContext";
import dayjs from "dayjs";
import { SchedulerProviderProps } from "./types";

export default function SchedulerContextProvider({
  children,
}: SchedulerProviderProps) {
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [dayScheduleStarts, setDayScheduleStarts] = useState(0);
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
