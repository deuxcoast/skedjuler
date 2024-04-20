import { Employee } from "@/types/global";

type EmployeeCellProps = {
  employee: Employee;
};

export default function EmployeeCell({ employee }: EmployeeCellProps) {
  const fullName = employee.firstName + " " + employee.lastName;

  return (
    <div className="p-2 border border-foreground bg-cell flex-col justify-evenly">
      {/* TODO: Add elipses if name is too long to fit in box without wrapping. */}
      <div className="text-sm font-semibold">{fullName}</div>
    </div>
  );
}
