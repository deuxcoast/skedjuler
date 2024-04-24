import EmployeeInfoCell from "@/components/scheduler/EmployeeInfoCell";
import GridCell from "@/components/scheduler/GridCell";
import { EmployeeWeekProps } from "@/components/scheduler/types";

export default function WeekRow({ week, employee }: EmployeeWeekProps) {
  return (
    <>
      <EmployeeInfoCell employee={employee} />
      {week.map((day) => (
        <GridCell key={day} day={day} employee={employee} />
      ))}
    </>
  );
}
