import type { SubscriptionStatus } from '@/api/generated/model';

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(dateString));
}

export function statusToBadgeVariant(status: SubscriptionStatus): 'success' | 'warning' | 'error' | 'neutral' {
  const map: Record<SubscriptionStatus, 'success' | 'warning' | 'error' | 'neutral'> = {
    active: 'success',
    inactive: 'warning',
    canceled: 'error',
    expired: 'neutral',
  };
  return map[status];
}

export function statusLabel(status: SubscriptionStatus): string {
  const labels: Record<SubscriptionStatus, string> = {
    active: 'Activa',
    inactive: 'Inactiva',
    canceled: 'Cancelada',
    expired: 'Vencida',
  };
  return labels[status];
}
