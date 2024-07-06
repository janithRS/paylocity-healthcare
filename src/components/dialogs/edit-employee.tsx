import { Dispatch, FC, SetStateAction, useState } from "react";
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
import { useEmployees } from "../../hooks/useEmployees";

export interface EditEmployeeDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentEmployee: Employee;
}

export const EditEmployeeDialog: FC<EditEmployeeDialogProps> = ({
  isOpen,
  setIsOpen,
  currentEmployee,
}) => {
  const [editedEmployee, setEditedEmployee] =
    useState<Employee>(currentEmployee);

  const { editEmployee } = useEmployees();

  const onSubmitEdit = () => {
    editEmployee(editedEmployee.id, editedEmployee);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Make changes to your employee here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={currentEmployee.name}
              className="col-span-3"
              onChange={(e) => {
                setEditedEmployee({
                  ...editedEmployee,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Phone
            </Label>
            <Input
              id="username"
              defaultValue={currentEmployee.phone}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => onSubmitEdit()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
