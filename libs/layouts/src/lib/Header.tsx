/**
 * @file Header.tsx
 * @description 全域頂層導覽列組件，負責呈現 Logo 以及使用者的登入/登出狀態控制。
 */

import { useAuth } from '@org/auth';
import { Link } from 'react-router-dom';

/**
 * Header 導覽列組件
 * @description 採用黏性定位 (sticky) 與毛玻璃效果的置頂導覽列，整合全域 AuthContext，
 *              根據當前是否有登入使用者，動態切換顯示「歡迎訊息與登出按鈕」或「登入按鈕」。
 */
export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-4xl w-full mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="font-bold text-xl tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span role="img" aria-label="news logo">
              📰
            </span>{' '}
            NewsApp
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-slate-600">
                歡迎，<strong className="text-slate-900">{user.name}</strong>
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-md transition-all cursor-pointer font-medium"
              >
                登出
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-all"
            >
              登入
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
