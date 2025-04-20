import { ReactNode } from "react";
import { Button } from "../ui/button";
import { UserAuth } from "../auth/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export default function SideNav({ children }: { children: ReactNode }) {
  const { signOut } = UserAuth();
  const navigate = useNavigate();

  async function logout() {
    await signOut();
    await navigate({ to: "/login" });
  }

  return (
    <div className="relative w-56 h-full hidden md:flex-col shrink-0 md:flex p-4 border-r border-r-primary">
      <div className="my-auto">{children}</div>
      <div className="mt-auto">
        <Button onClick={() => void logout()} className="w-full">
          Log out
        </Button>
      </div>
    </div>
  );
}
