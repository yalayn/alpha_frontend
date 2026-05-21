import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, ErrorMessage, Spinner } from '@/shared';
import { usePlanDetail } from '../hooks/use-plans';
import { formatPlanPrice } from '../utils/plans.utils';

export function PlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();
  const { plan, isLoading, error } = usePlanDetail(planId ?? '');

  if (isLoading) return <div className="flex justify-center p-12"><Spinner size="lg" /></div>;
  if (error) return <ErrorMessage error={error} className="m-6" />;
  if (!plan) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold text-gray-900">{plan.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {formatPlanPrice(plan.price, plan.currency, plan.interval)}
          </p>
        </CardHeader>
        <CardBody>
          <h2 className="text-sm font-medium text-gray-700 mb-2">Características incluidas</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {f}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
