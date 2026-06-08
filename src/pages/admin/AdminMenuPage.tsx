import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { MenuItemsTable } from '@/features/admin-menu/components/MenuItemsTable'
import { mockMenu } from '@/data'
import { MENU_CATEGORY_LABELS } from '@/lib/constants'
import type { MenuCategory } from '@/types'

const categories = Object.keys(MENU_CATEGORY_LABELS) as MenuCategory[]

export default function AdminMenuPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: '#B89A67' }}>Gestão</p>
          <h1 className="font-display text-3xl text-primary">Cardápio</h1>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: '#D9D0B5', color: '#181818' }}>
          <Plus className="w-4 h-4" /> Novo Item
        </button>
      </motion.div>

      {/* Category stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {categories.map(cat => {
          const count = mockMenu.filter(i => i.category === cat).length
          return (
            <div key={cat} className="rounded-lg border border-border/40 bg-surface p-2.5 text-center">
              <p className="text-lg font-bold text-foreground">{count}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{MENU_CATEGORY_LABELS[cat]}</p>
            </div>
          )
        })}
      </div>

      <MenuItemsTable />
    </div>
  )
}
