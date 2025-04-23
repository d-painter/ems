import MobileNavBottom from "@/components/nav/MobileNavBottom";
import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/parts/$partId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <SideNav>
        <div className="my-auto">
          <div className="hidden text-base md:flex flex-col lg:text-xl gap-2 [&_*]:hover:border-l-4 [&_*]:border-l-4 [&_*]:border-transparent [&_*]:hover:border-l-primary [&_*]:pl-2">
            <Link
              to={"/"}
              className="[&.active]:font-bold [&.active]:border-l-primary"
            >
              Home
            </Link>
          </div>
        </div>
      </SideNav>
      <div>
        <Outlet />
      </div>
      <MobileNavBottom>
        <NavContent navType="mobile" />
      </MobileNavBottom>
    </div>
  );
}
