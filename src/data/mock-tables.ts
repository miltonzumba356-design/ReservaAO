import type { Table } from '@/types'

export const mockTables: Table[] = [
  { id: 't-1', number: 1, capacity: 2, location: 'indoor', status: 'available' },
  { id: 't-2', number: 2, capacity: 2, location: 'indoor', status: 'available' },
  { id: 't-3', number: 3, capacity: 4, location: 'indoor', status: 'available' },
  { id: 't-4', number: 4, capacity: 4, location: 'indoor', status: 'reserved' },
  { id: 't-5', number: 5, capacity: 4, location: 'outdoor', status: 'available' },
  { id: 't-6', number: 6, capacity: 6, location: 'outdoor', status: 'occupied' },
  { id: 't-7', number: 7, capacity: 6, location: 'outdoor', status: 'available' },
  { id: 't-8', number: 8, capacity: 6, location: 'vip', status: 'available', description: 'Mesa VIP com vista para o jardim' },
  { id: 't-9', number: 9, capacity: 8, location: 'vip', status: 'reserved', description: 'Salão privado VIP' },
  { id: 't-10', number: 10, capacity: 8, location: 'vip', status: 'available', description: 'Mesa de honra para eventos especiais' },
  { id: 't-11', number: 11, capacity: 2, location: 'indoor', status: 'available' },
  { id: 't-12', number: 12, capacity: 4, location: 'indoor', status: 'maintenance', description: 'Em manutenção até 10/06' },
]
