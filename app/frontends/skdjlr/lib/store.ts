import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "@/lib/features/calendar/calendarSlice";
import schedulesReducer from "@/lib/features/schedules/schedulesSlice";
import employeesReducer from "@/lib/features/employees/employeesSlice";
// import shiftReducer from "@/lib/features/shifts/shiftsSlice";
import scheduledShiftsReducer from "@/lib/features/scheduledShifts/scheduledShiftsSlice";
import shiftTemplatesReducer from "@/lib/features/shiftTemplates/shiftTemplatesSlice";
import rolesReducer from "@/lib/features/roles/rolesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      calendar: calendarReducer,
      schedules: schedulesReducer,
      employees: employeesReducer,
      // shifts: shiftReducer,
      scheduledShifts: scheduledShiftsReducer,
      shiftTemplates: shiftTemplatesReducer,
      roles: rolesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
