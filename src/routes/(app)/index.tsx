import ProjectTable from "@/components/projects/ProjectTable";
import { useAllProjects } from "@/services/queries/projectQueries";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error, data: projectData } = useAllProjects();
  return (
    <>
      <div className="flex w-full flex-col gap-6 items-center overflow-auto">
        <div className="flex w-full flex-col gap-6 items-center lg:w-3xl pb-20">
          <ProjectTable data={projectData} error={error} />
        </div>
      </div>
    </>
  );
}
