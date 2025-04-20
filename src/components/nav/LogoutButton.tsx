import { useNavigate } from "@tanstack/react-router";
import { UserAuth } from "../auth/AuthContext";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { signOut } = UserAuth();
  const navigate = useNavigate();

  async function logout() {
    await signOut();
    await navigate({ to: "/login" });
  }
  return (
    <Button onClick={() => void logout()} className="text-sm w-full">
      Log out
    </Button>
  );
}
