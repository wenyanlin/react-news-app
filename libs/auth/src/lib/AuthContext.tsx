/**
 * @file AuthContext.tsx
 * @description 全域會員驗證狀態上下文（Context）與對應 Hook，管理登入狀態的共享。
 */

import { login as apiLogin } from '@org/api';
import { User } from '@org/types';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type AuthContextType = {
  /** 當前登入的使用者資訊，未登入時為 null */
  user: User | null;
  /** 執行登入的異步方法 */
  login: (username: string) => Promise<void>;
  /** 執行登出的同步方法 */
  logout: () => void;
};

/**
 * AuthContext
 * @description React Context 實例，內部儲存 AuthContextType。
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * AuthProvider 元件
 * @description 驗證狀態 Provider 封裝，持有 `user` 狀態。
 *              使用 useCallback 優化 `login` 與 `logout` 以避免子元件不必要的重繪，
 *              並利用 useMemo 緩存 context 的傳遞值。
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // 優化：使用 useCallback 避免每次渲染都產生新的參考
  const login = useCallback(async (username: string) => {
    const loggedInUser = await apiLogin(username);
    setUser(loggedInUser);
  }, []);

  // 優化：使用 useCallback 避免每次渲染都產生新的參考
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // 優化：使用 useMemo 緩存 Context 的 value
  // 只有當 user, login, logout 改變時，才會產生新的 value 物件
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth 存取 Hook
 * @description 提供子元件方便存取全域 AuthContext 的自訂 Hook。
 *              包含防呆機制，若呼叫處未被包裹在 AuthProvider 中，將會拋出運行時錯誤。
 * @returns {AuthContextType} 全域驗證狀態與對應操作方法
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 一定要在 AuthProvider 中');
  }
  return context;
}

/**
 * useLocalStorage Hook
 * @description 自訂 Hook 用於同步 React 狀態與 localStorage，確保登入狀態在頁面刷新後仍能保持。
 *              內部使用 useEffect 監聽狀態變化並更新 localStorage，初始值則從 localStorage 中讀取。
 */

/**
 * Context 渲染邊界過大
 * - 問題：當 `user` 狀態發生改變時，所有訂閱 `useAuth` 的組件均會被強迫重繪，即使該組件僅使用了穩定的 `login` 或 `logout` 函數。
 * - 改善：拆分 Context 為 `UserContext`（僅儲存 user 狀態值）與 `UserActionsContext`（僅儲存 login 與 logout 靜態參考）。僅需要觸發動作的組件訂閱 ActionsContext，當 user 資訊變更時，該組件的渲染邊界將不被觸發，實現精準重繪。
 */
