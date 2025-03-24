import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SideNav>
        <div className="my-auto">
          <NavContent />
        </div>
      </SideNav>
      <div>HOME DASHBOARD</div>
    </>
  );
}
