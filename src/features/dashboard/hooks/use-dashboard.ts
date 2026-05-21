import { useGetHealth } from '@/api/generated/health/health';

export function useDashboard() {
  const { data, isLoading, error } = useGetHealth();

  return { health: data ?? null, isLoading, error };
}
