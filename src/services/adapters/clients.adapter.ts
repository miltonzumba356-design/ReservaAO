import { mockClients } from '@/data/mock-clients'
import type { User, ClientFilters } from '@/types'

const delay = (ms = 350) => new Promise<void>((r) => setTimeout(r, ms))

const store = [...mockClients]

export const clientsAdapter = {
  async getAll(filters?: ClientFilters): Promise<User[]> {
    await delay()
    let data = [...store]
    if (filters?.vip !== undefined) data = data.filter((c) => c.vip === filters.vip)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
      )
    }
    return data
  },

  async getById(id: string): Promise<User> {
    await delay()
    const client = store.find((c) => c.id === id)
    if (!client) throw new Error('Cliente não encontrado')
    return client
  },

  async update(id: string, data: Partial<User>): Promise<User> {
    await delay()
    const idx = store.findIndex((c) => c.id === id)
    if (idx === -1) throw new Error('Cliente não encontrado')
    store[idx] = { ...store[idx], ...data }
    return store[idx]
  },
}
