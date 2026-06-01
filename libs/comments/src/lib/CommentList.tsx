import { Comment } from '@org/types';
import { CommentItem } from './CommentItem';

type CommentListProps = {
  comments?: Comment[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
};

export function CommentList({
  comments = [],
  onDelete,
  onEdit,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-slate-100 rounded-xl">
        <p className="text-slate-400 text-sm font-medium">目前尚無讀者留言，快來搶沙發吧！</p>
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
