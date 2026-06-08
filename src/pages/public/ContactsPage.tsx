import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Mail, Send, CheckCircle } from 'lucide-react'
import { Map, MapMarker, MapControls } from '@/components/ui/map-component'
import { contactSchema, type ContactInput } from '@/lib/validators'
import { APP_NAME, APP_PHONE, APP_ADDRESS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const PALACE_COORDS: [number, number] = [13.2344, -8.8383]

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const contactInfo = [
  { icon: Phone,  label: 'Telefone',  value: APP_PHONE,                href: `tel:${APP_PHONE}` },
  { icon: MapPin, label: 'Morada',    value: APP_ADDRESS,               href: '#map' },
  { icon: Clock,  label: 'Horário',   value: 'Segunda a Domingo: 07h00 – 23h00', href: null },
  { icon: Mail,   label: 'Email',     value: 'reservas@palacelounge.ao', href: 'mailto:reservas@palacelounge.ao' },
]

export default function ContactsPage() {
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactInput) => {
    await new Promise(r => setTimeout(r, 800))
    console.log('Contact form:', data)
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#B89A67' }}>
            Fale connosco
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground">Contactos</h1>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Visite-nos, ligue ou envie uma mensagem. Estamos sempre disponíveis para tornar a sua visita inesquecível.
          </p>
        </motion.div>
      </section>

      {/* Map + Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Info cards */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="rounded-xl border border-border/40 bg-surface p-4 flex items-start gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(184,154,103,0.15)' }}>
                  <item.icon className="w-5 h-5" style={{ color: '#B89A67' }} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{item.value}</a>
                    : <p className="text-sm font-medium text-foreground">{item.value}</p>
                  }
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            id="map"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-border/40"
            style={{ height: '420px' }}
          >
            <Map className="w-full h-full" center={PALACE_COORDS} zoom={15}>
              <MapMarker coordinates={PALACE_COORDS} color="#D9D0B5" label={APP_NAME} />
              <MapControls />

              {/* Overlay card */}
              <div className="absolute top-4 left-4 z-10 bg-surface/90 backdrop-blur-sm border border-border rounded-xl p-3 max-w-[200px]">
                <p className="font-display text-sm font-semibold text-primary">{APP_NAME}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{APP_ADDRESS}</p>
              </div>
            </Map>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-2xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#B89A67' }}>Envie uma mensagem</p>
            <h2 className="font-display text-3xl text-foreground">Como podemos ajudar?</h2>
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Nome" error={errors.name?.message}>
                <input {...register('name')} placeholder="O seu nome"
                  className={inputCls(!!errors.name)} />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input {...register('email')} type="email" placeholder="email@exemplo.com"
                  className={inputCls(!!errors.email)} />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Telefone (opcional)" error={errors.phone?.message}>
                <input {...register('phone')} placeholder="+244 9XX XXX XXX"
                  className={inputCls(!!errors.phone)} />
              </Field>
              <Field label="Assunto" error={errors.subject?.message}>
                <input {...register('subject')} placeholder="Reserva, evento, informação…"
                  className={inputCls(!!errors.subject)} />
              </Field>
            </div>

            <Field label="Mensagem" error={errors.message?.message}>
              <textarea {...register('message')} rows={5} placeholder="Escreva a sua mensagem…"
                className={cn(inputCls(!!errors.message), 'resize-none')} />
            </Field>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                style={{ backgroundColor: '#D9D0B5', color: '#181818' }}
              >
                {isSubmitting
                  ? <><span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" /> A enviar…</>
                  : <><Send className="w-4 h-4" /> Enviar Mensagem</>
                }
              </button>

              {sent && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-sm text-success"
                >
                  <CheckCircle className="w-4 h-4" /> Mensagem enviada!
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </section>

    </div>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const inputCls = (hasError: boolean) => cn(
  'w-full rounded-lg border bg-surface px-3 py-2.5 text-sm text-foreground',
  'placeholder:text-muted-foreground/60 outline-none transition-colors',
  'focus:border-primary focus:ring-1 focus:ring-primary/30',
  hasError ? 'border-danger' : 'border-border'
)

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground/80">{label}</label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
