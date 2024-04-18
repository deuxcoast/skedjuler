import { Dayjs } from "dayjs";

export type Calendar = {
  weekIndex: number;
  currentWeek: Dayjs[];
  dayScheduleStarts: number;
};
