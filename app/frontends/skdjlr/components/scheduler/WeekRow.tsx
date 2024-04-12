import { Dayjs } from "dayjs";
import DayCell from "./day-cell";

type WeekRowProps = {
  week: Dayjs[];
};

export default function WeekRow({ week }: WeekRowProps) {
  return (
    <>
      {week.map((day) => (
        <DayCell key={day.date()} day={day} />
      ))}
    </>
  );
}
