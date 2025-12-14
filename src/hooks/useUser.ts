import { useAuthStore } from '@/stores/auth';

export function useUser() {
  const user = useAuthStore((state) => state.user);

  return {
    user,
    isAdmin: user?.role === 'ADMIN',
    isNikita: user?.role === 'NIKITA',
    isSurvivor: user?.role === 'SURVIVOR',
  };
}
