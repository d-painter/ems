import { UserAuth } from "@/components/auth/AuthContext";

import TopNav from "@/components/nav/TopNav";
import {
  createFileRoute,
  Navigate,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  component: AppRoute,
});

function AppRoute() {
  const { session } = UserAuth();


  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <TopNav/>
      <div className="w-full h-full  flex flex-row">
        <Outlet />
      </div>
    </div>
  );
}
