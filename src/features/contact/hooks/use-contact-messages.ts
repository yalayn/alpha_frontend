import { useListContactMessages } from '@/api/generated/contact/contact';

/**
 * Carga todos los mensajes de contacto (GET /contact-messages, admin).
 * El backend ordena del más reciente al más antiguo y protege el acceso
 * por rol (SPE-010).
 */
export function useContactMessages() {
  const query = useListContactMessages();

  return {
    messages: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ?? null,
    refetch: query.refetch,
  };
}
