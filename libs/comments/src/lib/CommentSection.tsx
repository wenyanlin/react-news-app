import { fetchComments } from '@org/api';
import { Comment } from '@org/types';
import { useEffect, useState } from 'react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

type CommentSectionProps = {
  articleId: string;
};

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) return;
    let cancelled = false;
    const loadComments = async () => {
      try {
        setIsLoading(true);
        const data = await fetchComments(articleId);
        if (!cancelled) {
          setComments(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (!cancelled) setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadComments();
    return () => {
      cancelled = true;
    };
  }, [articleId]);

  const add = (comment: Comment) => {
    setComments((prev: Comment[]) => [comment, ...prev]);
  };

  const remove = (commentId: string) => {
    setComments((prev: Comment[]) => prev.filter((c) => c.id !== commentId));
  };

  const edit = (commentId: string, newContent: string) => {
    setComments((prev: Comment[]) =>
      prev.map((c) => (c.id === commentId ? { ...c, content: newContent } : c)),
    );
  };

  const handleLike = (commentId: string) => {
    setComments((prev: Comment[]) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, likeCount: c.likeCount + 1 } : c,
      ),
    );
  };

  const handleDislike = (commentId: string) => {
    setComments((prev: Comment[]) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, dislikeCount: c.dislikeCount + 1 } : c,
      ),
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h1>Comment Section</h1>
      <CommentForm onAdd={add} />
      <CommentList
        comments={comments}
        onDelete={remove}
        onEdit={edit}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}
