import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Heading } from '@/shared';
import { useToast } from '@/core/toast';
import { usePlanCreate } from '../hooks/use-plans';
import { PlanForm } from './PlanForm';
import type { PlanFormValues } from '../types/plans.types';

function parseCreateError(err: unknown): string {
  const code = (err as any)?.response?.data?.error ?? (err as any)?.response?.data?.code;
  if (code === 'plan_already_exists') return 'Ya existe un plan con ese nombre.';
  return 'No se pudo crear el plan. Intenta de nuevo.';
}

export function PlanCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { createPlan, isPending } = usePlanCreate();

  async function handleSubmit(values: PlanFormValues) {
    try {
      await createPlan(values);
      toast.success(`El plan ${values.name} fue creado.`);
      navigate('/plans');
    } catch (err) {
      // DESIGN_SYSTEM.md §9.4 — error de mutación: toast, no inline
      toast.error(parseCreateError(err));
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate('/plans')}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a Planes
      </Button>
      <Card>
        <CardHeader>
          <Heading size="xl">Nuevo plan</Heading>
        </CardHeader>
        <CardBody>
          <PlanForm onSubmit={handleSubmit} isSubmitting={isPending} />
        </CardBody>
      </Card>
    </div>
  );
}
