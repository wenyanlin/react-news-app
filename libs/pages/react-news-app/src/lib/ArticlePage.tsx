import { fetchArticle } from '@org/api';
import { CommentSection } from '@org/comments';
import { ArticleDetail } from '@org/news';
import { Article } from '@org/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * 文章詳情頁
 * 主要驗證 articleId 是否存在，為此取得有效 articleDetail 並往下傳
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
 * 主要將資料往下傳遞
 */
function ArticlePageContent({ articleDetail }: ArticlePageContent) {
  return (
    <div>
      <h1>Article Page</h1>
      <ArticleDetail articleDetail={articleDetail} />
      <CommentSection articleId={articleDetail.id} />
    </div>
  );
}
