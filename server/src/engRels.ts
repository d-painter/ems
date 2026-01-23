import { Router } from "express";
import type { Request, Response } from "express";
import env from "dotenv";
import { supabase } from "./supabase/supabaseClient.js";

const router = Router();

router.get(
  "/api/eng-rels/:org_uuid/:project_id",
  async (req: Request, res: Response) => {
    // TODO:
    // Validate user has session and is authenticated
    // Check org exists
    // Check user is associated with org
    // Get engrels for org

    const { data, error } = await supabase
      .from("eng_rels")
      .select()
      .eq("org_uuid", req.params.org_uuid)
      .eq("project_id", req.params.project_id);

    if (error) {
      res.status(500).json({ error: error.message });
    }
    res.json({ data });
  }
);

export default router;
