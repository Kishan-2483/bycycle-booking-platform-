import { useState, useEffect, useRef } from "react";

/**
 * Animated counter hook — counts up from 0 to `end` when the element is visible.
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in ms
 * @param {string} suffix - Optional suffix like "+" or "K+"
 */
export function useCountUp(end, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [hasStarted, end, duration]);

  return { count, ref, display: `${count}${suffix}` };
}

export default useCountUp;
