import { AllProjectPartTableRows } from "../queries/partsQueries";

export function getNextSubCategory(
  data: AllProjectPartTableRows[] | null | undefined
) {
  if (!data?.length) {
    console.log("no parts");
  } else {
    const currentCategories = getUniqueCategories(data);
    console.log("data: ", data);
    if (currentCategories.includes("Z")) {
      return { status: "error", message: "Category limit reached." };
    }
    console.log("categories:", currentCategories);

    const tIndex = currentCategories.indexOf("T");
    console.log("tindex: ", tIndex);

    const pre = currentCategories.slice(0, tIndex);
    const post = currentCategories.slice(tIndex, currentCategories.length - 1);

    console.log("pre: ", pre);
    console.log("post: ", post);
  }
}

export function getUniqueCategories(data: AllProjectPartTableRows[]) {
  return [...new Set(data.map((d) => d.sub_system))];
}
