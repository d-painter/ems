import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContext } from "@/components/auth/AuthContext";
import { Toaster } from "@/components/ui/sonner";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: () => {
    return (
      <div className="w-full text-center flex flex-col items-center gap-4 justify-center">
        <div>
          <h1 className="text-3xl">404 NOT FOUND</h1>
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
      <Toaster richColors />
      {process.env.NODE_ENV !== "production" && <TanStackRouterDevtools />}
      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
    </>
  ),
});
