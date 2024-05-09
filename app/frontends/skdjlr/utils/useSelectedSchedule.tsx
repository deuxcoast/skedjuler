import { useApp } from "@/lib/context/AppContext";
import { selectScheduleByIndex } from "@/lib/features/schedules/schedulesSlice";
import { useAppSelector } from "@/lib/hooks";
import { Schedule } from "@/types/global";

export const useSelectedSchedule = (): Schedule => {
  const { selectedScheduleIndex } = useApp();
  const selectedSchedule = useAppSelector((state) =>
    selectScheduleByIndex(state, selectedScheduleIndex),
  );
  return selectedSchedule;
};
