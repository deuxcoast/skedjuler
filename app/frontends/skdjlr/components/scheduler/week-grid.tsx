import { Dayjs } from "dayjs";
import SchedulerGridHeader from "./SchedulerGridHeader";
import WeekRow from "./week-row";
import SchedulerControlBar from "./SchedulerControlBar";
import { Employee } from "@/types/global";

type WeekGridProps = {
  employeeData: Employee[];
  week: Dayjs[];
};

export default function WeekGrid({ employeeData, week }: WeekGridProps) {
  return (
    <>
      <SchedulerControlBar week={week} />
      <div className="grid grid-cols-8 grid-rows-calendar justify-items-stretch items-stretch">
        <SchedulerGridHeader week={week} />
        {employeeData.map((employee) => (
          <WeekRow key={employee.id} week={week} employee={employee} />
        ))}
      </div>
    </>
  );
}
