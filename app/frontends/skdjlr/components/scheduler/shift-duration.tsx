import { formatShiftTime } from "@/utils/reusable-functions";

interface ShiftDurationProps {
  duration: {
    startDate: Date;
    endDate: Date;
  };
}
export default function ShiftDuration({ duration }: ShiftDurationProps) {
  return (
    <div className="text-xs">
      {formatShiftTime(duration.startDate)}
      {" - "}
      {formatShiftTime(duration.endDate)}
    </div>
  );
}
