import { Shift } from "@/types/global";
import { ScheduleActions, UserAction } from "./types";

export const ScheduledShiftReducer = (
  state: Array<Shift>,
  action: ShiftActions,
) => {
  switch (action.type) {
    case UserAction.ADD:
      return [...state, action.payload];
    case UserAction.EDIT:
      return state.map((event) =>
        event.id === action.payload.id ? action.payload : event,
      );
    case UserAction.REMOVE:
      return state.filter((event) => event.id !== action.payload.id);

    default:
      throw new Error("Unhandled `action.type` in ShiftReducer function");
  }
};
