import {
  Business,
  Employee,
  Role,
  ShiftTemplate,
  Shift,
  Schedule,
} from "@/types/global";

import { DAY_OF_WEEK } from "@/types/constants";
import { UUID } from "crypto";

type TestData = {
  business: {
    entities: {
      [id: UUID]: Business;
    };
    ids: UUID[];
  };
  roles: {
    entities: {
      [id: UUID]: Role;
    };
    ids: UUID[];
  };
  employees: {
    entities: {
      [id: UUID]: Employee;
    };
    ids: UUID[];
  };
  shiftTemplates: {
    entities: {
      [id: UUID]: ShiftTemplate;
    };
    ids: UUID[];
  };
  scheduledShifts: {
    entities: {
      [id: UUID]: Shift;
    };
    ids: UUID[];
  };
  schedules: {
    entities: {
      [id: UUID]: Schedule;
    };
    ids: UUID[];
  };
};

const SampleData: TestData = {
  business: {
    entities: {
      "018ecb4a-3ecb-7a62-93bb-652113934c2d": {
        id: "018ecb4a-3ecb-7a62-93bb-652113934c2d",
        name: "LMNO",
        industry: "Restaurant",
        startOfWorkWeek: DAY_OF_WEEK.MONDAY,
        timezone: "America/New_York",
      },
    },
    ids: ["018ecb4a-3ecb-7a62-93bb-652113934c2d"],
  },
  roles: {
    entities: {
      "018ecb4a-616b-7a46-b9d6-b2f39741083f": {
        id: "018ecb4a-616b-7a46-b9d6-b2f39741083f",
        name: "Server",
      },
      "018ecb4a-9d82-7e84-96fc-e3ad273e241f": {
        id: "018ecb4a-9d82-7e84-96fc-e3ad273e241f",
        name: "Food Runner",
      },
      "018ee82b-84f7-70c9-af4c-30031414efb3": {
        id: "018ee82b-84f7-70c9-af4c-30031414efb3",
        name: "Busser",
      },
    },
    ids: [
      "018ecb4a-616b-7a46-b9d6-b2f39741083f",
      "018ecb4a-9d82-7e84-96fc-e3ad273e241f",
      "018ee82b-84f7-70c9-af4c-30031414efb3",
    ],
  },
  schedules: {
    entities: {
      "018ee82b-03a1-734e-a070-ce64a1b19bb4": {
        id: "018ee82b-03a1-734e-a070-ce64a1b19bb4",
        name: "Servers",
        roles: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        defaultShiftStart: "1970-01-01T17:00:00.000",
        defaultShiftEnd: "1970-01-01T23:00:00.000",
      },
      "018ee82b-30f0-7ee4-a543-3bf05b73519d": {
        id: "018ee82b-30f0-7ee4-a543-3bf05b73519d",
        name: "Food Runners",
        roles: ["018ecb4a-9d82-7e84-96fc-e3ad273e241f"],
        defaultShiftStart: "1970-01-01T17:00:00.000",
        defaultShiftEnd: "1970-01-01T23:00:00.000",
      },
    },
    ids: [
      "018ee82b-03a1-734e-a070-ce64a1b19bb4",
      "018ee82b-30f0-7ee4-a543-3bf05b73519d",
    ],
  },
  employees: {
    entities: {
      "018ecb48-d463-737c-92ac-cec5e0d65f11": {
        id: "018ecb48-d463-737c-92ac-cec5e0d65f11",
        firstName: "Conor",
        lastName: "Ney",
        rolesId: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        phoneNumber: "6508159480",
        email: "conor.ux@gmail.com",
      },
      "018ecb49-5ada-7793-8eae-2f3cf3ac6117": {
        id: "018ecb49-5ada-7793-8eae-2f3cf3ac6117",
        firstName: "Spencer",
        lastName: "Han",
        rolesId: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        phoneNumber: "2318950334",
        email: "suspence@gmail.com",
      },
      "018ecb49-82ea-7ff7-89dc-3beef2587f5d": {
        id: "018ecb49-82ea-7ff7-89dc-3beef2587f5d",
        firstName: "Alana",
        lastName: "Chen Gardner",
        rolesId: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        phoneNumber: "8808952334",
        email: "alana@hotmail.com",
      },
      "018ecb49-a21a-7b94-a9d8-2e7b93beaf28": {
        id: "018ecb49-a21a-7b94-a9d8-2e7b93beaf28",
        firstName: "Alicia",
        lastName: "Boucher",
        rolesId: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        phoneNumber: "9734400003",
        email: "aboucher44@icloud.com",
      },
      "018ecb4a-1018-7088-bdeb-0347a16f0c55": {
        id: "018ecb4a-1018-7088-bdeb-0347a16f0c55",
        firstName: "Dani",
        lastName: "Bodkin",
        rolesId: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        phoneNumber: "2675921859",
        email: "bodkindanielle@gmail.com",
      },
      "018ecb49-c6d6-7cde-b93c-1608568ef97f": {
        id: "018ecb49-c6d6-7cde-b93c-1608568ef97f",
        firstName: "Starr",
        lastName: "Sargent-Boone",
        rolesId: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        phoneNumber: "2672907316",
        email: "starrsarg12@gmail.com",
      },
      "018ee8a2-4e52-7efb-8ed1-991525c0d559": {
        id: "018ee8a2-4e52-7efb-8ed1-991525c0d559",
        firstName: "Brendan",
        lastName: "Guzman",
        rolesId: ["018ecb4a-616b-7a46-b9d6-b2f39741083f"],
        phoneNumber: "6094580220",
        email: "bguzman929@gmail.com",
      },
      "018ee8a4-b186-77fb-9a04-c2e59a564f92": {
        id: "018ee8a4-b186-77fb-9a04-c2e59a564f92",
        firstName: "Brett",
        lastName: "Langley",
        rolesId: ["018ecb4a-9d82-7e84-96fc-e3ad273e241f"],
        phoneNumber: "6093638695",
        email: "brettthejet@hotmail.com",
      },
      "018ee8a6-f246-7ad8-8ec9-911c2e58c9b4": {
        id: "018ee8a6-f246-7ad8-8ec9-911c2e58c9b4",
        firstName: "Harley",
        lastName: "Sacramento",
        rolesId: ["018ecb4a-9d82-7e84-96fc-e3ad273e241f"],
        phoneNumber: "6098795841",
        email: "harley.sac@gmail.com",
      },
    },
    ids: [
      "018ecb48-d463-737c-92ac-cec5e0d65f11",
      "018ecb49-5ada-7793-8eae-2f3cf3ac6117",
      "018ecb49-82ea-7ff7-89dc-3beef2587f5d",
      "018ecb49-a21a-7b94-a9d8-2e7b93beaf28",
      "018ecb4a-1018-7088-bdeb-0347a16f0c55",
      "018ecb49-c6d6-7cde-b93c-1608568ef97f",
      "018ee8a2-4e52-7efb-8ed1-991525c0d559",
      "018ee8a4-b186-77fb-9a04-c2e59a564f92",
      "018ee8a6-f246-7ad8-8ec9-911c2e58c9b4",
    ],
  },
  shiftTemplates: {
    entities: {
      "018ecb49-e660-7697-9048-966e6393ce46": {
        id: "018ecb49-e660-7697-9048-966e6393ce46",
        name: "Opener",
        roleId: "018ecb4a-616b-7a46-b9d6-b2f39741083f",
        start: "1970-01-01T15:45:00.000",
        end: "1970-01-01T22:00:00.000",
        bgColor: "green",
      },
      "018ecb5b-5d83-7400-80a4-50c71a80011c": {
        id: "018ecb5b-5d83-7400-80a4-50c71a80011c",
        name: "Closer",
        roleId: "018ecb4a-616b-7a46-b9d6-b2f39741083f",
        start: "1970-01-01T17:00:00.000",
        end: "1970-01-01T23:00:00.000",
        bgColor: "purple",
      },
    },
    ids: [
      "018ecb49-e660-7697-9048-966e6393ce46",
      "018ecb5b-5d83-7400-80a4-50c71a80011c",
    ],
  },
  scheduledShifts: {
    entities: {},
    ids: [],
  },
};

export { SampleData };
