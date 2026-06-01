import { AuthProvider } from '@org/auth';
import { Header } from '@org/layouts';
import { ArticlePage, HomePage, LoginPage } from '@org/page-react-news-app';
import '@org/ui/global.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

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
