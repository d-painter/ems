export type PartRow = {
  id: number;
  name: string;
  leadTimeWeeks: number;
};
export type PartRowWithReleaseDate = PartRow & { releaseDate: string };

export const partRows: PartRow[] = [
  { id: 1, name: "P000-A-0001", leadTimeWeeks: 1 },
  { id: 3, name: "P000-A-0003", leadTimeWeeks: 12 },
  { id: 4, name: "P000-A-0005", leadTimeWeeks: 16 },
  { id: 5, name: "P000-A-0007", leadTimeWeeks: 3 },
  { id: 6, name: "P000-A-0009", leadTimeWeeks: 1 },
  { id: 7, name: "P000-A-0011", leadTimeWeeks: 1 },
  { id: 8, name: "P000-A-0013", leadTimeWeeks: 2 },
  { id: 9, name: "P000-A-0015", leadTimeWeeks: 2 },
  { id: 10, name: "P000-A-0017", leadTimeWeeks: 1 },
  { id: 13, name: "P000-A-0023", leadTimeWeeks: 1 },
  { id: 14, name: "P000-A-0025", leadTimeWeeks: 4 },
  { id: 15, name: "P000-A-0027", leadTimeWeeks: 4 },
  { id: 16, name: "P000-A-0029", leadTimeWeeks: 2 },
  { id: 17, name: "P000-A-0019", leadTimeWeeks: 2 },
  { id: 18, name: "P000-A-0021", leadTimeWeeks: 3 },
  { id: 19, name: "P000-A-0023", leadTimeWeeks: 2 },
  { id: 20, name: "P000-A-0025", leadTimeWeeks: 3 },
  { id: 21, name: "P000-A-0027", leadTimeWeeks: 2 },
  { id: 22, name: "P000-A-0029", leadTimeWeeks: 3 },
  { id: 23, name: "P000-A-0031", leadTimeWeeks: 1 },
  { id: 24, name: "P000-A-0023", leadTimeWeeks: 1 },
  { id: 25, name: "P000-A-0033", leadTimeWeeks: 1 },
  { id: 26, name: "P000-A-0035", leadTimeWeeks: 1 },
  { id: 27, name: "P000-A-0037", leadTimeWeeks: 1 },
  { id: 28, name: "P000-A-0039", leadTimeWeeks: 1 },
  { id: 29, name: "P000-A-0041", leadTimeWeeks: 1 },
  { id: 30, name: "P000-A-0043", leadTimeWeeks: 1 },
  { id: 31, name: "P000-A-0045", leadTimeWeeks: 1 },
  { id: 32, name: "P000-A-0047", leadTimeWeeks: 1 },
  { id: 33, name: "P000-A-0049", leadTimeWeeks: 1 },
  { id: 34, name: "P000-A-0051", leadTimeWeeks: 1 },
];

export const releases = [
  {title:"General Fastener Release", reqReleaseDate:"01/07/2025", status:"WIP"},
  {title:"Custom Bolt", reqReleaseDate:"01/06/2025", status:"In Progress"},
  {title:"Custom Bolt", reqReleaseDate:"01/04/2025", status:"Released"}

]
