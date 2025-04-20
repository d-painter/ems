import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import {
  AllProjectPartTableRows,
  useAddNewParts,
  useProjectParts,
} from "@/services/queries/partsQueries";
import { getNextPartNumber } from "@/services/db/partFunctions";

type AddPartsDialogProps = {
  partType: "assembly" | "part";
  main: AllProjectPartTableRows;
};

export default function AddPartDialog({ ...props }: AddPartsDialogProps) {
  const { partType, main } = { ...props };
  const [open, setOpen] = useState(false);
  const [isHanded, setIsHanded] = useState(false);

  const { project_id: projectId, sub_system: subSystem } = { ...main };
  const { refetch } = useProjectParts(projectId);
  const addNewPartsMutation = useAddNewParts();

  const [formState, setFormState] = useState({
    description: "",
  });

  async function addNewPart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      //db await call here
      const { data } = await refetch();
      if (!data?.length) {
        throw new Error("no data");
      }
      const newPartNum = getNextPartNumber({ data, partType, subSystem });      
      if (!isHanded) {
        await addNewPartsMutation.mutateAsync([
          {
            project_id: projectId,
            sub_system: subSystem,
            description: formState.description.toUpperCase(),
            part_number: newPartNum,
          },
        ]);
      } else {
        await addNewPartsMutation.mutateAsync([
          {
            project_id: projectId,
            sub_system: subSystem,
            description: `${formState.description.toUpperCase()} - LH`,
            part_number: newPartNum,
          },
          {
            project_id: projectId,
            sub_system: subSystem,
            description: `${formState.description.toUpperCase()} - RH`,
            part_number: newPartNum + 1,
          },
        ]);
      }

      setFormState({ description: "" });
      setIsHanded(false);
      setOpen(false);
    } catch (error) {
     
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  function handleClose() {
    setOpen(false);
    setIsHanded(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="xs" onClick={() => setOpen(true)}>
          {partType === "assembly" ? "Add Assembly" : "Add Part"}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-sm:top-0 max-sm:translate-y-4 overflow-y-auto"
        onCloseAutoFocus={() => handleClose()}
      >
        <DialogHeader>
          <DialogTitle>
            Add New {partType === "assembly" ? "Assembly" : "Part"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <form
          className="flex flex-col gap-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => void addNewPart(e)}
        >
          <Label htmlFor="description">
            {partType === "assembly" ? "Assembly" : "Part"} Description
          </Label>
          <Input
            type="text"
            id="description"
            placeholder="Description"
            name="description"
            autoFocus
            onChange={(e) =>
              setFormState({ ...formState, [e.target.name]: e.target.value })
            }
          />
          <div className="flex flex-row gap-2">
            <Checkbox
              id="checkbox"
              className="outline"
              onClick={() => setIsHanded(!isHanded)}
            />
            <Label htmlFor="checkbox">
              Handed {partType === "assembly" ? "assembly" : "part"}?
            </Label>
          </div>
          <DialogFooter className="max-sm:flex max-sm:flex-row max-sm:ml-auto">
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!formState.description && true}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
