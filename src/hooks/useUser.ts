import { useAuthStore } from '@/stores/auth';

export function useUser() {
  const user = useAuthStore((state) => state.user);
  const isNikita = user?.role === 'NIKITA';

  return {
    user,
    displayName: isNikita ? 'Nikitos' : user?.username,
    isAdmin: user?.role === 'ADMIN',
    isNikita,
    isSurvivor: user?.role === 'SURVIVOR',
  };
}
