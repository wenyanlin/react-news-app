import { ArticleList, CategoryList } from '@org/news';

export function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <CategoryList />
      <ArticleList />
    </div>
  );
}
