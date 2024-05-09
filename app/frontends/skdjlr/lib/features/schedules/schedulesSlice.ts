import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno-2";
import { Schedule } from "@/types/global";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { UUID } from "crypto";

interface ScheduleState {
  entities: {
    [id: UUID]: Schedule;
  };
  ids: UUID[];
}

const scheduleData = SampleData.schedules;
const initialState: ScheduleState = scheduleData;

const schedulesAdapter = createEntityAdapter({
  selectId: (schedule: Schedule) => schedule.id,
});

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule: schedulesAdapter.addOne,
    removeScheduleById: schedulesAdapter.removeOne,
    updateScheduleById: schedulesAdapter.updateOne,

    // setDefaultShiftStartByID: (
    //   state,
    //   action: PayloadAction<{ id: UUID; defaultShiftStart: THourMinuteTime }>,
    // ) => {
    //   const idx = state.schedules.findIndex(
    //     (sched) => sched.id === action.payload.id,
    //   );
    //   state.schedules[idx].defaultShiftStart = action.payload.defaultShiftStart;
    // },
    //
    // setDefaultShiftEndByID: (
    //   state,
    //   action: PayloadAction<{ id: UUID; defaultShiftEnd: THourMinuteTime }>,
    // ) => {
    //   const idx = state.schedules.findIndex(
    //     (sched) => sched.id === action.payload.id,
    //   );
    //   state.schedules[idx].defaultShiftEnd = action.payload.defaultShiftEnd;
    // },
  },
});

export const { addSchedule, removeScheduleById, updateScheduleById } =
  schedulesSlice.actions;

export const { selectById: selectScheduleById, selectAll: selectSchedules } =
  schedulesAdapter.getSelectors<RootState>((state) => state.schedules);

const selectIndex = (_: RootState, index: number) => index;

export const selectScheduleByIndex = createSelector(
  [selectSchedules, selectIndex],
  (schedules, index) => {
    return schedules[index];
  },
);

export default schedulesSlice.reducer;
