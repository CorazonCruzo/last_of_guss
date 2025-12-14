import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks';
import { useAuthStore } from '@/stores/auth';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  centered?: boolean;
}

export function Layout({ title, children, centered = false }: LayoutProps) {
  const { displayName } = useUser();
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
          <span className="text-xs text-green-500">{displayName}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            [Logout]
          </button>
        </div>
      </header>
      <main
        className={`flex-1 flex flex-col p-4 ${
          centered ? 'items-center justify-center' : 'items-center'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
