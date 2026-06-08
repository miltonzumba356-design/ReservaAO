import { mockPayments } from '@/data/mock-payments'
import type { Payment, PaymentFilters } from '@/types'

const delay = (ms = 350) => new Promise<void>((r) => setTimeout(r, ms))

const store = [...mockPayments]

export const paymentsAdapter = {
  async getAll(filters?: PaymentFilters): Promise<Payment[]> {
    await delay()
    let data = [...store]
    if (filters?.status) data = data.filter((p) => p.status === filters.status)
    if (filters?.method) data = data.filter((p) => p.method === filters.method)
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },

  async getById(id: string): Promise<Payment> {
    await delay()
    const payment = store.find((p) => p.id === id)
    if (!payment) throw new Error('Pagamento não encontrado')
    return payment
  },

  async confirm(id: string): Promise<Payment> {
    await delay()
    const payment = store.find((p) => p.id === id)
    if (!payment) throw new Error('Pagamento não encontrado')
    payment.status = 'confirmed'
    return payment
  },

  async getTotalRevenue(): Promise<number> {
    await delay(200)
    return store
      .filter((p) => p.status === 'confirmed')
      .reduce((sum, p) => sum + p.amount, 0)
  },
}
