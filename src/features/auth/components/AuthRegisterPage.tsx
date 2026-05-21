import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button, Input, ErrorMessage } from '@/shared';
import { registerSchema } from '../utils/auth.utils';
import { useRegisterForm } from '../hooks/use-auth-form';
import type { RegisterFormValues } from '../types/auth.types';

export function AuthRegisterPage() {
  const { registerMutate, isPending, error } = useRegisterForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  function onSubmit(data: RegisterFormValues) {
    registerMutate({ data });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
          <p className="mt-1 text-sm text-gray-500">Únete a Project Alpha</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            autoComplete="email"
            errorMessage={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          {error && <ErrorMessage error={error} />}

          <Button type="submit" isLoading={isPending} className="w-full">
            Crear cuenta
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
