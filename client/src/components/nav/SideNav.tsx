import { ReactNode } from "react";
import LogoutButton from "./LogoutButton";
import { UserAuth } from "../auth/AuthContext";
import { useIsServerLive } from "@/hooks/isServerLive";
import { useParams } from "@tanstack/react-router";

export default function SideNav({ children }: { children: ReactNode }) {
  const { session } = UserAuth();
  const route = useParams({ strict: false });
  const isServerLive = useIsServerLive();
  return (
    <div className="w-44 lg:w-56 hidden shrink-0 md:flex-col h-full md:flex p-4 border-r border-r-primary">
      <div>{route.projectId}</div>
      <div className="my-auto">{children}</div>
      <div className="mt-auto">
        <div className="w-full max-w-54 space-y-1">
          <div
            className={`flex items-center gap-2 max-md:hidden ${isServerLive && "invisible"}`}
          >
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p>Online</p>
          </div>
          <p className="text-xs text-wrap">{session?.user?.email}</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
