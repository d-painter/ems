import { UserAuth } from "@/components/auth/AuthContext";
import SideNav from "@/components/nav/SideNav";
import TopNav from "@/components/nav/TopNav";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/(app)")({
  component: AppRoute,
});

function AppRoute() {
  const { session } = UserAuth();
  const navigate = useNavigate();

  // Check if session exists and redirect to login if not
  useEffect(() => {
    if (!session) {
      void navigate({ to: "/login" });
    }
  }, [session, navigate]);

  if (!session) {
    return null; 
  }

  return (
    <div className="flex flex-row h-dvh w-full">
      <SideNav />
      <div className="flex flex-col w-full h-full">
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
}
