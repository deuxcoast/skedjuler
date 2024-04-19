"use client";

import SchedulerGridHeader from "./SchedulerGridHeader";
import WeekRow from "./week-row";
import SchedulerControlBar from "./SchedulerControlBar";
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
      <SchedulerControlBar />
      <div className="grid grid-cols-8 grid-rows-calendar justify-items-stretch items-stretch">
        <SchedulerGridHeader />
        {currentScheduleEmployees.map((employee) => (
          <WeekRow key={employee.id} week={week} employee={employee} />
        ))}
      </div>
    </>
  );
}
