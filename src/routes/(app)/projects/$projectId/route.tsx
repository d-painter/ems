import MobileNavBottom from "@/components/nav/MobileNavBottom";
import NavContentProjects from "@/components/nav/NavContentProjects";
import SideNav from "@/components/nav/SideNav";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { allProjectPartsQuery } from "@/services/queries/partsQueries";
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
  loader: async ({ context: { queryClient }, params }) => {
    const { projectId } = params;
    await queryClient.prefetchQuery(allProjectPartsQuery(projectId));
  },
});

function RouteComponent() {
  const route = useParams({ strict: false });

  const { data, isPending } = useAllProjects();
  if (isPending) {
    return <LoadingSpinner />;
  }
  const unique = [...new Set(data?.map((d) => d.project_id))];
  const validProject = unique.includes(route.projectId!);

  if (!validProject) {
    toast.error(`${route.projectId} does not exist`);
    return <Navigate to="/projects" replace={true} />;
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <SideNav>
        <div className="my-auto">
          <NavContentProjects navType="side" projectId={route.projectId!} />
        </div>
      </SideNav>
      <div className="w-full h-full justify-center flex  p-2">
        <Outlet />
      </div>
      <MobileNavBottom>
        <NavContentProjects navType="mobile" projectId={route.projectId!} />
      </MobileNavBottom>
    </div>
  );
}
