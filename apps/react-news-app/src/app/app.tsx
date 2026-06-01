/**
 * @file app.tsx
 * @description 應用程式主要入口組件，負責全域狀態 Provider 的注入以及路由導航配置。
 */

import { AuthProvider } from '@org/auth';
import { Header } from '@org/layouts';
import { ArticlePage, HomePage, LoginPage } from '@org/page-react-news-app';
import '@org/ui/global.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

/**
 * Layout 組件
 * @description 定義全域頁面主佈局，包含置頂的 Header 導覽列以及自適應的最大寬度主內容區域。
 *              利用 React Router 的 Outlet 元件渲染符合當前路由的子頁面。
 */
export function Layout() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col">
      <Header />
      <main className="grow max-w-4xl w-full mx-auto px-4 py-6 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}

/**
 * App 主元件
 * @description 應用的頂層進入點，注入 AuthProvider 以提供全域會員登入狀態，
 *              並設定 React Router 的 BrowserRouter 與各路由分支（如首頁、文章詳情、登入頁）。
 */
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/:categoryId?" element={<HomePage />} />
            <Route path="/news/:articleId" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
