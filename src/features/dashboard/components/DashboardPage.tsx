import { Spinner, ErrorMessage } from '@/shared';
import { useAuth } from '@/core/auth/use-auth';
import { useDashboard } from '../hooks/use-dashboard';
import { HealthStatusCard } from './HealthStatusCard';

export function DashboardPage() {
  const { user } = useAuth();
  const { health, isLoading, error } = useDashboard();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-1 text-sm text-gray-500 capitalize">{user?.role}</p>
      </div>

      {isLoading && <div className="flex justify-center py-8"><Spinner /></div>}
      {error && <ErrorMessage error={error} />}
      {health && health.status && health.database && (
        <div className="max-w-sm">
          <HealthStatusCard
            status={health.status}
            database={health.database}
            timestamp={health.timestamp ?? new Date().toISOString()}
          />
        </div>
      )}
    </div>
  );
}
