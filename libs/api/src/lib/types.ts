/**
 * useData 自訂 Hook 的回傳結果型別
 * @template T 取得之資料的型別
 */
export type UseDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
};
