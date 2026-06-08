import { motion } from 'framer-motion'
import { PaymentsTable } from '@/features/admin-payments/components/PaymentsTable'
import { mockPayments } from '@/data'
import { formatCurrency } from '@/lib/utils'

const totalConfirmed = mockPayments.filter(p => p.status === 'confirmed').reduce((s, p) => s + p.amount, 0)
const totalPending   = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)

const stats = [
  { label: 'Total Confirmado',   value: formatCurrency(totalConfirmed), color: 'text-success' },
  { label: 'Por Confirmar',      value: formatCurrency(totalPending),   color: 'text-warning' },
  { label: 'Nº Pagamentos',      value: String(mockPayments.length),    color: 'text-foreground' },
  { label: 'Pendentes',          value: String(mockPayments.filter(p => p.status === 'pending').length), color: 'text-warning' },
]

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: '#B89A67' }}>Gestão</p>
        <h1 className="font-display text-3xl text-primary">Pagamentos</h1>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border/40 bg-surface p-4">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <PaymentsTable />
    </div>
  )
}
