import { Card, CardBody, CardHeader, Badge, Heading, Text } from '@/shared';
import type { EmailChangeStatus } from '@/api/generated/model';
import { formatExpiresAt } from '../utils/account.utils';

// SPE-008 §3.3 — aviso del cambio de email pendiente y qué correo falta confirmar.
export function EmailChangePendingNotice({ pending }: { pending: EmailChangeStatus }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Heading size="lg">Cambio de email pendiente</Heading>
          <Badge variant="warning">Pendiente</Badge>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        <Text variant="secondary">
          Solicitaste cambiar tu email a{' '}
          <Text as="span" variant="label">{pending.newEmail}</Text>. El cambio se aplicará cuando
          confirmes los dos correos.
        </Text>

        <div className="space-y-2">
          <ConfirmationRow label="Correo actual" confirmed={pending.oldEmailConfirmed} />
          <ConfirmationRow label="Correo nuevo" confirmed={pending.newEmailConfirmed} />
        </div>

        <Text variant="secondary">
          Los enlaces vencen el{' '}
          <Text as="span" variant="label">{formatExpiresAt(pending.expiresAt)}</Text>.
        </Text>
      </CardBody>
    </Card>
  );
}

function ConfirmationRow({ label, confirmed }: { label: string; confirmed: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <Text>{label}</Text>
      <Badge variant={confirmed ? 'success' : 'default'}>
        {confirmed ? 'Confirmado' : 'Pendiente'}
      </Badge>
    </div>
  );
}
