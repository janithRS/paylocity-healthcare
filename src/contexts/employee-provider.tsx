import React, { createContext, useState, FC, ReactNode } from "react";
import { Employee } from "../types/Employee";
import { initialEmployees } from "../mock-data/employee-data";
import { Dependent } from "../types/Dependent";

export interface EmployeeContextDefinition {
  employees: Employee[];
  editEmployee: (id: string, updatedEmployee: Partial<Employee>) => void;
  addEmployee: (newEmployee: Employee) => void;
  addDependent: (empId: string, newDependent: Dependent) => void;
  editDependent: (
    empId: string,
    dependentId: string,
    updatedDependent: Partial<Dependent>
  ) => void;
}

const initState: EmployeeContextDefinition = {
  employees: initialEmployees,
  editEmployee: () => {},
  addEmployee: () => {},
  addDependent: () => {},
  editDependent: () => {},
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

  const addDependent = (empId: string, newDependent: Dependent) => {
    const emp = employees.find((emp) => emp.id === empId);

    if (emp) {
      emp.dependents = [...emp.dependents, newDependent];
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === empId ? { ...emp, ...emp.dependents } : emp
        )
      );
    }
  };

  const editDependent = (
    empId: string,
    dependentId: string,
    updatedDependent: Partial<Dependent>
  ) => {
    const emp = employees.find((emp) => emp.id === empId);

    if (emp) {
      emp.dependents = emp.dependents.map((dep) =>
        dep.id === dependentId ? { ...dep, ...updatedDependent } : dep
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === empId ? { ...emp, ...emp.dependents } : emp
        )
      );
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        editEmployee,
        addEmployee,
        addDependent,
        editDependent,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
