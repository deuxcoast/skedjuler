import { Dayjs } from "dayjs";
import ShiftNode from "./shift-node";

const startShift = new Date("January 1, 2024 15:45:00");
const endShift = new Date("January 1, 2024 23:00:00");

const shiftDuration = {
  startDate: startShift,
  endDate: endShift,
};

type DayCellProps = {
  day: Dayjs;
};

export default function DayCell({ day }: DayCellProps) {
  return (
    // TODO: Adjust width settings for grid. Figure out how to make grid more
    // dynamic and ...flex-ible.
    // - Fix the overlapping border
    // - Possible solution: set border-right and border-bottom to none, but apply
    // last-elem rules where the last elements do have right and bottom borders
    <div className="p-2 border border-foreground lg:min-w-44 bg-cell flex-col">
      <ShiftNode
        shiftRole="Server"
        duration={shiftDuration}
        published={false}
      />
    </div>
  );
}
