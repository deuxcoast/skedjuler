"use client";
import WeekGrid from "@/components/scheduler/week-grid";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { getWeek } from "@/lib/date-utils";
import { SampleData } from "@/sample-data/lmno";
import { useEffect, useState } from "react";

export default function SchedulerPage() {
  const {
    dayScheduleStarts,
    weekIndex,
    employees,
    schedules,
    setShiftTemplates,
    setEmployees,
    setSchedules,
  } = useScheduler();
  const [currentWeek, setCurrentWeek] = useState(getWeek(dayScheduleStarts));
  const employeeData = SampleData.employees;
  const shiftTemplateData = SampleData.shiftTemplates;
  const schedulesData = SampleData.schedules;

  useEffect(() => {
    const week = getWeek(dayScheduleStarts, weekIndex);
    setCurrentWeek(week);
    setShiftTemplates(shiftTemplateData);
    setEmployees(employeeData);
    setSchedules(schedulesData);
  }, [
    schedules,
    dayScheduleStarts,
    weekIndex,
    setShiftTemplates,
    setEmployees,
    setSchedules,
    shiftTemplateData,
    employeeData,
    schedulesData,
  ]);
  return (
    <div className="m-4 basis-full">
      <WeekGrid week={currentWeek} employeeData={employees} />
    </div>
  );
}
