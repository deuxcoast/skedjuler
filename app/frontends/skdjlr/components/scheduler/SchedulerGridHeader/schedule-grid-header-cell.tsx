import { Dayjs } from "dayjs";

type SchedulerHeaderCellProps = {
  day: Dayjs;
};
export default function SchedulerGridHeaderCell({
  day,
}: SchedulerHeaderCellProps) {
  return (
    <div className="p-2  bg-foreground text-background flex-col justify-center">
      <p className="text-sm font-semibold text-center">{day.format("dddd")}</p>
      <p className="text-sm text-center">{day.format("MMMM Do")}</p>
    </div>
  );
}
