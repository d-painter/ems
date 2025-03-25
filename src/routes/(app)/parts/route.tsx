import SideNav from "@/components/nav/SideNav";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/parts")({
  component: PartsLayoutComponent,
});

function PartsLayoutComponent() {
  return (
    <>
      <SideNav>
        <h1 className="my-auto">Content1</h1>
      </SideNav>
      <div>Parts Page</div>
    </>
  );
}
