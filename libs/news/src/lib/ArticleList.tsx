import { fetchArticlesByCategoryId } from '@org/api';
import { Article } from '@org/types';
import { formatDate } from '@org/utils';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ArticleListProps = {
  categoryId: string;
};

/**
 * 顯示文章列表
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
