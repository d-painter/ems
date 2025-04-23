import { ReactNode } from "react";
import LogoutButton from "./LogoutButton";
import { UserAuth } from "../auth/AuthContext";
import { UserCircle } from "lucide-react";

export default function SideNav({ children }: { children: ReactNode }) {
  const { session } = UserAuth();
  return (
    <div className="w-44 lg:w-56 hidden shrink-0 md:flex-col h-full md:flex p-4 border-r border-r-primary">
      <div className="my-auto">{children}</div>
      <div className="mt-auto">
        <div className="w-full max-w-54">
          <div className="flex flex-row gap-1 items-center">
            <UserCircle size={18} />
            <p className="text-base text-wrap">{session?.user?.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
