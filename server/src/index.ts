import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import projects from "./projects.js";
import parts from "./parts.js";
import engRels from "./engRels.js";

const app = express();
app.use(cors());
const PORT = 3010;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Routes
app.use(projects);
app.use(parts);
app.use(engRels);

app.set("json spaces", 2);
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "live" });
});
