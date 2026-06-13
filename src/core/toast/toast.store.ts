import { create } from 'zustand';
import type { ToastVariant } from '@/shared';

export type { ToastVariant };

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
}

// DESIGN_SYSTEM.md §10 — duración por tipo
const DURATION_MS: Record<ToastVariant, number> = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000,
};

// §10 — máximo 3 visibles; el más antiguo se descarta
const MAX_VISIBLE = 3;

interface ToastStore {
  toasts: ToastItem[];
  show: (variant: ToastVariant, message: string) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  show: (variant, message) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, variant, message }].slice(-MAX_VISIBLE),
    }));
    setTimeout(() => get().dismiss(id), DURATION_MS[variant]);
  },
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
