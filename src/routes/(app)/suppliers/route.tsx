import SideNav from "@/components/nav/SideNav";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/suppliers")({
  component: SuppliersLayoutComponent,
});

function SuppliersLayoutComponent() {
  return (
    <>
      <SideNav>
        <h1 className="my-auto">Content1</h1>
      </SideNav>
      <div>Supplier Page</div>
    </>
  );
}
