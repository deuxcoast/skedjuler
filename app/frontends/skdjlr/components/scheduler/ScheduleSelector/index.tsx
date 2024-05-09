import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/lib/context/AppContext";
import {
  selectScheduleByIndex,
  selectSchedules,
} from "@/lib/features/schedules/schedulesSlice";
import { useAppSelector } from "@/lib/hooks";
import { UUID } from "crypto";
import { ChevronsDown } from "lucide-react";

export default function SchedulerSelector() {
  const { selectedScheduleIndex, setSelectedScheduleIndex } = useApp();
  const selectedSchedule = useAppSelector((state) =>
    selectScheduleByIndex(state, selectedScheduleIndex),
  );
  const schedules = useAppSelector(selectSchedules);

  const filterOutCurrentSchedule = () => {
    return schedules.filter((schedule) => schedule.id !== selectedSchedule.id);
  };

  const handleChangeSelectedSchedule = (scheduleID: UUID) => {
    const idx = schedules.findIndex((schedule) => schedule.id === scheduleID);
    setSelectedScheduleIndex(idx);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-2xl font-semibold">{selectedSchedule.name}</div>

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
