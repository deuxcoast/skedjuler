import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno-2";
import { Shift, ShiftTemplate } from "@/types/global";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createCachedSelector } from "re-reselect";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import { selectCurrentlySelectedSchedule } from "../schedules/schedulesSlice";
import dayjs from "dayjs";
import { parseIsoIntoHourMin } from "@/utils/dates";
import { current } from "immer";

const shiftTemplatesData = SampleData.shiftTemplates;
// const scheduledShiftsData = SampleData.scheduledShifts;

interface ShiftState {
  shiftTemplates: {
    entities: {
      [id: UUID]: ShiftTemplate;
    };
    ids: UUID[];
  };
  scheduledShifts: {
    entities: {
      [id: UUID]: Shift;
    };
    ids: UUID[];
  };
}

type DragPayload = {
  destinationEmployeeID: UUID;
  destinationDay: string;
  shiftID: UUID;
};

export const shiftAdapter = createEntityAdapter({
  selectId: (shift: Shift) => shift.id,
  sortComparer: (a: Shift, b: Shift) =>
    a.employeeID.localeCompare(b.employeeID),
});

const initialState: ShiftState = {
  shiftTemplates: shiftTemplatesData,
  scheduledShifts: {
    entities: {},
    ids: [],
  },
};

const shiftSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    // addScheduledShift: {
    //   reducer(state, action: PayloadAction<Shift>) {
    //     console.log("addScheduledShift:", action.payload);
    //     state.scheduledShifts.entities.push(action.payload);
    //   },
    //   prepare(
    //     start: string,
    //     end: string,
    //     employeeID: UUID,
    //     roleID: UUID,
    //     scheduleID: UUID,
    //     published: boolean,
    //   ) {
    //     return {
    //       payload: {
    //         id: uuidv4() as UUID,
    //         start,
    //         end,
    //         employeeID,
    //         roleID,
    //         scheduleID,
    //         published,
    //       },
    //     };
    //   },
    // },
    //
    addScheduledShift: shiftAdapter.addOne,

    removeScheduledShiftByID: (state, action: PayloadAction<UUID>) => {
      state.scheduledShifts.filter((shift) => shift.id !== action.payload);
    },
    updateScheduledShift: (state, action: PayloadAction<Shift>) => {
      const { id, start, end, employeeID, scheduleID, published } =
        action.payload;
      const existingShift = state.scheduledShifts.find(
        (shift) => shift.id === id,
      );
      if (existingShift) {
        existingShift.id = id;
        existingShift.employeeID = employeeID;
        existingShift.scheduleID = scheduleID;
        existingShift.start = start;
        existingShift.end = end;
        existingShift.published = published;
      }
      console.log("updateScheduledShift", existingShift);
    },
    scheduledShiftDragAndDrop: (state, action: PayloadAction<DragPayload>) => {
      const { destinationDay, destinationEmployeeID, shiftID } = action.payload;
      const existingShift = state.scheduledShifts.find(
        (shift) => (shift.id = shiftID),
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
        // existingShift.id = uuidv4() as UUID;
        console.log("scheduledShiftDragAndDrop:", current(existingShift));
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
  scheduledShiftDragAndDrop,
} = shiftSlice.actions;

// export const selectShifts = (state: RootState) => state.shifts.scheduledShifts;
export const { selectAll: selectShifts } = shiftAdapter.getSelectors(
  (state) => state.shifts,
);

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
