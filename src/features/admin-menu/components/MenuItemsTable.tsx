import { type ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { ToggleLeft, ToggleRight, Pencil } from 'lucide-react'
import { DataTable } from '@/components/tables/DataTable'
import { mockMenu } from '@/data'
import { formatCurrency, cn } from '@/lib/utils'
import { MENU_CATEGORY_LABELS } from '@/lib/constants'
import type { MenuItem } from '@/types'
import { toast } from 'sonner'

export function MenuItemsTable() {
  const [data, setData] = useState<MenuItem[]>([...mockMenu])

  const toggleAvailability = (id: string) => {
    setData(prev => prev.map(item => {
      if (item.id !== id) return item
      const updated = { ...item, available: !item.available }
      toast.success(`"${item.name}" marcado como ${updated.available ? 'disponível' : 'indisponível'}.`)
      return updated
    }))
  }

  const columns: ColumnDef<MenuItem>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md overflow-hidden bg-muted flex-shrink-0">
            <img
              src={`/images/gallery-${String((mockMenu.indexOf(row.original) % 17) + 1).padStart(2, '0')}.png`}
              alt={row.original.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{row.original.name}</p>
            {row.original.featured && (
              <span className="text-[10px] font-medium" style={{ color: '#B89A67' }}>Destaque</span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Categoria',
      cell: ({ row }) => (
        <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded">
          {MENU_CATEGORY_LABELS[row.original.category]}
        </span>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Preço',
      cell: ({ row }) => (
        <span className="font-semibold" style={{ color: '#B89A67' }}>{formatCurrency(row.original.price)}</span>
      ),
    },
    {
      accessorKey: 'available',
      header: 'Disponível',
      cell: ({ row }) => (
        <button
          onClick={() => toggleAvailability(row.original.id)}
          className={cn(
            'flex items-center gap-1.5 text-xs font-medium transition-colors',
            row.original.available ? 'text-success' : 'text-muted-foreground'
          )}
        >
          {row.original.available
            ? <ToggleRight className="w-5 h-5" />
            : <ToggleLeft  className="w-5 h-5" />
          }
          {row.original.available ? 'Sim' : 'Não'}
        </button>
      ),
      enableSorting: false,
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:bg-secondary transition-colors text-muted-foreground">
          <Pencil className="w-3.5 h-3.5" />
        </button>
      ),
      enableSorting: false,
    },
  ]

  return (
    <DataTable columns={columns} data={data} searchPlaceholder="Pesquisar itens do cardápio…" />
  )
}
