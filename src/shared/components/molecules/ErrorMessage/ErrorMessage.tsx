import { cn } from '@/shared/utils/cn';

interface ApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
  message?: string;
}

export interface ErrorMessageProps {
  error: ApiError | Error | unknown;
  className?: string;
}

function extractMessage(error: ApiError | Error | unknown): string {
  if (!error) return 'Ha ocurrido un error inesperado.';
  const apiError = error as ApiError;
  return (
    apiError.response?.data?.message ??
    (error as Error).message ??
    'Ha ocurrido un error inesperado.'
  );
}

export function ErrorMessage({ error, className }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700',
        className,
      )}
    >
      {extractMessage(error)}
    </div>
  );
}
