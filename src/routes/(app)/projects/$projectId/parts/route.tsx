import PartsTable from "@/components/projects/PartsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AllProjectPartTableRows,
  useProjectParts,
} from "@/services/queries/partsQueries";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)/projects/$projectId/parts")({
  component: RouteComponent,
});

// Returns true if a number starts with 9 and one of the following digits is not 0.
const re = /^9(?!0*$)\d+$/;

function RouteComponent() {
  const { projectId } = Route.useParams();
  const { data, error, isPending } = useProjectParts(projectId);
  const [subSystem, setSubSystem] = useState("A");
  if (!data) {
    return <p>loading</p>;
  }

  let main = {} as AllProjectPartTableRows;
  const assemblies: AllProjectPartTableRows[] | null = [];
  const parts: AllProjectPartTableRows[] | null = [];
  const subSystems: string[] = [];

  data.map((d) => {
    if (d.part_number === 9000) {
      subSystems.push(`${d.sub_system} - ${d.description}`);
    }
    if (d.sub_system === subSystem) {
      if (d.part_number === 9000) {
        main = d;
      } else if (re.test(String(d.part_number))) {
        assemblies.push(d);
      } else {
        parts.push(d);
      }
    }
  });

  return (
    <div className="w-full h-full p-2 md:p-6">
      <div className="flex flex-row items-center gap-2">
        <Select onValueChange={(e) => setSubSystem(e.split(" - ")[0])}>
          <SelectTrigger className="bg-background !text-foreground w-64">
            <SelectValue placeholder={subSystems[0]} />
          </SelectTrigger>
          <SelectContent>
            {subSystems.map((c) => (
              <SelectItem key={c} value={c} className="!truncate">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* table */}
      <PartsTable
        main={main}
        assemblies={assemblies}
        parts={parts}
        isPending={isPending}
      />

      <>{error && <p>{error.message}</p>}</>
    </div>
  );
}
