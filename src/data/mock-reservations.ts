import type { Reservation } from '@/types'

const today = new Date()
const d = (offsetDays: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + offsetDays)
  return date
}

export const mockReservations: Reservation[] = [
  {
    id: 'r-1', code: 'PL-001',
    clientId: 'cl-1', clientName: 'Dr. António Bento',
    tableId: 't-8', tableNumber: 8,
    date: d(0), time: '20:00', guests: 2,
    status: 'confirmed', notes: 'Aniversário da esposa. Preparar surpresa.',
    createdAt: d(-3),
  },
  {
    id: 'r-2', code: 'PL-002',
    clientId: 'cl-2', clientName: 'Dra. Maria Fernanda Lopes',
    tableId: 't-3', tableNumber: 3,
    date: d(0), time: '19:30', guests: 4,
    status: 'confirmed',
    createdAt: d(-2),
  },
  {
    id: 'r-3', code: 'PL-003',
    clientId: 'cl-3', clientName: 'Eng. Carlos Domingos',
    tableId: 't-9', tableNumber: 9,
    date: d(1), time: '21:00', guests: 6,
    status: 'pending', notes: 'Jantar de negócios. Mesa tranquila.',
    createdAt: d(-1),
  },
  {
    id: 'r-4', code: 'PL-004',
    clientId: 'cl-4', clientName: 'Isabel Nascimento',
    tableId: 't-5', tableNumber: 5,
    date: d(1), time: '12:30', guests: 2,
    status: 'confirmed',
    createdAt: d(-1),
  },
  {
    id: 'r-5', code: 'PL-005',
    clientId: 'cl-5', clientName: 'Pedro Alves Ferreira',
    tableId: 't-1', tableNumber: 1,
    date: d(2), time: '13:00', guests: 2,
    status: 'pending',
    createdAt: d(0),
  },
  {
    id: 'r-6', code: 'PL-006',
    clientId: 'cl-6', clientName: 'Ana Paula Henriques',
    tableId: 't-8', tableNumber: 8,
    date: d(3), time: '20:30', guests: 4,
    status: 'confirmed', notes: 'Menu vegetariano para 2 convidados.',
    createdAt: d(-1),
  },
  {
    id: 'r-7', code: 'PL-007',
    clientId: 'cl-9', clientName: 'Francisco Pinto Xavier',
    tableId: 't-10', tableNumber: 10,
    date: d(-1), time: '21:00', guests: 8,
    status: 'completed',
    createdAt: d(-5),
  },
  {
    id: 'r-8', code: 'PL-008',
    clientId: 'cl-7', clientName: 'João Manuel Costa',
    tableId: 't-3', tableNumber: 3,
    date: d(-2), time: '12:00', guests: 3,
    status: 'completed',
    createdAt: d(-4),
  },
  {
    id: 'r-9', code: 'PL-009',
    clientId: 'cl-8', clientName: 'Luísa Tavares Morais',
    tableId: 't-2', tableNumber: 2,
    date: d(-3), time: '19:00', guests: 2,
    status: 'cancelled', notes: 'Cancelada pelo cliente.',
    createdAt: d(-6),
  },
  {
    id: 'r-10', code: 'PL-010',
    clientId: 'cl-1', clientName: 'Dr. António Bento',
    tableId: 't-8', tableNumber: 8,
    date: d(-5), time: '20:00', guests: 4,
    status: 'completed',
    createdAt: d(-8),
  },
  {
    id: 'r-11', code: 'PL-011',
    clientId: 'cl-2', clientName: 'Dra. Maria Fernanda Lopes',
    tableId: 't-9', tableNumber: 9,
    date: d(5), time: '21:00', guests: 6,
    status: 'pending',
    createdAt: d(0),
  },
  {
    id: 'r-12', code: 'PL-012',
    clientId: 'cl-10', clientName: 'Carla Mendes Rodrigues',
    tableId: 't-5', tableNumber: 5,
    date: d(7), time: '13:00', guests: 4,
    status: 'confirmed',
    createdAt: d(-1),
  },
]
