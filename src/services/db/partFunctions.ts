import { AllProjectPartTableRows } from "../queries/partsQueries";

export function getNextSubCategory(
  data: AllProjectPartTableRows[] | null | undefined
): { status: string; message: string } {
  let res = { status: "", message: "" };
  if (!data?.length) {
    res = { status: "error", message: "No Parts." };
  } else {
    const allowedCategories = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const currentCategories = getUniqueCategories(data);
    if (currentCategories.includes("Z")) {
      res = { status: "error", message: "Category limit reached." };
    } else {
      const withoutT = currentCategories.filter((c) => c !== "T");
      const newCat =
        allowedCategories[allowedCategories.indexOf(withoutT.pop()!) + 1];
      res = { status: "success", message: newCat };
    }
  }
  return res;
}

export function getUniqueCategories(data: AllProjectPartTableRows[]) {
  return [...new Set(data.map((d) => d.sub_system))];
}
