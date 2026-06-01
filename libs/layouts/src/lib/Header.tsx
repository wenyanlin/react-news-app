import { useAuth } from '@org/auth';
import { Link } from 'react-router-dom';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-4xl w-full mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <Link to="/" className="font-bold text-xl tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors">
            <span role="img" aria-label="news logo">📰</span> NewsApp
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
