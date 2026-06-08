import { type ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { DataTable } from '@/components/tables/DataTable'
import { mockPayments } from '@/data'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_LABELS } from '@/lib/constants'
import type { Payment } from '@/types'
import { toast } from 'sonner'

const statusColor: Record<string, string> = {
  confirmed: 'bg-success/20 text-success',
  pending:   'bg-warning/20 text-warning',
  failed:    'bg-danger/20 text-danger',
}

export function PaymentsTable() {
  const [data, setData] = useState<Payment[]>([...mockPayments])

  const confirm = (id: string) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, status: 'confirmed' as const } : p))
    toast.success('Pagamento confirmado.')
  }

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'clientName',
      header: 'Cliente',
      cell: ({ row }) => <span className="font-medium">{row.original.clientName}</span>,
    },
    {
      accessorKey: 'amount',
      header: 'Valor',
      cell: ({ row }) => (
        <span className="font-semibold" style={{ color: '#B89A67' }}>{formatCurrency(row.original.amount)}</span>
      ),
    },
    {
      accessorKey: 'method',
      header: 'Método',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{PAYMENT_METHOD_LABELS[row.original.method]}</span>
      ),
    },
    {
      accessorKey: 'reference',
      header: 'Referência',
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">{row.original.reference ?? '—'}</span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Data',
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.date)}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', statusColor[row.original.status])}>
          {PAYMENT_STATUS_LABELS[row.original.status]}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const p = row.original
        if (p.status !== 'pending') return null
        return (
          <button onClick={() => confirm(p.id)}
            className="w-7 h-7 rounded flex items-center justify-center bg-success/20 hover:bg-success/30 text-success transition-colors" title="Confirmar">
            <Check className="w-3.5 h-3.5" />
          </button>
        )
      },
      enableSorting: false,
    },
  ]

  return (
    <DataTable columns={columns} data={data} searchPlaceholder="Pesquisar pagamentos…" />
  )
}
