import { useAuthStore } from '@/store/auth.store'
import { ROUTES } from '@/lib/constants'
import { Link } from 'react-router-dom'
import { Calendar, PartyPopper, User } from 'lucide-react'

export default function ClientDashboardPage() {
  const user = useAuthStore((s) => s.user)

  const actions = [
    { label: 'Minhas Reservas', to: ROUTES.CLIENT.RESERVATIONS, icon: Calendar, desc: 'Ver e gerir as suas reservas' },
    { label: 'Meus Eventos', to: ROUTES.CLIENT.EVENTS, icon: PartyPopper, desc: 'Solicitar ou acompanhar eventos' },
    { label: 'Perfil', to: ROUTES.CLIENT.PROFILE, icon: User, desc: 'Dados pessoais e histórico' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-primary">
          Bem-vindo, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          {user?.vip ? 'Cliente VIP — Obrigado pela fidelidade.' : 'Bom dia. Como podemos ajudá-lo hoje?'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="rounded-xl border border-border bg-surface p-5 hover:border-primary/50 transition-colors group"
          >
            <action.icon className="w-6 h-6 text-primary mb-3" />
            <p className="font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
