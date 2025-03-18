import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/suppliers")({
  component: SuppliersLayoutComponent,
});

function SuppliersLayoutComponent() {
  return <div>Supplier Page</div>;
}
