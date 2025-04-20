import { UserAuth } from "../auth/AuthContext";
import UserCircleSVG from "../icons/UserCircleSVG";
import GlobalLoadingIndicator from "../testing/GlobalLoadingIndicator";

export default function TopNav() {
  const { session } = UserAuth();

  return (
    <div className="flex items-center mx-auto w-full p-2">
      {process.env.NODE_ENV !== "production" && <GlobalLoadingIndicator />}

      {/*TODO: profile component  */}
      <div className="ml-auto items-center gap-1 hidden md:flex ">
        <UserCircleSVG />
        <p className="text-lg">{session?.user?.email}</p>
      </div>
    </div>
  );
}
