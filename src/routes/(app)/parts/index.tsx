import InfoDialog from "@/components/info/InfoDialog";
import PartsCardInfo from "@/components/info/PartsCardInfo";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IndexStyling from "@/components/ui/layout/IndexStyling";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allPartsQuery, useAllParts } from "@/services/queries/partsQueries";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)/parts/")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery(allPartsQuery());
  },
});

function RouteComponent() {
  const [search, setSearch] = useState("");
  const { data: allPartData, isPending } = useAllParts();
  if (isPending) {
    return <LoadingSpinner />;
  }

  // const allPartData = []

  function getFilteredData() {
    const filteredParts = allPartData?.filter((p) => {
      const pNumber = `${p.project_id}-${p.sub_system}-${String(p.part_number).padStart(4, "0")}`;
      if (
        pNumber.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search)
      ) {
        return p;
      }
    });
    return filteredParts;
  }

  /**
   * TODO: Implement correct debounce
   * Create data table for correct sorting and filtering
   */

  let filteredData;
  if (allPartData?.length) {
    if (search.length < 3) {
      filteredData = allPartData;
    } else {
      filteredData = getFilteredData();
    }
  }

  return (
    <IndexStyling>
      <Card className="relative w-full h-fit max-h-full my-auto max-w-lg pb-2">
        <div className="w-fit absolute -right-1 -top-1">
          <InfoDialog
            title="Parts Information"
            description="About the Parts card."
          >
            <PartsCardInfo />
          </InfoDialog>
        </div>

        <CardContent className="h-full overflow-hidden">
          <div className=" flex bg-background w-full flex-col gap-2">
            <Label
              htmlFor="search"
              className="flex flex-row justify-between w-full px-1"
            >
              <span className="text-xs">SEARCH</span>
              <p
                className={`text-xs ${search.length > 2 ? "text-background" : "text-black/40"}`}
              >
                {search.length}/3
              </p>
            </Label>
            <Input
              type="text"
              name="search"
              id="search"
              onChange={(e) => setSearch(e.currentTarget.value.toLowerCase())}
            />
          </div>
          <div className="w-full overflow-auto h-[85%] mt-2">
            <Table className="">
              <TableHeader>
                <TableRow className="text-left">
                  <TableHead className="text-left w-32">Part Number</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData ? (
                  filteredData.map((d) => {
                    return (
                      <TableRow key={d.id}>
                        <TableCell className="underline">
                          <Link
                            to={"/parts/$partId/"}
                            params={{
                              partId: `${d.project_id}-${d.sub_system}-${String(d.part_number).padStart(4, "0")}`,
                            }}
                          >
                            {d.project_id}-{d.sub_system}-
                            {String(d.part_number).padStart(4, "0")}
                          </Link>
                        </TableCell>
                        <TableCell>{d.description}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={100}>No parts.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </IndexStyling>
  );
}
