import EmployeeInfoCell from "@/components/scheduler/EmployeeInfoCell";
import GridCell from "@/components/scheduler/GridCell";
import dayjs from "dayjs";
import { EmployeeWeekProps } from "@/components/scheduler/types";

export default function WeekRow({ week, employee }: EmployeeWeekProps) {
  return (
    <>
      <EmployeeInfoCell employee={employee} />
      {week.map((day) => (
        <GridCell key={day} day={dayjs(day)} employee={employee} />
      ))}
    </>
  );
}
