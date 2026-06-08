import { mockTables } from '@/data/mock-tables'
import type { Table, TableStatus } from '@/types'

const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms))

const store = [...mockTables]

export const tablesAdapter = {
  async getAll(): Promise<Table[]> {
    await delay()
    return [...store]
  },

  async getAvailable(_date: string, _time: string, guests: number): Promise<Table[]> {
    await delay()
    return store.filter((t) => t.status === 'available' && t.capacity >= guests)
  },

  async getById(id: string): Promise<Table> {
    await delay()
    const table = store.find((t) => t.id === id)
    if (!table) throw new Error('Mesa não encontrada')
    return table
  },

  async updateStatus(id: string, status: TableStatus): Promise<Table> {
    await delay(200)
    const table = store.find((t) => t.id === id)
    if (!table) throw new Error('Mesa não encontrada')
    table.status = status
    return table
  },
}
