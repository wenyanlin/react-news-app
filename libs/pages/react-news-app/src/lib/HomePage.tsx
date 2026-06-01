/**
 * @file HomePage.tsx
 * @description 應用程式首頁，負責載入新聞分類目錄、驗證當前網址的 categoryId 參數是否合法，並進行預設分類的跳轉重導向。
 */

import { fetchCategories } from '@org/api';
import { ArticleList, CategoryList } from '@org/news';
import { Category } from '@org/types';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

/**
 * HomePage 元件
 * @description 應用程式的主首頁控制器。在首度加載時向 API 取得分類列表，
 *              若網址列無帶入任何 `categoryId` 或帶入的參數不合法，則會自動重導向至第一個有效分類。
 */
export function HomePage() {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCategories();
        if (!cancelled) {
          setCategories(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (!cancelled) setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (
    !categoryId ||
    !categories.find((category) => category.id === categoryId)
  ) {
    return <Navigate to={`/${categories[0].id}`} replace />;
  }
  return <HomePageContent categoryId={categoryId} categories={categories} />;
}

type HomePageContentProps = {
  categoryId: string;
  categories: Category[];
};

/**
 * HomePageContent 元件
 * @description 當分類載入與驗證成功後，負責渲染首頁的主要區塊，
 *              包括頂層的標題描述、CategoryList 分類切換器以及 ArticleList 文章卡片列表。
 * @param {HomePageContentProps} props - 傳入的屬性
 * @param {string} props.categoryId - 目前選中的分類 ID
 * @param {Category[]} props.categories - 所有的分類列表數據
 */
function HomePageContent({ categoryId, categories }: HomePageContentProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          今日焦點新聞
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          為您提供最新、最即時的社會與科技動態資訊。
        </p>
      </div>
      <CategoryList categoryId={categoryId} categories={categories} />
      <ArticleList categoryId={categoryId} />
    </div>
  );
}

/**
 *
 * 獲取分類數據邏輯與頁面渲染混雜 (單一職責原則 - SRP):
 *  - 問題：`HomePage` 自身承擔了「透過異步請求拉取所有新聞分類資料（`fetchCategories`）」的邏輯。
 *  - 改善：將抓取分類的異步加載行為抽離成獨立的 `useCategories()` Hook，使首頁組件專注於路由分發與參數校驗。
 *
 * 異步載入阻塞頁面框架渲染 (邊界渲染原則):
 *  - 問題：在獲取 categories 期間，頁面整頁回傳 `Loading...`。這使得整個頁面的導航架構在加載時全部丟失。
 *  - 改善：使用 React Router 的 `loader` 提早獲取分類，或者在 `HomePage` 外層引入 React.Suspense 邊界。使應用的頁首（Header）及首頁主體結構能瞬間渲染，僅有分類切換器本身進行局部 Suspense 載入。
 */
