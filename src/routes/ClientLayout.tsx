import { Outlet, NavLink, Link, Navigate } from 'react-router-dom'
import { User, Calendar, Star, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { ROUTES, APP_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'

const navLinks = [
  { to: ROUTES.CLIENT.DASHBOARD, label: 'Início', icon: LayoutDashboard, end: true },
  { to: ROUTES.CLIENT.RESERVATIONS, label: 'Reservas', icon: Calendar },
  { to: ROUTES.CLIENT.EVENTS, label: 'Eventos', icon: Star },
  { to: ROUTES.CLIENT.PROFILE, label: 'Perfil', icon: User },
]

export function ClientLayout() {
  const { isAuthenticated, user, logout } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/40 bg-surface">
        <div className="p-6 border-b border-border/40">
          <Link to={ROUTES.HOME} className="font-display text-lg text-primary">
            {APP_NAME}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )
              }
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
              {user ? getInitials(user.name) : '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              {user?.vip && (
                <p className="text-xs text-accent">Cliente VIP</p>
              )}
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Terminar sessão
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
