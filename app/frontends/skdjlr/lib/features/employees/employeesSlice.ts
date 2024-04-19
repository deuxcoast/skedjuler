import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno";
import { Employee } from "@/types/global";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID } from "crypto";
import { selectCurrentlySelectedSchedule } from "../schedules/schedulesSlice";
import { getEmployeesByRoles } from "@/utils/getEmployeesByRole";

const employeeData = SampleData.employees;

interface EmployeesState {
  employees: Employee[];
}

const initialState: EmployeesState = {
  employees: employeeData,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    removeEmployeeByID: (state, action: PayloadAction<UUID>) => {
      state.employees.filter((employee) => employee.id !== action.payload);
    },
  },
});

export const { addEmployee, removeEmployeeByID } = employeesSlice.actions;

export const selectEmployeeID = (state: RootState, employeeID: UUID) =>
  employeeID;

export const selectEmployees = (state: RootState) => state.employees.employees;

export const selectEmployeeByID = createSelector(
  [selectEmployees, selectEmployeeID],
  (employees, id) => employees.filter((employee) => employee.id === id),
);

export const selectCurrentScheduleEmployees = createSelector(
  [selectEmployees, selectCurrentlySelectedSchedule],
  (employees, currentSchedule) => {
    const currentScheduleRoleIDs = currentSchedule.roles;
    return getEmployeesByRoles(employees, currentScheduleRoleIDs);
  },
);

export default employeesSlice.reducer;
