import { Router } from "express";
import type { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import env from "dotenv";

env.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const router = Router();

router.get("/api/projects/:org_uuid", async (req: Request, res: Response) => {
  // TODO:
  // Validate user has session and is authenticated
  // Check org exists
  // Check user is associated with org
  // Get projects for org

  const { data, error } = await supabase.from("projects").select();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    const filteredData = data.filter(
      (project) => project.org_uuid === req.params.org_uuid
    );
    res.json({ data:filteredData });
  }
});

export default router;
