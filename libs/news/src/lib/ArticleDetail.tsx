/**
 * @file ArticleDetail.tsx
 * @description 新聞文章詳情主體組件，負責呈現文章標題、發佈日期、焦點標籤、精美首圖與文章段落本文。
 */

import { Article } from '@org/types';
import { formatDate } from '@org/utils';

type ArticleDetailProps = {
  /** 文章詳情數據物件 */
  articleDetail: Article;
};

/**
 * ArticleDetail 新聞內容元件
 * @description 提供具備良好閱讀對比度、精準行高與字體大小的排版設計，讓使用者獲得舒適流暢的長文閱讀體驗。
 */
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

/**
 *
 * 新聞資訊頭部與內文呈現職責重疊 (單一職責原則 - SRP):
 *  - 問題：`ArticleDetail` 同時處理了新聞元數據（標題、分類標籤、發佈時間）的佈局以及正文內文的渲染。
 *  - 改善：將元數據頭部拆分為 `<ArticleHeader />` 元件，讓 `ArticleDetail` 僅做文章大結構（Hero 圖與內容）的主體容器。
 *
 * 內容排版固定阻礙組件複用 (複用性高原則):
 *  - 問題：文章內文排版（`text-slate-700 leading-loose text-lg`）與純文字分行（`whitespace-pre-line`）在元件中被硬編碼。若未來某些新聞內文需要渲染 HTML、富文本或 Markdown 時，該組件將無法重用。
 *  - 改善：支援外部傳入 `children` 或自訂的 `contentRenderer` prop，由外部調用端決定內文的解析與排版格式，使該組件成為一個通用的文章視圖容器。
 */
