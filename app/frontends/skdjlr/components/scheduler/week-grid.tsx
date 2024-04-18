import { Dayjs } from "dayjs";
import SchedulerGridHeader from "./SchedulerGridHeader";
import WeekRow from "./week-row";
import SchedulerControlBar from "./SchedulerControlBar";
import { Employee } from "@/types/global";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { getEmployeesByRoles } from "@/utils/getEmployeesByRole";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentWeek } from "@/lib/features/calendar/calendarSlice";

export default function WeekGrid() {
  const {
    employees,
    schedules,
    selectedSchedule,
    currentScheduleEmployees,
    setCurrentScheduleEmployees,
  } = useScheduler();

  const week = useAppSelector(selectCurrentWeek);

  // Get the list of employees that are eligible for the current schedule based
  // on the roles defined in the schedule and the roles assigned to employees.
  useEffect(() => {
    // This will be undefined at first
    if (schedules[selectedSchedule]?.roles) {
      const roles = schedules[selectedSchedule].roles;
      const employeesByRoles = getEmployeesByRoles(employees, roles);
      setCurrentScheduleEmployees(employeesByRoles);
    }
  }, [employees, schedules, selectedSchedule, setCurrentScheduleEmployees]);

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
