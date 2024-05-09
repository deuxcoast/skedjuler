import { RootState } from "@/lib/store";
import { getWeek } from "@/utils/dates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SampleData } from "@/sample-data/lmno-2";

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

// SampleData.business.entities

interface Calendar {
  weekIndex: number;
  currentWeek: string[];
  dayScheduleStarts: number;
  timezone: string;
}

const initialCalendar: Calendar = {
  weekIndex: dayjs().week(),
  dayScheduleStarts: 0,
  currentWeek: getWeek(0),
  timezone: "America/Los_Angeles",
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
export const selectTimeZone = (state: RootState) => state.calendar.timezone;

export default calendarSlice.reducer;
