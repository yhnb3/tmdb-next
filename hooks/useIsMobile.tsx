import { useState, useLayoutEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    setIsMobile(screen.width <= 500);
  }, []);

  return isMobile;
};
