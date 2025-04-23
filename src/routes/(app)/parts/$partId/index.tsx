import { allPartsQuery, useAllParts } from "@/services/queries/partsQueries";
import { createFileRoute, useParams } from "@tanstack/react-router";

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
  return (
    <div className="w-full h-full overflow-auto max-w-5xl pb-10 p-2">
      {/* <span className="bg-red-100">{partId}</span> */}
      {!p ? (
        <h1>PART DOES NOT EXIST</h1>
      ) : (
        <>
        <div>{JSON.stringify(p)}</div>
          <div className="flex flex-row text-white w-full p-2 md:p-6 h-fit bg-primary justify-between">
            <div className="flex flex-col grow">
              <h1 className="mb-2 flex flex-row text-xl">{partId}</h1>
              <h1 className="mb-2 flex flex-row text-xl">{p?.description}</h1>
            </div>
          </div>
          <div>CARD</div>
        </>
      )}
    </div>
  );
}
