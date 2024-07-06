import { FC } from "react";
import { Employee } from "../types/Employee";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";

export interface EmployeeCardProps {
  employee: Employee;
  handleEditEmployee: (employee: Employee) => void;
}

export const EmployeeCard: FC<EmployeeCardProps> = ({
  employee,
  handleEditEmployee,
}) => {
  return (
    <Card className="w-full h-full cursor-pointer text-left rounded-xl shadow-none">
      <CardHeader className="flex flex-row font-normal text-base items-start justify-between">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
            <div>
              <span className="font-semibold">{employee.name} </span>·{" "}
              <span className="text-gray-400">#{employee.id.slice(0, 8)}</span>
            </div>
            <div className="text-gray-500">{employee?.phone}</div>
          </div>
          <Button onClick={() => handleEditEmployee(employee)}>Edit</Button>
        </div>
      </CardHeader>
      <hr className="h-px mb-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <CardContent className="text-sm">
        <h3 className="text-lg font-bold mb-2">Dependents</h3>
        {employee.dependents?.length === 0 ? (
          <div>No dependents</div>
        ) : (
          <div>
            {employee.dependents?.map((dependent) => (
              <div>
                <div className="flex flex-row items-center justify-between">
                  <div className="font-normal">{dependent.name}</div>
                  <div className="font-normal">
                    {dependent.age} <span className="text-gray-400">years</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
