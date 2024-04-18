import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno";
import { Employee } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID } from "crypto";

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

export const selectEmployees = (state: RootState) => state.employees.employees;

// TODO: learn how to write selector functions that derive data
export const selectCurrentScheduleEmployees = (state: RootState) =>
  state.employees.employees;

export default employeesSlice.reducer;
