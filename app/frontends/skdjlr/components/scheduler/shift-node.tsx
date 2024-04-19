import { Shift } from "@/types/global";
import { Badge } from "../ui/badge";
import ShiftDuration from "./shift-duration";
import { ShiftNodeCard, ShiftNodeContent } from "./shift-node-wrapper";
import { useAppSelector } from "@/lib/hooks";
import { selectRoleNameByID } from "@/lib/features/roles/rolesSlice";

type ShiftNodeProps = {
  shift: Shift;
};

export default function ShiftNode({ shift }: ShiftNodeProps) {
  const roleName = useAppSelector((state) =>
    selectRoleNameByID(state, shift.roleID),
  );
  console.log(roleName);
  return (
    <ShiftNodeCard className="">
      <ShiftNodeContent className="space-y-1">
        <Badge>{roleName}</Badge>
        <ShiftDuration shift={shift} />
      </ShiftNodeContent>
    </ShiftNodeCard>
  );
}
