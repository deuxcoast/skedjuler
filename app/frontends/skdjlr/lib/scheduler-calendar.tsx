import { DateUnits } from "@/context/SchedulerProvider/types";
import dayjs, { Dayjs } from "dayjs";

interface DayJsObjByDay {
  date: DateUnits;
  index: number;
}

export const dateToday: DateUnits = {
  year: dayjs().year(),
  month: Number(dayjs().format("MM")),
  day: Number(dayjs().format("DD")),
};

export const dayjsObj = ({ year, month, day }: DateUnits) => {
  return dayjs(`${year.toString()}-${month.toString()}-${day.toString()}`);
};

export const dayjsObjByDay = ({ date, index }: DayJsObjByDay) => {
  const dateFormat = `${date?.year}-${date?.month}-${date?.day}`;
  return dayjs(dateFormat).day(index);
};
