import type { PlanInterval } from '@/api/generated/model';

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(price);
}

export function formatInterval(interval: PlanInterval): string {
  return interval === 'month' ? 'mes' : 'año';
}

export function formatPlanPrice(price: number, currency: string, interval: PlanInterval): string {
  return `${formatPrice(price, currency)} / ${formatInterval(interval)}`;
}
