import { useQueryClient } from '@tanstack/react-query';
import {
  useGetSubscriptionById,
  useSubscribeCustomer,
  useCancelSubscription,
  getGetSubscriptionByIdQueryKey,
} from '@/api/generated/subscriptions/subscriptions';
import type { SubscriptionRequest } from '@/api/generated/model';

export function useSubscriptionDetail(subscriptionId: string) {
  const { data, isLoading, error } = useGetSubscriptionById(subscriptionId, {
    query: { enabled: !!subscriptionId },
  });

  return { subscription: data ?? null, isLoading, error };
}

export function useSubscriptionActions() {
  const queryClient = useQueryClient();

  const subscribeMutation = useSubscribeCustomer({
    mutation: {
      onSuccess: (_data, variables) => {
        const req = variables.data as SubscriptionRequest;
        queryClient.invalidateQueries({
          queryKey: getGetSubscriptionByIdQueryKey(req.customerId),
        });
      },
    },
  });

  const cancelMutation = useCancelSubscription({
    mutation: {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: getGetSubscriptionByIdQueryKey(variables.subscriptionId),
        });
      },
    },
  });

  return {
    subscribe: (data: SubscriptionRequest) => subscribeMutation.mutateAsync({ data }),
    cancel: (subscriptionId: string) => cancelMutation.mutateAsync({ subscriptionId }),
    isPending: subscribeMutation.isPending || cancelMutation.isPending,
  };
}
