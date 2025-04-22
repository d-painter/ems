export type Supplier = {
  id: number;
  name: string;
  type: "fastener" | "machinist" | "composite" | "consultancy" | "other";
  location: string | null;
  rating: number;
  tags: string[];
};

export const supplierData: Supplier[] = [
  {
    id: 1,
    name: "Solent Repair",
    type: "other",
    location: "https://maps.app.goo.gl/LpNcXMqqo65P4qmz8",
    rating: 4.9,
    tags: [],
  },
  {
    id: 2,
    name: "Orbital Fasteners",
    type: "fastener",
    location: "",
    rating: 4.7,
    tags: [],
  },
  {
    id: 3,
    name: "Laranca",
    type: "machinist",
    location: "https://maps.app.goo.gl/8CdSZYcUMKmrjhMG8",
    rating: 4.8,
    tags: ["Shafts", "Tools"],
  },
  {
    id: 4,
    name: "Langstone Engineering",
    type: "machinist",
    location: "",
    rating: 4.2,
    tags: [],
  },
  {
    id: 5,
    name: "Super Composites",
    type: "composite",
    location: "",
    rating: 3.1,
    tags: [],
  },
  {
    id: 6,
    name: "Mega Composites",
    type: "composite",
    location: "",
    rating: 4.9,
    tags: [],
  },
  {
    id: 7,
    name: "Big Company",
    type: "consultancy",
    location: "",
    rating: 2.2,
    tags: [],
  },
  {
    id: 8,
    name: "Small Company",
    type: "consultancy",
    location: "",
    rating: 4.2,
    tags: [],
  },
];
