import { Shift } from "@/types/global";
import dayjs from "dayjs";

interface ShiftDurationProps {
  shift: Shift;
}
export default function ShiftDuration({ shift }: ShiftDurationProps) {
  const startTime = dayjs(shift.start);
  const endTime = dayjs(shift.end);
  return (
    <div className="text-xs">
      {startTime.format("h:mm a")}
      {" - "}
      {endTime.format("h:mm a")}
    </div>
  );
}
