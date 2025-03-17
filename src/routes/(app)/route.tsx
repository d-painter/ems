import { UserAuth } from "@/components/auth/AuthContext";
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  component: AppRoute,
});

function AppRoute() {
  const { signOut, session } = UserAuth();
  const navigate = useNavigate();

  if (!session) {
    navigate({ to: "/" });
    return
  }

  async function handleLoginButton() {
    if (session) {
      await signOut();
      navigate({ to: "/" });
    } else {
      //TODO: sort
      alert("no session");
    }
  }

  return (
    <>
      <div className="p-2 relative flex flex-row w-full gap-2">
        <div className="flex flex-row w-full gap-2 items-center">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <div className="w-fit bg-amber-200 h-fit px-4">
            logged in: {session ? "yes" : "no"}
          </div>
          <div className="w-fit bg-amber-200 h-fit px-4">
            logged in as: {session?.user?.email ? session.user.email : "-"}
          </div>
        </div>
        <button
          onClick={() => handleLoginButton()}
          className="p-4 bg-amber-800 rounded-xl"
        >
          {session ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
