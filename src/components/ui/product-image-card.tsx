import * as React from 'react'
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'

const AspectRatio = AspectRatioPrimitive.Root

export type ProductImage = {
  src: string
  alt?: string
  thumbSrc?: string
}

export interface ProductImageCardProps {
  title?: string
  images: ProductImage[]
  initialIndex?: number
  onIndexChange?: (index: number) => void
  className?: string
  price?: string
  description?: string
}

export function ProductImageCard({
  title = 'Produto',
  images,
  initialIndex = 0,
  onIndexChange,
  className,
  price,
  description,
}: ProductImageCardProps) {
  const [index, setIndex] = React.useState(initialIndex)
  const [liked, setLiked] = React.useState(false)

  const setSafeIndex = (i: number) => {
    const next = (i + images.length) % images.length
    setIndex(next)
    onIndexChange?.(next)
  }

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  setSafeIndex(index - 1)
      if (e.key === 'ArrowRight') setSafeIndex(index + 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length])

  if (!images?.length) return null

  return (
    <div className={cn(
      'relative mx-auto w-full max-w-3xl rounded-3xl border border-border bg-surface/70 p-4 shadow-sm',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-xl font-semibold sm:text-2xl text-foreground">{title}</h2>
        <Button
          size="icon" variant="outline"
          className="rounded-full"
          onClick={() => setLiked(l => !l)}
          aria-label="Favorito"
        >
          <Heart className={cn('h-4 w-4 transition-colors', liked ? 'fill-red-500 text-red-500' : '')} />
        </Button>
      </div>

      <Separator className="mb-4" />

      {/* Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Thumbnails */}
        <div className="order-2 col-span-12 sm:order-1 sm:col-span-3">
          <ScrollArea className="h-auto sm:h-[360px]">
            <div className="flex gap-2 sm:flex-col">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSafeIndex(i)}
                  className={cn(
                    'relative overflow-hidden rounded-xl border p-0 transition-all',
                    'focus-visible:ring-2 focus-visible:ring-ring outline-none',
                    i === index ? 'border-primary' : 'border-border hover:border-primary/50'
                  )}
                >
                  <img
                    src={img.thumbSrc ?? img.src}
                    alt={img.alt ?? `Thumbnail ${i + 1}`}
                    className="h-16 w-16 object-cover sm:h-14 sm:w-full"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main image */}
        <div className="order-1 col-span-12 sm:order-2 sm:col-span-9">
          <div className="relative">
            <AspectRatio ratio={4 / 3}>
              <div className="h-full w-full overflow-hidden rounded-2xl bg-muted">
                <img
                  src={images[index].src}
                  alt={images[index].alt ?? 'Imagem principal'}
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            </AspectRatio>

            {/* Prev/Next */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button size="icon" variant="secondary"
                className="rounded-full bg-background/80 backdrop-blur"
                onClick={() => setSafeIndex(index - 1)} aria-label="Anterior">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary"
                className="rounded-full bg-background/80 backdrop-blur"
                onClick={() => setSafeIndex(index + 1)} aria-label="Próximo">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-3 left-3 text-xs text-white/70 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur">
              {index + 1} / {images.length}
            </div>
          </div>

          {/* Price & description */}
          {(price || description) && (
            <div className="mt-3 space-y-1">
              {price && <p className="text-lg font-semibold" style={{ color: '#B89A67' }}>{price}</p>}
              {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
