import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects")({
  component: ProjectsLayoutComponent,
});

function ProjectsLayoutComponent() {
  return <div>Projects Page</div>;
}
