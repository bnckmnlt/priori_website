import { useState, useEffect } from "react";

export default function useMobileSize() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsLoaded(true);
    });
  }, []);

  return { isMobile, isLoaded };
}
