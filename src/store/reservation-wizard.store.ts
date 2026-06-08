import { create } from 'zustand'

type WizardStep = 1 | 2 | 3 | 4

interface WizardState {
  step: WizardStep
  date: Date | null
  time: string | null
  guests: number
  tableId: string | null
  notes: string
  setStep: (step: WizardStep) => void
  setDate: (date: Date) => void
  setTime: (time: string) => void
  setGuests: (count: number) => void
  setTable: (id: string) => void
  setNotes: (notes: string) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

const initial = {
  step: 1 as WizardStep,
  date: null,
  time: null,
  guests: 2,
  tableId: null,
  notes: '',
}

export const useReservationWizardStore = create<WizardState>((set, get) => ({
  ...initial,
  setStep: (step) => set({ step }),
  setDate: (date) => set({ date, time: null, tableId: null }),
  setTime: (time) => set({ time, tableId: null }),
  setGuests: (guests) => set({ guests }),
  setTable: (tableId) => set({ tableId }),
  setNotes: (notes) => set({ notes }),
  nextStep: () => {
    const s = get().step
    if (s < 4) set({ step: (s + 1) as WizardStep })
  },
  prevStep: () => {
    const s = get().step
    if (s > 1) set({ step: (s - 1) as WizardStep })
  },
  reset: () => set(initial),
}))
