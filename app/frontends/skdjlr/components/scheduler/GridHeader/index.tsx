import dayjs from "dayjs";
import GridHeaderCell from "@/components/scheduler/GridHeaderCell";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentWeek } from "@/lib/features/calendar/calendarSlice";

export default function GridHeader() {
  const week = useAppSelector(selectCurrentWeek);
  return (
    <>
      {/* TODO: this is currently just an empty filler div for the 8 columns, but
       * the styling needs to be improved - should it stay empty? what information
       * should be displayed here above the column of employees? */}
      <div></div>
      {week.map((day) => (
        <GridHeaderCell key={day} day={dayjs(day)} />
      ))}
    </>
  );
}
