import type { Payment } from '@/types'

const today = new Date()
const d = (offsetDays: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + offsetDays)
  return date
}

export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    reservationId: 'r-1',
    clientId: 'cl-1', clientName: 'Dr. António Bento',
    amount: 45000,
    method: 'multicaixa',
    status: 'confirmed',
    reference: 'MCX-2024-001',
    date: d(-3),
  },
  {
    id: 'pay-2',
    reservationId: 'r-2',
    clientId: 'cl-2', clientName: 'Dra. Maria Fernanda Lopes',
    amount: 28500,
    method: 'tpa',
    status: 'confirmed',
    date: d(-2),
  },
  {
    id: 'pay-3',
    eventId: 'ev-1',
    clientId: 'cl-1', clientName: 'Dr. António Bento',
    amount: 175000,
    method: 'bank_transfer',
    status: 'confirmed',
    reference: 'TRF-2024-001',
    date: d(-10),
  },
  {
    id: 'pay-4',
    reservationId: 'r-7',
    clientId: 'cl-9', clientName: 'Francisco Pinto Xavier',
    amount: 92000,
    method: 'visa_mastercard',
    status: 'confirmed',
    date: d(-1),
  },
  {
    id: 'pay-5',
    reservationId: 'r-8',
    clientId: 'cl-7', clientName: 'João Manuel Costa',
    amount: 31500,
    method: 'multicaixa',
    status: 'confirmed',
    reference: 'MCX-2024-002',
    date: d(-2),
  },
  {
    id: 'pay-6',
    eventId: 'ev-5',
    clientId: 'cl-2', clientName: 'Dra. Maria Fernanda Lopes',
    amount: 210000,
    method: 'bank_transfer',
    status: 'confirmed',
    reference: 'TRF-2024-002',
    date: d(-8),
  },
  {
    id: 'pay-7',
    reservationId: 'r-3',
    clientId: 'cl-3', clientName: 'Eng. Carlos Domingos',
    amount: 18000,
    method: 'multicaixa',
    status: 'pending',
    date: d(-1),
  },
]
