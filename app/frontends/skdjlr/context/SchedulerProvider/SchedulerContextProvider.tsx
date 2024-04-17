"use client";

import { ReactNode, useContext, useEffect, useReducer, useState } from "react";
import SchedulerContext from "./SchedulerContext";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {
  Employee,
  Schedule,
  ShiftTemplate,
  THourMinuteTime,
} from "@/types/global";
import { ScheduledShiftReducer } from "./ScheduledShiftsReducer";

dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

function initScheduledShifts() {
  if (typeof window !== "undefined") {
    const storageEvents = localStorage.getItem("savedShifts");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
  }
  throw new Error(
    "initScheduledShifts not executing. You are accessing localStorage the wrong way. Look up how to do this in nextjs",
  );
}

type SchedulerContextProviderProps = {
  children: ReactNode;
};

export default function SchedulerContextProvider({
  children,
}: SchedulerContextProviderProps) {
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [dayScheduleStarts, setDayScheduleStarts] = useState(0);
  const [daySelected, setDaySelected] = useState(dayjs());

  const [defaultShiftStart, setDefaultShiftStart] =
    useState<THourMinuteTime>("11:00");

  const [defaultShiftEnd, setDefaultShiftEnd] =
    useState<THourMinuteTime>("15:00");

  const [shiftTemplates, setShiftTemplates] = useState<ShiftTemplate[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState(0);
  const [currentScheduleEmployees, setCurrentScheduleEmployees] = useState<
    Employee[]
  >([]);

  const [savedShifts, dispatchShift] = useReducer(
    ScheduledShiftReducer,
    [],
    // initScheduledShifts,
    // TODO: fix reading from localStorage in a way that works with nextjs
  );

  // TODO: fix reading from localStorage also
  //
  // useEffect(() => {
  //   localStorage.setItem("savedShifts", JSON.stringify(savedShifts));
  // }, [savedShifts]);
  return (
    <SchedulerContext.Provider
      value={{
        weekIndex,
        dayScheduleStarts,
        daySelected,
        defaultShiftStart,
        defaultShiftEnd,
        shiftTemplates,
        employees,
        schedules,
        currentScheduleEmployees,
        selectedSchedule,
        setWeekIndex,
        setDayScheduleStarts,
        setDefaultShiftStart,
        setDefaultShiftEnd,
        setDaySelected,
        setShiftTemplates,
        setEmployees,
        setSchedules,
        setCurrentScheduleEmployees,
        setSelectedSchedule,
        dispatchShift,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export function useScheduler() {
  const context = useContext(SchedulerContext);
  if (!context) {
    // console.log("HELP");
    throw new Error(
      "useScheduler must be used with a SchedulerContextProvider",
    );
  }
  return context;
}
