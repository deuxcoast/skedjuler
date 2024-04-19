import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno";
import { Schedule, THourMinuteTime } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID } from "crypto";

const scheduleData = SampleData.schedules;

interface ScheduleState {
  schedules: Schedule[];
  currentlySelectedScheduleIndex: number;
}

const initialState: ScheduleState = {
  schedules: scheduleData,
  currentlySelectedScheduleIndex: 0,
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<Schedule>) => {
      state.schedules.push(action.payload);
    },

    removeScheduleByID: (state, action: PayloadAction<UUID>) => {
      state.schedules.filter((sched) => sched.id !== action.payload);
    },

    updateScheduleByID: (
      state,
      action: PayloadAction<{ id: UUID; schedule: Schedule }>,
    ) => {
      // updateItemInArrayByID(state.schedules, action.payload);
      const idx = state.schedules.findIndex(
        (sched) => sched.id === action.payload.id,
      );
      state.schedules[idx] = action.payload.schedule;
    },

    setCurrentlySelectedScheduleById: (state, action: PayloadAction<UUID>) => {
      const idx = state.schedules.findIndex(
        (sched) => sched.id === action.payload,
      );
      state.currentlySelectedScheduleIndex = idx;
    },

    setDefaultShiftStartByID: (
      state,
      action: PayloadAction<{ id: UUID; defaultShiftStart: THourMinuteTime }>,
    ) => {
      const idx = state.schedules.findIndex(
        (sched) => sched.id === action.payload.id,
      );
      state.schedules[idx].defaultShiftStart = action.payload.defaultShiftStart;
    },

    setDefaultShiftEndByID: (
      state,
      action: PayloadAction<{ id: UUID; defaultShiftEnd: THourMinuteTime }>,
    ) => {
      const idx = state.schedules.findIndex(
        (sched) => sched.id === action.payload.id,
      );
      state.schedules[idx].defaultShiftEnd = action.payload.defaultShiftEnd;
    },
  },
});

export const {
  addSchedule,
  removeScheduleByID,
  updateScheduleByID,
  setCurrentlySelectedScheduleById,
  setDefaultShiftStartByID,
  setDefaultShiftEndByID,
} = schedulesSlice.actions;

export const selectCurrentlySelectedSchedule = (state: RootState) => {
  const idx = state.schedules.currentlySelectedScheduleIndex;
  return state.schedules.schedules[idx];
};

export const selectSchedules = (state: RootState) => state.schedules.schedules;
export const selectScheduleById = (state: RootState, id: UUID) => {
  const idx = state.schedules.schedules.findIndex((sched) => sched.id === id);
  return state.schedules.schedules[idx];
};

export default schedulesSlice.reducer;
