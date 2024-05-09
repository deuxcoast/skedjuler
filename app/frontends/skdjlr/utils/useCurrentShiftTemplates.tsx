import { useApp } from "@/lib/context/AppContext";
import { selectScheduleByIndex } from "@/lib/features/schedules/schedulesSlice";
import { useAppSelector } from "@/lib/hooks";
import { Schedule, ShiftTemplate } from "@/types/global";
import { useSelectedSchedule } from "./useSelectedSchedule";
import { selectAllShiftTemplates } from "@/lib/features/shiftTemplates/shiftTemplatesSlice";

export const useCurrentShiftTemplates = (): ShiftTemplate[] => {
  const selectedSchedule = useSelectedSchedule();
  const shiftTemplates = useAppSelector(selectAllShiftTemplates);
  const roles = selectedSchedule.roles;

  return shiftTemplates.filter((shiftTemplate) =>
    roles.includes(shiftTemplate.roleId),
  );
};
