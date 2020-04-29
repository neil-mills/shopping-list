import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(
    window.localStorage.getItem(key) || initial
  );

  useEffect(() => {
    if(value) window.localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
};
