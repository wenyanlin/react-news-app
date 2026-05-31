import { Article } from '@org/types';
import { formatDate } from '@org/utils';

type ArticleDetailProps = {
  articleDetail: Article;
};

export function ArticleDetail({ articleDetail }: ArticleDetailProps) {
  return (
    <div className="flex flex-col h-full">
      <div>
        <div>{articleDetail.title}</div>
        <div>{formatDate(articleDetail.publishedAt)}</div>
      </div>
      <img
        src={articleDetail.imageUrl}
        alt={articleDetail.title}
        className="w-full"
      />
      <div className="flex flex-col">
        <div>{articleDetail.content}</div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
