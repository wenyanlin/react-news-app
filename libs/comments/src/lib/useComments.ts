/**
 * @file useComments.ts
 * @description 自訂 Hook，負責管理特定文章的留言資料狀態，提供加載、新增、刪除、編輯及按讚/按噓的狀態變更邏輯。
 */

import { fetchComments, useData } from '@org/api';
import { Comment } from '@org/types';
import { useCallback } from 'react';

interface UseCommentsResult {
  comments: Comment[] | null;
  isLoading: boolean;
  error: Error | null;
  addComment: (comment: Comment) => void;
  removeComment: (commentId: string) => void;
  editComment: (commentId: string, newContent: string) => void;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
}

/**
 * useComments 自訂 Hook
 * @description 管理特定文章下的留言狀態。加載時自 API 獲取資料並支援 Cancel token 機制防異步回呼洩漏，
 *              並封裝了一系列對留言陣列進行增、刪、改與評分變更的本地狀態操作。
 * @param {string} articleId - 欲查詢並管理留言的文章 ID
 * @returns {object} 包含 comments 列表、isLoading 狀態、error 狀態以及多個留言操作方法的物件
 */
export function useComments(articleId: string): UseCommentsResult {
  const getComments = useCallback(() => fetchComments(articleId), [articleId]);

  const {
    data: comments,
    isLoading,
    error,
    setData: setComments,
  } = useData<Comment[]>(getComments);

  const addComment = (comment: Comment) => {
    setComments((prev) => [comment, ...(prev ?? [])]);
  };

  const removeComment = (commentId: string) => {
    setComments((prev) => (prev ?? []).filter((c) => c.id !== commentId));
  };

  const editComment = (commentId: string, newContent: string) => {
    setComments((prev) =>
      (prev ?? []).map((c) =>
        c.id === commentId ? { ...c, content: newContent } : c,
      ),
    );
  };

  const likeComment = (commentId: string) => {
    setComments((prev) =>
      (prev ?? []).map((c) =>
        c.id === commentId ? { ...c, likeCount: c.likeCount + 1 } : c,
      ),
    );
  };

  const dislikeComment = (commentId: string) => {
    setComments((prev) =>
      (prev ?? []).map((c) =>
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

/**
 * 獲取資料與狀態修改職責重疊 (職責單一原則 - SRP):
 *  - 問題：`useComments` 目前同時負責「透過網路 API 抓取留言數據（`fetchComments`）」與「本機留言陣列的增刪改狀態維護」。這兩者屬於不同的職責。
 *  - 改善：將網路請求獲取（Data Fetching）行為再次抽離出一個獨立的 API Query Hook（如使用自訂或第三方的 `useQuery` 結構），本機 Hook 只負責傳入的 comments 陣列的本地修飾與同步狀態操作。
 *
 * 局部狀態重繪過大 (邊界渲染原則):
 *  - 問題：當使用者對某一個留言進行「讚/噓」（`likeComment`/`dislikeComment`）操作時，`setComments` 會修改整個 `comments` 陣列參考，進而強迫所有的 `CommentItem` 組件進行比對重繪。
 *  - 改善：在 `CommentItem` 組件內實作本地端的增量回饋狀態，只向後端靜默發送 API 請求。這樣一來，單一留言的互動將被封鎖在該留言元件內部的渲染邊界，不會波及整個留言列表的重新計算。
 */
