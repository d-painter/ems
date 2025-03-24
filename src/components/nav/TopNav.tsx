import { Link } from "@tanstack/react-router";
import { UserAuth } from "../auth/AuthContext";
import HomeSVG from "../icons/HomeSVG";
import UserCircleSVG from "../icons/UserCircleSVG";

import MobileSideBar from "./MobileSideBar";

export default function TopNav() {
  const { session } = UserAuth();

  return (
    <div className="flex items-center mx-auto w-full p-2">
      <div className="md:hidden">
        <MobileSideBar />
      </div>
      <Link to="/" className="hidden md:block">
        <HomeSVG />
      </Link>

      {/*TODO: profile component  */}
      <div className="ml-auto items-center gap-1 hidden md:flex ">
        <UserCircleSVG />
        <p className="text-lg">{session?.user?.email}</p>
      </div>
    </div>
  );
}
