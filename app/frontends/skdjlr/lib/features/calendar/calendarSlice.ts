import { RootState } from "@/lib/store";
import { getWeek } from "@/utils/dates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

interface Calendar {
  weekIndex: number;
  currentWeek: string[];
  dayScheduleStarts: number;
}

const initialCalendar: Calendar = {
  weekIndex: dayjs().week(),
  dayScheduleStarts: 0,
  currentWeek: getWeek(0),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialCalendar,
  reducers: {
    incrementWeek: (state) => {
      state.weekIndex += 1;
      state.currentWeek = getWeek(state.dayScheduleStarts, state.weekIndex);
    },
    decrementWeek: (state) => {
      state.weekIndex -= 1;
      state.currentWeek = getWeek(state.dayScheduleStarts, state.weekIndex);
    },
    resetCalendarToToday: (state) => {
      state.weekIndex = dayjs().week();
      state.currentWeek = getWeek(state.dayScheduleStarts, state.weekIndex);
    },
    changeDayScheduleStarts: (state, action: PayloadAction<number>) => {
      state.dayScheduleStarts = action.payload;
      state.currentWeek = getWeek(action.payload, state.weekIndex);
    },
  },
});

export const {
  incrementWeek,
  decrementWeek,
  resetCalendarToToday,
  changeDayScheduleStarts,
} = calendarSlice.actions;

export const selectWeekIndex = (state: RootState) => state.calendar.weekIndex;
export const selectCurrentWeek = (state: RootState) =>
  state.calendar.currentWeek;
export const selectDayScheduleStarts = (state: RootState) =>
  state.calendar.dayScheduleStarts;

export default calendarSlice.reducer;
