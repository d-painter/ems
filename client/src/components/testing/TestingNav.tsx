import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export default function TestingNav() {
  return (
    <div className="min-h-20 w-full bg-amber-100">
      {process.env.NODE_ENV !== "production" && (
        <TanStackRouterDevtools position="top-left" />
      )}
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools buttonPosition="top-right" initialIsOpen={false} />
      )}
    </div>
  );
}
