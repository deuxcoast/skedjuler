import { RootState } from "@/lib/store";
import { Shift } from "@/types/global";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { UUID } from "crypto";
import dayjs from "dayjs";
import { createCachedSelector } from "re-reselect";

const scheduledShiftsAdapter = createEntityAdapter({
  selectId: (scheduledShift: Shift) => scheduledShift.id,
});

const scheduledShiftsSlice = createSlice({
  name: "scheduledShifts",
  initialState: scheduledShiftsAdapter.getInitialState(),
  reducers: {
    addScheduledShift: scheduledShiftsAdapter.addOne,
    removeScheduledShift: scheduledShiftsAdapter.removeOne,
    updateScheduledShift: scheduledShiftsAdapter.updateOne,
  },
});

export const { addScheduledShift, removeScheduledShift, updateScheduledShift } =
  scheduledShiftsSlice.actions;

export const {
  selectById: selectScheduledShiftById,
  selectAll: selectAllScheduledShifts,
} = scheduledShiftsAdapter.getSelectors<RootState>(
  (state) => state.scheduledShifts,
);

type ScheduledShiftsSelectorArgs = {
  employeeId: UUID;
  dayISO: string;
};

const selectDay = (_: RootState, args: ScheduledShiftsSelectorArgs) =>
  args.dayISO;
const selectEmployeeId = (_: RootState, args: ScheduledShiftsSelectorArgs) =>
  args.employeeId;

export const selectShiftsByEmployeeId = createCachedSelector(
  [selectAllScheduledShifts, selectEmployeeId],
  (shifts, employeeId) => {
    return shifts.filter((shift) => shift.employeeId === employeeId);
  },
)((_, props) => props.employeeId);

export const selectShiftsByEmployeeIdAndDay = createCachedSelector(
  [selectShiftsByEmployeeId, selectDay],
  (shiftsByEmployee, dayISO) => {
    const day = dayjs(dayISO);
    return shiftsByEmployee.filter((shift) => {
      return day.isSame(shift.start, "day");
    });
  },
)((_, props) => `${props.employeeId}:${props.dayISO}`);

export default scheduledShiftsSlice.reducer;
