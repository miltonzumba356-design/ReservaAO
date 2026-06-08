import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z
      .string()
      .min(9, 'Telefone inválido')
      .regex(/^\+?[0-9\s-]+$/, 'Formato inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As palavras-passe não coincidem',
    path: ['confirmPassword'],
  })

export const reservationSchema = z.object({
  date: z.date({ required_error: 'Selecione uma data' }),
  time: z.string().min(1, 'Selecione um horário'),
  guests: z.number().min(1, 'Mínimo 1 pessoa').max(20, 'Máximo 20 pessoas'),
  tableId: z.string().min(1, 'Selecione uma mesa'),
  notes: z.string().max(300, 'Máximo 300 caracteres').optional(),
})

export const eventRequestSchema = z.object({
  type: z.enum(['birthday', 'wedding', 'corporate', 'private_dinner', 'themed']),
  date: z.date({ required_error: 'Selecione uma data' }),
  guests: z.number().min(2, 'Mínimo 2 convidados').max(200),
  notes: z.string().max(500, 'Máximo 500 caracteres').optional(),
})

export const contactSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Assunto obrigatório'),
  message: z.string().min(10, 'Mensagem muito curta'),
})

export const menuItemSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  description: z.string().min(10, 'Descrição obrigatória'),
  category: z.enum(['starters', 'mains', 'desserts', 'drinks', 'cocktails', 'wines']),
  price: z.number().min(1, 'Preço deve ser maior que 0'),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
  service: z.number().min(1).max(5),
  atmosphere: z.number().min(1).max(5),
  food: z.number().min(1).max(5),
  drinks: z.number().min(1).max(5),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ReservationInput = z.infer<typeof reservationSchema>
export type EventRequestInput = z.infer<typeof eventRequestSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type MenuItemInput = z.infer<typeof menuItemSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
