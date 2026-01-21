import { useQuery } from "@tanstack/react-query";

// Is API server running?
async function isApiServerRunning() {
  const devUrl = "http://localhost:3010";
  const prodUrl = import.meta.env.VITE_RENDER_API_URL as string;

  const response = await fetch(
    import.meta.env.NODE_ENV !== "production" ? devUrl : prodUrl
  );
  return response.ok;
}

export function useIsApiServerRunning() {
  return useQuery({
    queryKey: ["isApiServerRunning"],
    queryFn: isApiServerRunning,
  });
}
