import { UserAuth } from "@/components/auth/AuthContext";
import NavContent from "@/components/nav/NavContent";
import SideNav from "@/components/nav/SideNav";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signOut } = UserAuth();
  const navigate = useNavigate();
  return (
    <>
      <SideNav>
        <div className="my-auto">
          <NavContent />
        </div>
        <div className="mt-auto w-full">
          <Button
            onClick={() => {
              void signOut();
              void navigate({ to: "/" });
            }}
            className="w-full"
          >
            Log out
          </Button>
        </div>
      </SideNav>
      <div>HOME DASHBOARD</div>;
    </>
  );
}
