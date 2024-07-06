import { useContext } from "react";
import {
  EmployeeContext,
  EmployeeContextDefinition,
} from "../contexts/employee-provider";

export const useEmployees = (): EmployeeContextDefinition => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployees is used outside of a EmployeeProvider");
  }
  return context;
};
