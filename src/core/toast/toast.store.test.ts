import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useToastStore } from './toast.store';

describe('toast.store', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('agrega un toast con variant y message', () => {
    useToastStore.getState().show('success', 'Suscripción creada.');

    const { toasts } = useToastStore.getState();
    expect(toasts).toHaveLength(1);
    expect(toasts[0].variant).toBe('success');
    expect(toasts[0].message).toBe('Suscripción creada.');
  });

  it('auto-descarta un success a los 3s (DESIGN_SYSTEM.md §10)', () => {
    useToastStore.getState().show('success', 'Listo.');

    vi.advanceTimersByTime(2999);
    expect(useToastStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(1);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('auto-descarta un error a los 5s', () => {
    useToastStore.getState().show('error', 'Falló.');

    vi.advanceTimersByTime(4999);
    expect(useToastStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(1);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('mantiene máximo 3 toasts y descarta el más antiguo', () => {
    const { show } = useToastStore.getState();
    show('info', 'uno');
    show('info', 'dos');
    show('info', 'tres');
    show('info', 'cuatro');

    const messages = useToastStore.getState().toasts.map((t) => t.message);
    expect(messages).toEqual(['dos', 'tres', 'cuatro']);
  });

  it('dismiss remueve el toast por id', () => {
    useToastStore.getState().show('warning', 'Atención.');
    const id = useToastStore.getState().toasts[0].id;

    useToastStore.getState().dismiss(id);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
