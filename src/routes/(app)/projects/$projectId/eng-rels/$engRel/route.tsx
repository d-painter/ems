import { useProjectEngRels } from "@/services/queries/engRelQueries";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/(app)/projects/$projectId/eng-rels/$engRel"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId, engRel } = Route.useParams();
  const { data: engRels, isPending } = useProjectEngRels(projectId);

  function formatEngRel(rel: number) {
    return String(rel).padStart(4, "0");
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  const uniqueEngRels = [
    ...new Set(
      engRels?.map((e) => `${e.project_id}-ER-${formatEngRel(e.release_id)}`)
    ),
  ];
  const validEngRel = uniqueEngRels.includes(engRel);

  if (!validEngRel) {
    toast.error(`${engRel} does not exist.`);
    return (
      <Navigate
        to="/projects/$projectId/eng-rels"
        params={{ projectId: projectId }}
        replace={true}
      />
    );
  }

  return (
    <div>Hello "/(app)/projects/$projectId/eng-rels/$engRel"! {engRel}</div>
  );
}
