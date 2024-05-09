import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno-2";
import { Employee } from "@/types/global";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { UUID } from "crypto";
import {
  selectScheduleById,
  selectScheduleByIndex,
} from "../schedules/schedulesSlice";
import { getEmployeesByRoles } from "@/utils/getEmployeesByRole";

interface EmployeesState {
  entities: {
    [id: UUID]: Employee;
  };
  ids: UUID[];
}

const employeeData = SampleData.employees;
const initialState: EmployeesState = employeeData;

const employeesAdapter = createEntityAdapter({
  selectId: (employee: Employee) => employee.id,
});

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: employeesAdapter.addOne,
    removeEmployeeByID: employeesAdapter.removeOne,
  },
});

export const { addEmployee, removeEmployeeByID } = employeesSlice.actions;

export const { selectById: selectEmployeeByID, selectAll: selectAllEmployees } =
  employeesAdapter.getSelectors<RootState>((state) => state.employees);

export default employeesSlice.reducer;
