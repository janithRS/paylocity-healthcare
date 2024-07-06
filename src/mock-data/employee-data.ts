import { Employee } from "../types/Employee";
import { v4 as uuidv4 } from "uuid";

export const initialEmployees: Employee[] = [
  {
    id: uuidv4(),
    name: "John Doe",
    phone: "1234567890",
    dependents: [
      {
        id: uuidv4(),
        name: "Jane Doe",
        age: 25,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "William Doe",
    phone: "1234567890",
    dependents: [
      {
        id: uuidv4(),
        name: "Alice Doe",
        age: 25,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Hecha Doe",
    phone: "1234567890",
    dependents: [
      {
        id: uuidv4(),
        name: "Bob Doe",
        age: 25,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Lisa Doe",
    phone: "1234567890",
    dependents: [
      {
        id: uuidv4(),
        name: "Charlie Doe",
        age: 25,
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Michael Doe",
    phone: "1234567890",
    dependents: [],
  },
];
