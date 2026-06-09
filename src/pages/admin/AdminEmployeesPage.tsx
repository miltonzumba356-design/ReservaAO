import { FormEvent, useMemo, useState } from 'react'
import { ClipboardList, Plus, Trophy, UserCog } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { useVenueStore } from '@/store/venue.store'
import type { EmployeeRole } from '@/types'

const roleLabels: Record<EmployeeRole, string> = {
  attendant: 'Atendente',
  seller: 'Vendedor',
  operator: 'Operador',
}

export default function AdminEmployeesPage() {
  const tables = useVenueStore((state) => state.tables)
  const employees = useVenueStore((state) => state.employees)
  const employeeOrders = useVenueStore((state) => state.employeeOrders)
  const registerEmployee = useVenueStore((state) => state.registerEmployee)
  const assignEmployeeToTable = useVenueStore((state) => state.assignEmployeeToTable)
  const createEmployeeOrder = useVenueStore((state) => state.createEmployeeOrder)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState<EmployeeRole>('attendant')
  const [tableId, setTableId] = useState(tables[0]?.id ?? '')

  const [orderEmployeeId, setOrderEmployeeId] = useState(employees[0]?.id ?? '')
  const selectedEmployee = employees.find((employee) => employee.id === orderEmployeeId)
  const [orderTableId, setOrderTableId] = useState(selectedEmployee?.tableId || tables[0]?.id || '')
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)

  const topEmployees = useMemo(() => {
    return employeeOrders
      .reduce<Array<{ id: string; name: string; total: number; orders: number }>>((acc, order) => {
        const item = acc.find((entry) => entry.id === order.employeeId)
        if (item) {
          item.total += order.total
          item.orders += 1
        } else {
          acc.push({ id: order.employeeId, name: order.employeeName, total: order.total, orders: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [employeeOrders])

  const topTables = useMemo(() => {
    return employeeOrders
      .reduce<Array<{ id: string; name: string; total: number; orders: number }>>((acc, order) => {
        const item = acc.find((entry) => entry.id === order.tableId)
        if (item) {
          item.total += order.total
          item.orders += 1
        } else {
          acc.push({ id: order.tableId, name: `Mesa ${order.tableNumber}`, total: order.total, orders: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [employeeOrders])

  function handleRegisterEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !phone.trim()) return

    const employee = registerEmployee({ name: name.trim(), phone: phone.trim(), role, tableId: tableId || undefined })
    setName('')
    setPhone('')
    setRole('attendant')
    setOrderEmployeeId(employee.id)
    setOrderTableId(employee.tableId || tables[0]?.id || '')
    toast.success('Funcionario cadastrado.')
  }

  function handleCreateOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!orderEmployeeId || !orderTableId || !itemName.trim() || quantity <= 0 || price <= 0) return

    try {
      createEmployeeOrder({
        employeeId: orderEmployeeId,
        tableId: orderTableId,
        items: [{ name: itemName.trim(), quantity, price }],
      })
      setItemName('')
      setQuantity(1)
      setPrice(0)
      toast.success('Pedido lancado na mesa.')
    } catch {
      toast.error('Nao foi possivel lancar o pedido.')
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: '#B89A67' }}>Equipa</p>
        <h1 className="font-display text-3xl text-primary">Funcionarios</h1>
        <p className="text-muted-foreground text-sm mt-1">Cadastre atendentes, atribua mesas e lance pedidos por mesa.</p>
      </motion.div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="space-y-5">
          <form onSubmit={handleRegisterEmployee} className="rounded-xl border border-border/40 bg-surface p-5 space-y-4">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Cadastrar funcionario</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-medium">Nome</span>
                <input value={name} onChange={(event) => setName(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Telefone WhatsApp</span>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Funcao</span>
                <select value={role} onChange={(event) => setRole(event.target.value as EmployeeRole)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary">
                  {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Mesa atribuida</span>
                <select value={tableId} onChange={(event) => setTableId(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary">
                  <option value="">Sem mesa fixa</option>
                  {tables.map((table) => <option key={table.id} value={table.id}>Mesa {table.number}</option>)}
                </select>
              </label>
            </div>

            <Button type="submit" disabled={!name.trim() || !phone.trim()}>
              <Plus className="h-4 w-4" />
              Cadastrar
            </Button>
          </form>

          <form onSubmit={handleCreateOrder} className="rounded-xl border border-border/40 bg-surface p-5 space-y-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Lancar pedido da mesa</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-medium">Funcionario</span>
                <select
                  value={orderEmployeeId}
                  onChange={(event) => {
                    const employee = employees.find((item) => item.id === event.target.value)
                    setOrderEmployeeId(event.target.value)
                    setOrderTableId(employee?.tableId || tables[0]?.id || '')
                  }}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                >
                  <option value="">Selecione</option>
                  {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Mesa</span>
                <select value={orderTableId} onChange={(event) => setOrderTableId(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary">
                  {tables.map((table) => <option key={table.id} value={table.id}>Mesa {table.number}</option>)}
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Produto/servico</span>
                <input value={itemName} onChange={(event) => setItemName(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Qtd.</span>
                  <input type="number" min={1} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Preco</span>
                  <input type="number" min={0} value={price} onChange={(event) => setPrice(Number(event.target.value))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
                </label>
              </div>
            </div>

            <Button type="submit" disabled={!orderEmployeeId || !orderTableId || !itemName.trim() || price <= 0}>
              <Plus className="h-4 w-4" />
              Lancar pedido
            </Button>
          </form>

          <div className="rounded-xl border border-border/40 bg-surface">
            <div className="border-b border-border/40 p-5">
              <h2 className="font-semibold">Funcionarios cadastrados</h2>
            </div>
            <div className="divide-y divide-border/40">
              {employees.length ? employees.map((employee) => {
                const table = tables.find((item) => item.id === employee.tableId)
                return (
                  <div key={employee.id} className="grid gap-3 p-4 md:grid-cols-[1fr_180px] md:items-center">
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{roleLabels[employee.role]} | {employee.phone}</p>
                    </div>
                    <select value={employee.tableId || ''} onChange={(event) => assignEmployeeToTable(employee.id, event.target.value || undefined)} className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary">
                      <option value="">{table ? `Mesa ${table.number}` : 'Sem mesa fixa'}</option>
                      {tables.map((item) => <option key={item.id} value={item.id}>Mesa {item.number}</option>)}
                    </select>
                  </div>
                )
              }) : (
                <div className="p-5 text-sm text-muted-foreground">Ainda nao existem funcionarios cadastrados.</div>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <RankingCard title="Top funcionarios" subtitle="Quem mais vendeu" items={topEmployees} />
          <RankingCard title="Mesas que mais rendem" subtitle="Pedidos lancados por mesa" items={topTables} />
        </aside>
      </div>
    </div>
  )
}

function RankingCard({
  title,
  subtitle,
  items,
}: {
  title: string
  subtitle: string
  items: Array<{ id: string; name: string; total: number; orders: number }>
}) {
  return (
    <section className="rounded-xl border border-border/40 bg-surface p-5">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.length ? items.map((item, index) => (
          <div key={item.id} className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{index + 1}. {item.name}</p>
              <p className="text-sm font-semibold text-primary">{formatCurrency(item.total)}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.orders} pedidos</p>
          </div>
        )) : (
          <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
            O ranking aparece depois dos primeiros pedidos lancados.
          </div>
        )}
      </div>
    </section>
  )
}
