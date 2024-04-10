import ShiftNode from "./shift-node";

const startShift = new Date("January 1, 2024 15:45:00");
const endShift = new Date("January 1, 2024 23:00:00");

const shiftDuration = {
  startDate: startShift,
  endDate: endShift,
};

export default function WeekCell() {
  return (
    <div className="p-2 outline bg-cell flex-col">
      <ShiftNode
        shiftRole="Server"
        duration={shiftDuration}
        published={false}
      />
    </div>
  );
}
