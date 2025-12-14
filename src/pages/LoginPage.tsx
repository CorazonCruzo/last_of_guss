import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/api';
import { useAuthStore } from '@/stores/auth';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login({ username, password });
      login(response, response.token);
      navigate('/rounds');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="text-xl text-center mb-8">LOGIN</h1>

        <div className="mb-4">
          <label className="block text-xs mb-2">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-800 border-2 border-gray-600 p-2 text-sm focus:border-green-500 outline-none"
            required
            minLength={3}
            maxLength={32}
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border-2 border-gray-600 p-2 text-sm focus:border-green-500 outline-none"
            required
            minLength={3}
            maxLength={64}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-700 hover:bg-green-600 disabled:bg-gray-600 border-2 border-green-500 disabled:border-gray-500 p-3 text-sm transition-colors"
        >
          {isLoading ? 'Loading...' : 'Enter'}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-xs text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
