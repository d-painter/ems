import { Router } from "express";
import type { Request, Response } from "express";
import env from "dotenv";
import { supabase } from "./supabase/supabaseClient.js";

const router = Router();

/**
 * All org parts or all parts for a project
 * If project_id is 0, return all parts for the org
 * If project_id is not 0, return all parts for the project_id
 **/
router.get(
  "/api/parts/:org_uuid/:project_id",
  async (req: Request, res: Response) => {
    // TODO:
    // Validate user has session and is authenticated
    // Check org exists
    // Check user is associated with org
    // Get parts for org

    const partsQuery = supabase
      .from("part_numbers")
      .select()
      .eq("org_uuid", req.params.org_uuid);

    if (req.params.project_id !== "0") {
      partsQuery.eq("project_id", req.params.project_id);
    }
    const { data, error } = await partsQuery;

    if (error) {
      res.status(500).json({ error: error.message });
    }
    res.json({ data });
  }
);

export default router;
