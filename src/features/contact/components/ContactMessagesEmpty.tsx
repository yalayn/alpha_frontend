import { Inbox } from 'lucide-react';
import { EmptyState } from '@/shared';

// SPE-009 §3.4 — estado vacío de la lista de admin.
export function ContactMessagesEmpty() {
  return (
    <EmptyState
      icon={Inbox}
      title="Aún no hay mensajes"
      description="Cuando los usuarios envíen comentarios o solicitudes, aparecerán aquí."
    />
  );
}
