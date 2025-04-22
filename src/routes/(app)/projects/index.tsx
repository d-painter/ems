import ProjectTable from "@/components/projects/ProjectTable";
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
      <div className="relative flex w-full flex-col gap-6 items-center overflow-auto">
        <div className="relative flex w-full flex-col gap-6 items-center pb-20 lg:w-3xl">
          <ProjectTable data={projectData} error={error} />
        </div>
      </div>
  );
}
