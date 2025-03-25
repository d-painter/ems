import { UserAuth } from "@/components/auth/AuthContext";
import TopNav from "@/components/nav/TopNav";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
   component: AppRoute,
});

function AppRoute() {
  const { session } = UserAuth();
  const navigate = useNavigate();

  if (!session) {
    void navigate({ to: "/login" });
    return
  }

  return (
    <div className="flex flex-col h-full w-full">
      <TopNav />
      <div className="w-full h-full overflow-hidden flex flex-row">
        <Outlet />
      </div>
    </div>
  );
}
