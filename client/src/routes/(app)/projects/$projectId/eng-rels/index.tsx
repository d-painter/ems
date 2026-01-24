import EngRelsInfo from "@/components/info/EngRelsInfo";
import InfoDialog from "@/components/info/InfoDialog";

import AddEngRelDialog from "@/components/projects/AddEngRelDialog";
import EngRelTable from "@/components/projects/EngRelTable";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectEngRels } from "@/services/queries/engRelQueries";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useAdditionalUserContext } from "@/Context/AdditionalUserContext";

export const Route = createFileRoute("/(app)/projects/$projectId/eng-rels/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = useParams({ strict: false });
  const { org_uuid } = useAdditionalUserContext();
  const { data: engRels } = useProjectEngRels(projectId!, org_uuid!);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="max-md:absolute w-fit top-2.5 right-3">
        <InfoDialog
          type="action"
          title="Engineering Releases Information"
          description="About Engineering Releases."
        >
          <EngRelsInfo />
        </InfoDialog>
      </div>
      <div className="h-full w-full flex justify-center max-md:mt-2">
        <Card className="h-fit max-h-full w-full max-w-2xl overflow-hidden">
          <CardContent className="h-full flex flex-col overflow-hidden">
            <AddEngRelDialog projectId={projectId!} />
            <div className="grow h-full overflow-auto">
              <EngRelTable engRels={engRels} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
