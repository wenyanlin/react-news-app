/**
 * @file ArticleList.tsx
 * @description 新聞文章列表組件，依據當前選擇 the categoryId 從 API 載入文章數據，並渲染成美觀的新聞卡片。
 */

import { fetchArticlesByCategoryId } from '@org/api';
import { Article } from '@org/types';
import { formatDate } from '@org/utils';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ArticleListProps = {
  /** 欲載入文章的分類 ID */
  categoryId: string;
};

/**
 * ArticleList 新聞清單組件
 * @description 提供骨架屏加載狀態、空狀態處理及錯誤捕獲。
 *              成功加載後，渲染一系列的響應式連結卡片，點擊可透過 SPA 路由進入詳細閱讀頁面。
 */
export function ArticleList({ categoryId }: ArticleListProps) {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchArticlesByCategoryId(categoryId);
        if (!cancelled) {
          setArticleList(data);
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
    loadArticles();
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse flex space-x-2 items-center">
          <span className="text-slate-400 font-medium">讀取新聞中...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
        發生錯誤：{error}
      </div>
    );
  }

  if (articleList.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-slate-100 rounded-2xl">
        <p className="text-slate-400 font-medium">目前該分類沒有新聞唷！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articleList.map((article) => (
        <Link
          to={`/news/${article.id}`}
          key={article.id}
          className="group flex flex-col md:flex-row gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-sm transition-all duration-200"
        >
          <div className="w-full md:w-48 h-32 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-between py-1 flex-grow">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {article.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400 font-medium">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 text-slate-500">
                <span role="img" aria-label="comments">💬</span> {article.commentCount} 則評論
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/**
 * 改善建議
 *
 * 1. [✓] 骨架屏載入狀態視覺回饋:
 *    - 實現：利用了 Tailwind `animate-pulse` 動畫，在加載新聞期間替代死板的 Loading 文字，優化了介面預期感。
 *
 * 2. 渲染邊界與組件拆分 (邊界渲染原則):
 *    - 問題：`ArticleList` 直接在 `map` 環圈中渲染了非常繁雜的文章卡片 DOM 結構。只要 `ArticleList` 狀態或父級更新，整張列表內的所有卡片都會被迫重建。
 *    - 改善：將卡片 DOM 抽離為一個獨立的、具備單一職責的 `<ArticleCard article={article} />` 組件，並可考慮使用 `React.memo` 進行封裝，從而為每篇新聞建立獨立的渲染邊界，防止無效渲染。
 *
 * 3. 數據拉取與列表呈現高度耦合 (職責單一原則 - SRP):
 *    - 問題：`ArticleList` 同時兼顧了「發送 API 拉取對應 categoryId 的文章數據」與「新聞列表 UI 呈現」雙重職責，不利於清單在其他非 API 情境下的複用。
 *    - 改善：將抓取資料邏輯抽離成自訂 Hook `useCategoryArticles(categoryId)`，`ArticleList` 組件只透過 props 接收 `articles` 陣列，使其退化成一個複用性極高的純展示列表組件。
 *
 * 4. 缺乏大數據分頁支撐 (複用性高原則):
 *    - 問題：目前的 API 會一次性加載該分類下的所有文章，無法支援真實大流量新聞網站的滾動加載需求。
 *    - 改善：重構列表容器以支持分頁（Pagination）或利用 `IntersectionObserver` 實作無限滾動加載（Infinite Scroll），甚至引進 Virtual List（虛擬列表）技術只渲染可視區域的 DOM，大幅度提高海量數據下的列表執行效能。
 */
