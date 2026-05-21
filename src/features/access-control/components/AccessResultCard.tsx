import { Card, CardBody, Badge } from '@/shared';
import { reasonToMessage } from '../utils/access-control.utils';
import type { AccessResult } from '@/api/generated/model';

type AccessResultCardProps = Pick<AccessResult, 'hasAccess' | 'reason' | 'customerId' | 'featureId'>;

export function AccessResultCard({ hasAccess, reason, customerId, featureId }: AccessResultCardProps) {
  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge variant={hasAccess ? 'success' : 'error'} size="md">
            {hasAccess ? 'Acceso permitido' : 'Acceso denegado'}
          </Badge>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Cliente:</span> {customerId}</p>
          <p><span className="font-medium">Funcionalidad:</span> {featureId}</p>
        </div>
        {!hasAccess && reason && (
          <p className="text-sm text-red-600">{reasonToMessage(reason)}</p>
        )}
      </CardBody>
    </Card>
  );
}
