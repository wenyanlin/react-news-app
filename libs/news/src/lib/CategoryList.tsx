import { fetchCategories } from '@org/api';
import { Category } from '@org/types';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * 此元件不需要參數
 */
// type CategoryListProps = {};

/**
 * 顯示分類列表
 */
export function CategoryList() {
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
  return (
    <div className="flex">
      {categories.map((category) => (
        <NavLink
          to={`/${category.id}`}
          key={category.id}
          className={({ isActive }) => (isActive ? 'text-green-600' : '')}
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
}
