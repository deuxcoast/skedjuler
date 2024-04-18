import { Dayjs } from "dayjs";
import ShiftNode from "./shift-node";
import { AddShiftToCell } from "./AddShiftToCell";
import { Employee } from "@/types/global";

type DayCellProps = {
  day: Dayjs;
  employee: Employee;
};

export default function DayCell(props: DayCellProps) {
  return (
    // TODO: Adjust width settings for grid. Figure out how to make grid more
    // dynamic and ...flex-ible.
    // - Fix the overlapping border
    // - Possible solution: set border-right and border-bottom to none, but apply
    // last-elem rules where the last elements do have right and bottom borders
    <div className="p-2 border min-h-16 border-foreground bg-cell flex flex-row justify-between ">
      <div className="flex-grow inline-flex flex-col justify-start"></div>
      <div className="inline-flex flex-col justify-start">
        <AddShiftToCell {...props} />
      </div>
      {/* <ShiftNode */}
      {/*   shiftRole="Server" */}
      {/*   duration={shiftDuration} */}
      {/*   published={false} */}
      {/* /> */}
    </div>
  );
}
