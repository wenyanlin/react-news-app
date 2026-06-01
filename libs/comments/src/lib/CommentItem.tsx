/**
 * @file CommentItem.tsx
 * @description 單一留言項目卡片組件，包含使用者首字頭像、發佈時間、留言本文、支持/反對按鈕，並整合行內直接編輯與刪除留言的動態表單邏輯。
 */

import { Comment } from '@org/types';
import { formatDate } from '@org/utils';
import { useRef, useState } from 'react';
import { CommentInput } from './CommentInput';

type CommentItemProps = {
  /** 留言數據物件 */
  comment: Comment;
  /** 刪除留言的回呼函式 */
  onDelete: (id: string) => void;
  /** 編輯儲存留言的回呼函式 */
  onEdit: (id: string, newContent: string) => void;
};

/**
 * CommentItem 留言單元組件
 * @description 實現單條留言的多功能操作。
 *              點擊「編輯」會切換為 CommentInput 輸入框進行就地修改並支持「儲存」與「取消」；
 *              點擊「👍 讚 / 👎 噓」能給予即時的按讚/噓數視覺增量反饋。
 */
export function CommentItem({ comment, onDelete, onEdit }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLTextAreaElement>(null);
  const [action, setAction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    setAction((prev) => (prev === 'like' ? null : 'like'));
  };

  const handleDislike = () => {
    setAction((prev) => (prev === 'dislike' ? null : 'dislike'));
  };

  const handleEditSave = () => {
    const newContent = editRef.current?.value || '';
    if (!newContent.trim()) return;
    onEdit(comment.id, newContent);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const displayLikeCount = comment.likeCount + (action === 'like' ? 1 : 0);
  const displayDislikeCount =
    comment.dislikeCount + (action === 'dislike' ? 1 : 0);

  return (
    <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-xs space-y-3">
      {/* Header section: User & Time */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px] uppercase">
            {comment.userId.charAt(0)}
          </div>
          <span className="text-slate-700 font-semibold">{comment.userId}</span>
        </div>
        <time className="text-slate-400">{formatDate(comment.createdAt)}</time>
      </div>

      {/* Content & Actions section */}
      {isEditing ? (
        <div className="space-y-3">
          <CommentInput
            inputRef={editRef}
            defaultValue={comment.content}
            maxLength={100}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleEditCancel}
              className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-md transition-all cursor-pointer"
            >
              取消
            </button>
            <button
              onClick={handleEditSave}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-md shadow-xs transition-all cursor-pointer"
            >
              儲存
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{comment.content}</p>
          
          <div className="flex items-center justify-between pt-1">
            {/* Feedback likes / dislikes */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  action === 'like'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                    : 'bg-white border-slate-100 text-slate-500 hover:text-slate-700 hover:border-slate-200'
                }`}
              >
                <span role="img" aria-label="like">👍</span> 讚 {displayLikeCount}
              </button>
              <button
                onClick={handleDislike}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  action === 'dislike'
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-slate-100 text-slate-500 hover:text-slate-700 hover:border-slate-200'
                }`}
              >
                <span role="img" aria-label="dislike">👎</span> 噓 {displayDislikeCount}
              </button>
            </div>
            
            {/* Edit / Delete actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-xs font-medium text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-md transition-all cursor-pointer"
                title="編輯留言"
              >
                編輯
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="p-1.5 text-xs font-medium text-slate-400 hover:text-red-600 hover:bg-red-50/50 rounded-md transition-all cursor-pointer"
                title="刪除留言"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 改善建議
 *
 * 1. [✓] 就地（In-place）編輯切換邏輯 (單一職責原則 - SRP):
 *    - 實現：封裝了留言本文與編輯模式表單的顯示狀態切換（`isEditing`），將單一留言的互動操作隔離在卡片元件內部。
 *
 * 2. [✓] 無障礙 Emoji 規範標記:
 *    - 實現：`👍` 與 `👎` 按鈕內的 Emoji 均使用 `<span>` 包裝，設定了正確的 `role="img"` 及 `aria-label` 說明，符合 JSX A11y 指南。
 *
 * 3. 業務操作狀態與視圖高度重合 (單一職責原則 - SRP):
 *    - 問題：`CommentItem` 同時承擔了「本地按讚/噓互動狀態維持（`action`）」與「編輯儲存驗證邏輯（`handleEditSave`）」。
 *    - 改善：將所有的 Mutation 業務邏輯（例如讚/噓、確認編輯）提純至最上層的 Controller hook 或調用端，`CommentItem` 僅需發送 `onLike`、`onDislike` 與 `onSave` 等回呼，成為一個純展示與互動回傳元件。
 *
 * 4. 內建編輯表單阻礙組件複用與邊界渲染 (邊界渲染原則):
 *    - 問題：當前編輯留言的表單 `isEditing ? (...) : (...)` 完全內嵌在組件中。在編輯輸入框中敲擊文字時，整個 `CommentItem` 的頭像、名稱、留言時間等靜態內容都會被迫重新繪製。
 *    - 改善：將編輯模式下的輸入區塊與取消/儲存按鈕，徹底拆分成一個獨立的子組件 `<CommentEditForm defaultValue={comment.content} onSave={handleEditSave} onCancel={handleEditCancel} />`。這能將鍵盤輸入帶來的重繪封鎖在該子元件的渲染邊界內，同時極大化提高了留言內容卡片的外觀複用度。
 */
