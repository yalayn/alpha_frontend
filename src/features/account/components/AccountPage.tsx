import { ErrorMessage } from '@/shared';
import { useAccount } from '../hooks/use-account';
import { useEmailChangeStatus } from '../hooks/use-email-change';
import { AccountSkeleton } from './AccountSkeleton';
import { ProfileForm } from './ProfileForm';
import { EmailChangeForm } from './EmailChangeForm';
import { EmailChangePendingNotice } from './EmailChangePendingNotice';

// SPE-007 §3.2 — contenedor centrado estrecho (640px). SPE-008 añade el bloque de cambio de email.
export function AccountPage() {
  const { user, isLoading, error, refetch } = useAccount();
  const { pending } = useEmailChangeStatus();

  return (
    <div className="mx-auto max-w-[640px] px-4 py-8 space-y-6">
      {isLoading ? (
        <AccountSkeleton />
      ) : error ? (
        <ErrorMessage error={error} onRetry={() => refetch()} />
      ) : user ? (
        <>
          <ProfileForm user={user} />
          {pending && <EmailChangePendingNotice pending={pending} />}
          <EmailChangeForm currentEmail={user.email ?? ''} />
        </>
      ) : null}
    </div>
  );
}
