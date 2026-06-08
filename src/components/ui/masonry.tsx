import React from 'react'
import { cn } from '@/lib/utils'

interface MasonryProps {
  children: React.ReactNode[]
  className?: string
}

export const Masonry = ({ children, className = '' }: MasonryProps) => {
  return (
    <div
      className={cn(
        'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3',
        className
      )}
    >
      {children.map((child, index) => (
        <div key={index} className="break-inside-avoid mb-3">
          {child}
        </div>
      ))}
    </div>
  )
}

/* ── GalleryImage — card da galeria Palace Lounge ───────────────────────── */
interface GalleryImageProps {
  src: string
  alt?: string
  className?: string
  onClick?: () => void
}

export const GalleryImage = ({ src, alt = 'Palace Lounge', className, onClick }: GalleryImageProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-lg cursor-pointer',
        'border border-border/30 hover:border-primary/40 transition-all duration-300',
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </div>
  )
}
