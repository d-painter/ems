import EtrsChart from "@/components/charts/EtrsChart";
import ReleaseOverview from "@/components/projects/dashboard/ReleaseOverview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full overflow-hidden">
      <div className="w-full h-full overflow-auto flex flex-wrap gap-2 content-center items-stretch justify-around 2xl:w-6xl">
        <EtrsChart />
        <ReleaseOverview />
      </div>
    </div>
  );
}
