import { useQueryClient } from '@tanstack/react-query';
import {
  useGetEmailChangeStatus,
  useRequestEmailChange,
  getGetEmailChangeStatusQueryKey,
} from '@/api/generated/auth/auth';
import { useToast } from '@/core/toast';

/**
 * Estado de la solicitud de cambio de email pendiente (GET /users/me/email-change).
 * El backend responde 404 cuando no hay solicitud — caso esperado, no un error:
 * lo tratamos como "sin pendiente" y desactivamos el retry.
 */
export function useEmailChangeStatus() {
  const query = useGetEmailChangeStatus({
    query: { retry: false },
  });

  return {
    pending: query.data ?? null,
    isLoading: query.isLoading,
  };
}

/**
 * Solicita el cambio de email (POST /users/me/email-change). Tras el éxito,
 * refresca el estado pendiente y avisa al usuario de que revise ambos correos.
 */
export function useRequestEmailChangeForm(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useRequestEmailChange({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetEmailChangeStatusQueryKey() });
        toast.success('Solicitud enviada. Revisa ambos correos para confirmar el cambio.');
        options?.onSuccess?.();
      },
      onError: () => {
        toast.error('No se pudo solicitar el cambio de email. Intenta de nuevo.');
      },
    },
  });

  return {
    requestChange: (newEmail: string) => mutation.mutate({ data: { newEmail } }),
    isPending: mutation.isPending,
  };
}
