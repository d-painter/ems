import NavContentProjects from "@/components/nav/NavContentProjects";
import SideNav from "@/components/nav/SideNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  return (
    <>
      <SideNav>
          <NavContentProjects projectId={projectId}/>
      </SideNav>
      <div className="w-full h-full">
      <Outlet/>
      </div>
    </>
  );
}
