"use client";

import GridHeader from "@/components/scheduler/GridHeader";
import WeekRow from "@/components/scheduler/WeekRow";
import ControlBar from "@/components/scheduler/ControlBar";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentWeek } from "@/lib/features/calendar/calendarSlice";
import { selectCurrentScheduleEmployees } from "@/lib/features/employees/employeesSlice";

export default function WeekGrid() {
  const week = useAppSelector(selectCurrentWeek);
  const currentScheduleEmployees = useAppSelector(
    selectCurrentScheduleEmployees,
  );

  return (
    <>
      <ControlBar />
      <div className="grid grid-cols-8 grid-rows-calendar justify-items-stretch items-stretch">
        <GridHeader />
        {currentScheduleEmployees.map((employee) => (
          <WeekRow key={employee.id} week={week} employee={employee} />
        ))}
      </div>
    </>
  );
}
