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
      console.log(res);
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={void (async () => await addNewCategory())}
    >
      Add Category
    </Button>
  );
}
