import { Card, CardBody, CardHeader, Badge } from '@/shared';

interface HealthStatusCardProps {
  status: 'ok' | 'degraded';
  database: 'connected' | 'disconnected';
  timestamp: string;
}

export function HealthStatusCard({ status, database, timestamp }: HealthStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Estado del sistema</h2>
          <Badge variant={status === 'ok' ? 'success' : 'warning'}>
            {status === 'ok' ? 'Operativo' : 'Degradado'}
          </Badge>
        </div>
      </CardHeader>
      <CardBody className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span>Base de datos</span>
          <Badge variant={database === 'connected' ? 'success' : 'error'} size="sm">
            {database === 'connected' ? 'Conectada' : 'Desconectada'}
          </Badge>
        </div>
        <p className="text-xs text-gray-400">
          Última verificación: {new Date(timestamp).toLocaleString('es-ES')}
        </p>
      </CardBody>
    </Card>
  );
}
