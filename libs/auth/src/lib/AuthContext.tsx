import { login as apiLogin } from '@org/api';
import { User } from '@org/types';
import { createContext, ReactNode, useContext, useState } from 'react';

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

  const login = async (username: string) => {
    const loggedInUser = await apiLogin(username);
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 一定要在 AuthProvider 中');
  }
  return context;
}
