import { CommentSection } from '@org/comments';
import { ArticleDetail } from '@org/news';

export function ArticlePage() {
  return (
    <div>
      <h1>Article Page</h1>
      <ArticleDetail />
      <CommentSection />
    </div>
  );
}
