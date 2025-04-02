import AddCategoryButton from "@/components/projects/AddCategoryButton";
import PartsTable from "@/components/projects/PartsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUniqueCategories } from "@/services/db/partFunctions";
import {
  AllProjectPartTableRows,
  useProjectParts,
} from "@/services/queries/partsQueries";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(app)/projects/$projectId/parts/$category")({
  component: RouteComponent,
});

// Returns true if a number starts with 9 and one of the following digits is not 0.
const re = /^9(?!0*$)\d+$/;

function RouteComponent() {
  const { projectId } = Route.useParams();
  const { data, error } = useProjectParts(projectId);
  const [subSystem, setSubSystem] = useState("A");

  if (error) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-full">
        Error
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-full">
        <Loader2 className="animate-spin stroke-primary" />
      </div>
    );
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

  const uniqueCategories = getUniqueCategories(data);
  const showAddCategoryButton = !uniqueCategories.includes("Z");

  return (
    <div className="w-full h-full p-2 md:p-6">
      <div className="flex flex-row items-center gap-2">
        <Select onValueChange={(e) => setSubSystem(e.split(" - ")[0])}>
          <SelectTrigger className="text-xs md:text-md text-foreground w-64 [&_span]:text-foreground">
            <SelectValue
              placeholder={subSystems[0]}
              className="text-xs md:text-md w-64"
            />
          </SelectTrigger>
          <SelectContent>
            {subSystems.map((c) => (
              <SelectItem
                key={c}
                value={c}
                className="!truncate text-xs md:text-md"
              >
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showAddCategoryButton && <AddCategoryButton projectId={projectId} />}
      </div>
      <PartsTable main={main} assemblies={assemblies} parts={parts} />
    </div>
  );
}
