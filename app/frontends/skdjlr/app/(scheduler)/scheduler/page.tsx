"use client";
import WeekGrid from "@/components/scheduler/week-grid";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { getWeek } from "@/lib/date-utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function SchedulerPage() {
  const { dayScheduleStarts, weekIndex } = useScheduler();
  const [currentWeek, setCurrentWeek] = useState(getWeek(dayScheduleStarts));

  useEffect(() => {
    const week = getWeek(dayScheduleStarts, weekIndex);
    setCurrentWeek(week);
  }, [dayScheduleStarts, weekIndex]);
  return (
    <div className="m-4">
      <WeekGrid week={currentWeek} />
    </div>
  );
}
