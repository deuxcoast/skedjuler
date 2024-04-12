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
      {/* TODO: this is currently just an empty filler div for the 8 columns, but
       * the styling needs to be improved - should it stay empty? what information
       * should be displayed here above the column of employees? */}
      <div></div>
      {week.map((day) => (
        <SchedulerGridHeaderCell key={day.date()} day={day} />
      ))}
    </>
  );
}
