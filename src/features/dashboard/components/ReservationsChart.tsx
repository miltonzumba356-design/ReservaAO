import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const data = [
  { month: 'Jul', reservas: 45, canceladas: 5 },
  { month: 'Ago', reservas: 52, canceladas: 4 },
  { month: 'Set', reservas: 48, canceladas: 6 },
  { month: 'Out', reservas: 61, canceladas: 3 },
  { month: 'Nov', reservas: 55, canceladas: 8 },
  { month: 'Dez', reservas: 78, canceladas: 5 },
  { month: 'Jan', reservas: 42, canceladas: 7 },
  { month: 'Fev', reservas: 58, canceladas: 4 },
  { month: 'Mar', reservas: 63, canceladas: 6 },
  { month: 'Abr', reservas: 71, canceladas: 5 },
  { month: 'Mai', reservas: 68, canceladas: 4 },
  { month: 'Jun', reservas: 85, canceladas: 3 },
]

const tooltipStyle = {
  backgroundColor: '#232323',
  border: '1px solid #333333',
  borderRadius: '8px',
  color: '#F8F6F0',
  fontSize: '12px',
}

export function ReservationsChart() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Reservas por Mês</p>
      <p className="text-xs text-muted-foreground mb-4">Últimos 12 meses</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Legend formatter={(v) => <span style={{ color: '#A89A85', fontSize: 11 }}>{v}</span>} />
          <Bar dataKey="reservas"  name="Confirmadas" fill="#D9D0B5" radius={[3, 3, 0, 0]} />
          <Bar dataKey="canceladas" name="Canceladas"  fill="#C74A4A" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
