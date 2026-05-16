import { useEffect, useRef } from "react";

/**
 * Custom hook that adds scroll-triggered reveal animations.
 * Attaches IntersectionObserver to all elements matching the given selectors.
 */
export function useScrollReveal(selectors = [".reveal", ".reveal-left", ".reveal-right", ".reveal-scale"]) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const allSelectors = selectors.join(", ");
    const elements = document.querySelectorAll(allSelectors);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
}

export default useScrollReveal;
