import { Employee } from "@/types/global";
import { Dayjs } from "dayjs";

export type AddShiftToCellProps = {
  employee: Employee;
  day: Dayjs;
};

export type AddShiftFormProps = {
  employee: Employee;
  day: Dayjs;
};
