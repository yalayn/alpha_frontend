import { useState } from 'react';
import { useValidateAccess } from '@/api/generated/orchestration/orchestration';
import type { AccessResult } from '@/api/generated/model';
import type { AccessControlFormValues } from '../types/access-control.types';

export function useAccessControl() {
  const [result, setResult] = useState<AccessResult | null>(null);

  const mutation = useValidateAccess({
    mutation: {
      onSuccess: (data) => setResult(data),
    },
  });

  function validate(values: AccessControlFormValues) {
    mutation.mutate({ data: values });
  }

  return { result, validate, isPending: mutation.isPending, error: mutation.error };
}
