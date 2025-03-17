import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { UserAuth } from "../auth/AuthContext";

export default function SideNav() {
  const { signOut } = UserAuth();
  const navigate = useNavigate();


  return (
    <div className="w-52 hidden md:block bg-blue-300 p-4">
      
      <div className="absolute bottom-0 p-4 left-0 w-48">
        <Button
          onClick={async () => {
            await signOut();
            navigate({ to: "/" });
          }}
          className="w-full"
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
