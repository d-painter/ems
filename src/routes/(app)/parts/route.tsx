import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/parts")({
  component: PartsLayoutComponent,
});

function PartsLayoutComponent() {
  return <div>Parts page</div>;
}
