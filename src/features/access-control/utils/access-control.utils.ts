import type { AccessResultReason } from '@/api/generated/model';

const reasonMessages: Record<string, string> = {
  no_active_subscription: 'El cliente no tiene una suscripción activa.',
  subscription_expired: 'La suscripción del cliente ha vencido.',
  feature_not_in_plan: 'La funcionalidad no está incluida en el plan actual.',
};

export function reasonToMessage(reason: AccessResultReason | null | undefined): string {
  if (!reason) return '';
  return reasonMessages[reason] ?? reason;
}
