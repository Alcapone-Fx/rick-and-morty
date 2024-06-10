import { useEffect } from 'react';

export const useScrollToTop = <T,>(state: T) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }, [state]);
};
