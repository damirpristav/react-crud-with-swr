/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: any, { delay = 500, callback }: DebounceOptions) => {
  const [debouncedValue, setDebouncedValue] = useState<any>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setDebouncedValue(value);
      callback?.();
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return { debouncedValue };
};

type DebounceOptions = {
  delay?: number;
  callback?: () => void;
};
