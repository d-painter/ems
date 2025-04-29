import EtrsChart from "@/components/charts/EtrsChart";
import DashboardInfo from "@/components/info/DashboardInfo";
import InfoDialog from "@/components/info/InfoDialog";
import ReleaseOverview from "@/components/projects/dashboard/ReleaseOverview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full overflow-hidden">
      <div className="flex flex-col h-full w-full overflow-auto gap-2">
        <div className="w-full h-6 text-center flex items-center justify-start">
          <InfoDialog title="Dashboard Information" description="About the dashboard.">
            <DashboardInfo />
          </InfoDialog>
        </div>
        <div className=" flex justify-center items-center h-full w-full">
          <div className="flex flex-row flex-wrap w-full justify-center max-h-fit h-full gap-2">
            <EtrsChart />
            <ReleaseOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
