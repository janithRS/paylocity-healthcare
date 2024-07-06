import { Dependent } from "./Dependent";
import { Person } from "./Person";

export interface Employee extends Person {
  phone?: string;
  dependents?: Dependent[];
}
