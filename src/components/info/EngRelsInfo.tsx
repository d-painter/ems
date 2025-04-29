import { useParams } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function EngRelsInfo() {
  const { projectId } = useParams({ strict: false });
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
            auto create your first release. After that, feel free to create
            additional ones using the 'New Engineering Release' button.
          </p>
          <Button className="w-full"> Create 'P002-ER-001 - FPR'</Button>
        </>
      )}
    </div>
  );
}
