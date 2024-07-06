import { Dispatch, FC, SetStateAction, useState } from "react";
import { useEmployees } from "../../hooks/useEmployees";
import { Button } from "../ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Employee } from "../../types/Employee";
import { v4 as uuidv4 } from "uuid";

export interface AddEmployeeDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddEmployeeDialog: FC<AddEmployeeDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { addEmployee } = useEmployees();

  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: uuidv4(),
    name: "",
    phone: "",
    dependents: [],
  });

  const onSubmitAdd = () => {
    addEmployee(newEmployee);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new employee.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={""}
              placeholder="John Doe"
              className="col-span-3"
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, name: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Phone
            </Label>
            <Input
              id="username"
              defaultValue={""}
              placeholder="555-555-5555"
              className="col-span-3"
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, phone: e.target.value });
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => onSubmitAdd()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
