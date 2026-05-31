import { User } from '@org/types';

type HeaderProps = {
  user?: User | null;
};

export function Header({ user }: HeaderProps) {
  return (
    <header>
      <div>
        <a href="/">Logo</a>
      </div>
      <div>
        {user ? <span>Welcome, {user.name}</span> : <a href="/login">Login</a>}
      </div>
    </header>
  );
}
