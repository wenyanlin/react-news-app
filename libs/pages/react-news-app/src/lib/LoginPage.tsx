/**
 * @file LoginPage.tsx
 * @description 登入頁面組件，提供使用者名稱輸入介面，並呼叫全域的登入方法。
 */

import { useAuth } from '@org/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * LoginPage 登入組件
 * @description 提供一個簡約的白卡片表單，使用者輸入任意的名稱即可直接進行登入。
 *              登入成功後，將會自動重導向回首頁（`/`）。
 */
export function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);
    try {
      await login(username);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto my-12 p-6 md:p-8 bg-white border border-slate-100 rounded-2xl shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">歡迎登入</h2>
        <p className="mt-1.5 text-sm text-slate-500">輸入任意的使用者名稱即可登入</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
            使用者名稱
          </label>
          <input
            id="username"
            type="text"
            placeholder="例如：Alice Chen"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all disabled:opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? '登入中...' : '確認登入'}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          <span role="img" aria-label="warning">⚠️</span> {error}
        </div>
      )}
    </div>
  );
}

/**
 * 登入業務操作與頁面元件耦合 (單一職責原則 - SRP):
 *  - 問題：`LoginPage` 頁面直接編寫並維護了登入表單的 DOM 結構、防呆狀態與提交處理。
 *  - 改善：將登入表單內容拆分成一個高複用性的單一職責組件 `<LoginForm onSubmit={handleLogin} />`。`LoginPage` 作為頁面層，僅處理登入後的重導向路由與全域錯誤氣泡提示，提升表單元件在「彈窗登入」等非頁面場景下的複用潛力。
 *
 * 鍵盤輸入導致頁面重繪範圍過大 (邊界渲染原則):
 *  - 問題：目前採用受控變數 `username` 來抓取輸入，使用者在輸入框中每鍵入一個字母，都會觸發 `useState` 狀態變更，進而迫使整個 `LoginPage`（含外部卡片包裝與標題文字）全部重新繪製。
 *  - 改善：將輸入框及其 state 封閉在拆分出來的 `<LoginForm />` 子組件內部，或使用 `useRef` 非受控元件抓取。確保使用者打字時，重繪界線被限縮在最小範圍，維持首頁與全站外框的渲染穩定。
 */
