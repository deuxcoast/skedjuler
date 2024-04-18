import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  selectSchedules,
  selectSelectedScheduleIndex,
  setCurrentlySelectedScheduleById,
} from "@/lib/features/schedules/schedulesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UUID } from "crypto";
import { ChevronsDown } from "lucide-react";

export default function SchedulerSelector() {
  const selectedSchedule = useAppSelector(selectSelectedScheduleIndex);
  const schedules = useAppSelector(selectSchedules);

  const dispatch = useAppDispatch();
  const currentSchedule = schedules[selectedSchedule];

  const filterOutCurrentSchedule = () => {
    return schedules.filter((schedule) => schedule.id !== currentSchedule.id);
  };

  const handleChangeSelectedSchedule = (scheduleID: UUID) => {
    dispatch(setCurrentlySelectedScheduleById(scheduleID));
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
