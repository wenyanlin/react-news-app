import { useAuth } from '@org/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
