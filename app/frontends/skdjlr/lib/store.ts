import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./features/calendar/calendarSlice";
import schedulesReducer from "./features/schedules/schedulesSlice";
import employeesReducer from "./features/employees/employeesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      calendar: calendarReducer,
      schedules: schedulesReducer,
      employees: employeesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
