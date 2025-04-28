import EngRelFiles from "@/components/projects/engRels/EngRelFiles";
import EngRelHeader from "@/components/projects/engRels/EngRelHeader";
import EngRelParts from "@/components/projects/engRels/EngRelParts";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useProjectEngRels } from "@/services/queries/engRelQueries";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/(app)/projects/$projectId/eng-rels/$engRel"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId, engRel: engRelParam } = Route.useParams();
  const { data: engRels, isPending } = useProjectEngRels(projectId);

  function formatEngRel(rel: number) {
    return String(rel).padStart(4, "0");
  }

  if (isPending) {
    return <LoadingSpinner />;
  }

  const uniqueEngRels = engRels?.map(
    (e) => `${e.project_id}-ER-${formatEngRel(e.release_id)}`
  );

  const validEngRel = !uniqueEngRels?.length
    ? false
    : uniqueEngRels.includes(engRelParam);

  if (!validEngRel) {
    toast.error(`${engRelParam} does not exist.`);
    return (
      <Navigate
        to="/projects/$projectId/eng-rels/"
        params={{ projectId: projectId }}
        replace={true}
      />
    );
  }

  const engRel = engRels!.filter(
    (e) => e.release_id === Number(engRelParam.split("-")[2])
  )[0];

  return (
    <div className="w-full h-full overflow-auto max-w-5xl pb-10">
      <EngRelHeader engRel={engRel} />
      <div className="space-y-6">
        <EngRelParts engRel={engRel} />
        <EngRelFiles engRel={engRel} />
      </div>
    </div>
  );
}
