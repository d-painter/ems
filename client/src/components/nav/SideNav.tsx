import { ReactNode } from "react";
import LogoutButton from "./LogoutButton";
import { UserAuth } from "../auth/AuthContext";
import { useIsServerLive } from "@/hooks/isServerLive";
import { useParams } from "@tanstack/react-router";
import { useAllProjects } from "@/services/queries/projectQueries";
import { useAdditionalUserContext } from "@/Context/AdditionalUserContext";

export default function SideNav({ children }: { children: ReactNode }) {
  const { session } = UserAuth();
  const route = useParams({ strict: false });
  const isServerLive = useIsServerLive();

  const { org_uuid } = useAdditionalUserContext();
  const projects = useAllProjects(org_uuid!);
  const project = projects.data?.filter(
    (p) => p.project_id === route.projectId
  )[0];
  return (
    <div className="w-44 lg:w-56 hidden shrink-0 md:flex-col h-full md:flex p-4 border-r border-r-primary">
      <div className="flex flex-col gap-2">
        <p className=" h-full text-2xl font-bold">{route.projectId}</p>
        <p className="text-sm text-wrap">{project?.project_description}</p>
      </div>
      <div className="my-auto">{children}</div>
      <div className="mt-auto">
        <div className="w-full max-w-54 space-y-1">
          <div
            className={`flex items-center gap-2 max-md:hidden ${isServerLive && "invisible"}`}
          >
            <div className="w-2 h-2 rounded-full"></div>
            <p>Online</p>
          </div>
          <p className="text-xs text-wrap">{session?.user?.email}</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
