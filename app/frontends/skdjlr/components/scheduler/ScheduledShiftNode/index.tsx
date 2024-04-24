import { Shift } from "@/types/global";
import { Badge } from "@/components/ui/badge";
import ShiftDuration from "@/components/scheduler/ScheduledShiftNode/shift-duration";
import {
  ShiftNodeCard,
  ShiftNodeContent,
} from "@/components/scheduler/ScheduledShiftNode/shift-node-wrapper";
import { useAppSelector } from "@/lib/hooks";
import { selectRoleNameByID } from "@/lib/features/roles/rolesSlice";
import { Draggable } from "@hello-pangea/dnd";

type ShiftNodeProps = {
  shift: Shift;
  index: number;
};

export default function ShiftNode({ shift, index }: ShiftNodeProps) {
  const roleName = useAppSelector((state) =>
    selectRoleNameByID(state, shift.roleID),
  );
  return (
    <Draggable draggableId={shift.clientID} index={index}>
      {(provided) => (
        <ShiftNodeCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ShiftNodeContent className="space-y-1">
            <h4 className="text-xs font-semibold">{roleName}</h4>
            <ShiftDuration shift={shift} />
          </ShiftNodeContent>
        </ShiftNodeCard>
      )}
    </Draggable>
  );
}
