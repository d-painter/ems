import AddCategoryDialog from "@/components/projects/AddCategoryDialog";
import PartsTable from "@/components/projects/PartsTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
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
    return <LoadingSpinner />;
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
      to: "/projects/$projectId/parts/$category/",
      params: { projectId: projectId, category: newCategory },
    });
  }

  if (!uniqueCategories.includes(category.toUpperCase())) {
    toast.error(`Category "${category}" does not exist.`);
    return (
      <Navigate
        to="/projects/$projectId/parts/$category/"
        params={{ projectId: projectId, category: "A" }}
        replace={true}
      />
    );
  }

  const showAddCategoryButton = !uniqueCategories.includes("Z");

  const selectPlaceHolder = () => {
    const value = subSystems.filter((s) => s.split(" - ")[0] === category);
    const index = subSystems.indexOf(value[0]);
    return subSystems[index];
  };

  function sortedByPartNumber(a: AllProjectPartTableRows[]) {
    return a.sort((a, b) => a.part_number - b.part_number);
  }

  return (
    <div className="w-full flex flex-col items-center h-full">
      <div className="w-full h-full max-w-3xl pb-10 sm:pb-20">
        <div className="flex flex-row items-center gap-2 mb-4 mt-1 relative top-0">
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
        <div className="h-full overflow-auto">
          <PartsTable
            main={main}
            assemblies={sortedByPartNumber(assemblies)}
            parts={sortedByPartNumber(parts)}
          />
        </div>
      </div>
    </div>
  );
}
