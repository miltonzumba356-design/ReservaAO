'use client'

import MapLibreGL from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import {
  createContext, forwardRef, useCallback, useContext,
  useEffect, useRef, useState, type ReactNode,
} from 'react'
import { Minus, Plus, Locate, Loader2 } from 'lucide-react'

/* ── Theme detection ─────────────────────────────────────────────────────── */
type Theme = 'light' | 'dark'

const MAP_STYLES = {
  dark:  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
}

function getDocumentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

function useResolvedTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(getDocumentTheme)
  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(getDocumentTheme()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return theme
}

/* ── Map context ─────────────────────────────────────────────────────────── */
const MapContext = createContext<{ map: MapLibreGL.Map | null; isLoaded: boolean } | null>(null)
function useMap() {
  const ctx = useContext(MapContext)
  if (!ctx) throw new Error('useMap must be used inside <Map>')
  return ctx
}

/* ── Map component ───────────────────────────────────────────────────────── */
interface MapProps {
  children?: ReactNode
  className?: string
  center?: [number, number]
  zoom?: number
  loading?: boolean
}

export const Map = forwardRef<MapLibreGL.Map, MapProps>(function Map(
  { children, className = '', center = [13.2343, -8.8368], zoom = 14, loading = false },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const theme = useResolvedTheme()

  useEffect(() => {
    if (!containerRef.current) return
    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: MAP_STYLES[theme],
      center,
      zoom,
    })
    map.on('load', () => setIsLoaded(true))
    setMapInstance(map)
    if (ref) {
      if (typeof ref === 'function') ref(map)
      else (ref as React.MutableRefObject<MapLibreGL.Map | null>).current = map
    }
    return () => { map.remove(); setMapInstance(null); setIsLoaded(false) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update style when theme changes
  useEffect(() => {
    if (!mapInstance || !isLoaded) return
    mapInstance.setStyle(MAP_STYLES[theme])
  }, [theme, mapInstance, isLoaded])

  return (
    <MapContext.Provider value={{ map: mapInstance, isLoaded }}>
      <div className={`relative overflow-hidden ${className}`}>
        <div ref={containerRef} className="absolute inset-0" />
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}
        {children}
      </div>
    </MapContext.Provider>
  )
})

/* ── MapMarker ───────────────────────────────────────────────────────────── */
interface MapMarkerProps {
  coordinates: [number, number]
  color?: string
  label?: string
  popupContent?: ReactNode
}

export function MapMarker({ coordinates, color = '#D9D0B5', popupContent }: MapMarkerProps) {
  const { map, isLoaded } = useMap()
  const markerRef = useRef<MapLibreGL.Marker | null>(null)
  const popupRef  = useRef<MapLibreGL.Popup | null>(null)

  useEffect(() => {
    if (!map || !isLoaded) return

    const el = document.createElement('div')
    el.style.cssText = `
      width: 32px; height: 32px; border-radius: 50% 50% 50% 0;
      background: ${color}; border: 2px solid #181818;
      transform: rotate(-45deg); cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    `

    const marker = new MapLibreGL.Marker({ element: el, anchor: 'bottom' })
      .setLngLat(coordinates)
      .addTo(map)
    markerRef.current = marker

    if (popupContent) {
      const container = document.createElement('div')
      container.style.cssText = 'padding:8px; min-width:160px;'

      const popup = new MapLibreGL.Popup({ offset: 32, closeButton: false })
        .setDOMContent(container)
      popupRef.current = popup

      el.addEventListener('click', () => {
        if (map.hasControl({ onAdd: () => document.createElement('div'), onRemove: () => {} } as never)) return
        popup.setLngLat(coordinates).addTo(map)
      })
    }

    return () => { marker.remove(); popupRef.current?.remove() }
  }, [map, isLoaded, coordinates, color, popupContent])

  return null
}

/* ── MapControls ─────────────────────────────────────────────────────────── */
export function MapControls() {
  const { map } = useMap()

  const zoomIn  = useCallback(() => map?.zoomIn(), [map])
  const zoomOut = useCallback(() => map?.zoomOut(), [map])
  const locate  = useCallback(() => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      map?.flyTo({ center: [coords.longitude, coords.latitude], zoom: 15 })
    })
  }, [map])

  const btnCls = 'w-9 h-9 flex items-center justify-center rounded-lg bg-surface/90 border border-border hover:bg-secondary text-foreground transition-colors backdrop-blur-sm'

  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5">
      <button onClick={zoomIn}  className={btnCls} title="Zoom in">
        <Plus  className="w-4 h-4" />
      </button>
      <button onClick={zoomOut} className={btnCls} title="Zoom out">
        <Minus className="w-4 h-4" />
      </button>
      <button onClick={locate}  className={btnCls} title="My location">
        <Locate className="w-4 h-4" />
      </button>
    </div>
  )
}
