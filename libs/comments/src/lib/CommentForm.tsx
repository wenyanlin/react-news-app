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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <CommentInput
        inputRef={inputRef}
        placeholder={user ? '請輸入留言...' : '請先登入才能留言'}
        disabled={!user}
        maxLength={maxLength}
      />
      <div>
        <button type="submit" disabled={!user}>
          送出留言
        </button>
      </div>
    </form>
  );
}
