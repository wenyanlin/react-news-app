/**
 * @file CommentForm.tsx
 * @description 新增評論表單組件，控制留言輸入狀態與防呆限制，並根據當前會員登入狀態動態啟用/停用。
 */

import { useAuth } from '@org/auth';
import { Comment } from '@org/types';
import { useEffect, useRef } from 'react';
import { CommentInput } from './CommentInput';

type CommentFormProps = {
  /** 新增留言的回呼函式 */
  onAdd: (comment: Comment) => void;
  /** 輸入字數限制上限，預設為 100 */
  maxLength?: number;
};

/**
 * CommentForm 評論輸入表單
 * @description 當使用者未登入時，表單呈唯讀狀態並提示使用者先登入；
 *              登入成功後允許輸入內容，並在提交時防呆空白內容與超過字數上限。
 */
export function CommentForm({ onAdd, maxLength = 100 }: CommentFormProps) {
  const { user, logout } = useAuth();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!user && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const draft = inputRef.current?.value || '';

    if (!draft.trim()) return;

    if (!user) {
      logout();
      return;
    }

    if (draft.length > maxLength) {
      alert(`字數不可超過 ${maxLength} 字`);
      return;
    }

    const newComment: Comment = {
      id: crypto.randomUUID(),
      content: draft,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      dislikeCount: 0,
      userId: user.name,
      articleId: '',
    };

    onAdd(newComment);

    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
      <CommentInput
        inputRef={inputRef}
        placeholder={user ? '說點什麼吧，分享您的想法...' : '請先登入會員才能發表留言唷 💡'}
        disabled={!user}
        maxLength={maxLength}
      />
      <div className="flex justify-end items-center gap-3">
        {user ? (
          <span className="text-xs text-slate-400">
            以 <strong className="text-slate-600">{user.name}</strong> 的身分留言
          </span>
        ) : (
          <a href="/login" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
            立即登入 →
          </a>
        )}
        <button
          type="submit"
          disabled={!user}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          送出留言
        </button>
      </div>
    </form>
  );
}

/**
 *
 * 留言模型實例化職責混雜 (單一職責原則 - SRP):
 *  - 問題：`CommentForm` 內部直接構造了 `Comment` 資料物件（包含隨機生成 ID、發佈時間、將 userId 綁定為 `user.name` ）。這不屬於表單收集輸入的職責。
 *  - 改善：將建構 Comment 資料實體物件的責任轉交給父層 Controller hook（`useComments` 的 `addComment` 內部）或獨立的資料層。表單僅需回傳 `draft` 文字字串，讓 UI 元件回歸純淨的資料收集職責。
 *
 * 元件可複用性過低 (複用性高原則):
 *  - 問題：提交按鈕的提示語文字與判斷邏輯全部在元件內被硬編碼。
 *  - 改善：將留言輸入表單的核心結構抽象化，利用 Slots（`props.children`）或 Render Props 讓按鈕與登入指示部分可被外部自訂，使該輸入容器可被高程度複用至「編輯留言」或「回覆留言」等不同的功能板塊中。
 */
