import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContext } from "@/components/auth/AuthContext";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: () => {
    return (
      <div className="h-full w-full text-center flex flex-col items-center gap-4 justify-center">
        <div>
          <h1 className="h-full text-3xl">404 NOT FOUND</h1>
        </div>
        <Link to="/" className="underline">
          home
        </Link>
      </div>
    );
  },
  component: () => (
    <>
      <Outlet />
      {process.env.NODE_ENV !== "production" && <TanStackRouterDevtools />}
      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
    </>
  ),
});
