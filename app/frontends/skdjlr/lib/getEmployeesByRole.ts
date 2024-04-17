import { Employee, Role } from "@/types/global";

const getEmployeesByRoles = (employees: Employee[], roleIDs: Role["id"][]) => {
  const employeesByRoles = employees.filter((employee) => {
    for (const roleID of roleIDs) {
      if (employee.rolesID.includes(roleID)) return true;
    }
    return false;
  });
  return employeesByRoles;
};

export { getEmployeesByRoles };
