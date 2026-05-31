import { Comment } from '@org/types';
import { CommentItem } from './CommentItem';

type CommentListProps = {
  comments: Comment[];
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
  if (comments.length === 0) return <div>目前沒有評論</div>;
  return (
    <div className="flex flex-col">
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
