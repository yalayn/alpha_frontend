export type { PlanInterval } from '@/api/generated/model';

export interface PlanFormValues {
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}
