import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth } from '@/core/auth/use-auth';

const AuthLoginPage = lazy(() =>
  import('@/features/auth').then((m) => ({ default: m.AuthLoginPage })),
);
const AuthRegisterPage = lazy(() =>
  import('@/features/auth').then((m) => ({ default: m.AuthRegisterPage })),
);
const DashboardPage = lazy(() =>
  import('@/features/dashboard').then((m) => ({ default: m.DashboardPage })),
);
const PlansPage = lazy(() =>
  import('@/features/plans').then((m) => ({ default: m.PlansPage })),
);
const PlanDetailPage = lazy(() =>
  import('@/features/plans').then((m) => ({ default: m.PlanDetailPage })),
);
const PlanCreatePage = lazy(() =>
  import('@/features/plans').then((m) => ({ default: m.PlanCreatePage })),
);
const SubscriptionDetailPage = lazy(() =>
  import('@/features/subscriptions').then((m) => ({ default: m.SubscriptionDetailPage })),
);
const AccessControlPage = lazy(() =>
  import('@/features/access-control').then((m) => ({ default: m.AccessControlPage })),
);

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <SuspenseWrapper><AuthLoginPage /></SuspenseWrapper>,
  },
  {
    path: '/register',
    element: <SuspenseWrapper><AuthRegisterPage /></SuspenseWrapper>,
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <SuspenseWrapper><DashboardPage /></SuspenseWrapper>
      </RequireAuth>
    ),
  },
  {
    path: '/plans',
    element: (
      <RequireAuth>
        <SuspenseWrapper><PlansPage /></SuspenseWrapper>
      </RequireAuth>
    ),
  },
  {
    path: '/plans/new',
    element: (
      <RequireAuth>
        <RequireAdmin>
          <SuspenseWrapper><PlanCreatePage /></SuspenseWrapper>
        </RequireAdmin>
      </RequireAuth>
    ),
  },
  {
    path: '/plans/:planId',
    element: (
      <RequireAuth>
        <SuspenseWrapper><PlanDetailPage /></SuspenseWrapper>
      </RequireAuth>
    ),
  },
  {
    path: '/subscriptions/:subscriptionId',
    element: (
      <RequireAuth>
        <SuspenseWrapper><SubscriptionDetailPage /></SuspenseWrapper>
      </RequireAuth>
    ),
  },
  {
    path: '/access',
    element: (
      <RequireAuth>
        <SuspenseWrapper><AccessControlPage /></SuspenseWrapper>
      </RequireAuth>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
]);
