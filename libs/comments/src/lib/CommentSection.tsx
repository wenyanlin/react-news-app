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

  if (isLoading) {
    return (
      <div className="py-6 text-center text-sm text-slate-400 font-medium animate-pulse">
        載入評論中...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
        無法載入評論：{error}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span role="img" aria-label="comments icon">💬</span> 讀者評論 <span className="text-sm font-medium text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">{comments?.length || 0} 則</span>
        </h2>
      </div>
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
