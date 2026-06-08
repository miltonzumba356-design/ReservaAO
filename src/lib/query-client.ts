import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

export const queryKeys = {
  reservations: {
    all: ['reservations'] as const,
    list: (filters?: Record<string, unknown>) =>
      ['reservations', 'list', filters] as const,
    detail: (id: string) => ['reservations', 'detail', id] as const,
  },
  menu: {
    all: ['menu'] as const,
    list: (filters?: Record<string, unknown>) => ['menu', 'list', filters] as const,
    detail: (id: string) => ['menu', 'detail', id] as const,
  },
  tables: {
    all: ['tables'] as const,
    available: (date: string, time: string) =>
      ['tables', 'available', date, time] as const,
  },
  clients: {
    all: ['clients'] as const,
    list: (filters?: Record<string, unknown>) => ['clients', 'list', filters] as const,
    detail: (id: string) => ['clients', 'detail', id] as const,
  },
  events: {
    all: ['events'] as const,
    list: (filters?: Record<string, unknown>) => ['events', 'list', filters] as const,
    detail: (id: string) => ['events', 'detail', id] as const,
  },
  payments: {
    all: ['payments'] as const,
    list: (filters?: Record<string, unknown>) =>
      ['payments', 'list', filters] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    byReservation: (reservationId: string) =>
      ['reviews', 'reservation', reservationId] as const,
  },
  dashboard: {
    kpis: ['dashboard', 'kpis'] as const,
    charts: (period: string) => ['dashboard', 'charts', period] as const,
  },
} as const
