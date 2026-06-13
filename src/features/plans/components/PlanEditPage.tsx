import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardBody, CardHeader, Spinner, ErrorMessage, Button, Heading, Text } from '@/shared';
import { useToast } from '@/core/toast';
import { usePlanDetail, usePlanEdit } from '../hooks/use-plans';
import { PlanForm } from './PlanForm';
import type { PlanFormValues } from '../types/plans.types';

function parseUpdateError(err: unknown): string {
  const code = (err as any)?.response?.data?.error ?? (err as any)?.response?.data?.code;
  if (code === 'plan_already_exists') return 'Ya existe un plan con ese nombre.';
  if (code === 'plan_interval_locked') return 'El intervalo no puede cambiarse: el plan tiene suscripciones activas.';
  return 'No se pudo guardar el plan. Intenta de nuevo.';
}

export function PlanEditPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { plan, isLoading, error } = usePlanDetail(planId ?? '');
  const { updatePlan, isPending } = usePlanEdit(planId ?? '');

  if (isLoading) return <div className="flex justify-center p-12"><Spinner size="lg" /></div>;
  if (error) return <ErrorMessage error={error} className="m-6" />;
  if (!plan) return null;

  const defaultValues: PlanFormValues = {
    name: plan.name,
    price: plan.price,
    currency: plan.currency,
    interval: plan.interval as 'month' | 'year',
    features: plan.features,
  };

  async function handleSubmit(values: PlanFormValues) {
    try {
      await updatePlan(values);
      toast.success('Los cambios del plan fueron guardados.');
      navigate(`/plans/${planId}`);
    } catch (err) {
      // DESIGN_SYSTEM.md §9.4 — error de mutación: toast, no inline
      toast.error(parseUpdateError(err));
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate(`/plans/${planId}`)}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al plan
      </Button>
      <Card>
        <CardHeader>
          <Heading size="xl">Editar plan</Heading>
          <Text variant="secondary" className="mt-1">{plan.name}</Text>
        </CardHeader>
        <CardBody>
          <PlanForm
            onSubmit={handleSubmit}
            isSubmitting={isPending}
            defaultValues={defaultValues}
            submitLabel="Guardar cambios"
          />
        </CardBody>
      </Card>
    </div>
  );
}
