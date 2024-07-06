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
import { Dependent } from "../../types/Dependent";
import { Employee } from "../../types/Employee";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface EditDependentDialogProps {
  isOpen: boolean;
  selectedEmployee: Employee;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditDependentDialog: FC<EditDependentDialogProps> = ({
  isOpen,
  selectedEmployee,
  setIsOpen,
}) => {
  const { editDependent } = useEmployees();

  const [currentDependent, setCurrentDependent] = useState<Dependent | null>(
    null
  );

  const onSubmitEdit = () => {
    if (!currentDependent) return;
    editDependent(selectedEmployee.id, currentDependent.id, currentDependent);
    setIsOpen(false);
  };

  const onSelectChange = (value: string) => {
    const dependent = selectedEmployee.dependents.find(
      (dependent) => dependent.id === value
    );
    if (!dependent) return;
    setCurrentDependent(dependent);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Dependent</DialogTitle>
          <DialogDescription>
            Fill in the form below to edit the dependent.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="framework">Dependent</Label>
            <div className="col-span-3">
              <Select onValueChange={onSelectChange}>
                <SelectTrigger id="age">
                  <SelectValue placeholder="Select Dependent" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {selectedEmployee.dependents.map((dependent) => (
                    <SelectItem key={dependent.id} value={dependent.id}>
                      {dependent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {currentDependent && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={currentDependent?.name || ""}
                  placeholder="John Doe"
                  className="col-span-3"
                  onChange={(e) => {
                    setCurrentDependent({
                      ...currentDependent,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  defaultValue={currentDependent?.age || 0}
                  placeholder="10"
                  className="col-span-3"
                  type="number"
                  onChange={(e) => {
                    setCurrentDependent({
                      ...currentDependent,
                      age: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </>
          )}
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
