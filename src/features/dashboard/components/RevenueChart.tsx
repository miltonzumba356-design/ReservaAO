import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jul', receita: 2800000, meta: 3000000 },
  { month: 'Ago', receita: 3200000, meta: 3000000 },
  { month: 'Set', receita: 2950000, meta: 3000000 },
  { month: 'Out', receita: 3800000, meta: 3500000 },
  { month: 'Nov', receita: 3400000, meta: 3500000 },
  { month: 'Dez', receita: 4800000, meta: 4500000 },
  { month: 'Jan', receita: 2600000, meta: 3000000 },
  { month: 'Fev', receita: 3600000, meta: 3500000 },
  { month: 'Mar', receita: 3900000, meta: 3800000 },
  { month: 'Abr', receita: 4100000, meta: 4000000 },
  { month: 'Mai', receita: 3850000, meta: 4000000 },
  { month: 'Jun', receita: 4200000, meta: 4200000 },
]

const fmt = (v: number) => `${(v / 1000000).toFixed(1)}M`

const tooltipStyle = {
  backgroundColor: '#232323',
  border: '1px solid #333333',
  borderRadius: '8px',
  color: '#F8F6F0',
  fontSize: '12px',
}

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Receita Mensal</p>
      <p className="text-xs text-muted-foreground mb-4">AOA · últimos 12 meses</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#D9D0B5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#D9D0B5" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="metaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#B89A67" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#B89A67" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmt} tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${(Number(v)/1000000).toFixed(2)}M AOA`, '']} />
          <Area type="monotone" dataKey="meta"    name="Meta"    stroke="#B89A67" strokeWidth={1.5} fill="url(#metaGrad)"    strokeDasharray="4 4" />
          <Area type="monotone" dataKey="receita" name="Receita" stroke="#D9D0B5" strokeWidth={2}   fill="url(#receitaGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
