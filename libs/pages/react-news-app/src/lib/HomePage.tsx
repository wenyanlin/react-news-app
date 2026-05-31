import { fetchCategories } from '@org/api';
import { ArticleList, CategoryList } from '@org/news';
import { Category } from '@org/types';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

/**
 * 首頁
 * 主要驗證路由參數 categoryId 是否存在，為此先取得 categories 並往下傳
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
 * 主要將資料往下傳遞
 */
function HomePageContent({ categoryId, categories }: HomePageContentProps) {
  return (
    <div>
      <h1>Home Page</h1>
      <CategoryList categoryId={categoryId} categories={categories} />
      <ArticleList categoryId={categoryId} />
    </div>
  );
}
