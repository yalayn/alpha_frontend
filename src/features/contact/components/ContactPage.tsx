import { useNavigate } from 'react-router-dom';
import { Heading, Text, Button } from '@/shared';
import { useAuth } from '@/core/auth/use-auth';
import { ContactForm } from './ContactForm';

// SPE-009 §3.2 — contenedor centrado estrecho (640px), patrón formulario único.
export function ContactPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[640px] px-4 py-8 space-y-6">
      <div className="space-y-1">
        <Heading size="xl">Contacto</Heading>
        <Text variant="secondary">
          Envíanos un comentario o una solicitud. Lo revisaremos cuanto antes.
        </Text>
      </div>

      <ContactForm />

      {/* SPE-009 §3.5 — el admin llega a los mensajes por un botón, no por el topbar. */}
      {isAdmin && (
        <div className="flex justify-end">
          <Button variant="secondary" onClick={() => navigate('/contact/messages')}>
            Ver mensajes recibidos
          </Button>
        </div>
      )}
    </div>
  );
}
