import { Comment } from '@org/types';
import { formatDate } from '@org/utils';

type CommentListProps = {
  comments?: Comment[];
};

export function CommentList({ comments = [] }: CommentListProps) {
  if (comments.length === 0) return <div>目前沒有評論</div>;
  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col">
          <div>{comment.content}</div>
          <div className="flex justify-between">
            <div className="flex">
              <div>{comment.userId}</div>
              <div>{comment.likeCount}</div>
              <div>{comment.dislikeCount}</div>
            </div>
            <div>{formatDate(comment.createdAt)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
