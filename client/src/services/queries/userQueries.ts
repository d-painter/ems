import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";

// Get user org uuid
async function getUserOrgUuid(
  userId: string
): Promise<Tables<"org_associations">["org_uuid"] | null> {
  const { data, error } = await supabase
    .from("org_associations")
    .select("org_uuid")
    .eq("user_uuid", userId)
    .single();
  if (error) {
    throw error;
  }
  return data?.org_uuid as Tables<"org_associations">["org_uuid"] | null;
}

// TODO: update to only run once on login
export function useGetUserOrgUuid(userId: string) {
  return useQuery({
    queryKey: ["userOrgUuid", userId],
    queryFn: () => getUserOrgUuid(userId),
    staleTime: Infinity,
  });
}
