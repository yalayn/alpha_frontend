import { useMemo } from 'react';
import { useToastStore } from './toast.store';

/**
 * API pública para disparar toasts desde features.
 * Suscribe solo a `show` — disparar un toast nunca re-renderiza al emisor.
 */
export function useToast() {
  const show = useToastStore((s) => s.show);

  return useMemo(
    () => ({
      success: (message: string) => show('success', message),
      error: (message: string) => show('error', message),
      warning: (message: string) => show('warning', message),
      info: (message: string) => show('info', message),
    }),
    [show],
  );
}
