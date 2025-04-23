import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/$projectId/adr")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex justify-center text-sm items-center pb-16 md:pb-2 ">
      <div className="w-full max-w-2xl h-full flex flex-col my-auto overflow-hidden">
        <div className="flex flex-col gap-2 overflow-auto my-auto">
          <Card className="p-2 md:p-6">
            <h1>TOPIC 1</h1>
            <div className="flex flex-row justify-between">
              <div>
                <h2>Load Case Requirements</h2>
              </div>
              <div className="flex flex-row gap-2 md:gap-4 ">
                <h2>Raised By: Person</h2>
                <h2>Decision: Pending</h2>
              </div>
            </div>
          </Card>
          <Card className="p-2 md:p-6">
            <h1>TOPIC 2</h1>
            <div className="flex flex-row justify-between">
              <div>
                <h2>Material Selection</h2>
              </div>
              <div className="flex flex-row gap-2 md:gap-4 ">
                <h2>Raised By: Person</h2>
                <h2>Decision: Pending</h2>
              </div>
            </div>
          </Card>
          <Card className="p-2 md:p-6">
            <h1>TOPIC 3</h1>
            <div className="flex flex-row justify-between">
              <div>
                <h2>Sealing Requirements</h2>
              </div>
              <div className="flex flex-row gap-2 md:gap-4 ">
                <h2>Raised By: Person</h2>
                <h2>Decision: Pending</h2>
              </div>
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  );
}
