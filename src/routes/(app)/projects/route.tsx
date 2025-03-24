import SideNav from "@/components/nav/SideNav";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects")({
  component: ProjectsLayoutComponent,
});

function ProjectsLayoutComponent() {
  return (
    <>
      <SideNav>
        <h1 className="my-auto">Content1</h1>
      </SideNav>
      <div>Projects Page</div>
    </>
  );
}
