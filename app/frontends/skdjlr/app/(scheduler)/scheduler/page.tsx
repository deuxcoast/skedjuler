"use client";
import WeekGrid from "@/components/scheduler/week-grid";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { getWeek } from "@/lib/date-utils";
import { SampleData } from "@/sample-data/lmno";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function SchedulerPage() {
  const { dayScheduleStarts, weekIndex } = useScheduler();
  const [currentWeek, setCurrentWeek] = useState(getWeek(dayScheduleStarts));
  const employeeData = SampleData.employees;

  useEffect(() => {
    const week = getWeek(dayScheduleStarts, weekIndex);
    setCurrentWeek(week);
  }, [dayScheduleStarts, weekIndex]);
  return (
    <div className="m-4">
      <WeekGrid week={currentWeek} employeeData={employeeData} />
    </div>
  );
}
