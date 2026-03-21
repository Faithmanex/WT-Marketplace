import { useState, useCallback, useRef } from 'react';

export function useScrollAnimate() {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, we can stop observing
            observer.disconnect();
            observerRef.current = null;
          }
        },
        { threshold: 0.05 } // Lower threshold for better response
      );
      observer.observe(node);
      observerRef.current = observer;
    }
  }, []);

  return { ref, isVisible };
}
