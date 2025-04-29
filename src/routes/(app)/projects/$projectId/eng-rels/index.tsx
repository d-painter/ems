import EngRelsInfo from "@/components/info/EngRelsInfo";
import InfoDialog from "@/components/info/InfoDialog";

import AddEngRelDialog from "@/components/projects/AddEngRelDialog";
import EngRelTable from "@/components/projects/EngRelTable";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectEngRels } from "@/services/queries/engRelQueries";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId/eng-rels/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = useParams({ strict: false });
  const { data: engRels } = useProjectEngRels(projectId!);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div>
        <InfoDialog
          type="action"
          title="Engineering Releases Information"
          description="About Engineering Releases."
        >
          <EngRelsInfo />
        </InfoDialog>
      </div>
      <div className="h-full w-full flex">
        <Card className="h-fit max-h-full w-full max-w-2xl m-auto overflow-hidden">
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
