import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PrismaHero } from '@/components/ui/prisma-hero'
import { ShuffleHero } from '@/components/ui/shuffle-grid'
import { ROUTES } from '@/lib/constants'

/* ── Destaques ───────────────────────────────────────────────────────────── */
const highlights = [
  {
    icon: Star,
    title: 'Gastronomia Premium',
    description: 'Pratos elaborados com ingredientes selecionados, numa fusão de sabores que homenageia a culinária internacional e angolana.',
    image: '/images/gallery-05.png',
  },
  {
    icon: Users,
    title: 'Serviço Personalizado',
    description: 'Cada detalhe é pensado para que a sua experiência seja única. O nosso programa VIP garante atenção exclusiva.',
    image: '/images/gallery-06.png',
  },
  {
    icon: Clock,
    title: 'Ambiente Sofisticado',
    description: 'Um espaço desenhado para criar memórias. Do pequeno-almoço elegante ao jantar íntimo, o Palace é o cenário perfeito.',
    image: '/images/gallery-07.png',
  },
]

/* ── MenuPreview items ───────────────────────────────────────────────────── */
const menuPreviews = [
  { name: 'Lombo de Vaca Angus', category: 'Prato Principal', price: '9.500 AOA', image: '/images/gallery-08.png' },
  { name: 'Carpaccio de Polvo', category: 'Entrada', price: '3.800 AOA', image: '/images/gallery-09.png' },
  { name: 'Espresso Martini', category: 'Cocktail', price: '3.000 AOA', image: '/images/gallery-10.png' },
  { name: 'Mousse de Chocolate Belga', category: 'Sobremesa', price: '2.500 AOA', image: '/images/gallery-11.png' },
]

/* ── Animação de secção ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <PrismaHero
        backgroundImage="/images/gallery-01.png"
        title="Palace Lounge"
        subtitle="Uma experiência gastronómica única no coração de Luanda. Ambiente sofisticado, gastronomia premium e serviço personalizado."
        ctaLabel="Reservar Mesa"
        ctaHref={ROUTES.CONTACTS}
      />

      {/* ── Destaques ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#B89A67' }}>
            O que nos distingue
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Três pilares de excelência
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group rounded-2xl overflow-hidden border border-border/40 bg-surface hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={h.image}
                  alt={h.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h.icon className="w-5 h-5 mb-1" style={{ color: '#D9D0B5' }} />
                  <h3 className="font-display text-lg text-white">{h.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Menu Preview ──────────────────────────────────────────────── */}
      <section className="py-16 bg-surface/50 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#B89A67' }}>
                Destaques do cardápio
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">Sabores que surpreendem</h2>
            </div>
            <Link
              to={ROUTES.MENU}
              className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: '#D9D0B5' }}
            >
              Ver cardápio completo <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menuPreviews.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group rounded-xl overflow-hidden border border-border/40 bg-background hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{item.category}</p>
                  <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
                  <p className="text-sm mt-1 font-semibold" style={{ color: '#B89A67' }}>{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link to={ROUTES.MENU} className="text-sm font-medium" style={{ color: '#D9D0B5' }}>
              Ver cardápio completo →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Galeria Shuffle ───────────────────────────────────────────── */}
      <ShuffleHero
        tag="Galeria Palace Lounge"
        title="Momentos que ficam na memória"
        description="Descubra os espaços, os pratos e as experiências que tornam o Palace Lounge único em Luanda. Cada imagem é uma história."
        ctaLabel="Ver Galeria Completa"
        ctaHref={ROUTES.GALLERY}
      />

      {/* ── Eventos CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <img
            src="/images/gallery-12.png"
            alt="Eventos Palace Lounge"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#B89A67' }}>
              Eventos Privados
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
              Celebre os seus momentos especiais connosco
            </h2>
            <p className="text-base text-white/70 mb-8 leading-relaxed">
              Aniversários, casamentos, eventos corporativos e jantares privados.
              Deixe que o Palace Lounge transforme a sua ocasião numa experiência inesquecível.
            </p>
            <Link
              to={ROUTES.CONTACTS}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:gap-3"
              style={{ backgroundColor: '#D9D0B5', color: '#181818' }}
            >
              Solicitar Evento <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Reviews placeholder ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#B89A67' }}>
            O que dizem os nossos clientes
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Experiências que inspiram</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Francisco Pinto Xavier', rating: 5, comment: 'Uma experiência absolutamente extraordinária. O serviço foi impecável e a comida sublime. Voltaremos com certeza.' },
            { name: 'Dr. António Bento', rating: 5, comment: 'O Palace Lounge é simplesmente o melhor restaurante de Luanda. Recomendo vivamente.' },
            { name: 'João Manuel Costa', rating: 4, comment: 'Excelente ambiente e boa comida. O tempo de espera entre pratos foi um pouco longo, mas no geral muito bom.' },
          ].map((r, i) => (
            <motion.div
              key={r.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border border-border/40 bg-surface p-6 space-y-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" style={{ color: '#B89A67' }} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{r.comment}"</p>
              <p className="text-sm font-medium text-foreground">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}
