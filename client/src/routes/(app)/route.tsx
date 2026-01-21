import { UserAuth } from "@/components/auth/AuthContext";
import MobileNavBottom from "@/components/nav/MobileNavBottom";
import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useGetUserOrgUuid } from "@/services/queries/userQueries";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useMatchRoute,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  component: AppRoute,
});

function AppRoute() {
  const { session } = UserAuth();

  if (!session) {
    return <Navigate to="/login/" />;
  }
  const { data: userOrgUuid, isPending: isUserOrgUuidPending } =
    useGetUserOrgUuid(session.user.id);
  const matchRoute = useMatchRoute();
  const matchedIndex = matchRoute({ to: "/" });
  const matchedParts = matchRoute({ to: "/parts/" });
  const matchedProjects = matchRoute({ to: "/projects/" });
  const matchedSuppliers = matchRoute({ to: "/suppliers/" });

  const show =
    matchedIndex || matchedProjects || matchedParts || matchedSuppliers;
  if (isUserOrgUuidPending) {
    return <LoadingSpinner />;
  }
  if (!userOrgUuid) {
    return <div>No user org uuid found</div>;
  }
  return (
    <div className="w-full h-full min-h-dvh overflow-hidden flex flex-row md:flex-row">
      {show && (
        <SideNav>
          <NavContent navType="side" />
        </SideNav>
      )}
      <div className="flex w-full justify-center h-full items-start overflow-auto min-h-dvh">
        <Outlet />
      </div>
      {show && (
        <MobileNavBottom>
          <NavContent navType="mobile" />
        </MobileNavBottom>
      )}
    </div>
  );
}
