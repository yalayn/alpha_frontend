import { Link } from 'react-router-dom';
import { ErrorMessage } from '@/shared';
import { useAuth } from '@/core/auth/use-auth';
import { usePlans } from '../hooks/use-plans';
import { PlanSkeleton } from './PlanSkeleton';
import { PlanEmpty } from './PlanEmpty';
import { PlanList } from './PlanList';

export function PlansPage() {
  const { isAdmin } = useAuth();
  const { plans, isLoading, error } = usePlans();

  if (isLoading) return <PlanSkeleton />;
  if (error) return <ErrorMessage error={error} className="m-6" />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Planes</h1>
        {isAdmin && (
          <Link
            to="/plans/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Nuevo plan
          </Link>
        )}
      </div>

      {plans.length === 0 ? <PlanEmpty /> : <PlanList plans={plans} />}
    </div>
  );
}
