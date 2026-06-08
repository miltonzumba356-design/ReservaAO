import type { Review } from '@/types'

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    clientId: 'cl-9', clientName: 'Francisco Pinto Xavier',
    reservationId: 'r-10',
    rating: 5,
    comment: 'Uma experiência absolutamente extraordinária. O serviço foi impecável e a comida sublime. Voltaremos com certeza.',
    service: 5, atmosphere: 5, food: 5, drinks: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
  },
  {
    id: 'rev-2',
    clientId: 'cl-7', clientName: 'João Manuel Costa',
    reservationId: 'r-8',
    rating: 4,
    comment: 'Excelente ambiente e boa comida. O tempo de espera entre pratos foi um pouco longo, mas no geral muito bom.',
    service: 4, atmosphere: 5, food: 4, drinks: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 'rev-3',
    clientId: 'cl-1', clientName: 'Dr. António Bento',
    reservationId: 'r-10',
    rating: 5,
    comment: 'O Palace Lounge é simplesmente o melhor restaurante de Luanda. Recomendo vivamente.',
    service: 5, atmosphere: 5, food: 5, drinks: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
]
