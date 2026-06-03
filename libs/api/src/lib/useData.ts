import { useCallback, useEffect, useRef, useState } from 'react';
import { UseDataResult } from './types';

/**
 * 簡易的資料獲取 Hook (V1)
 * @description 當 fetchFn 參照改變時，會自動觸發重新載入。
 *              注意：若 caller 傳入行內匿名函式，可能會引發無限渲染請求迴圈，使用時須特別注意 fetchFn 的穩定性。
 * @template T 資料的型別
 * @param {() => Promise<T>} fetchFn 獲取資料的非同步函式
 * @returns {UseDataResult<T>} 包含資料狀態、載入狀態、錯誤及更新狀態函式的物件
 */
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
