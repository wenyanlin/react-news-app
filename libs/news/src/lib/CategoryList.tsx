import { Category } from '@org/types';
import { NavLink } from 'react-router-dom';

type CategoryListProps = {
  categoryId: string;
  categories: Category[];
};

/**
 * 顯示分類列表
 */
export function CategoryList({ categoryId, categories }: CategoryListProps) {
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
