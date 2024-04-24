import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno";
import { Shift, ShiftTemplate } from "@/types/global";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCachedSelector } from "re-reselect";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import { selectCurrentlySelectedSchedule } from "../schedules/schedulesSlice";
import dayjs from "dayjs";
import { parseIsoIntoHourMin } from "@/utils/dates";

const shiftTemplatesData = SampleData.shiftTemplates;
// const scheduledShiftsData = SampleData.scheduledShifts;

interface ShiftState {
  isDragging: boolean;
  shiftTemplates: ShiftTemplate[];
  scheduledShifts: Shift[];
}

type DragPayload = {
  destinationEmployeeID: UUID;
  destinationDay: string;
  shiftID: UUID;
};

const initialState: ShiftState = {
  isDragging: false,
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
    scheduledShiftDragAndDrop: (state, action: PayloadAction<DragPayload>) => {
      const { destinationDay, destinationEmployeeID, shiftID } = action.payload;
      const existingShift = state.scheduledShifts.find(
        (shift) => (shift.clientID = shiftID),
      );

      const destDayjs = dayjs(destinationDay);

      if (existingShift) {
        const [shiftStartHour, shiftStartMin] = parseIsoIntoHourMin(
          existingShift.start,
        );
        const [shiftEndHour, shiftEndMin] = parseIsoIntoHourMin(
          existingShift.end,
        );

        const newShiftStart = destDayjs
          .hour(shiftStartHour)
          .minute(shiftStartMin);

        const newShiftEnd = destDayjs.hour(shiftEndHour).minute(shiftEndMin);

        existingShift.employeeID = destinationEmployeeID;
        existingShift.start = newShiftStart.toISOString();
        existingShift.end = newShiftEnd.toISOString();
        existingShift.clientID = uuidv4() as UUID;
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
    isDragging: (state) => {
      state.isDragging = true;
    },
    isNotDragging: (state) => {
      state.isDragging = false;
    },
  },
});

export const {
  addScheduledShift,
  removeScheduledShiftByID,
  addShiftTemplate,
  removeShiftTemplateByID,
  scheduledShiftDragAndDrop,
  isDragging,
  isNotDragging,
} = shiftsSlice.actions;

export const selectShifts = (state: RootState) => state.shifts.scheduledShifts;

const selectShiftID = (_: RootState, shiftID: UUID) => shiftID;
const selectDay = (_: RootState, args: SelectorArgs) => args.dayISO;
const selectEmployeeID = (_: RootState, args: SelectorArgs) => args.employeeID;

export const selectShiftTemplates = (state: RootState) =>
  state.shifts.shiftTemplates;

export const selectShiftsByDay = createSelector(
  [selectShifts, selectDay],
  (shifts, dayISO) => {
    const day = dayjs(dayISO);
    return shifts.filter((shift: Shift) => day.isSame(shift.start, "day"));
  },
);

type SelectorArgs = {
  employeeID: UUID;
  dayISO: string;
};
// TODO: made a mess down here trying to cache the selector functions so they
// will only run on an individual grid cell if a shift has been added for that
// particular employee, but it's not working and i think each cell has to check
//

export const selectShiftByID = createSelector(
  [selectShifts, selectShiftID],
  (shifts, shiftID) => shifts.find((shift) => shift.id === shiftID),
);

export const selectShiftsByEmployeeID = createCachedSelector(
  [selectShifts, selectEmployeeID],
  (shifts, employeeID) => {
    return shifts.filter((shift) => shift.employeeID === employeeID);
  },
)((_, props) => props.employeeID);

export const selectShiftsByEmployeeIDAndDay = createCachedSelector(
  [selectShiftsByEmployeeID, selectDay],
  (shiftsByEmployee, dayISO) => {
    const day = dayjs(dayISO);
    return shiftsByEmployee.filter((shift) => day.isSame(shift.start, "day"));
  },
)((_, props) => `${props.employeeID}:${props.dayISO}`);

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
