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
    <div className="w-48 h-full hidden md:flex-col md:flex p-4 bg-red-200">
      {children}
      <div className="mt-auto w-full">
        <Button onClick={() => void logout()} className="w-full">
          Log out
        </Button>
      </div>
    </div>
  );
}
