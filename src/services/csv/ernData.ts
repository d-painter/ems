export function getReleaseParts(data: Array<string[]>): ParsedCsvPartParams[] {
  const filters = ["Constraints", "PIA"];
  if (!data?.length) {
    return [];
  }

  const indexesToRemove = new Set([1, 2]);
  const expectedPartArrayLength = data[0].length;
  let parts = data.map((d) => {
    const trimmed = d.map((el) => {
      return el.trim();
    });

    return trimmed;
  });

  parts = parts.filter(
    (p, i) =>
      p.length === expectedPartArrayLength &&
      !filters.some((el) => p.includes(el)) &&
      !indexesToRemove.has(i)
  );
  const headers = parts.shift();
  const arrToObject = parts.map((part) => {
    const obj: { [key: string]: string } = {};
    part.forEach((el, i) => {
      obj[headers![i]] = el;
    });
    return obj;
  });

  //   x — matches " x" literally
  //   \s — matches the space between "x" and the number
  //   (\d+) — captures one or more digits
  //   $ — ensures it's at the end of the string
  const REGEX = / x\s(\d+)$/;

  const keyWithQuantity = () => {
    for (const [key, entry] of Object.entries(arrToObject[0])) {
      const match = entry.match(REGEX);
      if (match) {
        return key;
      }
    }
    return "";
  };
  const key = keyWithQuantity();
  if (!key) {
    return [];
  }

  return arrToObject.map((p) => {
    const match = p[key].match(REGEX);
    const [partNumber, description] = p[key].split(" - ");
    const remove = [
      "Descriptive Part Name",
      "Read-only",
      "Reference Set",
      "Modified",
      "Weight (g)",
      "Weight (kg)",
    ];

    if (!match) {
      remove.forEach((e) => delete p[e]);
      return { partNumber, description, qty: 1, ...p } as ParsedCsvPartParams;
    }
    const qty = match[1];
    remove.forEach((e) => delete p[e]);
    return {
      partNumber,
      description: description.replace(REGEX, ""),
      qty: Number(qty),
      ...p,
    } as ParsedCsvPartParams;
  });
}

export type ParsedCsvPartParams = {
  partNumber: string;
  description: string;
  qty: number;
  LeadTimeWeeks: string;
  Supplier: string;
  BomItemType: string;
};
