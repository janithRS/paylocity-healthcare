import { FC, useCallback, useState } from "react";
import { Employee } from "../types/Employee";
import { Card, CardHeader, CardContent } from "./ui/card";
import { EditButton } from "./buttons/edit-button";
import { AddButton } from "./buttons/add-button";
import { AddDependentDialog } from "./dialogs/add-dependent";
import { EditDependentDialog } from "./dialogs/edit-dependent";
import { DeleteButton } from "./buttons/delete-button";
import { useEmployees } from "../hooks/useEmployees";

const BASE_PAYCHECK = 2000;
const EMPLOYEE_BENEFIT = 1000;
const DEPENDENT_BENEFIT = 500;
const PAYCHECKS_PER_YEAR = 26;

export interface EmployeeCardProps {
  employee: Employee;
  isBenefitsYearly?: boolean;
  handleEditEmployee: (employee: Employee) => void;
}

export const EmployeeCard: FC<EmployeeCardProps> = ({
  employee,
  handleEditEmployee,
}) => {
  const [isAddDependentDialogOpen, setIsAddDependentDialogOpen] =
    useState(false);
  const [isEditDependentDialogOpen, setIsEditDependentDialogOpen] =
    useState(false);

  const { employees, deleteEmployee } = useEmployees();

  const calculateBenefits = useCallback(
    (employee: Employee) => {
      let totalCost = 0;

      const employeeDiscount = employee.name.startsWith("A") ? 0.9 : 1;
      totalCost += EMPLOYEE_BENEFIT * employeeDiscount;

      employee.dependents.forEach((dependent) => {
        const dependentDiscount = dependent.name.startsWith("A") ? 0.9 : 1;
        totalCost += DEPENDENT_BENEFIT * dependentDiscount;
      });

      return totalCost;
    },
    [employees]
  );

  return (
    <>
      <Card className="w-full h-full cursor-pointer text-left rounded-xl shadow-none">
        <CardHeader className="flex flex-col font-normal text-base items-start justify-between">
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <div className="flex flex-col">
              <div>
                <span className="font-semibold">{employee.name} </span>·{" "}
                <span className="text-gray-400">
                  #{employee.id.slice(0, 8)}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <EditButton onClick={() => handleEditEmployee(employee)} />
              <DeleteButton onClick={() => deleteEmployee(employee.id)} />
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">
              Paycheck:{" "}
              <span className="text-gray-700">
                ${BASE_PAYCHECK * PAYCHECKS_PER_YEAR}{" "}
                <span className="text-xs text-gray-400">/year</span>
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              Total Benefits:{" "}
              <span className="text-gray-700">
                ${calculateBenefits(employee)}{" "}
                <span className="text-xs text-gray-400">/year</span>
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              Final Paycheck Amount:{" "}
              <span className="text-gray-700">
                $
                {BASE_PAYCHECK * PAYCHECKS_PER_YEAR -
                  calculateBenefits(employee)}{" "}
                <span className="text-xs text-gray-400">/year</span>
              </span>
            </div>
          </div>
        </CardHeader>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <CardContent className="text-sm pt-4">
          <div className="flex flex-row justify-between mb-6">
            <h3 className="text-lg font-bold">Dependents</h3>
            <div className="flex flex-row gap-2">
              <AddButton onClick={() => setIsAddDependentDialogOpen(true)} />
              {employee.dependents?.length > 0 && (
                <EditButton
                  onClick={() => setIsEditDependentDialogOpen(true)}
                />
              )}
            </div>
          </div>
          {employee.dependents?.length === 0 ? (
            <div>No dependents</div>
          ) : (
            <div>
              {employee.dependents?.map((dependent) => (
                <ol>
                  <li
                    className="flex flex-row items-center justify-between"
                    key={dependent.id}
                  >
                    <div className="font-normal">{dependent.name}</div>
                    <div className="font-normal">
                      {dependent.age}{" "}
                      <span className="text-gray-400">years</span>
                    </div>
                  </li>
                </ol>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isAddDependentDialogOpen && (
        <AddDependentDialog
          isOpen={isAddDependentDialogOpen}
          selectedEmployee={employee}
          setIsOpen={setIsAddDependentDialogOpen}
        />
      )}
      {isEditDependentDialogOpen && (
        <EditDependentDialog
          isOpen={isEditDependentDialogOpen}
          selectedEmployee={employee}
          setIsOpen={setIsEditDependentDialogOpen}
        />
      )}
    </>
  );
};
