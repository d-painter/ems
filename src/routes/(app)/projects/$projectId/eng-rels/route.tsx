import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId/eng-rels")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
