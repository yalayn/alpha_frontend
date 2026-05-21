import { useNavigate } from 'react-router-dom';
import { useLoginUser, useRegisterUser } from '@/api/generated/auth/auth';
import { useAuth } from '@/core/auth/use-auth';

export function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useLoginUser({
    mutation: {
      onSuccess: (data) => {
        // loginUser devuelve AuthResponse → el user está anidado
        if (data.user) login(data.user);
        navigate('/dashboard');
      },
    },
  });

  return {
    loginMutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useRegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useRegisterUser({
    mutation: {
      onSuccess: (data) => {
        // registerUser devuelve User directamente (no AuthResponse)
        login(data);
        navigate('/dashboard');
      },
    },
  });

  return {
    registerMutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
