import TopNav from "@/components/nav/TopNav";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  beforeLoad: ({ context }) => {
    console.log("auth", context.auth.session);

    if (!context.auth.session) {
      return redirect({ to: "/login" });
    }
  },
  component: AppRoute,
});

function AppRoute() {
  return (
    <div className="flex flex-col h-dvh w-full">
      <TopNav />
      <div className="w-full h-full flex flex-row bg-amber-100">
        <Outlet />
      </div>
    </div>
  );
}
