import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { useComments } from './useComments';

type CommentSectionProps = {
  articleId: string;
};

export function CommentSection({ articleId }: CommentSectionProps) {
  const {
    comments,
    isLoading,
    error,
    addComment,
    removeComment,
    editComment,
    likeComment,
    dislikeComment,
  } = useComments(articleId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      <h1>Comment Section</h1>
      <CommentForm onAdd={addComment} />
      <CommentList
        comments={comments}
        onDelete={removeComment}
        onEdit={editComment}
        onLike={likeComment}
        onDislike={dislikeComment}
      />
    </div>
  );
}
