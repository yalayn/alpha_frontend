import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  Card, CardBody, CardHeader, CardFooter, Button, Input, Badge, Heading, Text,
} from '@/shared';
import { useUpdateCurrentUser, getGetCurrentUserQueryKey } from '@/api/generated/auth/auth';
import type { User } from '@/api/generated/model';
import { useAuth } from '@/core/auth/use-auth';
import { useToast } from '@/core/toast';
import { profileSchema, roleLabel, formatMemberSince } from '../utils/account.utils';
import type { ProfileFormValues } from '../types/account.types';

export function ProfileForm({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { name: user.name ?? '' },
  });

  const mutation = useUpdateCurrentUser({
    mutation: {
      onSuccess: (updated) => {
        queryClient.invalidateQueries({ queryKey: getGetCurrentUserQueryKey() });
        updateUser(updated);            // refresca el nombre del menú de usuario
        reset({ name: updated.name });  // limpia el estado "dirty" (deshabilita Guardar)
        toast.success('Tu perfil fue actualizado.');
      },
      onError: () => {
        toast.error('No se pudo actualizar tu perfil. Intenta de nuevo.');
      },
    },
  });

  function onSubmit(values: ProfileFormValues) {
    mutation.mutate({ data: { name: values.name } });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Heading size="xl">Mi cuenta</Heading>
          <Badge variant={user.role === 'admin' ? 'success' : 'default'}>
            {roleLabel(user.role ?? '')}
          </Badge>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-5">
          <Input
            label="Nombre"
            type="text"
            autoComplete="name"
            errorMessage={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email"
            type="email"
            value={user.email ?? ''}
            readOnly
            disabled
            helperText="El email no se puede editar por ahora."
          />
          <Text variant="secondary">
            <Text as="span" variant="label">Miembro desde:</Text>{' '}
            {user.createdAt ? formatMemberSince(user.createdAt) : '—'}
          </Text>
        </CardBody>

        <CardFooter>
          <Button type="submit" isLoading={mutation.isPending} disabled={!isDirty || !isValid}>
            Guardar cambios
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
