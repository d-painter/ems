import { Card, CardContent } from "@/components/ui/card";
import { allPartsQuery, useAllParts } from "@/services/queries/partsQueries";
import { createFileRoute, useParams } from "@tanstack/react-router";
import QRCode from "react-qr-code";

export const Route = createFileRoute("/(app)/parts/$partId/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery(allPartsQuery());
  },
});

function RouteComponent() {
  const { partId } = useParams({ strict: false });

  const { data: allPartData } = useAllParts();

  const p = allPartData?.filter(
    (p) =>
      `${p.project_id}-${p.sub_system}-${String(p.part_number).padStart(4, "0")}` ===
      partId
  )[0];

  const qrInfo = { ...p };
  delete qrInfo["id"];
  delete qrInfo["owner_id"];

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center overflow-auto pb-20 p-2">
      {!p ? (
        <h1>PART DOES NOT EXIST</h1>
      ) : (
        <div className="flex flex-col h-full w-full max-w-3xl gap-4">
          {/* Header */}
          <div className="flex flex-col text-white w-full p-2 md:p-6 h-fit bg-primary justify-between">
            <h1 className="mb-2 flex flex-row text-xl">{partId}</h1>
            <h1 className="mb-2 flex flex-row text-xl">{p?.description}</h1>
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="border-b-2 border-b-primary">PART LABEL</h1>
              <Card className="w-full max-w-96 p-4 mt-2 ">
                <CardContent className="flex gap-2 flex-row w-full p-0">
                  <QRCode
                    value={JSON.stringify(qrInfo)}
                    className="h-36 w-1/2"
                  />
                  <div className="flex flex-col justify-center gap-4 ">
                    <div>
                      <p className="text-xs text-black/40">Part Number</p>
                      <p>{partId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/40">Part Description</p>
                      <p>{p.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <h1 className="border-b-2 border-b-primary mb-2">INFORMATION</h1>
              <div>
                <ul>
                  <li>Qty in stock: -</li>
                  <li>Last ordered: -</li>
                  <li>Cost: £-</li>
                  <li>Supplier: -</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="border-b-2 border-b-primary mb-2">HISTORY</h1>
              <div>
                <ul>
                  <li>Date Created: {p.created_date?.split("T")[0]}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
