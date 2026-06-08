import { useAuthStore } from '@/store/auth.store'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function ClientProfilePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-3xl text-primary">Perfil</h1>

      {user && (
        <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Nome</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Telefone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cliente desde</p>
              <p className="font-medium">{formatDate(user.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total gasto</p>
              <p className="font-medium text-accent">{formatCurrency(user.totalSpent)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Reservas</p>
              <p className="font-medium">{user.reservationCount}</p>
            </div>
          </div>
          {user.vip && (
            <div className="pt-4 border-t border-border">
              <span className="text-xs bg-accent/20 text-accent px-2.5 py-1 rounded-full font-medium">
                Cliente VIP
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
