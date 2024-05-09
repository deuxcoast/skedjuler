"use client";

import ScheduledShiftNode from "@/components/scheduler/ScheduledShiftNode";
import { useAppSelector } from "@/lib/hooks";
import { selectShiftsByEmployeeIdAndDay } from "@/lib/features/scheduledShifts/scheduledShiftsSlice";
import { EmptyCellAddShift } from "./hover-empty-cell";
import { use, useState } from "react";
import { EmployeeDayProps } from "../types";
import { Droppable } from "@hello-pangea/dnd";
import dayjs from "dayjs";
import { useApp } from "@/lib/context/AppContext";
import { selectTimeZone } from "@/lib/features/calendar/calendarSlice";

export default function GridCell({ day, employee }: EmployeeDayProps) {
  const timezone = useAppSelector(selectTimeZone);
  // get date from ISO string with no time data to circumvent hydration related
  // errors due to UTC time on server and local time on client
  const date = dayjs(day).format("YYYY-MM-DD");

  const [hidden, setHidden] = useState(true);
  const appContext = useApp();
  const isDragging = appContext.isDragging;

  const shifts = useAppSelector((state) =>
    selectShiftsByEmployeeIdAndDay(state, {
      employeeId: employee.id,
      dayISO: day,
    }),
  );
  const shiftsPresent = shifts.length > 0;

  if (shiftsPresent) {
    // console.log(dayjs(day).format("MM/DD/YYYY"));
    // console.log(shifts);
    shifts.forEach((shift) => {
      // console.log("employeeId:", shift.employeeId);
      // console.log("start:", shift.start);
      // console.log("end:", shift.end);
    });
  }

  const handleMouseEnter = () => {
    setHidden(false);
  };

  const handleMouseLeave = () => {
    setHidden(true);
  };

  return (
    // TODO: fix overlapping border in calendar grid
    <Droppable droppableId={`${date}::${employee.id}`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="p-2 border min-h-16 border-foreground bg-cell flex flex-row items-center justify-between "
        >
          <div className="flex flex-grow flex-col gap-2 justify-start">
            {shiftsPresent ? (
              shifts.map((shift, idx) => (
                <ScheduledShiftNode key={shift.id} shift={shift} index={idx} />
              ))
            ) : !hidden && !isDragging ? (
              <EmptyCellAddShift employee={employee} day={day} />
            ) : null}
            {provided.placeholder}
          </div>
          {/* We use this to create space in the <Droppable /> component as 
              needed during a drag. */}
        </div>
      )}
    </Droppable>
  );
}
