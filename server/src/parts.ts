import { Router } from "express";
import type { Request, Response } from "express";
import env from "dotenv";
import { supabase } from "./supabase/supabaseClient.js";

const router = Router();

router.get("/api/parts/:org_uuid", async (req: Request, res: Response) => {
  // TODO:
  // Validate user has session and is authenticated
  // Check org exists
  // Check user is associated with org
  // Get projects for org

  const { data, error } = await supabase.from("part_numbers").select();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    const filteredParts = data.filter(
      (p) => p.org_uuid === req.params.org_uuid
    );
    res.json({ data: filteredParts });
  }
});

export default router;
