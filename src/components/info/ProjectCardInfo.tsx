import {
  useAddNewProject,
  useAllProjects,
} from "@/services/queries/projectQueries";
import { Button } from "../ui/button";
import { useAddNewParts } from "@/services/queries/partsQueries";
import getNextProjectNumber from "@/services/db/projectFunctions";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ProjectCardInfo() {
  const addNewProjectMutation = useAddNewProject();
  const addNewPartsMutation = useAddNewParts();
  const { refetch } = useAllProjects();

  const projects = [
    { projectTitle: "Test Title", projectDescription: "Test Description" },
    { projectTitle: "FS2025", projectDescription: "2025 Formula Student Car" },
  ];

  async function handleCreateNewProjects() {
    for (const p of projects) {
      await createNewProject(p);
    }
  }

  async function createNewProject(p: {
    projectTitle: string;
    projectDescription: string;
  }) {
    try {
      const { data: refreshData, error } = await refetch({
        throwOnError: true,
      });
      if (error) {
        throw error;
      }
      const newProjectId = getNextProjectNumber(refreshData);
      await addNewProjectMutation.mutateAsync({
        project_description: p.projectDescription,
        project_id: newProjectId,
        project_title: p.projectTitle,
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
    <div className="w-full h-full space-y-4 text-justify flex flex-col items-center">
      <p>
        The Project card shows all of the engineering projects within the
        company. Each project has unique information like part numbers,
        engineering releases and decision records. Project specific information
        can be viewed by clicking on the project number.
      </p>
      <p>
        We'd recommend clicking on the button below to auto populate the first
        two releases and suggest you to follow the engineering process through
        using the '2025 Formula Student Car' project. After this, feel free to
        create new projects to try out the workflow.
      </p>
      <DialogClose className=" w-full">
        <Button
          type="button"
          className="w-full"
          onClick={() => void handleCreateNewProjects()}
        >
          Set up the first two projects
        </Button>
      </DialogClose>
    </div>
  );
}
