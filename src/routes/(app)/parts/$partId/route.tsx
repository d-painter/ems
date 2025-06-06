import MobileNavBottom from "@/components/nav/MobileNavBottom";
import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/parts/$partId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row max-md:min-h-dvh">
      <SideNav>
        <div className="my-auto">
          <NavContent navType="side" />
        </div>
      </SideNav>
      <Outlet />
      <MobileNavBottom>
        <NavContent navType="mobile" />
      </MobileNavBottom>
    </div>
  );
}
