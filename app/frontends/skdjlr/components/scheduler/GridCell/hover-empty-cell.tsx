import { Button } from "@/components/ui/button";
import { EmployeeDayProps } from "../types";
import { AddShiftToCell } from "@/components/scheduler/AddShiftToCell";

function EmptyCellAddShift(props: EmployeeDayProps) {
  return (
    <AddShiftToCell {...props}>
      <Button variant="outline">Add Shift</Button>
    </AddShiftToCell>
  );
}

export { EmptyCellAddShift };
