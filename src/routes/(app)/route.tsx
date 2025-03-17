import { UserAuth } from "@/components/auth/AuthContext";
import SideNav from "@/components/nav/SideNav";
import TopNav from "@/components/nav/TopNav";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createPortal } from "react-dom";

export const Route = createFileRoute("/(app)")({
  component: AppRoute,
});

function AppRoute() {
  const { session } = UserAuth();
  const navigate = useNavigate();

  const [showMobileNav, setShowMobileNav] = useState(false)

  if (!session) {
    navigate({ to: "/login" });
    return;
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
