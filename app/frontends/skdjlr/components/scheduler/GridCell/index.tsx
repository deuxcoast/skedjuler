import ScheduledShiftNode from "@/components/scheduler/ScheduledShiftNode";
import { AddShiftToCell } from "@/components/scheduler/AddShiftToCell";
import { useAppSelector } from "@/lib/hooks";
import { selectShiftsByEmployeeIDAndDay } from "@/lib/features/shifts/shiftsSlice";
import { EmptyCellAddShift } from "./hover-empty-cell";
import { useState } from "react";
import { EmployeeDayProps } from "../types";

export default function GridCell({ day, employee }: EmployeeDayProps) {
  const [hidden, setHidden] = useState(true);

  const shifts = useAppSelector((state) =>
    // TODO: make a factory function for this memoized selector function
    // currently the cache size is 1, and is being shared across the entire
    // grid - essentially useless for memoization.
    // https://redux.js.org/usage/deriving-data-selectors#selector-factories
    selectShiftsByEmployeeIDAndDay(state, {
      employeeID: employee.id,
      day: day,
    }),
  );
  const shiftsPresent = shifts.length > 0;

  const handleMouseEnter = () => {
    setHidden(false);
  };

  const handleMouseLeave = () => {
    setHidden(true);
  };

  return (
    // TODO: fix overlapping border in calendar grid
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="p-2 border min-h-16 border-foreground bg-cell flex flex-row items-center justify-between "
    >
      <div className="flex flex-grow flex-col gap-2 justify-start">
        {shiftsPresent ? (
          shifts.map((shift) => (
            <ScheduledShiftNode key={shift.id} shift={shift} />
          ))
        ) : !hidden ? (
          <EmptyCellAddShift employee={employee} day={day} />
        ) : null}
      </div>
      {/* <div className="inline-flex flex-col justify-start"> */}
      {/* <AddShiftToCell day={day} employee={employee} /> */}
      {/* </div> */}
    </div>
  );
}
