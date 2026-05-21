export type { SubscriptionStatus } from '@/api/generated/model';

export interface SubscriptionFormValues {
  customerId: string;
  planId: string;
  paymentMethodId: string;
}
