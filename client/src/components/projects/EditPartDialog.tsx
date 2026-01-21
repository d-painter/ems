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
import { FormEvent, MouseEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Pen } from "lucide-react";
import { useUpdatePart } from "@/services/queries/partsQueries";

type EditPartDialogProps = {
  id: number;
  description: string | null;
  isT: boolean;
};

export default function EditPartDialog({ ...props }: EditPartDialogProps) {
  const { id, description = "", isT } = { ...props };
  const [open, setOpen] = useState(false);

  const updatePartMutation = useUpdatePart();

  const [formState, setFormState] = useState({
    description: "",
  });

  async function addNewCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await updatePartMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: id,
        updates: { description: formState.description.toUpperCase() },
      });
      setFormState({ description: "" });
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setOpen(true)}
          disabled={isT}
        >
          <Pen className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-sm:top-0 max-sm:translate-y-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Part</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <form
          className="flex flex-col gap-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => void addNewCategory(e)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Part Description</Label>
            <Input
              type="text"
              id="description"
              placeholder="Description"
              defaultValue={description ?? ""}
              name="description"
              onChange={(e) =>
                setFormState({ ...formState, [e.target.name]: e.target.value })
              }
            />
          </div>
          <DialogFooter className="max-sm:flex max-sm:flex-row max-sm:ml-auto">
            <Button
              variant="secondary"
              type="button"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                setOpen(false);
                e.currentTarget.blur();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!formState.description && true}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
