import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Masonry, GalleryImage } from '@/components/ui/masonry'

const images = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery-${String(i + 1).padStart(2, '0')}.png`,
  alt: `Palace Lounge — imagem ${i + 1}`,
}))

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const open = (id: number) => setLightbox(id)
  const close = () => setLightbox(null)
  const prev = () => setLightbox((id) => (id! > 1 ? id! - 1 : images.length))
  const next = () => setLightbox((id) => (id! < images.length ? id! + 1 : 1))

  const current = images.find((img) => img.id === lightbox)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#B89A67' }}>
          Palace Lounge
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground">Galeria</h1>
        <p className="text-muted-foreground mt-3 max-w-lg">
          Espaços, momentos e experiências que definem o Palace Lounge. Clique numa imagem para ampliar.
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <Masonry>
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
          >
            <GalleryImage
              src={img.src}
              alt={img.alt}
              onClick={() => open(img.id)}
            />
          </motion.div>
        ))}
      </Masonry>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Controls */}
              <button
                onClick={close}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/60 bg-black/40 px-3 py-1 rounded-full">
                {lightbox} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
