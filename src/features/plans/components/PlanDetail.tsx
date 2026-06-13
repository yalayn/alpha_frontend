import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Card, CardBody, CardHeader, ErrorMessage, Spinner, Button, Modal,
  Heading, Text, CheckList,
} from '@/shared';
import { useAuth } from '@/core/auth/use-auth';
import { useToast } from '@/core/toast';
import { usePlanDetail, usePlanDelete } from '../hooks/use-plans';
import { formatPlanPrice } from '../utils/plans.utils';

function parseDeleteError(err: unknown): string {
  const code = (err as any)?.response?.data?.error ?? (err as any)?.response?.data?.code;
  if (code === 'plan_has_active_subscriptions') return 'El plan tiene suscripciones activas y no puede eliminarse.';
  return 'No se pudo eliminar el plan. Intenta de nuevo.';
}

export function PlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const toast = useToast();
  const { plan, isLoading, error } = usePlanDetail(planId ?? '');
  const { deletePlan, isPending: isDeleting } = usePlanDelete();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (isLoading) return <div className="flex justify-center p-12"><Spinner size="lg" /></div>;
  if (error) return <ErrorMessage error={error} className="m-6" />;
  if (!plan) return null;

  async function handleDelete() {
    try {
      await deletePlan(planId!);
      toast.success(`El plan ${plan!.name} fue eliminado.`);
      navigate('/plans');
    } catch (err) {
      // DESIGN_SYSTEM.md §9.4 — error de mutación: toast, no inline
      setShowDeleteModal(false);
      toast.error(parseDeleteError(err));
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <Heading size="xl">{plan.name}</Heading>
              <Heading size="2xl" as="p" className="mt-1">
                {formatPlanPrice(plan.price, plan.currency, plan.interval)}
              </Heading>
            </div>
            {isAdmin && (
              <div className="flex flex-shrink-0 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/plans/${planId}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <Text variant="label" className="mb-2">Características incluidas</Text>
          <CheckList items={plan.features} />
        </CardBody>
      </Card>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar plan"
        width="sm"
      >
        <div className="space-y-1">
          <Text variant="secondary">
            ¿Estás seguro de que quieres eliminar <strong>{plan.name}</strong>?
          </Text>
          <Text variant="secondary" tone="error">
            Esta acción es irreversible y no puede deshacerse.
          </Text>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Eliminar plan
          </Button>
        </div>
      </Modal>
    </div>
  );
}
