import { createPortal } from "react-dom";
import BurgerMenuSVG from "../icons/BurgerMenuSVG";
import { ReactNode } from "react";
import CloseSVG from "../icons/CloseSVG";
import { Button } from "../ui/button";
import { UserAuth } from "../auth/AuthContext";
import { useNavigate } from "@tanstack/react-router";

type MobileSideBarProps = {
  openMobileNav: () => void;
  closeMobileNav: () => void;
  children: ReactNode;
  showMobileNav: boolean;
};

export default function MobileSideBar({ ...props }: MobileSideBarProps) {
  const { openMobileNav, closeMobileNav, children, showMobileNav } = {
    ...props,
  };
  const { signOut, session } = UserAuth();
  const navigate = useNavigate();

  async function logout() {
    await signOut();
    await navigate({ to: "/login" });
  }

  return (
    <>
      <button className="flex items-center" onClick={() => openMobileNav()}>
        <BurgerMenuSVG />
      </button>
      {showMobileNav &&
        createPortal(
          <div className="absolute top-0 bottom-0 left-0 w-[100%] bg-foreground/80">
            <div className="flex flex-col justify-between top-0 left-0 h-full bottom-0 w-[85%] bg-background p-2">
              {/* Header */}
              <div className="flex items-center flex-row justify-between">
                <h1 className="invisible">TITLE</h1>
                <button onClick={() => closeMobileNav()}>
                  <CloseSVG />
                </button>
              </div>

              {/* Content */}
              {children}

              {/* Footer */}
              <div className="flex flex-col gap-2">
                <p className="text-xl">{session?.user.email}</p>
                <Button onClick={() => void logout()} className="w-full">
                  Log out
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
