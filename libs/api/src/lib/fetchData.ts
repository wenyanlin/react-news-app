import { Article, Category, Comment, User } from '@org/types';
import { mockArticles, mockCategories, mockComments, mockUsers } from './mock';

/**
 * 模擬網路延遲的工具函式
 * @param {number} [ms=3000] - 最大延遲時間 (毫秒)
 * @returns {Promise<void>}
 */
const delay = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * ms));

/**
 * 登入 (以使用者名稱比對)
 * @param {string} username - 使用者名稱
 * @returns {Promise<User>} 使用者資料
 * @throws {Error} 401 Unauthorized 當找不到該使用者名稱時
 */
export async function login(username: string): Promise<User> {
  await delay();
  const user = mockUsers.find((u) => u.name === username);
  if (!user) {
    throw new Error(`401 Unauthorized: 找不到名稱為 ${username} 的使用者`);
  }
  return user;
}

/**
 * 獲取所有新聞分類清單
 * @returns {Promise<Category[]>} 分類清單陣列
 */
export async function fetchCategories(): Promise<Category[]> {
  await delay();
  return mockCategories;
}

/**
 * 根據分類 ID 獲取對應的新聞文章列表
 * @param {string} categoryId - 分類 ID
 * @returns {Promise<Article[]>} 文章列表陣列
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
 * @param {string} articleId - 文章 ID
 * @returns {Promise<Article>} 文章詳細資料
 * @throws {Error} 404 Not Found 當文章 ID 不存在時
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
 * @param {string} articleId - 文章 ID
 * @returns {Promise<Comment[]>} 留言列表陣列
 */
export async function fetchComments(articleId: string): Promise<Comment[]> {
  await delay();
  const filteredComments = mockComments.filter(
    (comment) => comment.articleId === articleId,
  );
  return filteredComments;
}

