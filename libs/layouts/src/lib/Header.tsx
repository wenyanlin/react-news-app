import { useAuth } from '@org/auth';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between p-4">
      <div>
        <a href="/">Logo</a>
      </div>
      <div>
        {user ? (
          <div className="flex gap-4">
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </header>
  );
}
