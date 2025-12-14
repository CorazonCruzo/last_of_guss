import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export function Layout({ title, children }: LayoutProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="border-b-2 border-gray-700 p-4 flex justify-between items-center">
        <h1 className="text-sm">{title}</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-green-500">{user?.username}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            [Logout]
          </button>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
