import {
  useAddNewParts,
  useProjectParts,
} from "@/services/queries/partsQueries";
import { Button } from "../ui/button";
import { getNextSubCategory } from "@/services/db/partFunctions";
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
import { useNavigate } from "@tanstack/react-router";

export default function AddCategoryDialog({
  projectId,
}: {
  projectId: string;
}) {
  const { refetch } = useProjectParts(projectId);
  const addNewPartsMutation = useAddNewParts();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [formState, setFormState] = useState({
    description: "",
  });

  async function addNewCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data, error } = await refetch();
      if (error) {
        throw error;
      }
      const { status, message } = getNextSubCategory(data);
      if (status === "error") {
        throw new Error(message);
      }
      const res = await addNewPartsMutation.mutateAsync([
        {
          project_id: projectId,
          sub_system: message,
          description: formState.description.toUpperCase(),
          part_number: Number(9000),
        },
      ]);

      setFormState({ description: "" });
      setOpen(false);
      await navigate({
        to: "/projects/$projectId/parts/$category/",
        params: { projectId: projectId, category: res[0].sub_system },
      });
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="openDialog" size="xs" onClick={() => setOpen(true)}>
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="max-sm:top-0 max-sm:translate-y-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a new sub category</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <form
          className="flex flex-col gap-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => void addNewCategory(e)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Sub Category Description</Label>
            <Input
              type="text"
              id="description"
              placeholder="Description"
              name="description"
              //value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, [e.target.name]: e.target.value })
              }
            />
          </div>
          <DialogFooter className="max-sm:flex max-sm:flex-row max-sm:ml-auto">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setOpen(false)}
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
