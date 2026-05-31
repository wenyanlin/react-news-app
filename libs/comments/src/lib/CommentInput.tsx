import { Comment } from '@org/types';
import { useState } from 'react';

type CommentInputProps = {
  onAdd: (comment: Comment) => void;
  maxLength?: number;
};

export function CommentInput({ onAdd, maxLength = 100 }: CommentInputProps) {
  const [draft, setDraft] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;

    const newComment: Comment = {
      id: crypto.randomUUID(),
      content: draft,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      dislikeCount: 0,
      userId: '',
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
        placeholder="請輸入留言..."
      />
      <div>
        <button type="submit" disabled={!draft.trim()}>
          送出留言
        </button>
      </div>
    </form>
  );
}
