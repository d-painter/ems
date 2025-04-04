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

type GetNextPartNumberParams = {
  data: AllProjectPartTableRows[];
  partType: string;
  subSystem: string;
};
export function getNextPartNumber({
  data,
  partType,
  subSystem,
}: GetNextPartNumberParams) {
  const filteredPartNumbers = data
    .filter((d) => d.sub_system === subSystem)
    .map((d) => d.part_number);

  // Filter for assembly or part type
  let filteredTypeNumbers: number[] = [];
  if (partType === "assembly") {
    filteredTypeNumbers = filteredPartNumbers
      .filter((n) => n > 8999 && n % 2 !== 0)
      .sort();
    if (!filteredTypeNumbers?.length) {
      return 9001;
    }
  } else {
    filteredTypeNumbers = filteredPartNumbers
      .filter((n) => n < 9000 && n % 2 !== 0)
      .sort();
    if (!filteredTypeNumbers?.length) {
      return 1;
    }
  }
  if (!filteredTypeNumbers?.length) {
    throw new Error("no filtered numbers");
  }
  const newNum = filteredTypeNumbers.pop()! + 2;
  return newNum;
}
