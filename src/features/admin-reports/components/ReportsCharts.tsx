import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts'

const tooltip = {
  backgroundColor: '#232323',
  border: '1px solid #333',
  borderRadius: '8px',
  color: '#F8F6F0',
  fontSize: '12px',
}

const cancelData = [
  { month: 'Jan', cancelamentos: 7, noShows: 3 },
  { month: 'Fev', cancelamentos: 4, noShows: 2 },
  { month: 'Mar', cancelamentos: 6, noShows: 4 },
  { month: 'Abr', cancelamentos: 5, noShows: 1 },
  { month: 'Mai', cancelamentos: 4, noShows: 2 },
  { month: 'Jun', cancelamentos: 3, noShows: 1 },
]

const topClients = [
  { name: 'Dr. António Bento',        gasto: 450000 },
  { name: 'Francisco Xavier',          gasto: 380000 },
  { name: 'Dra. Maria Lopes',          gasto: 320000 },
  { name: 'Ana Paula Henriques',       gasto: 210000 },
  { name: 'Eng. Carlos Domingos',      gasto: 210000 },
]

const occupancyTrend = [
  { week: 'S1', taxa: 62 }, { week: 'S2', taxa: 71 }, { week: 'S3', taxa: 68 },
  { week: 'S4', taxa: 75 }, { week: 'S5', taxa: 80 }, { week: 'S6', taxa: 73 },
]

const productData = [
  { name: 'Lombo Angus',    vendas: 48, color: '#D9D0B5' },
  { name: 'Salmão Maracujá',vendas: 38, color: '#B89A67' },
  { name: 'Espresso Martini',vendas:35, color: '#A89A85' },
  { name: 'Risotto Camarão',vendas: 30, color: '#7a6a55' },
  { name: 'Mousse Chocolate',vendas:28, color: '#4a3f30' },
]

export function CancellationsReport() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Cancelamentos e No-Shows</p>
      <p className="text-xs text-muted-foreground mb-4">Últimos 6 meses</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={cancelData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltip} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Legend formatter={v => <span style={{ color: '#A89A85', fontSize: 11 }}>{v}</span>} />
          <Bar dataKey="cancelamentos" name="Cancelamentos" fill="#C74A4A" radius={[3,3,0,0]} />
          <Bar dataKey="noShows"       name="No-Shows"       fill="#D6A93D" radius={[3,3,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopClientsReport() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Top 5 Clientes</p>
      <p className="text-xs text-muted-foreground mb-4">Por total gasto (AOA)</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={topClients} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" tickFormatter={v => `${(v/1000).toFixed(0)}K`}
            tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#A89A85', fontSize: 10 }} axisLine={false} tickLine={false} width={130} />
          <Tooltip contentStyle={tooltip} formatter={(v) => [`${(Number(v)/1000).toFixed(0)}K AOA`, '']} />
          <Bar dataKey="gasto" name="Total Gasto" fill="#D9D0B5" radius={[0,3,3,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function OccupancyReport() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Taxa de Ocupação Semanal</p>
      <p className="text-xs text-muted-foreground mb-4">% das mesas ocupadas</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={occupancyTrend} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[50, 100]} tick={{ fill: '#A89A85', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltip} formatter={(v) => [`${v}%`, '']} />
          <Line type="monotone" dataKey="taxa" name="Ocupação" stroke="#D9D0B5" strokeWidth={2.5} dot={{ fill: '#D9D0B5', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopProductsReport() {
  return (
    <div className="rounded-xl border border-border/40 bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-1">Produtos mais Vendidos</p>
      <p className="text-xs text-muted-foreground mb-4">Nº de pedidos este mês</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={productData} cx="50%" cy="50%" outerRadius={75} paddingAngle={2} dataKey="vendas">
            {productData.map((e, i) => <Cell key={i} fill={e.color} />)}
          </Pie>
          <Tooltip contentStyle={tooltip} formatter={(v) => [`${v} pedidos`, '']} />
          <Legend formatter={v => <span style={{ color: '#A89A85', fontSize: 11 }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
