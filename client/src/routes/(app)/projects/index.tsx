import ProjectTable from "@/components/projects/ProjectTable";
import IndexStyling from "@/components/ui/layout/IndexStyling";
import {
  allProjectsQuery,
  useAllProjects,
} from "@/services/queries/projectQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/")({
  component: ProjectPage,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery(allProjectsQuery);
  },
});

function ProjectPage() {
  const { error, data: projectData } = useAllProjects();

  return (
    <IndexStyling>
      <ProjectTable data={projectData} error={error} />
    </IndexStyling>
  );
}
