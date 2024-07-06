import { FC, useState } from "react";
import { Employee } from "../types/Employee";
import { Card, CardHeader, CardContent } from "./ui/card";
import { EditButton } from "./buttons/edit-button";
import { AddButton } from "./buttons/add-button";
import { AddDependentDialog } from "./dialogs/add-dependent";
import { EditDependentDialog } from "./dialogs/edit-dependent";
import { DeleteButton } from "./buttons/delete-button";
import { useEmployees } from "../hooks/useEmployees";

export interface EmployeeCardProps {
  employee: Employee;
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

  const { deleteEmployee } = useEmployees();

  return (
    <>
      <Card className="w-full h-full cursor-pointer text-left rounded-xl shadow-none">
        <CardHeader className="flex flex-row font-normal text-base items-start justify-between">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
              <div>
                <span className="font-semibold">{employee.name} </span>·{" "}
                <span className="text-gray-400">
                  #{employee.id.slice(0, 8)}
                </span>
              </div>
              <div className="text-gray-500">{employee?.phone}</div>
            </div>
            <div className="flex flex-row gap-2">
              <EditButton onClick={() => handleEditEmployee(employee)} />
              <DeleteButton onClick={() => deleteEmployee(employee.id)} />
            </div>
          </div>
        </CardHeader>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <CardContent className="text-sm bg-slate-100 pt-4">
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
