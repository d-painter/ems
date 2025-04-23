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
import { useState } from "react";

import { toast } from "sonner";
import {
  useAddNewEngRel,
  useProjectEngRels,
} from "@/services/queries/engRelQueries";
import { getNewEngRelNumber } from "@/services/db/engRelFunctions";
import { useNavigate } from "@tanstack/react-router";

export default function AddEngRelDialog({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  const { refetch } = useProjectEngRels(projectId);
  const addNewEngRelMutation = useAddNewEngRel();
  const navigate = useNavigate();
  async function createNewRelease() {
    try {
      //db await call here
      const { data } = await refetch();
      const newEngRelNum = getNewEngRelNumber(data);
      const newRel = await addNewEngRelMutation.mutateAsync({
        project_id: projectId,
        release_id: newEngRelNum,
      });
      await navigate({
        to: "/projects/$projectId/eng-rels/$engRel/",
        params: {
          projectId: projectId,
          engRel: `${projectId}-ER-${String(newRel.release_id).padStart(4, "0")}`,
        },
      });
      setOpen(false);
      toast.success("New release created.");
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
        <Button variant="ghost" size="xs" onClick={() => setOpen(true)}>
          New Engineering Release
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:top-0 max-sm:translate-y-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Engineering Release</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <h2>Create a new engineering release?</h2>
        <DialogFooter className="max-sm:flex max-sm:flex-row max-sm:ml-auto">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={() => void createNewRelease()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
