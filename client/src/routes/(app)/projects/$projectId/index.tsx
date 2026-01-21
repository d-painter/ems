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
        <div className="w-full flex justify-center items-start h-full">
          <div className="justify-start w-full max-w-3xl flex-col flex h-fit gap-2">
            <EtrsChart />
            <ReleaseOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
