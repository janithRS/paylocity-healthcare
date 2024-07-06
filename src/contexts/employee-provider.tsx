import { createContext, useState, FC, ReactNode, useEffect } from "react";
import { Employee } from "../types/Employee";
import { initialEmployees } from "../mock-data/employee-data";
import { Dependent } from "../types/Dependent";

export interface EmployeeContextDefinition {
  employees: Employee[];
  editEmployee: (id: string, updatedEmployee: Partial<Employee>) => void;
  addEmployee: (newEmployee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addDependent: (empId: string, newDependent: Dependent) => void;
  editDependent: (
    empId: string,
    dependentId: string,
    updatedDependent: Partial<Dependent>
  ) => void;
  deleteDependent: (empId: string, dependentId: string) => void;
}

const initState: EmployeeContextDefinition = {
  employees: initialEmployees,
  editEmployee: () => {},
  addEmployee: () => {},
  deleteEmployee: () => {},
  addDependent: () => {},
  editDependent: () => {},
  deleteDependent: () => {},
};

export const EmployeeContext =
  createContext<EmployeeContextDefinition>(initState);

interface EmployeeProviderProps {
  children: ReactNode | ReactNode[];
}

export const EmployeeProvider: FC<EmployeeProviderProps> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

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

  const deleteEmployee = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== id)
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

  const deleteDependent = (empId: string, dependentId: string) => {
    const emp = employees.find((emp) => emp.id === empId);

    if (emp) {
      emp.dependents = emp.dependents.filter((dep) => dep.id !== dependentId);
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
        deleteEmployee,
        addDependent,
        editDependent,
        deleteDependent,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
