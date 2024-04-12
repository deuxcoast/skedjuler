import {
  Business,
  Employee,
  Role,
  ShiftType,
  Shift,
  DAY_OF_WEEK,
} from "@/types/global";

type TestData = {
  business: Business;
  rolesID: Role[];
  employees: Employee[];
  shiftTypes: ShiftType[];
  scheduledShifts: Shift[];
};

const SampleData: TestData = {
  business: {
    id: "018ecb4a-3ecb-7a62-93bb-652113934c2d",
    name: "LMNO",
    industry: "Restaurant",
    startOfWorkWeek: DAY_OF_WEEK.MONDAY,
  },
  rolesID: [
    {
      id: "018ecb4a-616b-7a46-b9d6-b2f39741083f",
      name: "Server",
    },
    {
      id: "018ecb4a-9d82-7e84-96fc-e3ad273e241f",
      name: "Food Runner",
    },
  ],
  employees: [
    {
      id: "018ecb48-d463-737c-92ac-cec5e0d65f11",
      firstName: "Conor",
      lastName: "Ney",
      rolesID: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
      phoneNumber: "6508159480",
      email: "conor.ux@gmail.com",
    },
    {
      id: "018ecb49-5ada-7793-8eae-2f3cf3ac6117",
      firstName: "Spencer",
      lastName: "Han",
      rolesID: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
      phoneNumber: "2318950334",
      email: "suspence@gmail.com",
    },
    {
      id: "018ecb49-82ea-7ff7-89dc-3beef2587f5d",
      firstName: "Alana",
      lastName: "Chen Gardner",
      rolesID: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
      phoneNumber: "8808952334",
      email: "alana@hotmail.com",
    },
    {
      id: "018ecb49-a21a-7b94-a9d8-2e7b93beaf28",
      firstName: "Alicia",
      lastName: "Boucher",
      rolesID: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
      phoneNumber: "9734400003",
      email: "aboucher44@icloud.com",
    },
    {
      id: "018ecb4a-1018-7088-bdeb-0347a16f0c55",
      firstName: "Dani",
      lastName: "Bodkin",
      rolesID: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
      phoneNumber: "2675921859",
      email: "bodkindanielle@gmail.com",
    },
    {
      id: "018ecb49-c6d6-7cde-b93c-1608568ef97f",
      firstName: "Starr",
      lastName: "Sargent-Boone",
      rolesID: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
      phoneNumber: "2672907316",
      email: "starrsarg12@gmail.com",
    },
  ],
  shiftTypes: [
    {
      id: "018ecb49-e660-7697-9048-966e6393ce46",
      name: "Opener",
      roleID: "018ecb4a-616b-7a46-b9d6-b2f39741083f",
      startTime: {
        hour: 15,
        minute: 45,
      },
      endTime: {
        hour: 22,
        minute: 0,
      },
      bgColor: "green",
    },
    {
      id: "018ecb5b-5d83-7400-80a4-50c71a80011c",
      name: "Closer",
      roleID: "018ecb4a-616b-7a46-b9d6-b2f39741083f",
      startTime: {
        hour: 17,
        minute: 0,
      },
      endTime: {
        hour: 23,
        minute: 0,
      },
      bgColor: "purple",
    },
  ],
  scheduledShifts: [],
};
