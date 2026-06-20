import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody, CardFooter, CardHeader, Button, Input, Heading, Text } from '@/shared';
import { emailChangeSchema } from '../utils/account.utils';
import type { EmailChangeFormValues } from '../types/account.types';
import { useRequestEmailChangeForm } from '../hooks/use-email-change';

// SPE-008 §3.3 — solicitud del cambio de email (genera los dos tokens de verificación).
export function EmailChangeForm({ currentEmail }: { currentEmail: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EmailChangeFormValues>({
    resolver: zodResolver(emailChangeSchema),
    mode: 'onChange',
    defaultValues: { newEmail: '' },
  });

  const { requestChange, isPending } = useRequestEmailChangeForm({
    onSuccess: () => reset({ newEmail: '' }),
  });

  function onSubmit(values: EmailChangeFormValues) {
    requestChange(values.newEmail.trim());
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">Cambiar email</Heading>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-4">
          <Text variant="secondary">
            Email actual: <Text as="span" variant="label">{currentEmail}</Text>
          </Text>
          <Input
            label="Nuevo email"
            type="email"
            autoComplete="email"
            placeholder="nuevo@correo.com"
            errorMessage={errors.newEmail?.message}
            helperText="Te enviaremos un enlace de confirmación a tu correo actual y al nuevo. El cambio se aplica al confirmar ambos."
            {...register('newEmail')}
          />
        </CardBody>

        <CardFooter>
          <Button type="submit" isLoading={isPending} disabled={!isValid}>
            Solicitar cambio
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
