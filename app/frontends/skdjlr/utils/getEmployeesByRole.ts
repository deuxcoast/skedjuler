import { Employee, Role } from "@/types/global";

const getEmployeesByRoles = (employees: Employee[], roleIds: Role["id"][]) => {
  const employeesByRoles = employees.filter((employee) => {
    for (const roleId of roleIds) {
      if (employee.rolesId.includes(roleId)) return true;
    }
    return false;
  });
  return employeesByRoles;
};

export { getEmployeesByRoles };
