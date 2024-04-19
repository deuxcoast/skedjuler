import { Dayjs } from "dayjs";
import ShiftNode from "./shift-node";
import { AddShiftToCell } from "./AddShiftToCell";
import { Employee } from "@/types/global";
import { useAppSelector } from "@/lib/hooks";
import { selectShiftsByEmployeeIDAndDay } from "@/lib/features/shifts/shiftsSlice";

type DayCellProps = {
  day: Dayjs;
  employee: Employee;
};

export default function DayCell({ day, employee }: DayCellProps) {
  const shifts = useAppSelector((state) =>
    selectShiftsByEmployeeIDAndDay(state, {
      employeeID: employee.id,
      day: day,
    }),
  );
  const shiftsPresent = shifts.length > 0;

  return (
    // TODO: fix overlapping border in calendar grid
    <div className="p-2 border min-h-16 border-foreground bg-cell flex flex-row justify-between ">
      <div className="flex-grow inline-flex flex-col justify-start"></div>
      {shiftsPresent &&
        shifts.map((shift) => <ShiftNode key={shift.id} shift={shift} />)}
      <div className="inline-flex flex-col justify-start">
        <AddShiftToCell day={day} employee={employee} />
      </div>
    </div>
  );
}
