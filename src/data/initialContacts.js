import { v4 as uuidv4 } from "uuid";

export const initialContacts = [
  {
    id: uuidv4(),
    name: "Ali",
    lastName: "Ahmadi",
    email: "ali@example.com",
    phone: "09123456789",
  },
  {
    id: uuidv4(),
    name: "Sara",
    lastName: "Hosseini",
    email: "sara@example.com",
    phone: "09987654321",
  },
];
