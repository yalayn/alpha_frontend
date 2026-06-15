import { z } from 'zod';

// Esquema derivado de UpdateProfileRequest (openapi): solo `name`.
// El email no es editable en esta feature (ver SPE-008).
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
});

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  customer: 'Cliente',
};

export function roleLabel(role: string): string {
  return roleLabels[role] ?? role;
}

export function formatMemberSince(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(dateString));
}
