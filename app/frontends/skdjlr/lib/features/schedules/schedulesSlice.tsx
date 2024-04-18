import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno";
import { Schedule } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID } from "crypto";

const scheduleData = SampleData.schedules;

interface ScheduleState {
  schedules: Schedule[];
  currentlySelectedSchedule: number;
}

const initialState: ScheduleState = {
  schedules: scheduleData,
  currentlySelectedSchedule: 0,
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<Schedule>) => {
      state.schedules.push(action.payload);
    },
    removeScheduleByID: (state, action: PayloadAction<UUID>) => {
      state.schedules.filter((schedule) => schedule.id !== action.payload);
    },
    setCurrentlySelectedScheduleById: (state, action: PayloadAction<UUID>) => {
      const idx = state.schedules.findIndex(
        (sched) => sched.id === action.payload,
      );
      state.currentlySelectedSchedule = idx;
    },
  },
});

export const {
  addSchedule,
  removeScheduleByID,
  setCurrentlySelectedScheduleById,
} = schedulesSlice.actions;

export const selectSelectedScheduleIndex = (state: RootState) =>
  state.schedules.currentlySelectedSchedule;

export const selectSchedules = (state: RootState) => state.schedules.schedules;

export default schedulesSlice.reducer;
