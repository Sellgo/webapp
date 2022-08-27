import { useEffect } from 'react';

const useClickOutside = (ref: any, onClickOutside: any) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current?.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
