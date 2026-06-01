import { Comment } from '@org/types';
import { formatDate } from '@org/utils';
import { useRef, useState } from 'react';
import { CommentInput } from './CommentInput';

type CommentItemProps = {
  comment: Comment;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
};

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
