import { ErrorMessage } from '@/shared';
import { useAccount } from '../hooks/use-account';
import { AccountSkeleton } from './AccountSkeleton';
import { ProfileForm } from './ProfileForm';

// SPE-007 §3.2 — contenedor centrado estrecho (640px), patrón de formulario único.
export function AccountPage() {
  const { user, isLoading, error, refetch } = useAccount();

  return (
    <div className="mx-auto max-w-[640px] px-4 py-8">
      {isLoading ? (
        <AccountSkeleton />
      ) : error ? (
        <ErrorMessage error={error} onRetry={() => refetch()} />
      ) : user ? (
        <ProfileForm user={user} />
      ) : null}
    </div>
  );
}
