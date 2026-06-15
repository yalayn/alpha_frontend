import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/core/auth/use-auth';
import { Avatar } from '@/shared';
import { cn } from '@/shared/utils/cn';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', adminOnly: false },
  { to: '/plans', label: 'Planes', adminOnly: false },
  { to: '/subscription', label: 'Suscripción', adminOnly: false },
  { to: '/access', label: 'Validar Acceso', adminOnly: false },
];

function navLinkClass(isActive: boolean) {
  return cn(
    'whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-brand-50 text-brand-600'
      : 'text-foreground-secondary hover:bg-subtle hover:text-foreground',
  );
}

// Menú de usuario (avatar) — vive a la derecha del topbar (NAVIGATION_RULES §5).
// Entradas: "Mi cuenta" (SPE-007) y "Salir".
function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function goToAccount() {
    setOpen(false);
    navigate('/account');
  }

  function handleLogout() {
    setOpen(false);
    logout();
    navigate('/login');
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-subtle"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={user?.name ?? '?'} size="sm" />
        <span className="hidden flex-col items-start sm:flex">
          <span className="text-sm font-medium leading-tight text-foreground">{user?.name}</span>
          <span className="text-xs capitalize leading-tight text-foreground-muted">{user?.role}</span>
        </span>
        <ChevronDown className="h-4 w-4 text-foreground-muted" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-[110] mt-2 w-48 overflow-hidden rounded-md border border-border bg-surface shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={goToAccount}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground hover:bg-subtle"
          >
            <UserIcon className="h-4 w-4" aria-hidden="true" />
            Mi cuenta
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground hover:bg-subtle"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Salir
          </button>
        </div>
      )}
    </div>
  );
}

// DESIGN_SYSTEM.md §7.2 — Topbar: 56px fijo, fondo surface, borde inferior, sticky
export function AppLayout() {
  const { isAdmin } = useAuth();

  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-[100] w-full border-b border-border bg-surface">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <span className="text-base font-bold tracking-tight text-brand-500">
              Project Alpha
            </span>
            {/* Nav links */}
            <div className="hidden items-center gap-1 sm:flex">
              {visibleItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Menú de usuario */}
          <UserMenu />
        </div>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 sm:hidden">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
