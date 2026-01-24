import { Router } from "express";
import type { Request, Response } from "express";
import { supabase } from "./supabase/supabaseClient.js";

const router = Router();

router.get("/api/projects/:org_uuid", async (req: Request, res: Response) => {
  // TODO:
  // Validate user has session and is authenticated
  // Check org exists
  // Check user is associated with org
  // Get projects for org
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("org_uuid", req.params.org_uuid);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ data });
  }
});

export default router;
