import {
  createFileRoute,
  Navigate,
  Outlet,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId/parts")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId, category } = useParams({ strict: false });

  return (
    <>
      {!category && (
        <Navigate
          to="/projects/$projectId/parts/$category"
          params={{ projectId: projectId!, category: "A" }}
        />
      )}
      <Outlet />
    </>
  );
}
