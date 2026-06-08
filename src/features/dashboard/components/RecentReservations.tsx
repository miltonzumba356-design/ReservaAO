import { Link } from 'react-router-dom'
import { mockReservations } from '@/data'
import { RESERVATION_STATUS_LABELS, RESERVATION_STATUS_COLORS, ROUTES } from '@/lib/constants'
import { formatDate, cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export function RecentReservations() {
  const recent = mockReservations.slice(0, 6)

  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-foreground">Reservas Recentes</p>
        <Link to={ROUTES.ADMIN.RESERVATIONS}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          Ver todas <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {recent.map(r => (
          <div key={r.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{r.clientName}</p>
              <p className="text-xs text-muted-foreground">{formatDate(r.date)} · {r.time} · Mesa {r.tableNumber}</p>
            </div>
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2', RESERVATION_STATUS_COLORS[r.status])}>
              {RESERVATION_STATUS_LABELS[r.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
