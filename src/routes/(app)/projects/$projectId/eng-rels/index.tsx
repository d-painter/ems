import AddEngRelDialog from "@/components/projects/AddEngRelDialog";
import EngRelTable from "@/components/projects/EngRelTable";
import { useProjectEngRels } from "@/services/queries/engRelQueries";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId/eng-rels/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = useParams({ strict: false });
  const { data: engRels } = useProjectEngRels(projectId!);

  return (
    <div className="px-2 flex flex-col gap-2 items-center w-full">
      <AddEngRelDialog projectId={projectId!} />
      <EngRelTable engRels={engRels} />
    </div>
  );
}
