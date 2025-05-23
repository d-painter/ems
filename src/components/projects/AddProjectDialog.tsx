import { ChangeEvent, FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  useAddNewProject,
  useAllProjects,
} from "@/services/queries/projectQueries";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import getNextProjectNumber from "@/services/db/projectFunctions";
import { toast } from "sonner";
import { useAddNewParts } from "@/services/queries/partsQueries";

export type ProjectFormStateProps = {
  projectTitle: string;
  projectDescription: string;
};

export default function AddProjectDialog() {
  const [open, setOpen] = useState(false);

  const [formState, setFormState] = useState<ProjectFormStateProps>({
    projectTitle: "",
    projectDescription: "",
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  const addNewProjectMutation = useAddNewProject();
  const addNewPartsMutation = useAddNewParts();
  const { refetch } = useAllProjects();

  async function createNewProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data: refreshData, error } = await refetch({
        throwOnError: true,
      });
      if (error) {
        throw error;
      }
      const newProjectId = getNextProjectNumber(refreshData);
      await addNewProjectMutation.mutateAsync({
        project_description: formState.projectDescription,
        project_id: newProjectId,
        project_title: formState.projectTitle,
      });
      await addNewPartsMutation.mutateAsync([
        {
          project_id: newProjectId,
          description: "DESCRIPTION",
          part_number: 9000,
          sub_system: "A",
        },
        {
          project_id: newProjectId,
          description: "TOOLING, JIGS AND FIXTURES",
          part_number: 9000,
          sub_system: "T",
        },
      ]);
      setFormState({ projectTitle: "", projectDescription: "" });
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
          variant={"openDialog"}
          size={"xs"}
          onClick={() => setOpen(true)}
        >
          Add Project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-sm:top-0 max-sm:translate-y-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <form
          className="flex flex-col gap-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => void createNewProject(e)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              type="text"
              id="projectTitle"
              placeholder="Project Title"
              name="projectTitle"
              value={formState.projectTitle}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="projectDescription">Project Description</Label>
            <Textarea
              id="projectDescription"
              placeholder="Project Description"
              name="projectDescription"
              value={formState.projectDescription}
              onChange={(e) => handleChange(e)}
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
            <Button
              type="submit"
              disabled={
                (!formState.projectDescription || !formState.projectTitle) &&
                true
              }
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
