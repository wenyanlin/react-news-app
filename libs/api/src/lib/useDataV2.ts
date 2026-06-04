import { DependencyList, useEffect, useRef, useState } from 'react';
import { UseDataResult } from './types';

/**
 * 資料獲取 Hook (V2)
 * @description 利用 useRef 隨時儲存最新的 fetchFn，防範過期閉包；
 * @template TData 取得之資料的型別
 * @param {() => Promise<TData>} fetchFn 獲取資料的非同步函式
 * @param {DependencyList} [args] 依賴參數陣列，當其內部元素有更新時才會觸發 fetch
 * @returns {UseDataResult<TData>} 包含資料狀態、載入狀態、錯誤及更新狀態函式的物件
 */
export function useDataV2<TData>(
  fetchFn: () => Promise<TData>,
  args: DependencyList = [],
): UseDataResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestIdRef = useRef(0);
  const fetchFnRef = useRef(fetchFn);

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    const execute = async () => {
      const requestId = ++requestIdRef.current;
      try {
        setError(null);
        setIsLoading(true);

        const result = await fetchFnRef.current();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);

  return { data, isLoading, error, setData };
}

/**
 * 使用範例：在 ArticleList 組件中，當 categoryId 變更時，才會觸發 fetchArticlesByCategoryId 的呼叫，避免不必要的重複請求。
 */
// const {
//   data: articleList,
//   isLoading,
//   error,
// } = useDataV2<Article[]>(() => fetchArticlesByCategoryId(categoryId), [categoryId]);
