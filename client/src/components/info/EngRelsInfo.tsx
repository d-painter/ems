import { useParams } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  useAddNewEngRel,
  useProjectEngRels,
} from "@/services/queries/engRelQueries";
import { getNewEngRelNumber } from "@/services/db/engRelFunctions";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAdditionalUserContext } from "@/Context/AdditionalUserContext";

export default function EngRelsInfo() {
  const { projectId } = useParams({ strict: false });
  const { org_uuid } = useAdditionalUserContext();
  const { refetch } = useProjectEngRels(projectId!, org_uuid!);
  const addNewEngRelMutation = useAddNewEngRel();
  async function createNewRelease() {
    try {
      //db await call here
      const { data } = await refetch();
      const newEngRelNum = getNewEngRelNumber(data);
      await addNewEngRelMutation.mutateAsync({
        project_id: projectId!,
        release_id: newEngRelNum,
        title: "FPR",
        description: "Initial release for the Front Push Rods.",
        org_uuid: org_uuid!,
      });
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
    <div className="w-full h-full space-y-4 text-justify flex flex-col items-center">
      <p>
        Releases are critical for projects. Each release informs the business
        that engineering have finished the design process, that the parts need
        to be reviewed and ordered. It's at this step that other business
        functions such as Purchasing have a chance to review the content and
        either reject or approve the release.
      </p>
      {projectId === "P002" && (
        <>
          <p>
            As we're working through project 'P002', click the button below to
            create your first release. After that, feel free to create
            additional ones using the 'New Engineering Release' button.
          </p>
          <DialogClose className="w-full">
            <Button onClick={() => void createNewRelease()} className="w-full">
              Create 'P002-ER-001 - FPR'
            </Button>
          </DialogClose>
        </>
      )}
    </div>
  );
}
