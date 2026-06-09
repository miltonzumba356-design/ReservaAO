import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useVenueStore } from '@/store/venue.store'

interface KPI {
  label: string
  value: string
  sub: string
  trend?: 'up' | 'down' | 'neutral'
  color: string
}

const kpis: KPI[] = [
  { label: 'Reservas Hoje',       value: '8',          sub: '+2 vs ontem',           trend: 'up',      color: 'text-info' },
  { label: 'Clientes Registados', value: '248',        sub: '+3 esta semana',        trend: 'up',      color: 'text-success' },
  { label: 'Eventos Agendados',   value: '5',          sub: '2 por confirmar',       trend: 'neutral', color: 'text-warning' },
  { label: 'Receita do Dia',      value: '185.000 AOA',sub: '92% da meta diária',    trend: 'up',      color: 'text-primary' },
  { label: 'Receita do Mês',      value: '4,2M AOA',   sub: '+12% vs mês anterior',  trend: 'up',      color: 'text-accent' },
  { label: 'Taxa de Ocupação',    value: '73%',        sub: 'média das mesas',       trend: 'up',      color: 'text-info' },
  { label: 'Cancelamentos',       value: '3',          sub: 'este mês',              trend: 'down',    color: 'text-danger' },
  { label: 'Clientes VIP',        value: '42',         sub: '17% do total',          trend: 'up',      color: 'text-accent' },
]

export function KPIGrid() {
  const tables = useVenueStore((state) => state.tables)
  const availableTables = tables.filter((table) => table.status === 'available').length
  const occupiedTables = tables.filter((table) => table.status === 'occupied').length
  const reservedTables = tables.filter((table) => table.status === 'reserved').length
  const allKpis: KPI[] = [
    ...kpis,
    {
      label: 'Mesas',
      value: String(tables.length),
      sub: `${availableTables} vagas | ${occupiedTables} ocupadas | ${reservedTables} reservadas`,
      trend: 'neutral',
      color: 'text-success',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
      {allKpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className="rounded-xl border border-border/40 bg-surface p-4 hover:border-primary/30 transition-colors space-y-1"
        >
          <p className="text-xs text-muted-foreground leading-tight">{kpi.label}</p>
          <p className={cn('text-xl font-bold', kpi.color)}>{kpi.value}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {kpi.trend === 'up'      && <TrendingUp   className="w-3 h-3 text-success" />}
            {kpi.trend === 'down'    && <TrendingDown className="w-3 h-3 text-danger" />}
            {kpi.trend === 'neutral' && <Minus        className="w-3 h-3 text-warning" />}
            <span>{kpi.sub}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
