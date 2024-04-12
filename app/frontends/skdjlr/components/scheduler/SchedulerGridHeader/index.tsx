import { Dayjs } from "dayjs";
import SchedulerGridHeaderCell from "./schedule-grid-header-cell";

type SchedulerHeaderCellProps = {
  week: Dayjs[];
};
export default function SchedulerGridHeader({
  week,
}: SchedulerHeaderCellProps) {
  return (
    <>
      {week.map((day) => (
        <SchedulerGridHeaderCell key={day.date()} day={day} />
      ))}
    </>
  );
}
