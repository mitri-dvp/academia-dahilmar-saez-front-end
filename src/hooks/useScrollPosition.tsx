import { useEffect, useState } from "react";

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.pageYOffset);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollY;
};

export default useScrollPosition;
