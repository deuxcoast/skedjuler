import { Dayjs } from "dayjs";
import SchedulerGridHeader from "./SchedulerGridHeader";
import WeekRow from "./WeekRow";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SchedulerControlBar from "./SchedulerControlBar";

type WeekGridProps = {
  week: Dayjs[];
};

export default function WeekGrid({ week }: WeekGridProps) {
  return (
    <>
      <SchedulerControlBar week={week} />
      <div className="grid grid-cols-7 grid-rows-calendar justify-items-stretch items-stretch">
        <SchedulerGridHeader week={week} />
        <WeekRow week={week} />
      </div>
    </>
  );
}
