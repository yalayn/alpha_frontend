import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button, Input, ErrorMessage } from '@/shared';
import { loginSchema } from '../utils/auth.utils';
import { useLoginForm } from '../hooks/use-auth-form';
import type { LoginFormValues } from '../types/auth.types';

export function AuthLoginPage() {
  const { loginMutate, isPending, error } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: LoginFormValues) {
    loginMutate({ data });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-gray-500">Accede a tu cuenta de Project Alpha</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            autoComplete="current-password"
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          {error && <ErrorMessage error={error} />}

          <Button type="submit" isLoading={isPending} className="w-full">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
