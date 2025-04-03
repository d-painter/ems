import AddCategoryDialog from "@/components/projects/AddCategoryDialog";
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
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/(app)/projects/$projectId/parts/$category"
)({
  component: RouteComponent,
});

// Returns true if a number starts with 9 and one of the following digits is not 0.
const re = /^9(?!0*$)\d+$/;

function RouteComponent() {
  const { projectId, category } = Route.useParams();
  const { data, error } = useProjectParts(projectId);
  const navigate = useNavigate();
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
  const uniqueCategories = getUniqueCategories(data);

  let main = {} as AllProjectPartTableRows;
  const assemblies: AllProjectPartTableRows[] | null = [];
  const parts: AllProjectPartTableRows[] | null = [];
  const subSystems: string[] = [];

  data.map((d) => {
    if (d.part_number === 9000) {
      subSystems.push(`${d.sub_system} - ${d.description}`);
    }
    if (d.sub_system === category) {
      if (d.part_number === 9000) {
        main = d;
      } else if (re.test(String(d.part_number))) {
        assemblies.push(d);
      } else {
        parts.push(d);
      }
    }
  });

  async function handleCategoryChange(e: string) {
    const newCategory = e.split(" - ")[0];
    await navigate({
      to: "/projects/$projectId/parts/$category",
      params: { projectId: projectId, category: newCategory },
    });
  }

  if (!uniqueCategories.includes(category.toUpperCase())) {
    toast.error(`Category "${category}" does not exist.`);
    return (
      <Navigate
        to="/projects/$projectId/parts/$category"
        params={{ projectId: projectId, category: "A" }}
      />
    );
  }

  const showAddCategoryButton = !uniqueCategories.includes("Z");

  const selectPlaceHolder = () => {
    const value = subSystems.filter((s) => s.split(" - ")[0] === category);
    const index = subSystems.indexOf(value[0]);
    return subSystems[index];
  };

  return (
    <div className="w-full h-full p-2 md:p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="flex flex-row items-center gap-2">
          <Select onValueChange={(e) => void handleCategoryChange(e)}>
            <SelectTrigger className="text-xs md:text-md text-foreground w-64 [&_span]:text-foreground">
              <SelectValue
                placeholder={selectPlaceHolder()}
                className="text-xs md:text-md w-64"
              />
            </SelectTrigger>
            <SelectContent>
              {subSystems.sort().map((c) => (
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
          {showAddCategoryButton && <AddCategoryDialog projectId={projectId} />}
        </div>
        <PartsTable main={main} assemblies={assemblies} parts={parts} />
      </div>
    </div>
  );
}
