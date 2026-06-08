import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES, APP_NAME, APP_PHONE, APP_ADDRESS } from '@/lib/constants'

interface FooterLink {
  label: string
  href: string
}

interface PalaceFooterProps {
  className?: string
}

const navLinks: FooterLink[] = [
  { label: 'Sobre', href: ROUTES.ABOUT },
  { label: 'Cardápio', href: ROUTES.MENU },
  { label: 'Galeria', href: ROUTES.GALLERY },
  { label: 'Contactos', href: ROUTES.CONTACTS },
]

export const PalaceFooter = ({ className }: PalaceFooterProps) => {
  return (
    <section className={cn('relative w-full mt-0 overflow-hidden', className)}>
      <footer className="border-t border-border/40 bg-background mt-20 relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[32rem] relative p-4 py-10">

          {/* Top — brand + links */}
          <div className="flex flex-col mb-12 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center gap-6">

              {/* Brand */}
              <div className="flex flex-col items-center gap-2">
                <Link to={ROUTES.HOME} className="font-display text-3xl font-bold text-primary tracking-wide">
                  {APP_NAME}
                </Link>
                <p className="text-muted-foreground text-sm text-center max-w-xs">
                  Restaurante Premium em Luanda, Angola.
                  <br />
                  Gastronomia, elegância e serviço personalizado.
                </p>
              </div>

              {/* Socials */}
              <div className="flex gap-4">
                {[
                  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
                  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
                  { icon: <Phone className="w-5 h-5" />, href: `tel:${APP_PHONE}`, label: 'Telefone' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-6 h-6 hover:scale-110 duration-300">{s.icon}</div>
                  </a>
                ))}
              </div>

              {/* Nav links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="hover:text-primary duration-300 hover:font-semibold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Contact info */}
              <div className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-accent" /> {APP_PHONE}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" /> {APP_ADDRESS}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" /> Seg–Dom 07h00–23h00
                </span>
              </div>

            </div>
          </div>

          {/* Bottom */}
          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:flex-row items-center justify-between px-4 md:px-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">Luanda, Angola</p>
          </div>
        </div>

        {/* Large background text */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-36 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4 leading-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 9rem)',
            maxWidth: '95vw',
            background: 'linear-gradient(to bottom, rgba(217,208,181,0.12), transparent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {APP_NAME.toUpperCase()}
        </div>

        {/* Logo badge */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hover:border-primary/40 duration-300 backdrop-blur-sm rounded-3xl bg-surface/60 border-2 border-border flex items-center justify-center p-3">
          <div
            className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #D9D0B5, #B89A67)' }}
          >
            <span className="font-display text-2xl md:text-3xl font-bold text-charcoal">P</span>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute bottom-[8.5rem] h-px bg-gradient-to-r from-transparent via-border to-transparent w-full" />
        {/* Bottom shadow */}
        <div className="absolute bottom-28 w-full h-20 bg-gradient-to-t from-background to-transparent" />
      </footer>
    </section>
  )
}
