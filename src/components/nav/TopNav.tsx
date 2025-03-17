import { useNavigate } from "@tanstack/react-router";
import { UserAuth } from "../auth/AuthContext";
import UserCircleSVG from "../icons/UserCircleSVG";
import { Button } from "../ui/button";

import MobileSideBar from "./MobileSideBar";

export default function TopNav() {
  const { signOut, session } = UserAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center mx-auto w-full p-2">
      <div className="md:hidden">
        <MobileSideBar />
      </div>

      {/* profile component  */}
      <div className="ml-auto items-center gap-1 hidden md:block ">
        <UserCircleSVG />
        <p className="text-lg">{session?.user?.email}</p>
        <Button
          onClick={async () => {
            await signOut();
            navigate({ to: "/" });
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
