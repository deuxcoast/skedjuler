"use client";

import {
  isDragging,
  isNotDragging,
  scheduledShiftDragAndDrop,
} from "@/lib/features/shifts/shiftsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { DragDropContext } from "@hello-pangea/dnd";
import { Fragment, useCallback } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function SchedulerLayout({ children }: AppLayoutProps) {
  const dispatch = useAppDispatch();

  // using useCallback is optional
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);

  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);

  const onDragStart = useCallback(() => {
    dispatch(isDragging());
  }, [dispatch]);

  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);

  // FIX: I did type any...
  const onDragEnd = useCallback(
    (result: any) => {
      dispatch(isNotDragging());
      const { source, destination, draggableId } = result;
      const [destDay, destEmployeeId] = destination.droppableId.split("::");

      // dropped outside of the scheduler grid
      if (!destination) return;

      // we only care about cases where a shiftNode has been dragged into another
      // GridCell. If the cell hasn't changed, then we simply keep it where it is.
      if (destination.droppableId === source.droppableId) return;
      dispatch(
        scheduledShiftDragAndDrop({
          destinationDay: destDay,
          destinationEmployeeID: destEmployeeId,
          shiftID: draggableId,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Fragment>
      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {children}
      </DragDropContext>
    </Fragment>
  );
}
