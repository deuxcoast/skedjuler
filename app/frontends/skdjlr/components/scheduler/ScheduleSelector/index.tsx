import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScheduler } from "@/context/SchedulerProvider/SchedulerContextProvider";
import { getEmployeesByRoles } from "@/lib/getEmployeesByRole";
import { INIT_ROLE_ID, INIT_SCHEDULE_ID } from "@/types/constants";
import { UUID } from "crypto";
import { ChevronsDown, Ellipsis } from "lucide-react";

export default function SchedulerSelector() {
  const {
    employees,
    schedules,
    selectedSchedule,
    setSelectedSchedule,
    currentScheduleEmployees,
    setCurrentScheduleEmployees,
  } = useScheduler();

  let currentSchedule = schedules[selectedSchedule];
  if (!currentSchedule) {
    currentSchedule = {
      id: INIT_SCHEDULE_ID,
      name: "No Schedules",

      roles: [INIT_ROLE_ID],
    };
  }

  const filterOutCurrentSchedule = () => {
    return schedules.filter((schedule) => schedule.id !== currentSchedule.id);
  };

  // After updating the selectedSchedule here, the WeekGrid component will
  // update the list of currentScheduleEmployees being passed down to the
  // scheduler.
  const handleChangeSelectedSchedule = (scheduleID: UUID) => {
    const index = schedules.findIndex((schedule) => schedule.id === scheduleID);
    setSelectedSchedule(index);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-2xl font-semibold">{currentSchedule.name}</div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <ChevronsDown className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Change Schedule</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterOutCurrentSchedule().map((schedule) => (
            <DropdownMenuItem
              key={schedule.id}
              onSelect={() => handleChangeSelectedSchedule(schedule.id)}
            >
              {schedule.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
