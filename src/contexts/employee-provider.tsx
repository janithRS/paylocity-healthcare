import React, { createContext, useState, FC, ReactNode } from "react";
import { Employee } from "../types/Employee";
import { initialEmployees } from "../mock-data/employee-data";

export interface EmployeeContextDefinition {
  employees: Employee[];
  editEmployee: (id: string, updatedEmployee: Partial<Employee>) => void;
  addEmployee: (newEmployee: Employee) => void;
}

const initState: EmployeeContextDefinition = {
  employees: initialEmployees,
  editEmployee: () => {},
  addEmployee: () => {},
};

export const EmployeeContext =
  createContext<EmployeeContextDefinition>(initState);

interface EmployeeProviderProps {
  children: ReactNode | ReactNode[];
}

export const EmployeeProvider: FC<EmployeeProviderProps> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const editEmployee = (id: string, updatedEmployee: Partial<Employee>) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees, editEmployee, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
