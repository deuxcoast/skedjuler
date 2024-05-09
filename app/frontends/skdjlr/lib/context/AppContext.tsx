"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useAppSelector } from "../hooks";
import { selectSchedules } from "../features/schedules/schedulesSlice";

type AppContextType = {
  handleDrag: () => void;
  handleDrop: () => void;
  isDragging: boolean;
  selectedScheduleIndex: number;
  setSelectedScheduleIndex: (index: number) => void;
};

export const AppContext = createContext<AppContextType>({
  handleDrag: () => {},
  handleDrop: () => {},
  isDragging: false,
  selectedScheduleIndex: 0,
  setSelectedScheduleIndex: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(0);

  const handleDrag = () => {
    setIsDragging(true);
  };

  const handleDrop = () => {
    setIsDragging(false);
  };

  return (
    <AppContext.Provider
      value={{
        handleDrag,
        handleDrop,
        isDragging,
        selectedScheduleIndex,
        setSelectedScheduleIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used with a AppContextProvider");
  }
  return context;
}
