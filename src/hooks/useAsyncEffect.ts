import { useEffect } from 'react';

export function useAsyncEffect(
  effect: (isCanceled: () => boolean) => Promise<void>,
  dependencies?: any[]
) {
  return useEffect(() => {
    let canceled = false;
    effect(() => canceled);
    return () => {
      canceled = true;
    };
  }, dependencies);
}
