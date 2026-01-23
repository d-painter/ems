import MobileNavBottom from "@/components/nav/MobileNavBottom";
import NavContentProjects from "@/components/nav/NavContentProjects";
import SideNav from "@/components/nav/SideNav";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAdditionalUserContext } from "@/Context/AdditionalUserContext";
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
});

function RouteComponent() {
  const route = useParams({ strict: false });

  const { org_uuid } = useAdditionalUserContext();
  const { data, isPending } = useAllProjects(org_uuid!);
  if (isPending) {
    return <LoadingSpinner />;
  }
  const unique = [...new Set(data?.map((d) => d.project_id))];
  const validProject = unique.includes(route.projectId!);

  if (!validProject) {
    toast.error(`${route.projectId} does not exist`);
    return <Navigate to="/projects/" replace={true} />;
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <SideNav>
        <div className="my-auto">
          <NavContentProjects navType="side" projectId={route.projectId!} />
        </div>
      </SideNav>
      <div className="w-full h-full p-2 pb-20 max-md:min-h-dvh md:pb-2">
        <div className="md:hidden">
          <Card className="w-full p-2 shadow-none">
            <h1>Project - {route.projectId}</h1>
          </Card>
        </div>

        <Outlet />
      </div>
      <MobileNavBottom>
        <NavContentProjects navType="mobile" projectId={route.projectId!} />
      </MobileNavBottom>
    </div>
  );
}
