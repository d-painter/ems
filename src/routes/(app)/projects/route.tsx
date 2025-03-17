import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/about copy/")({
  component: ProjectsLayoutComponent,
});

function ProjectsLayoutComponent() {
  return <div>Projects Page</div>;
}
