import { cn } from '@/shared/utils/cn';

// DESIGN_SYSTEM.md §8.5 — Tabla para listados de datos estructurados.
// Composición explícita (como Card): Table + TableHeader/Body/Row/Head/Cell.

export interface TableProps {
  className?: string;
  children: React.ReactNode;
}

export function Table({ className, children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className={cn('w-full border-collapse text-left', className)}>{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  // Header: fondo subtle, texto sm/600 secundario (§8.5)
  return <thead className="bg-subtle">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ className, children }: { className?: string; children: React.ReactNode }) {
  // Fila: borde inferior 1px, hover subtle (§8.5)
  return (
    <tr className={cn('border-b border-border hover:bg-subtle', className)}>{children}</tr>
  );
}

export function TableHead({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className={cn('px-4 py-3 text-sm font-semibold text-foreground-secondary', className)}
    >
      {children}
    </th>
  );
}

export function TableCell({ className, children }: { className?: string; children: React.ReactNode }) {
  // Celda: text-base, texto principal. Metadatos usan text-sm/muted en el consumidor.
  return (
    <td className={cn('px-4 py-3 align-top text-base text-foreground', className)}>{children}</td>
  );
}
