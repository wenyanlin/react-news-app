import { fetchComments } from '@org/api';
import { Comment } from '@org/types';
import { useEffect, useState } from 'react';
import { CommentInput } from './CommentInput';
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h1>Comment Section</h1>
      <CommentInput onAdd={add} />
      <CommentList comments={comments} />
    </div>
  );
}
