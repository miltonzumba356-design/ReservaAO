import { mockMenu } from '@/data/mock-menu'
import type { MenuItem, MenuFilters, CreateMenuItemDTO } from '@/types'

const delay = (ms = 350) => new Promise<void>((r) => setTimeout(r, ms))

let store = [...mockMenu]

export const menuAdapter = {
  async getAll(filters?: MenuFilters): Promise<MenuItem[]> {
    await delay()
    let data = [...store]
    if (filters?.category) data = data.filter((i) => i.category === filters.category)
    if (filters?.available !== undefined) data = data.filter((i) => i.available === filters.available)
    if (filters?.featured !== undefined) data = data.filter((i) => i.featured === filters.featured)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      data = data.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      )
    }
    return data
  },

  async getById(id: string): Promise<MenuItem> {
    await delay()
    const item = store.find((i) => i.id === id)
    if (!item) throw new Error('Item não encontrado')
    return item
  },

  async create(data: CreateMenuItemDTO): Promise<MenuItem> {
    await delay(500)
    const newItem: MenuItem = { ...data, id: `mi-${Date.now()}`, createdAt: new Date() }
    store.push(newItem)
    return newItem
  },

  async update(id: string, data: Partial<CreateMenuItemDTO>): Promise<MenuItem> {
    await delay()
    const idx = store.findIndex((i) => i.id === id)
    if (idx === -1) throw new Error('Item não encontrado')
    store[idx] = { ...store[idx], ...data }
    return store[idx]
  },

  async delete(id: string): Promise<void> {
    await delay()
    store = store.filter((i) => i.id !== id)
  },

  async toggleAvailability(id: string): Promise<MenuItem> {
    await delay(200)
    const item = store.find((i) => i.id === id)
    if (!item) throw new Error('Item não encontrado')
    item.available = !item.available
    return item
  },
}
