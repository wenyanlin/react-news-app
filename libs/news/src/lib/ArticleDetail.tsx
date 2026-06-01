import { Article } from '@org/types';
import { formatDate } from '@org/utils';

type ArticleDetailProps = {
  articleDetail: Article;
};

export function ArticleDetail({ articleDetail }: ArticleDetailProps) {
  return (
    <article className="flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          {articleDetail.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
          <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-semibold">
            焦點新聞
          </span>
          <time dateTime={articleDetail.publishedAt}>
            發佈於 {formatDate(articleDetail.publishedAt)}
          </time>
        </div>
      </header>
      
      <div className="w-full h-64 md:h-[350px] overflow-hidden rounded-2xl shadow-xs mb-8 bg-slate-100">
        <img
          src={articleDetail.imageUrl}
          alt={articleDetail.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="text-slate-700 leading-loose text-lg whitespace-pre-line">
        {articleDetail.content}
      </div>
    </article>
  );
}
