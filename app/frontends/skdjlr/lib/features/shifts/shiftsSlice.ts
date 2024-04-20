import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno";
import { Shift, ShiftTemplate } from "@/types/global";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import { selectCurrentlySelectedSchedule } from "../schedules/schedulesSlice";
import dayjs, { Dayjs } from "dayjs";

const shiftTemplatesData = SampleData.shiftTemplates;
// const scheduledShiftsData = SampleData.scheduledShifts;

interface ShiftState {
  shiftTemplates: ShiftTemplate[];
  scheduledShifts: Shift[];
}

const initialState: ShiftState = {
  shiftTemplates: shiftTemplatesData,
  scheduledShifts: [],
};

const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    addScheduledShift: {
      reducer(state, action: PayloadAction<Shift>) {
        state.scheduledShifts.push(action.payload);
      },
      prepare(
        id: UUID,
        start: string,
        end: string,
        employeeID: UUID,
        roleID: UUID,
        scheduleID: UUID,
        published: boolean,
      ) {
        return {
          payload: {
            clientID: uuidv4() as UUID,
            id,
            start,
            end,
            employeeID,
            roleID,
            scheduleID,
            published,
          },
        };
      },
    },
    removeScheduledShiftByID: (state, action: PayloadAction<UUID>) => {
      state.scheduledShifts.filter((shift) => shift.id !== action.payload);
    },
    updateScheduledShift: (state, action: PayloadAction<Shift>) => {
      const { id, start, end, employeeID, scheduleID, clientID, published } =
        action.payload;
      const existingShift = state.scheduledShifts.find(
        (shift) => shift.clientID === clientID,
      );
      if (existingShift) {
        existingShift.id = id;
        existingShift.employeeID = employeeID;
        existingShift.scheduleID = scheduleID;
        existingShift.start = start;
        existingShift.end = end;
        existingShift.published = published;
      }
    },
    addShiftTemplate: (state, action: PayloadAction<ShiftTemplate>) => {
      state.shiftTemplates.push(action.payload);
    },
    removeShiftTemplateByID: (state, action: PayloadAction<UUID>) => {
      state.shiftTemplates.filter(
        (shiftTemplate) => shiftTemplate.id !== action.payload,
      );
    },
  },
});

export const {
  addScheduledShift,
  removeScheduledShiftByID,
  addShiftTemplate,
  removeShiftTemplateByID,
} = shiftsSlice.actions;

export const selectShifts = (state: RootState) => state.shifts.scheduledShifts;

const selectShiftID = (state: RootState, shiftID: UUID) => shiftID;
const selectDay = (state: RootState, args: SelectorArgs) => args.day;
const selectEmployeeID = (state: RootState, args: SelectorArgs) =>
  args.employeeID;

export const selectShiftTemplates = (state: RootState) =>
  state.shifts.shiftTemplates;

export const selectShiftsByDay = createSelector(
  [selectShifts, selectDay],
  (shifts, day) =>
    shifts.filter((shift: Shift) => day.isSame(shift.start, "day")),
);

type SelectorArgs = {
  employeeID: UUID;
  day: Dayjs;
};

export const selectShiftByID = createSelector(
  [selectShifts, selectShiftID],
  (shifts, shiftID) => shifts.find((shift) => shift.id === shiftID),
);

export const selectShiftsByEmployeeID = createSelector(
  [selectShifts, selectEmployeeID],
  (shifts, employeeID) =>
    shifts.filter((shift) => shift.employeeID === employeeID),
);

export const selectShiftsByEmployeeIDAndDay = createSelector(
  [selectShiftsByEmployeeID, selectDay],
  (shiftsByEmployee, day) =>
    shiftsByEmployee.filter((shift) => day.isSame(shift.start, "day")),
);

export const selectShiftTemplatesForCurrentSchedule = createSelector(
  [selectShiftTemplates, selectCurrentlySelectedSchedule],
  (shiftTemplates, currentSchedule) => {
    const roles = currentSchedule.roles;
    return shiftTemplates.filter((shiftTemplate) =>
      roles.includes(shiftTemplate.roleID),
    );
  },
);

export default shiftsSlice.reducer;
