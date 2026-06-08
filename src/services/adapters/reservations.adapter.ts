import { mockReservations } from '@/data/mock-reservations'
import type { Reservation, ReservationFilters, CreateReservationDTO, UpdateReservationDTO } from '@/types'
import { mockClients } from '@/data/mock-clients'
import { mockTables } from '@/data/mock-tables'

const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms))

const store = [...mockReservations]

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export const reservationsAdapter = {
  async getAll(filters?: ReservationFilters): Promise<Reservation[]> {
    await delay()
    let data = [...store]
    if (filters?.status) data = data.filter((r) => r.status === filters.status)
    if (filters?.date) data = data.filter((r) => isSameDay(new Date(r.date), filters.date!))
    if (filters?.clientId) data = data.filter((r) => r.clientId === filters.clientId)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      data = data.filter(
        (r) => r.code.toLowerCase().includes(q) || r.clientName.toLowerCase().includes(q)
      )
    }
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },

  async getById(id: string): Promise<Reservation> {
    await delay()
    const r = store.find((r) => r.id === id)
    if (!r) throw new Error('Reserva não encontrada')
    return r
  },

  async create(data: CreateReservationDTO): Promise<Reservation> {
    await delay(600)
    const client = mockClients.find((c) => c.id === data.clientId)
    const table = mockTables.find((t) => t.id === data.tableId)
    if (!client || !table) throw new Error('Cliente ou mesa inválidos')

    const count = store.length + 1
    const newReservation: Reservation = {
      ...data,
      id: `r-${Date.now()}`,
      code: `PL-${String(count).padStart(3, '0')}`,
      clientName: client.name,
      tableNumber: table.number,
      status: 'pending',
      createdAt: new Date(),
    }
    store.unshift(newReservation)
    return newReservation
  },

  async update(id: string, data: UpdateReservationDTO): Promise<Reservation> {
    await delay()
    const idx = store.findIndex((r) => r.id === id)
    if (idx === -1) throw new Error('Reserva não encontrada')
    store[idx] = { ...store[idx], ...data }
    return store[idx]
  },

  async cancel(id: string): Promise<void> {
    await delay()
    const r = store.find((r) => r.id === id)
    if (!r) throw new Error('Reserva não encontrada')
    r.status = 'cancelled'
  },

  async confirm(id: string): Promise<Reservation> {
    return reservationsAdapter.update(id, { status: 'confirmed' })
  },
}
