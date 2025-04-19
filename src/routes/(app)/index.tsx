import MobileNavBottom from "@/components/nav/MobileNavBottom";
import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
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
      <SideNav>
        <div className="my-auto">
          <NavContent location="side" />
        </div>
      </SideNav>
      <div className="flex w-full flex-col gap-6 items-center overflow-y-auto pt-6">
        <div className="flex w-full flex-col gap-6 items-center lg:w-3xl pb-20">
          <ProjectTable data={projectData} error={error} />
        </div>
      </div>
      <MobileNavBottom>
        <NavContent location="mobile" />
      </MobileNavBottom>
    </>
  );
}
