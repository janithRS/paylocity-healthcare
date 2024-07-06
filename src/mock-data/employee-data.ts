import { Employee } from "../types/Employee";

export const employees: Employee[] = [
  {
    id: 1,
    name: {
      first: "John",
      last: "Doe",
    },
    phone: "1234567890",
    dependents: [
      {
        id: 1,
        name: {
          first: "Jane",
          last: "Doe",
        },
        age: 25,
      },
    ],
  },
];
