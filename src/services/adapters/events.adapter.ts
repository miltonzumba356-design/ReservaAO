import { mockEvents } from '@/data/mock-events'
import type { Event, EventFilters, CreateEventDTO, EventStatus } from '@/types'
import { mockClients } from '@/data/mock-clients'

const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms))

const store = [...mockEvents]

export const eventsAdapter = {
  async getAll(filters?: EventFilters): Promise<Event[]> {
    await delay()
    let data = [...store]
    if (filters?.status) data = data.filter((e) => e.status === filters.status)
    if (filters?.type) data = data.filter((e) => e.type === filters.type)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      data = data.filter(
        (e) => e.code.toLowerCase().includes(q) || e.clientName.toLowerCase().includes(q)
      )
    }
    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  },

  async getById(id: string): Promise<Event> {
    await delay()
    const event = store.find((e) => e.id === id)
    if (!event) throw new Error('Evento não encontrado')
    return event
  },

  async create(data: CreateEventDTO): Promise<Event> {
    await delay(600)
    const client = mockClients.find((c) => c.id === data.clientId)
    if (!client) throw new Error('Cliente inválido')

    const count = store.length + 1
    const newEvent: Event = {
      ...data,
      id: `ev-${Date.now()}`,
      code: `EVT-${String(count).padStart(3, '0')}`,
      clientName: client.name,
      status: 'pending',
      depositPaid: false,
      createdAt: new Date(),
    }
    store.unshift(newEvent)
    return newEvent
  },

  async updateStatus(id: string, status: EventStatus): Promise<Event> {
    await delay()
    const event = store.find((e) => e.id === id)
    if (!event) throw new Error('Evento não encontrado')
    event.status = status
    return event
  },
}
