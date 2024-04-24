import { Employee } from "@/types/global";

export type EmployeeDayProps = {
  employee: Employee;
  day: string;
};

export type EmployeeDayChildrenProps = {
  employee: Employee;
  day: string;
  children: React.ReactNode;
};

export type EmployeeWeekProps = {
  employee: Employee;
  week: string[];
};
