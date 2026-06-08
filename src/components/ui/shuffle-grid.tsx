'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* ── Imagens do Palace Lounge ───────────────────────────────────────────── */
const palaceImages = [
  { id: 1,  src: '/images/gallery-01.png' },
  { id: 2,  src: '/images/gallery-02.png' },
  { id: 3,  src: '/images/gallery-03.png' },
  { id: 4,  src: '/images/gallery-04.png' },
  { id: 5,  src: '/images/gallery-05.png' },
  { id: 6,  src: '/images/gallery-06.png' },
  { id: 7,  src: '/images/gallery-07.png' },
  { id: 8,  src: '/images/gallery-08.png' },
  { id: 9,  src: '/images/gallery-09.png' },
  { id: 10, src: '/images/gallery-10.png' },
  { id: 11, src: '/images/gallery-11.png' },
  { id: 12, src: '/images/gallery-12.png' },
  { id: 13, src: '/images/gallery-13.png' },
  { id: 14, src: '/images/gallery-14.png' },
  { id: 15, src: '/images/gallery-15.png' },
  { id: 16, src: '/images/gallery-16.png' },
]

/* ── Shuffle utility ────────────────────────────────────────────────────── */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/* ── ShuffleGrid ────────────────────────────────────────────────────────── */
const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [squares, setSquares] = useState(() =>
    shuffle(palaceImages).map((img) => (
      <motion.div
        key={img.id}
        layout
        transition={{ duration: 1.5, type: 'spring' }}
        className="w-full h-full rounded-md overflow-hidden bg-muted"
        style={{
          backgroundImage: `url(${img.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    ))
  )

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(
        shuffle(palaceImages).map((img) => (
          <motion.div
            key={img.id}
            layout
            transition={{ duration: 1.5, type: 'spring' }}
            className="w-full h-full rounded-md overflow-hidden bg-muted"
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))
      )
      timeoutRef.current = setTimeout(shuffleSquares, 3000)
    }
    timeoutRef.current = setTimeout(shuffleSquares, 3000)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares}
    </div>
  )
}

/* ── ShuffleHero — adaptado para Palace Lounge ──────────────────────────── */
interface ShuffleHeroProps {
  tag?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export const ShuffleHero = ({
  tag = 'Galeria Palace Lounge',
  title = 'Momentos que ficam na memória',
  description = 'Descubra os espaços, os pratos e as experiências que tornam o Palace Lounge único em Luanda.',
  ctaLabel = 'Ver Galeria Completa',
  ctaHref = '/galeria',
  className,
}: ShuffleHeroProps) => {
  return (
    <section className={cn('w-full px-8 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto', className)}>
      <div>
        <span className="block mb-4 text-xs md:text-sm font-medium tracking-[0.2em] uppercase" style={{ color: '#B89A67' }}>
          {tag}
        </span>
        <h3 className="font-display text-4xl md:text-5xl font-medium text-foreground leading-tight">
          {title}
        </h3>
        <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6 leading-relaxed">
          {description}
        </p>
        <a
          href={ctaHref}
          className={cn(
            'inline-block font-medium py-2.5 px-6 rounded-md text-sm',
            'transition-all hover:opacity-90 active:scale-95'
          )}
          style={{ backgroundColor: '#D9D0B5', color: '#181818' }}
        >
          {ctaLabel}
        </a>
      </div>
      <ShuffleGrid />
    </section>
  )
}
