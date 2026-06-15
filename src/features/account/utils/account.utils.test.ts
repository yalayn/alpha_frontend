import { describe, it, expect } from 'vitest';
import { profileSchema, roleLabel, formatMemberSince } from './account.utils';

describe('account utils', () => {
  describe('roleLabel', () => {
    it('traduce los roles conocidos', () => {
      expect(roleLabel('admin')).toBe('Administrador');
      expect(roleLabel('customer')).toBe('Cliente');
    });

    it('devuelve el valor crudo si el rol es desconocido', () => {
      expect(roleLabel('superuser')).toBe('superuser');
    });
  });

  describe('formatMemberSince', () => {
    it('formatea una fecha ISO en español', () => {
      const result = formatMemberSince('2025-01-01T12:00:00.000Z');
      expect(result).toContain('2025');
      expect(typeof result).toBe('string');
    });
  });

  describe('profileSchema', () => {
    it('acepta un nombre válido', () => {
      expect(profileSchema.safeParse({ name: 'John Doe' }).success).toBe(true);
    });

    it('rechaza un nombre vacío o de menos de 2 caracteres', () => {
      expect(profileSchema.safeParse({ name: '' }).success).toBe(false);
      expect(profileSchema.safeParse({ name: 'A' }).success).toBe(false);
    });

    it('rechaza un nombre de más de 100 caracteres', () => {
      expect(profileSchema.safeParse({ name: 'a'.repeat(101) }).success).toBe(false);
    });
  });
});
