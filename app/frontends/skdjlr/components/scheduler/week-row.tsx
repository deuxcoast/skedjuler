import { Dayjs } from "dayjs";
import DayCell from "./day-cell";
import EmployeeCell from "./employee-cell";
import { Employee } from "@/types/global";

type WeekRowProps = {
  employee: Employee;
  week: Dayjs[];
};

export default function WeekRow({ week, employee }: WeekRowProps) {
  return (
    <>
      <EmployeeCell employee={employee} />
      {week.map((day) => (
        <DayCell key={day.date()} day={day} employee={employee} />
      ))}
    </>
  );
}
