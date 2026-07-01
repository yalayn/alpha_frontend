import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Heading, Text, Badge, Button, ErrorMessage,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/shared';
import { ContactMessageType } from '@/api/generated/model';
import { useContactMessages } from '../hooks/use-contact-messages';
import { contactTypeLabel, formatContactDate } from '../utils/contact.utils';
import { ContactMessagesEmpty } from './ContactMessagesEmpty';
import { ContactMessagesSkeleton } from './ContactMessagesSkeleton';

// SPE-009 §3.2 — ancho estándar (1280px), patrón tabla. Vista de administrador.
export function ContactMessagesPage() {
  const navigate = useNavigate();
  const { messages, isLoading, error, refetch } = useContactMessages();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <Heading size="xl">Mensajes recibidos</Heading>
          <Text variant="secondary">Comentarios y solicitudes de los usuarios.</Text>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate('/contact')}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a Contacto
        </Button>
      </div>

      {isLoading ? (
        <ContactMessagesSkeleton />
      ) : error ? (
        <ErrorMessage error={error} onRetry={() => refetch()} />
      ) : messages.length === 0 ? (
        <ContactMessagesEmpty />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Remitente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Asunto</TableHead>
              <TableHead>Mensaje</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  {m.senderName}
                  <Text as="span" variant="muted" className="block">{m.senderEmail}</Text>
                </TableCell>
                <TableCell>
                  <Badge variant={m.type === ContactMessageType.request ? 'brand' : 'default'}>
                    {contactTypeLabel(m.type)}
                  </Badge>
                </TableCell>
                <TableCell>{m.subject}</TableCell>
                <TableCell>
                  <span className="block max-w-[320px] truncate">{m.message}</span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Text as="span" variant="muted">{formatContactDate(m.createdAt)}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
