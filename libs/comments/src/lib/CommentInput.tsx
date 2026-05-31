import { Comment, User } from '@org/types';
import { useState } from 'react';

type CommentInputProps = {
  onAdd: (comment: Comment) => void;
  user?: User | null;
  maxLength?: number;
};

export function CommentInput({ onAdd, user, maxLength = 100 }: CommentInputProps) {
  const [draft, setDraft] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !user) return;

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
    setDraft('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setDraft(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <textarea
        value={draft}
        onChange={handleChange}
        placeholder={user ? '請輸入留言...' : '請先登入才能留言'}
        disabled={!user}
      />
      <div>
        <button type="submit" disabled={!draft.trim() || !user}>
          送出留言
        </button>
      </div>
    </form>
  );
}
