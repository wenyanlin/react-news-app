import { useCallback, useEffect, useRef, useState } from 'react';

type UseDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
};

export function useData<T>(fetchFn: () => Promise<T>): UseDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestIdRef = useRef(0);

  const execute = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    try {
      setError(null);
      setIsLoading(true);

      const result = await fetchFn();
      if (requestId === requestIdRef.current) {
        setData(result);
      }
    } catch (error) {
      if (requestId === requestIdRef.current) {
        setError(error as Error);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [fetchFn]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, isLoading, error, setData };
}
