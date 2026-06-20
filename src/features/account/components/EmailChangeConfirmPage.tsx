import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Spinner, Heading, Text, TextLink, ErrorMessage } from '@/shared';
import { useConfirmEmailChange } from '@/api/generated/auth/auth';

/**
 * SPE-008 §3.3 — página pública (sin layout) de confirmación de un token.
 * Lee el token de la query y lo confirma al montar. El token es la única prueba
 * requerida (RN-004), por eso no necesita sesión.
 */
export function EmailChangeConfirmPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const confirmedOnce = useRef(false);

  const mutation = useConfirmEmailChange();
  const { mutate } = mutation;

  useEffect(() => {
    // Guarda contra el doble montaje de React StrictMode y los tokens de un solo uso.
    if (!token || confirmedOnce.current) return;
    confirmedOnce.current = true;
    mutate({ data: { token } });
  }, [token, mutate]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <Heading size="2xl">Confirmar cambio de email</Heading>
        {renderContent()}
        <Text variant="secondary">
          <TextLink as={Link} to="/account">Volver a mi cuenta</TextLink>
        </Text>
      </div>
    </div>
  );

  function renderContent() {
    if (!token) {
      return (
        <ErrorMessage error={{ message: 'El enlace no es válido: falta el token de confirmación.' }} />
      );
    }

    if (mutation.isPending || mutation.isIdle) {
      return (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      );
    }

    if (mutation.isError) {
      return (
        <div className="space-y-3">
          <ErrorMessage error={mutation.error} />
          <Text variant="secondary">
            El enlace puede haber expirado o ya haberse usado. Solicita el cambio de nuevo desde tu
            cuenta.
          </Text>
        </div>
      );
    }

    const result = mutation.data;
    return (
      <Text>
        {result?.applied
          ? 'Ambos correos confirmados. Tu email quedó actualizado.'
          : 'Correo confirmado. Falta confirmar el otro enlace para aplicar el cambio.'}
      </Text>
    );
  }
}
