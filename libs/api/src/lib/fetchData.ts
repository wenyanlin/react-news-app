import { Article, Category, Comment } from '@org/types';
import { mockArticles, mockCategories, mockComments } from './mock';

// 模擬延遲的工具函式 (預設延遲 500 毫秒)
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 獲取所有分類清單
 */
export async function fetchCategories(): Promise<Category[]> {
  await delay();
  return mockCategories;
}

/**
 * 根據分類 ID 獲取對應的新聞文章列表
 */
export async function fetchArticlesByCategoryId(
  categoryId: string,
): Promise<Article[]> {
  await delay();
  const filteredArticles = mockArticles.filter(
    (article) => article.categoryId === categoryId,
  );
  return filteredArticles;
}

/**
 * 根據文章 ID 獲取單篇新聞詳情
 */
export async function fetchArticle(articleId: string): Promise<Article> {
  await delay();
  const article = mockArticles.find((a) => a.id === articleId);
  if (!article) {
    throw new Error(`404 Not Found: 找不到 ID 為 ${articleId} 的文章`);
  }
  return article;
}

/**
 * 根據文章 ID 獲取該篇新聞的所有留言
 */
export async function fetchComments(articleId: string): Promise<Comment[]> {
  await delay();
  const filteredComments = mockComments.filter(
    (comment) => comment.articleId === articleId,
  );
  return filteredComments;
}
