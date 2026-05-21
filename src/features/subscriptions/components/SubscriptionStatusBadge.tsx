import { Badge } from '@/shared';
import { statusToBadgeVariant, statusLabel } from '../utils/subscriptions.utils';
import type { SubscriptionStatus } from '@/api/generated/model';

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
}

export function SubscriptionStatusBadge({ status }: SubscriptionStatusBadgeProps) {
  return (
    <Badge variant={statusToBadgeVariant(status)}>
      {statusLabel(status)}
    </Badge>
  );
}
