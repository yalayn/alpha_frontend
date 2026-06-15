import { useGetCurrentUser } from '@/api/generated/auth/auth';

/**
 * Carga el perfil del usuario autenticado (GET /users/me).
 * La identidad se resuelve en el backend desde el JWT — no se pasa id.
 */
export function useAccount() {
  const query = useGetCurrentUser();

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error ?? null,
    refetch: query.refetch,
  };
}
