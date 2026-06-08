import type { Event } from '@/types'

const today = new Date()
const d = (offsetDays: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + offsetDays)
  return date
}

export const mockEvents: Event[] = [
  {
    id: 'ev-1', code: 'EVT-001',
    type: 'birthday',
    clientId: 'cl-1', clientName: 'Dr. António Bento',
    date: d(14),
    guests: 25,
    status: 'confirmed',
    notes: 'Festa de aniversário dos 50 anos. Decoração dourada.',
    budget: 350000,
    depositPaid: true,
    createdAt: d(-10),
  },
  {
    id: 'ev-2', code: 'EVT-002',
    type: 'corporate',
    clientId: 'cl-3', clientName: 'Eng. Carlos Domingos',
    date: d(21),
    guests: 40,
    status: 'approved',
    notes: 'Jantar de equipa. Necessário projetor e microfone.',
    budget: 480000,
    depositPaid: false,
    createdAt: d(-5),
  },
  {
    id: 'ev-3', code: 'EVT-003',
    type: 'wedding',
    clientId: 'cl-6', clientName: 'Ana Paula Henriques',
    date: d(45),
    guests: 80,
    status: 'pending',
    notes: 'Recepção de casamento. Menu personalizado.',
    budget: 1200000,
    depositPaid: false,
    createdAt: d(-2),
  },
  {
    id: 'ev-4', code: 'EVT-004',
    type: 'private_dinner',
    clientId: 'cl-9', clientName: 'Francisco Pinto Xavier',
    date: d(-7),
    guests: 12,
    status: 'completed',
    notes: 'Jantar privado com menu degustação.',
    budget: 180000,
    depositPaid: true,
    createdAt: d(-20),
  },
  {
    id: 'ev-5', code: 'EVT-005',
    type: 'themed',
    clientId: 'cl-2', clientName: 'Dra. Maria Fernanda Lopes',
    date: d(30),
    guests: 35,
    status: 'approved',
    notes: 'Noite temática anos 20. Decoração Art Déco.',
    budget: 420000,
    depositPaid: true,
    createdAt: d(-8),
  },
]
