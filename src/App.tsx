import { useState } from "react";
import "./App.css";
import { Employee } from "./types/Employee";
import { EditEmployeeDialog } from "./components/dialogs/edit-employee";
import { useEmployees } from "./hooks/useEmployees";
import { EmployeeCard } from "./components/employee-card";
import { Button } from "./components/ui/button";
import { AddEmployeeDialog } from "./components/dialogs/add-employee";

function App() {
  const [isOpenEmployeeEditBox, setIsOpenEmployeeEditBox] = useState(false);
  const [isOpenAddEmployeeBox, setIsOpenAddEmployeeBox] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const { employees: employeeList } = useEmployees();

  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsOpenEmployeeEditBox(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-5">
          Employee Healthcare Benefits
        </h1>

        <Button
          className="bg-emerald-600"
          onClick={() => setIsOpenAddEmployeeBox(true)}
        >
          + Add Employee
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 grid-flow-row-dense gap-3">
        {employeeList?.map((employee: Employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            handleEditEmployee={handleEditEmployee}
          />
        ))}
      </div>
      {currentEmployee && isOpenEmployeeEditBox && (
        <EditEmployeeDialog
          isOpen={isOpenEmployeeEditBox}
          setIsOpen={setIsOpenEmployeeEditBox}
          currentEmployee={currentEmployee}
        />
      )}
      {isOpenAddEmployeeBox && (
        <AddEmployeeDialog
          isOpen={isOpenAddEmployeeBox}
          setIsOpen={setIsOpenAddEmployeeBox}
        />
      )}
    </div>
  );
}

export default App;
