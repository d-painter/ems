import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { AuthContext } from "@/components/auth/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient } from "@tanstack/react-query";
import { AdditionalUserContextProvider } from "@/Context/AdditionalUserContext";

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
          Home
        </Link>
      </div>
    );
  },
  errorComponent: () => {
    return (
      <div className="w-full text-center flex flex-col items-center gap-4 justify-center">
        <div>
          <h1 className="text-3xl">Error</h1>
        </div>
        <Link to="/" className="underline">
          Home
        </Link>
      </div>
    );
  },
  component: () => {
    return (
      <>
        <AdditionalUserContextProvider>
          <Outlet />
          <Toaster richColors />
        </AdditionalUserContextProvider>
      </>
    );
  },
});
