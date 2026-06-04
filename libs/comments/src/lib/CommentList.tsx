/**
 * @file CommentList.tsx
 * @description 留言評論清單元件，負責遍歷渲染所有留言項目，並提供無留言時的精美空狀態呈現。
 */

import { Comment } from '@org/types';
import { CommentItem } from './CommentItem';

type CommentListProps = {
  /** 留言列表陣列 */
  comments?: Comment[] | null;
  /** 刪除留言的回呼函式 */
  onDelete: (id: string) => void;
  /** 編輯留言的回呼函式 */
  onEdit: (id: string, newContent: string) => void;
  /** 按讚留言的回呼函式 */
  onLike: (id: string) => void;
  /** 按噓留言的回呼函式 */
  onDislike: (id: string) => void;
};

/**
 * CommentList 評論清單組件
 * @description 當沒有任何留言時，渲染引人注目的「沙發空狀態」提示卡片；
 *              否則以垂直間距（space-y-4）整齊列出所有 `CommentItem` 組件。
 */
export function CommentList({
  comments = [],
  onDelete,
  onEdit,
}: CommentListProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-slate-100 rounded-xl">
        <p className="text-slate-400 text-sm font-medium">
          目前尚無讀者留言，快來搶沙發吧！
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

/**
 * 結構佈局與子元件緊密耦合 (複用性高原則):
 *  - 問題：`CommentList` 內部直接引進並寫死了渲染子項為 `<CommentItem />` 的邏輯。當未來需要將這個列表容器複用至「精簡留言摘要清單」或「置頂精華評論清單」等場景時，該組件將無法重用。
 *  - 改善：將列表容器進行抽象化設計，改為透過 React Children（`props.children`）由外部傳入子元件，或者定義 Render Prop 方法 `renderItem(comment)`。清單本身只專注於垂直間距結構佈局與空狀態判斷，子項元件則由呼叫端靈活注入，達到百分之百的佈局複用性。
 */
