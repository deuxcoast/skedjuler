"use client";
import WeekGrid from "@/components/scheduler/week-grid";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { getWeek } from "@/lib/date-utils";
import { SampleData } from "@/sample-data/lmno";
import { useEffect, useState } from "react";

export default function SchedulerPage() {
  const { dayScheduleStarts, weekIndex, setShiftTemplates } = useScheduler();
  const [currentWeek, setCurrentWeek] = useState(getWeek(dayScheduleStarts));
  const employeeData = SampleData.employees;
  const shiftTemplateData = SampleData.shiftTemplates;

  useEffect(() => {
    const week = getWeek(dayScheduleStarts, weekIndex);
    setCurrentWeek(week);
    setShiftTemplates(shiftTemplateData);
  }, [dayScheduleStarts, weekIndex, setShiftTemplates, shiftTemplateData]);
  return (
    <div className="m-4">
      <WeekGrid week={currentWeek} employeeData={employeeData} />
    </div>
  );
}
