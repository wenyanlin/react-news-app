import { fetchArticlesByCategoryId } from '@org/api';
import { Article } from '@org/types';
import { useEffect, useState } from 'react';

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col">
      {articleList.map((article) => (
        <div key={article.id} className="flex">
          <div>
            <img src={article.imageUrl} alt={article.title} />
          </div>
          <div className="flex flex-col">
            <div>{article.title}</div>
            <div>{article.summary}</div>
            <div>{article.publishedAt}</div>
            <div>{article.commentCount}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
