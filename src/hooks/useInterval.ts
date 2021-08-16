import { useEffect, useRef } from 'react';

export function useInterval(callback: any, delay: number, shouldRepoll: boolean) {
  const savedCallback = useRef<any>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null && shouldRepoll) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
