import { Article, Category, Comment, User } from '@org/types';

// --- Users (至少五筆) ---
export const mockUsers: User[] = [
  { id: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', name: 'Alice Chen' },
  { id: 'b2c3d4e5-2222-4bbb-9ccc-2345678901bc', name: 'Bob Lin' },
  { id: 'c3d4e5f6-3333-4ccc-addd-3456789012cd', name: 'Charlie Wang' },
  { id: 'd4e5f6a7-4444-4ddd-beee-4567890123de', name: 'David Lee' },
  { id: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', name: 'Eve Wu' },
];

// --- Categories (至少五筆) ---
export const mockCategories: Category[] = [
  { id: 'f6a7b8c9-0001-4111-8111-000000000001', name: '科技' },
  { id: 'a7b8c9d0-0002-4222-8222-000000000002', name: '體育' },
  { id: 'b8c9d0e1-0003-4333-8333-000000000003', name: '商業' },
  { id: 'c9d0e1f2-0004-4444-8444-000000000004', name: '健康' },
  { id: 'd0e1f2a3-0005-4555-8555-000000000005', name: '娛樂' },
];

// --- Articles (每個分類 1~5 篇，共 6 篇) ---
export const mockArticles: Article[] = [
  {
    id: '11111111-aaaa-4aaa-8aaa-111111111111',
    title: 'React 19 全新特性解析',
    summary: '深入探討 React 19 帶來的效能提升與新 Hook 的應用場景。',
    content: '在最新的 React 版本中，開發團隊引入了許多令人期待的功能...',
    imageUrl: 'https://picsum.photos/seed/react/800/400',
    publishedAt: '2026-05-30T10:00:00Z',
    commentCount: 2, // 對應下方 mockComments 兩筆
    categoryId: 'f6a7b8c9-0001-4111-8111-000000000001', // 科技
    authorId: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', // Alice
  },
  {
    id: '22222222-bbbb-4bbb-8bbb-222222222222',
    title: 'Nx Monorepo 實戰指南',
    summary: '如何從零開始建構一個企業級的前端架構。',
    content: '當專案規模逐漸擴大時，單一儲存庫（Monorepo）的優勢便會顯現...',
    imageUrl: 'https://picsum.photos/seed/nx/800/400',
    publishedAt: '2026-05-31T09:30:00Z',
    commentCount: 1, // 對應下方 mockComments 一筆
    categoryId: 'f6a7b8c9-0001-4111-8111-000000000001', // 科技
    authorId: 'b2c3d4e5-2222-4bbb-9ccc-2345678901bc', // Bob
  },
  {
    id: '33333333-cccc-4ccc-8ccc-333333333333',
    title: '2026 季後賽總決賽賽況',
    summary: '昨晚的比賽驚險刺激，主場球隊在最後一分鐘逆轉勝。',
    content: '體育場內座無虛席，球迷們見證了歷史性的一刻...',
    imageUrl: 'https://picsum.photos/seed/sports/800/400',
    publishedAt: '2026-05-29T21:15:00Z',
    commentCount: 1,
    categoryId: 'a7b8c9d0-0002-4222-8222-000000000002', // 體育
    authorId: 'c3d4e5f6-3333-4ccc-addd-3456789012cd', // Charlie
  },
  {
    id: '44444444-dddd-4ddd-8ddd-444444444444',
    title: '亞洲股市今日強勢反彈',
    summary: '受惠於科技股領漲，多數市場指數創下本月新高。',
    content: '分析師指出，近期的供應鏈問題緩解是主要推手...',
    imageUrl: 'https://picsum.photos/seed/business/800/400',
    publishedAt: '2026-05-31T14:00:00Z',
    commentCount: 0,
    categoryId: 'b8c9d0e1-0003-4333-8333-000000000003', // 商業
    authorId: 'd4e5f6a7-4444-4ddd-beee-4567890123de', // David
  },
  {
    id: '55555555-eeee-4eee-8eee-555555555555',
    title: '每天一杯黑咖啡的好處',
    summary: '最新研究顯示，適量飲用黑咖啡有助於提升代謝。',
    content: '營養學家建議，早晨飲用一杯無糖黑咖啡能帶來諸多健康益處...',
    imageUrl: 'https://picsum.photos/seed/coffee/800/400',
    publishedAt: '2026-05-28T08:45:00Z',
    commentCount: 1,
    categoryId: 'c9d0e1f2-0004-4444-8444-000000000004', // 健康
    authorId: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', // Eve
  },
  {
    id: '66666666-ffff-4fff-8fff-666666666666',
    title: '年度電影頒獎典禮得獎名單',
    summary: '本屆最大贏家囊括了最佳導演與最佳男女主角三大獎項。',
    content: '星光大道上眾星雲集，今年度的得獎名單令人驚艷...',
    imageUrl: 'https://picsum.photos/seed/movie/800/400',
    publishedAt: '2026-05-31T20:00:00Z',
    commentCount: 0,
    categoryId: 'd0e1f2a3-0005-4555-8555-000000000005', // 娛樂
    authorId: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', // Alice
  },
];

// --- Comments (至少五筆) ---
export const mockComments: Comment[] = [
  {
    id: '99999999-1111-4111-8111-999999999991',
    content: '這篇介紹寫得很詳細，期待 React 19 的正式上線！',
    createdAt: '2026-05-30T11:05:00Z',
    likeCount: 12,
    dislikeCount: 0,
    userId: 'b2c3d4e5-2222-4bbb-9ccc-2345678901bc', // Bob
    articleId: '11111111-aaaa-4aaa-8aaa-111111111111', // React 文章
  },
  {
    id: '99999999-2222-4222-8222-999999999992',
    content: '不知道新 Hook 對現有專案的相容性如何？',
    createdAt: '2026-05-30T12:30:00Z',
    likeCount: 5,
    dislikeCount: 1,
    userId: 'c3d4e5f6-3333-4ccc-addd-3456789012cd', // Charlie
    articleId: '11111111-aaaa-4aaa-8aaa-111111111111', // React 文章
  },
  {
    id: '99999999-3333-4333-8333-999999999993',
    content: 'Nx 確實好用，但初始學習曲線有點陡峭。',
    createdAt: '2026-05-31T10:15:00Z',
    likeCount: 8,
    dislikeCount: 0,
    userId: 'd4e5f6a7-4444-4ddd-beee-4567890123de', // David
    articleId: '22222222-bbbb-4bbb-8bbb-222222222222', // Nx 文章
  },
  {
    id: '99999999-4444-4444-8444-999999999994',
    content: '昨晚那記絕殺三分球太神了！',
    createdAt: '2026-05-29T23:00:00Z',
    likeCount: 45,
    dislikeCount: 2,
    userId: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', // Eve
    articleId: '33333333-cccc-4ccc-8ccc-333333333333', // 體育文章
  },
  {
    id: '99999999-5555-4555-8555-999999999995',
    content: '雖然咖啡好處多，但胃不好的人還是要注意攝取量。',
    createdAt: '2026-05-28T09:20:00Z',
    likeCount: 30,
    dislikeCount: 0,
    userId: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', // Alice
    articleId: '55555555-eeee-4eee-8eee-555555555555', // 健康文章
  },
];
