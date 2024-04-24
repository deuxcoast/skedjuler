// FIX: I'm unsure if this actually has to be a client component. I'm getting a
// hydration error because the date rendered on the server doesn't match the
// date rendered on the client. I think this has to do with the local time on
// the server being different from the local time on the client, but not positive.
// So I've just thrown 'use client' on here for the time being.
"use client";

import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SchedulerSelector from "../ScheduleSelector";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  decrementWeek,
  incrementWeek,
  resetCalendarToToday,
  selectCurrentWeek,
} from "@/lib/features/calendar/calendarSlice";

export default function ControlBar() {
  const week = useAppSelector(selectCurrentWeek);

  const dispatch = useAppDispatch();

  // If the first and last day of the week are not in the same month then we will
  // conditionally render the name of the month twice, other wise just once
  // e.g. `April 7th - 13th` vs. `April 28th - May 4th`
  const firstDay = dayjs(week[0]);
  const lastDay = dayjs(week[6]);

  function handlePrevWeek() {
    // setWeekIndex(weekIndex - 1);
    dispatch(decrementWeek());
  }

  function handleNextWeek() {
    // setWeekIndex(weekIndex + 1);
    dispatch(incrementWeek());
  }
  function handleToday() {
    // setWeekIndex(dayjs().week());
    dispatch(resetCalendarToToday());
  }

  return (
    <div className="flex flex-row justify-between items-center pb-4">
      <SchedulerSelector />
      <div className="flex flex-row justify-between gap-4 items-center ">
        {/* TODO: Clean up this snippet. Too messy/repetitive */}
        <h3 className="font-semibold text-lg px-4">
          {firstDay.isSame(lastDay, "month")
            ? `${firstDay.format("MMMM D")} - ${lastDay.format("D")}`
            : `${firstDay.format("MMMM D")} - ${lastDay.format("MMMM D")}`}
        </h3>
        <Button size="sm" onClick={handleToday}>
          Today
        </Button>
        <div className="flex gap-4">
          <Button size="sm" onClick={handlePrevWeek}>
            <ChevronLeft />
          </Button>
          <Button size="sm" onClick={handleNextWeek}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
