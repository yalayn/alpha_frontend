import { useQueryClient } from '@tanstack/react-query';
import {
  useListPlans,
  useGetPlanById,
  useCreatePlan,
  getListPlansQueryKey,
} from '@/api/generated/admin/admin';
import type { CreatePlanRequest } from '@/api/generated/model';

export function usePlans() {
  const { data, isLoading, error } = useListPlans();

  return {
    plans: data?.data ?? [],
    isLoading,
    error,
  };
}

export function usePlanDetail(planId: string) {
  const { data, isLoading, error } = useGetPlanById(planId, {
    query: { enabled: !!planId },
  });

  return { plan: data ?? null, isLoading, error };
}

export function usePlanCreate() {
  const queryClient = useQueryClient();

  const mutation = useCreatePlan({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListPlansQueryKey() });
      },
    },
  });

  return {
    createPlan: (data: CreatePlanRequest) => mutation.mutateAsync({ data }),
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
