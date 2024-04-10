import { Business, Employee, Role, ShiftType, Shift } from "@/types/global";

type TestData = {
  business: Business;
  rolesID: Role[];
  employees: Employee[];
  shiftTypes: ShiftType[];
  scheduledShifts: Shift[];
};

const SampleData: TestData = {
  business: {
    id: "10",
    name: "LMNO",
    industry: "Restaurant",
  },
  rolesID: [
    {
      id: "1000",
      name: "Server",
    },
    {
      id: "1001",
      name: "Food Runner",
    },
  ],
  employees: [
    {
      id: "1",
      firstName: "Conor",
      lastName: "Ney",
      rolesID: ["1000"],
      phoneNumber: "6508159480",
      email: "conor.ux@gmail.com",
    },
    {
      id: "2",
      firstName: "Spencer",
      lastName: "Han",
      rolesID: ["1000"],
      phoneNumber: "2318950334",
      email: "suspence@gmail.com",
    },
    {
      id: "3",
      firstName: "Alana",
      lastName: "Chen Gardner",
      rolesID: ["1000"],
      phoneNumber: "8808952334",
      email: "alana@hotmail.com",
    },
    {
      id: "4",
      firstName: "Alicia",
      lastName: "Boucher",
      rolesID: ["1000"],
      phoneNumber: "9734400003",
      email: "aboucher44@icloud.com",
    },
    {
      id: "5",
      firstName: "Dani",
      lastName: "Bodkin",
      rolesID: ["1000"],
      phoneNumber: "2675921859",
      email: "bodkindanielle@gmail.com",
    },
    {
      id: "6",
      firstName: "Starr",
      lastName: "Sargent-Boone",
      rolesID: ["1000"],
      phoneNumber: "2672907316",
      email: "starrsarg12@gmail.com",
    },
  ],
  shiftTypes: [
    {
      id: "100",
      name: "Opener",
      roleID: "1000",
      startTime: {
        hour: 15,
        minute: 45,
      },
      endTime: {
        hour: 23,
        minute: 0,
      },
      bgColor: "green",
    },
  ],
  scheduledShifts: [],
};
