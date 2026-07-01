import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table';
import { Badge } from '../../atoms/Badge';

const meta = {
  title: 'Molecules/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// DESIGN_SYSTEM.md §8.5 — primer uso del componente (SPE-009)
export const Default: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>Remitente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Asunto</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              John Doe
              <span className="block text-sm text-foreground-muted">john.doe@example.com</span>
            </TableCell>
            <TableCell>
              <Badge variant="brand">Solicitud</Badge>
            </TableCell>
            <TableCell>Sugerencia sobre el panel</TableCell>
            <TableCell className="text-sm text-foreground-muted">01 ene 2025, 12:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Ada Lovelace
              <span className="block text-sm text-foreground-muted">ada@example.com</span>
            </TableCell>
            <TableCell>
              <Badge>Comentario</Badge>
            </TableCell>
            <TableCell>Me encanta la app</TableCell>
            <TableCell className="text-sm text-foreground-muted">31 dic 2024, 09:30</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};
