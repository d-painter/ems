import { auth } from "@/components/user";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  beforeLoad: async ({ location }) => {
    if (!auth.isLoggedIn) {
      throw redirect({
        to: "/login",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="p-2 relative flex flex-row w-full gap-2">
        <div className="flex flex-row w-full gap-2 items-center">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <div className="w-fit bg-amber-200 h-fit px-4">
            logged in: {JSON.stringify(auth.isLoggedIn)}
          </div>
        </div>
        <button className="p-4 bg-amber-800 rounded-xl">
          {auth.isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
