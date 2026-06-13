import { Toast } from '@/shared';
import { useToastStore } from './toast.store';

// DESIGN_SYSTEM.md §10 — esquina superior derecha; solo error lleva botón de cierre
export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed right-4 top-4 z-[200] flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          message={toast.message}
          onClose={toast.variant === 'error' ? () => dismiss(toast.id) : undefined}
        />
      ))}
    </div>
  );
}
