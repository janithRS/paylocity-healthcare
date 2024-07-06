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
import { v4 as uuidv4 } from "uuid";
import { Dependent } from "../../types/Dependent";
import { Employee } from "../../types/Employee";

export interface AddDependentDialogProps {
  isOpen: boolean;
  selectedEmployee: Employee;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddDependentDialog: FC<AddDependentDialogProps> = ({
  isOpen,
  selectedEmployee,
  setIsOpen,
}) => {
  const { addDependent } = useEmployees();

  const [newDependent, setNewDependent] = useState<Dependent>({
    id: uuidv4(),
    name: "",
    age: 0,
  });

  const onSubmitAdd = () => {
    addDependent(selectedEmployee.id, newDependent);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Dependent</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new dependent.
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
                setNewDependent({ ...newDependent, name: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              defaultValue={""}
              placeholder="10"
              className="col-span-3"
              type="number"
              onChange={(e) => {
                setNewDependent({
                  ...newDependent,
                  age: parseInt(e.target.value),
                });
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
