import { Shift } from "@/types/global";
import { Badge } from "@/components/ui/badge";
import ShiftDuration from "@/components/scheduler/ScheduledShiftNode/shift-duration";
import {
  ShiftNodeCard,
  ShiftNodeContent,
} from "@/components/scheduler/ScheduledShiftNode/shift-node-wrapper";
import { useAppSelector } from "@/lib/hooks";
import { selectRoleNameByID } from "@/lib/features/roles/rolesSlice";

type ShiftNodeProps = {
  shift: Shift;
};

export default function ShiftNode({ shift }: ShiftNodeProps) {
  const roleName = useAppSelector((state) =>
    selectRoleNameByID(state, shift.roleID),
  );
  return (
    <ShiftNodeCard>
      <ShiftNodeContent className="space-y-1">
        <h4 className="text-xs font-semibold">{roleName}</h4>
        <ShiftDuration shift={shift} />
      </ShiftNodeContent>
    </ShiftNodeCard>
  );
}
