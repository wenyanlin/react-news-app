import { Comment } from '@org/types';
import { formatDate } from '@org/utils';
import { useState } from 'react';

type CommentItemProps = {
  comment: Comment;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
};

export function CommentItem({ comment, onDelete, onEdit }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [action, setAction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    setAction((prev) => (prev === 'like' ? null : 'like'));
  };

  const handleDislike = () => {
    setAction((prev) => (prev === 'dislike' ? null : 'dislike'));
  };

  const handleEditSave = () => {
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const displayLikeCount = comment.likeCount + (action === 'like' ? 1 : 0);
  const displayDislikeCount =
    comment.dislikeCount + (action === 'dislike' ? 1 : 0);

  return (
    <div className="flex flex-col">
      {isEditing ? (
        <div className="flex flex-col">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex justify-between">
            <div className="flex">
              <button onClick={handleEditSave}>儲存</button>
              <button onClick={handleEditCancel}>取消</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div>{comment.content}</div>
          <div className="flex">
            <button onClick={() => setIsEditing(true)}>編輯</button>
            <button onClick={() => onDelete(comment.id)}>刪除</button>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex">
          <div>{comment.userId}</div>
          <button onClick={handleLike}>讚 {displayLikeCount}</button>
          <button onClick={handleDislike}>噓 {displayDislikeCount}</button>
        </div>
        <div>{formatDate(comment.createdAt)}</div>
      </div>
    </div>
  );
}
