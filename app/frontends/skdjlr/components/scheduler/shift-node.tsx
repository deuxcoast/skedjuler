import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import ShiftDuration from "./shift-duration";
import { ShiftNodeCard, ShiftNodeContent } from "./shift-node-wrapper";

interface ShiftNodeProps {
  /**
   * What type of role will be worked this shift?
   */
  shiftRole: string;
  /**
   * Start and end time for shift.
   */
  duration: {
    startDate: Date;
    endDate: Date;
  };
  /**
   * The published status of the shift, determines styling to alert user of
   * unpublished revisions
   */
  published: boolean; // is this ShiftNode a draft or published
}

export default function ShiftNode({
  shiftRole,
  duration,
  published,
}: ShiftNodeProps) {
  return (
    <ShiftNodeCard className="">
      <ShiftNodeContent className="space-y-1">
        <Badge>{shiftRole}</Badge>
        <ShiftDuration duration={duration} />
      </ShiftNodeContent>
    </ShiftNodeCard>
  );
}
