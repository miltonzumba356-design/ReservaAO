import { KPIGrid }            from '@/features/dashboard/components/KPIGrid'
import { ReservationsChart }   from '@/features/dashboard/components/ReservationsChart'
import { RevenueChart }        from '@/features/dashboard/components/RevenueChart'
import { OccupancyChart }      from '@/features/dashboard/components/OccupancyChart'
import { RecentReservations }  from '@/features/dashboard/components/RecentReservations'
import { AlertsPanel }         from '@/features/dashboard/components/AlertsPanel'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: '#B89A67' }}>
          {formatDate(new Date(), 'EEEE, dd MMMM yyyy')}
        </p>
        <h1 className="font-display text-3xl text-primary">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Visão geral das operações do Palace Lounge</p>
      </motion.div>

      {/* KPIs */}
      <KPIGrid />

      {/* Alertas */}
      <AlertsPanel />

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><ReservationsChart /></div>
        <div><OccupancyChart /></div>
      </div>

      {/* Charts row 2 + Recent */}
      <div className="grid lg:grid-cols-2 gap-5">
        <RevenueChart />
        <RecentReservations />
      </div>
    </div>
  )
}
