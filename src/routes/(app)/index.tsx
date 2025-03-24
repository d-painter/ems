import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
import {
  useAllProjects,
} from "@/services/queries/projectQueries";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {

  const projectsQuery = useAllProjects();

  return (
    <>
      <SideNav>
        <div className="my-auto">
          <NavContent />
        </div>
      </SideNav>
      <div>HOME DASHBOARD</div>
      <div>
        {projectsQuery.isPending && <p>Loading...</p>}
        {projectsQuery.data?.data?.map((d) => (<p>{JSON.stringify(d)}</p>))}
        {projectsQuery.isError && <p>{JSON.stringify(projectsQuery.error.message)}</p>}
      </div>
    </>
  );
}
