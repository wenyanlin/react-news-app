import { Header } from '@org/layouts';
import { ArticlePage, HomePage, LoginPage } from '@org/page-react-news-app';
import { User } from '@org/types';
import '@org/ui/global.css';
import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

export function Layout({ user }: { user: User | null }) {
  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
}

export function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route path="/:categoryId?" element={<HomePage />} />
          <Route path="/news/:articleId" element={<ArticlePage user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
