import { useEffect, useRef, useState } from 'react';
import { UseDataResult } from './types';

/**
 * 資料獲取 Hook (V3)
 * @description 接收一個非同步資料獲取函式 `fetchFn` 與其所需的單一參數 `arg`。
 *              當 `fetchFn` 或 `arg` 變更時，會自動重新執行載入。
 * @template TData 取得之資料的型別
 * @template TArg 傳入 fetchFn 的參數型別
 * @param {(arg: TArg) => Promise<TData>} fetchFn 獲取資料的非同步函式
 * @param {TArg} arg 傳入 fetchFn 的參數，當參數改變時會觸發重新載入
 * @returns {UseDataResult<TData>} 包含資料狀態、載入狀態、錯誤及更新狀態函式的物件
 */
export function useDataV3<TData, TArg>(
  fetchFn: (arg: TArg) => Promise<TData>,
  arg: TArg,
): UseDataResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestIdRef = useRef(0);

  useEffect(() => {
    const execute = async () => {
      const requestId = ++requestIdRef.current;
      try {
        setError(null);
        setIsLoading(true);

        const result = await fetchFn(arg);
        if (requestId === requestIdRef.current) {
          setData(result);
        }
      } catch (err) {
        if (requestId === requestIdRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    };
    execute();
  }, [fetchFn, arg]);

  return { data, isLoading, error, setData };
}

/**
 * 使用範例：在 ArticleList 組件中，當 categoryId 變更時，才會觸發 fetchArticlesByCategoryId 的呼叫，避免不必要的重複請求。
 */
// const {
//   data: articleList,
//   isLoading,
//   error,
// } = useDataV3<Article[], string>(
//   fetchArticlesByCategoryId,
//   categoryId,
// );
