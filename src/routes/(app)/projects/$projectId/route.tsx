import NavContentProjects from "@/components/nav/NavContentProjects";
import SideNav from "@/components/nav/SideNav";
import { useAllProjects } from "@/services/queries/projectQueries";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  component: RouteComponent,
  errorComponent: () => <p>Error</p>,
});

function RouteComponent() {
  const route = useParams({ strict: false });

  const { data, isPending } = useAllProjects();
  if (isPending) {
    return <p>Loading...</p>;
  }
  const unique = [...new Set(data?.map((d) => d.project_id))];
  const validProject = unique.includes(route.projectId!);

  if (!validProject) {
    toast.error(`${route.projectId} does not exist`);
    return <Navigate to="/projects" replace={true} />;
  }

  return (
    <>
      <SideNav>
        <NavContentProjects
          projectId={route.projectId!}
          category={route.category ?? ""}
          engRel={route.engRel ?? ""}
        />
      </SideNav>
      <div className="w-full h-full p-2 md:p-6">
        <Outlet />
      </div>
    </>
  );
}
