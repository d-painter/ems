import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/about copy/")({
  component: SuppliersLayoutComponent,
});

function SuppliersLayoutComponent() {
  return <div>Supplier Page</div>;
}
