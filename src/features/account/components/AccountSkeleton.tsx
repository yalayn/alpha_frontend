import { Card, CardBody, CardHeader, Skeleton } from '@/shared';

// Loading state (SPE-007 §3.4): placeholder con la forma del formulario.
export function AccountSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardBody className="space-y-5">
        {/* Campo nombre */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        {/* Campo email (solo lectura) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        {/* Metadatos */}
        <div className="flex gap-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-40" />
        </div>
        {/* Botón guardar */}
        <Skeleton className="h-9 w-36" />
      </CardBody>
    </Card>
  );
}
