import { useAuth } from '@org/auth';
import { Comment } from '@org/types';
import { useEffect, useRef } from 'react';
import { CommentInput } from './CommentInput';

type CommentFormProps = {
  onAdd: (comment: Comment) => void;
  maxLength?: number;
};

/**
 * 處理邏輯與狀態
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
