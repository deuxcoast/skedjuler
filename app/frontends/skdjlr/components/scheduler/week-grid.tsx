import WeekCell from "./week-cell";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export default function WeekGrid() {
  return (
    <div className="grid grid-cols-7 justify-items-stretch items-stretch">
      {weekDays.map((item) => (
        <WeekCell key={item} />
      ))}
    </div>
  );
}
