import { UserAuth } from "@/components/auth/AuthContext";
import MobileSideBar from "@/components/nav/MobileSideBar";
import NavContent from "@/components/nav/NavContent";
import NavContentProjects from "@/components/nav/NavContentProjects";
import TopNav from "@/components/nav/TopNav";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)")({
  component: AppRoute,
});

function AppRoute() {
  const { session } = UserAuth();
  const params = useParams({ strict: false });
  const [showMobileNav, setShowMobileNav] = useState(false);

  function openMobileNav() {
    setShowMobileNav(true);
  }
  function closeMobileNav() {
    setShowMobileNav(false);
  }

  function getNavContent() {
    if (params.projectId) {
      return (
        <NavContentProjects
          closeMobileNav={closeMobileNav}
          projectId={params.projectId}
        />
      );
    } else {
      return <NavContent closeMobileNav={closeMobileNav} />;
    }
  }

  const navContent = getNavContent();

  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <TopNav>
        <MobileSideBar
          openMobileNav={openMobileNav}
          showMobileNav={showMobileNav}
          closeMobileNav={closeMobileNav}
        >
          {navContent}
        </MobileSideBar>
      </TopNav>
      <div className="w-full h-full overflow-hidden flex flex-row">
        <Outlet />
      </div>
    </div>
  );
}
