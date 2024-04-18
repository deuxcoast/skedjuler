import { RootState } from "@/lib/store";
import { getWeek } from "@/utils/dates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Calendar {
  weekIndex: number;
  currentWeek: string[];
  dayScheduleStarts: number;
}

const initialCalendar: Calendar = {
  weekIndex: 0,
  dayScheduleStarts: 0,
  currentWeek: getWeek(0),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialCalendar,
  reducers: {
    incrementWeek: (state) => {
      state.weekIndex += 1;
      state.currentWeek = getWeek(state.dayScheduleStarts, state.weekIndex + 1);
    },
    decrementWeek: (state) => {
      state.weekIndex -= 1;
      state.currentWeek = getWeek(state.dayScheduleStarts, state.weekIndex + 1);
    },
    resetCalendarToToday: (state) => {
      state.weekIndex = 0;
      state.currentWeek = getWeek(0);
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
