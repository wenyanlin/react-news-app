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
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((category) => (
        <NavLink
          to={`/${category.id}`}
          key={category.id}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              isActive
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-100 hover:border-slate-200'
            }`
          }
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
}
