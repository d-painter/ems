import { useProjectParts } from "@/services/queries/partsQueries";
import { Button } from "../ui/button";
import {getNextSubCategory} from "@/services/db/partFunctions";

export default function AddCategoryButton({
  projectId,
}: {
  projectId: string;
}) {
  const { refetch } = useProjectParts(projectId);

  async function addNewCategory() {
    try {
      const { data, error } = await refetch();
      if (error) {
        throw error;
      }
      const res = getNextSubCategory(data);
    } catch (error) {}
  }

  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={async () => await addNewCategory()}
    >
      Add Category
    </Button>
  );
}
