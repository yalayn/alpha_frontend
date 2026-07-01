import { z } from 'zod';
import { ContactMessageType } from '@/api/generated/model';

// Esquema derivado de CreateContactMessageRequest (openapi):
// type ∈ {comment, request}, subject 3-150, message 10-2000 (RN-002).
export const contactSchema = z.object({
  type: z.enum([ContactMessageType.comment, ContactMessageType.request]),
  subject: z
    .string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(150, 'El asunto no puede superar los 150 caracteres'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
});

const typeLabels: Record<ContactMessageType, string> = {
  [ContactMessageType.comment]: 'Comentario',
  [ContactMessageType.request]: 'Solicitud',
};

export function contactTypeLabel(type: ContactMessageType): string {
  return typeLabels[type] ?? type;
}

/** Opciones para el <Select> de tipo del formulario. */
export const contactTypeOptions = [
  { value: ContactMessageType.comment, label: typeLabels.comment },
  { value: ContactMessageType.request, label: typeLabels.request },
];

export function formatContactDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(dateString),
  );
}
