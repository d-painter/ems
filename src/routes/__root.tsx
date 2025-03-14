import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContext } from "@/components/auth/AuthContext";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      {process.env.NODE_ENV !== "production" && <TanStackRouterDevtools />}
      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
    </>
  ),
});
