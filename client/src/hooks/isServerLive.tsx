import { useEffect, useState } from "react";

export function useIsServerLive() {
  const [isServerLive, setIsServerLive] = useState(false);

  useEffect(() => {
    async function checkServer() {
      const response = await fetch(`${import.meta.env.VITE_RENDER_API_URL}`);
      if (response.ok) {
        setIsServerLive(true);
      } else {
        setIsServerLive(false);
      }
    }
    checkServer().catch(() => setIsServerLive(false));
  }, []);
  return isServerLive;
}
