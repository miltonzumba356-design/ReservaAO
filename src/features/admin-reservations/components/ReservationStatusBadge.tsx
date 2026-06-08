import { cn } from '@/lib/utils'
import { RESERVATION_STATUS_LABELS, RESERVATION_STATUS_COLORS } from '@/lib/constants'
import type { ReservationStatus } from '@/types'

interface ReservationStatusBadgeProps {
  status: ReservationStatus
  className?: string
}

export function ReservationStatusBadge({ status, className }: ReservationStatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium',
      RESERVATION_STATUS_COLORS[status],
      className
    )}>
      {RESERVATION_STATUS_LABELS[status]}
    </span>
  )
}
