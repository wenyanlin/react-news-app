import { fetchComments } from '@org/api';
import { Comment } from '@org/types';
import { useEffect, useState } from 'react';

export function useComments(articleId: string) {
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
      } catch (err) {
        if (err instanceof Error) {
          if (!cancelled) setError(err.message);
        } else {
          setError(String(err));
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

  const addComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const removeComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const editComment = (commentId: string, newContent: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, content: newContent } : c)),
    );
  };

  const likeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, likeCount: c.likeCount + 1 } : c,
      ),
    );
  };

  const dislikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, dislikeCount: c.dislikeCount + 1 } : c,
      ),
    );
  };

  return {
    comments,
    isLoading,
    error,
    addComment,
    removeComment,
    editComment,
    likeComment,
    dislikeComment,
  };
}
