import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { name: 'Interior', value: 45, color: '#D9D0B5' },
  { name: 'Exterior', value: 28, color: '#B89A67' },
  { name: 'VIP',      value: 18, color: '#A89A85' },
  { name: 'Livre',    value: 9,  color: '#2d2d2d'  },
]

const tooltipStyle = {
  backgroundColor: '#232323',
  border: '1px solid #333333',
  borderRadius: '8px',
  color: '#F8F6F0',
  fontSize: '12px',
}

export function OccupancyChart() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Ocupação das Mesas</p>
      <p className="text-xs text-muted-foreground mb-2">Distribuição por zona</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, '']} />
          <Legend formatter={(v) => <span style={{ color: '#A89A85', fontSize: 11 }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
