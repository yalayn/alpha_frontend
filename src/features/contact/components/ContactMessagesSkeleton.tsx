import {
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/shared';

// SPE-009 §3.4 — placeholder de carga de la lista (mínimo 3 filas, DESIGN_SYSTEM §9.2).
export function ContactMessagesSkeleton() {
  return (
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
        {Array.from({ length: 3 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            <TableCell><Skeleton className="h-4 w-40" /></TableCell>
            <TableCell><Skeleton className="h-4 w-48" /></TableCell>
            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
