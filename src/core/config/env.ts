export const env = {
  apiUrl: import.meta.env.VITE_API_URL as string,
  appEnv: (import.meta.env.VITE_APP_ENV ?? 'development') as string,
} as const;
