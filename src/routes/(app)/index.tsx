import { UserAuth } from "@/components/auth/AuthContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = UserAuth();
  return (
    <>
      <div>Hello "/(app)/"!</div>;
      <hr/>
      <div>{JSON.stringify(session && session.user.email)}</div>
    </>
  );
}
