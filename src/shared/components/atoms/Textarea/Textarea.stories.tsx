import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Mensaje',
    placeholder: 'Escribe tu comentario o solicitud…',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Mensaje',
    placeholder: 'Escribe tu comentario o solicitud…',
    helperText: 'Entre 10 y 2000 caracteres.',
  },
};

// DESIGN_SYSTEM.md §9.4 — error de validación: debajo del campo, nunca toast
export const WithError: Story = {
  args: {
    label: 'Mensaje',
    defaultValue: 'Corto',
    errorMessage: 'El mensaje debe tener al menos 10 caracteres.',
  },
};

export const Disabled: Story = {
  args: { label: 'Mensaje', defaultValue: 'Solo lectura', disabled: true },
};
