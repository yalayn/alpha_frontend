import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  variant: ToastVariant;
  message: string;
  /** DESIGN_SYSTEM.md §10 — solo el toast de error lleva botón de cierre */
  onClose?: () => void;
  className?: string;
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-success-100 text-success-500',
  error: 'bg-error-100 text-error-500',
  warning: 'bg-warning-100 text-warning-500',
  info: 'bg-info-100 text-info-500',
};

const variantIcons: Record<ToastVariant, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

// DESIGN_SYSTEM.md §10 — 320px, radius-md
export function Toast({ variant, message, onClose, className }: ToastProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      role="status"
      className={cn(
        'flex w-80 items-start gap-2 rounded-md px-4 py-3 text-sm shadow-lg',
        variantStyles[variant],
        className,
      )}
    >
      <Icon className="h-4 w-4 flex-none mt-0.5" aria-hidden="true" />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="flex-none rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
