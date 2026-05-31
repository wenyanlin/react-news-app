import { ArticlePage, HomePage, LoginPage } from '@org/page-react-news-app';
import '@org/ui/global.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

export function Layout() {
  return <Outlet />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/:categoryId?" element={<HomePage />} />
          <Route path="/news/:articleId" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
