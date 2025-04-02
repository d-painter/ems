import NavContentProjects from "@/components/nav/NavContentProjects";
import SideNav from "@/components/nav/SideNav";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const route = useParams({strict:false})

  return (
    <>
      <SideNav>
        <NavContentProjects projectId={route.projectId!} category={route.category ?? ""} />
      </SideNav>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </>
  );
}
