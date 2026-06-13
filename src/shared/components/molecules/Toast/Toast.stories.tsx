import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { variant: 'success', message: 'Te has suscrito al plan Pro.' },
};

// DESIGN_SYSTEM.md §10 — error: 5s y con botón de cierre
export const Error: Story = {
  args: {
    variant: 'error',
    message: 'El método de pago fue rechazado. Verifica los datos e intenta de nuevo.',
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: { variant: 'warning', message: 'Tu plan vence en 3 días.' },
};

export const Info: Story = {
  args: { variant: 'info', message: 'El cambio se aplicará al final del ciclo actual.' },
};

export const Stacked: Story = {
  args: { variant: 'info', message: '' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Toast variant="success" message="Plan creado correctamente." />
      <Toast variant="warning" message="Tu plan vence en 3 días." />
      <Toast variant="error" message="No se pudo cancelar la suscripción." onClose={() => {}} />
    </div>
  ),
};
