import { useApp } from "@/lib/context/AppContext";
import { selectScheduleByIndex } from "@/lib/features/schedules/schedulesSlice";
import { useAppSelector } from "@/lib/hooks";
import { Employee } from "@/types/global";
import { getEmployeesByRoles } from "./getEmployeesByRole";
import { selectAllEmployees } from "@/lib/features/employees/employeesSlice";

export const useSelectedScheduleEmployees = (): Employee[] => {
  const { selectedScheduleIndex } = useApp();
  const selectedSchedule = useAppSelector((state) =>
    selectScheduleByIndex(state, selectedScheduleIndex),
  );
  // const selectedSchedule = useAppSelector((state) =>
  //   selectScheduleById(state, selectedScheduleId),
  // );
  const selectedScheduleRoleIds = selectedSchedule.roles;
  const employees = useAppSelector(selectAllEmployees);
  return getEmployeesByRoles(employees, selectedScheduleRoleIds);
};
