import { auth } from "@/components/user";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>Hello "/(auth)/login"!</div>
      <button
        onClick={() => auth.loginFunc}
        className="bg-red-300 rounded-xl p-4 m-6"
      >
        Login
      </button>
      <Link to="/">HOME</Link>
    </div>
  );
}
