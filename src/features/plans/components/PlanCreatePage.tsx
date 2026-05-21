import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@/shared';
import { usePlanCreate } from '../hooks/use-plans';
import { PlanForm } from './PlanForm';
import type { PlanFormValues } from '../types/plans.types';

export function PlanCreatePage() {
  const navigate = useNavigate();
  const { createPlan, isPending } = usePlanCreate();

  async function handleSubmit(values: PlanFormValues) {
    await createPlan(values);
    navigate('/plans');
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold text-gray-900">Nuevo plan</h1>
        </CardHeader>
        <CardBody>
          <PlanForm onSubmit={handleSubmit} isSubmitting={isPending} />
        </CardBody>
      </Card>
    </div>
  );
}
