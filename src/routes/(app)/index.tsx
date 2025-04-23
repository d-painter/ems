import ProjectTable from "@/components/projects/ProjectTable";
import IndexStyling from "@/components/ui/layout/IndexStyling";
import { useAllProjects } from "@/services/queries/projectQueries";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error, data: projectData } = useAllProjects();
  return (
    <IndexStyling>
      <ProjectTable data={projectData} error={error} />
    </IndexStyling>
  );
}
