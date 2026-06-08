import { motion } from 'framer-motion'
import { EventsTable } from '@/features/admin-events/components/EventsTable'
import { mockEvents }  from '@/data'


const stats = [
  { label: 'Total',      value: mockEvents.length,                                        color: 'text-foreground' },
  { label: 'Pendentes',  value: mockEvents.filter(e => e.status === 'pending').length,    color: 'text-warning' },
  { label: 'Aprovados',  value: mockEvents.filter(e => e.status === 'approved').length,   color: 'text-info' },
  { label: 'Concluídos', value: mockEvents.filter(e => e.status === 'completed').length,  color: 'text-success' },
]

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: '#B89A67' }}>Gestão</p>
        <h1 className="font-display text-3xl text-primary">Eventos</h1>
      </motion.div>

      <div className="grid grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border/40 bg-surface p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <EventsTable />
    </div>
  )
}
