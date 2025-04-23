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
    <div className="px-2 flex flex-col h-full gap-2 items-center w-full pb-20 md:pb-2">
      <Card className="my-auto h-fit w-full max-w-2xl overflow-hidden">
        <CardContent className="h-full flex flex-col gap-2">
          <AddEngRelDialog projectId={projectId!} />
          <EngRelTable engRels={engRels} />
        </CardContent>
      </Card>
    </div>
  );
}
