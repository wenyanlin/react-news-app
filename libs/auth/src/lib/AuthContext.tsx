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
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 一定要在 AuthProvider 中');
  }
  return context;
}
