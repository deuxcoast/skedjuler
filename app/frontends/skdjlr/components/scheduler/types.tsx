import { Employee } from "@/types/global";
import { Dayjs } from "dayjs";

export type EmployeeDayProps = {
  employee: Employee;
  day: Dayjs;
};

export type EmployeeDayChildrenProps = {
  employee: Employee;
  day: Dayjs;
  children: React.ReactNode;
};

export type EmployeeWeekProps = {
  employee: Employee;
  week: string[];
};
