/**
 * @file ArticlePage.tsx
 * @description 新聞文章詳情頁面，負責驗證 URL 參數 articleId，獲取文章詳細內容，並加載相關評論板塊。
 */

import { fetchArticle } from '@org/api';
import { CommentSection } from '@org/comments';
import { ArticleDetail } from '@org/news';
import { Article } from '@org/types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

/**
 * ArticlePage 元件
 * @description 當前網址參數 articleId 發生變化時，自動發送請求取得該文章詳情資訊。
 *              元件提供載入中、錯誤捕獲機制，並在成功後轉交給 ArticlePageContent 做實際渲染。
 */
export function ArticlePage() {
  const { articleId } = useParams();
  const [articleDetail, setArticleDetail] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) return;
    let cancelled = false;
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchArticle(articleId);
        if (!cancelled) {
          setArticleDetail(data);
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
  }, [articleId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return articleDetail && <ArticlePageContent articleDetail={articleDetail} />;
}

type ArticlePageContent = {
  articleDetail: Article;
};

/**
 * ArticlePageContent 元件
 * @description 當文章詳情載入成功後，負責渲染詳情頁面的內容佈局。
 *              包括返回首頁的 Link 導覽、文章的主體細節（ArticleDetail）以及該篇文章的讀者評論區（CommentSection）。
 * @param {ArticlePageContent} props - 傳入的屬性
 * @param {Article} props.articleDetail - 文章詳情數據物件
 */
function ArticlePageContent({ articleDetail }: ArticlePageContent) {
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← 返回首頁
        </Link>
      </div>
      <ArticleDetail articleDetail={articleDetail} />
      <hr className="border-slate-200" />
      <CommentSection articleId={articleDetail.id} />
    </div>
  );
}

/**
 *
 * 數據抓取與頁面路由控制器職責重合 (單一職責原則 - SRP):
 *  - 問題：`ArticlePage` 同時承擔「發送請求抓取特定文章詳情數據」與「頁面主體渲染配置」職責。
 *  - 改善：將異步載入文章細節的邏輯抽離至一個自訂 Hook `useArticleDetail(articleId)` 中，使頁面元件專注於視圖分支配置與路由展示。
 *
 * 異步載入阻礙渲染邊界優化 (邊界渲染原則):
 *  - 問題：在數據尚未返回時，整個頁面組件直接回傳 `Loading...`。這使得頁面的 header 與導航結構在加載期間完全不可見，導致不良的 UX。
 *  - 改善：移去手動的 `isLoading` 狀態分支判定，引進 React Router 的 `loader` 數據預先加載機制，或者使用 `<React.Suspense>` 設置精確的渲染邊界，使頁面骨架與返回按鈕能立即呈現，只有文章本體局部進行 Suspense 漸進式載入。
 */
