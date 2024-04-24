import { Button } from "@/components/ui/button";
import { EmployeeDayProps } from "../types";
import { AddShiftToCell } from "@/components/scheduler/AddShiftToCell";
import { CirclePlus } from "lucide-react";

function EmptyCellAddShift(props: EmployeeDayProps) {
  return (
    <AddShiftToCell {...props}>
      <Button className="gap-2" variant="outline">
        Add Shift <CirclePlus className="h-4 w-4" />
      </Button>
    </AddShiftToCell>
  );
}

export { EmptyCellAddShift };
