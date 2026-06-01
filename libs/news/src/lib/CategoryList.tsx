/**
 * @file CategoryList.tsx
 * @description 新聞分類目錄列表組件，提供水平滾動的標籤導覽，讓使用者能快速切換不同的新聞分類。
 */

import { Category } from '@org/types';
import { NavLink } from 'react-router-dom';

type CategoryListProps = {
  /** 當前所選中的分類 ID */
  categoryId: string;
  /** 所有可用的新聞分類陣列 */
  categories: Category[];
};

/**
 * CategoryList 分類選單組件
 * @description 渲染水平排列的膠囊型按鈕群組。點擊任一標籤會更新 URL 的 categoryId 路由，
 *              並透過 React Router 的 NavLink 動態切換啟用狀態（Active States）的高亮樣式。
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

/**
 * 路由路徑與選單元件強耦合 (複用性高原則):
 *  - 問題：`CategoryList` 內部直接寫死了連結生成規則 `to={"/" + category.id}`。這導致當這個列表組件需要被應用在其他子路由（如 `/news/category/...`）或非 React Router 的普通 Tab 切換場景時，元件將完全無法重用。
 *  - 改善：重構元件使之成為一個通用的 Tab 導覽列。將 `NavLink` 替換成普通的 `<button>` 或動態 `component`，並透過 props 傳入 `onSelect` 回呼或 `getPath` 函數生成路徑，實現 UI 與特定路由框架的完全解耦。
 */
