import { Dayjs } from "dayjs";
import SchedulerGridHeader from "./SchedulerGridHeader";
import WeekRow from "./week-row";
import SchedulerControlBar from "./SchedulerControlBar";
import { Employee } from "@/types/global";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { getEmployeesByRoles } from "@/lib/getEmployeesByRole";
import { useEffect } from "react";

type WeekGridProps = {
  employeeData: Employee[];
  week: Dayjs[];
};

export default function WeekGrid({ week }: WeekGridProps) {
  const {
    employees,
    schedules,
    selectedSchedule,
    currentScheduleEmployees,
    setCurrentScheduleEmployees,
  } = useScheduler();

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
      <SchedulerControlBar week={week} />
      <div className="grid grid-cols-8 grid-rows-calendar justify-items-stretch items-stretch">
        <SchedulerGridHeader week={week} />
        {currentScheduleEmployees.map((employee) => (
          <WeekRow key={employee.id} week={week} employee={employee} />
        ))}
      </div>
    </>
  );
}
