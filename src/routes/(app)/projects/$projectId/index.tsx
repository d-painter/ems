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
        <div>
          <InfoDialog
            title="Dashboard Information"
            description="About the dashboard."
            type="action"
          >
            <DashboardInfo />
          </InfoDialog>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="w-full h-fit flex flex-col items-center max-w-4xl justify-center">
            <div className="flex flex-row flex-wrap w-full justify-center h-full gap-2">
              <EtrsChart />
              <ReleaseOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
