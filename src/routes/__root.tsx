import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { AuthContext } from "@/components/auth/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import TestingNav from "@/components/testing/TestingNav";
import { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext;
  queryClient: QueryClient;
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
  component: () => {
    const showTesting = false;
    return (
      <>
        {showTesting && <TestingNav />}
        <Outlet />
        <Toaster richColors />
      </>
    );
  },
});
