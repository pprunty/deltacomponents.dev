"use client"

import { useEffect, useRef, useState } from "react"

type MapboxStyle =
  | "streets-v12"
  | "outdoors-v12"
  | "light-v11"
  | "dark-v11"
  | "satellite-v9"
  | "satellite-streets-v12"
  | "navigation-day-v1"
  | "navigation-night-v1"

interface MapboxPointerLabelProps {
  label: string
  href?: string
  className?: string
}

export function MapboxPointerLabel({
  label,
  href,
  className = "",
}: MapboxPointerLabelProps) {
  const baseClasses =
    "bg-background border-border text-foreground absolute right-4 bottom-4 z-10 flex items-center gap-1 rounded border px-3 py-1 text-xs font-normal"

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} cursor-pointer ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    )
  }

  return <div className={`${baseClasses} ${className}`}>{label}</div>
}

interface MapboxPointerProps {
  latitude: number
  longitude: number
  zoom?: number
  mapboxToken?: string
  googleMapsUrl?: string
  markerColor?: string
  className?: string
  interactive?: boolean
  style?: MapboxStyle
  label?: string
  labelHref?: string
  clickForDirections?: boolean
  children?: React.ReactNode
}

declare global {
  interface Window {
    mapboxgl: any
  }
}

// Global promise to track Mapbox script loading
let mapboxLoadPromise: Promise<void> | null = null

export function MapboxPointer({
  latitude,
  longitude,
  zoom = 13,
  mapboxToken,
  googleMapsUrl,
  markerColor = "#679BFF",
  className = "",
  interactive = true,
  style = "streets-v12",
  label,
  labelHref,
  clickForDirections = false,
  children,
}: MapboxPointerProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get token from props or environment
  const token = mapboxToken || process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

  useEffect(() => {
    // Check if token is available
    if (!token) {
      console.warn(
        "MapboxPointer: No Mapbox token found. Please provide mapboxToken prop or set NEXT_PUBLIC_MAPBOX_TOKEN environment variable."
      )
      return
    }

    // Reset map if it exists
    if (map.current) {
      map.current.remove()
      map.current = null
    }

    const loadMapbox = (): Promise<void> => {
      // If already loading or loaded, return the existing promise
      if (mapboxLoadPromise) {
        return mapboxLoadPromise
      }

      mapboxLoadPromise = new Promise<void>((resolve, reject) => {
        // Load CSS if not already loaded
        if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
          const link = document.createElement("link")
          link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
          link.rel = "stylesheet"
          document.head.appendChild(link)
        }

        // Check if already loaded
        if (window.mapboxgl) {
          resolve()
          return
        }

        // Load JS if not already loaded
        if (!document.querySelector('script[src*="mapbox-gl.js"]')) {
          const script = document.createElement("script")
          script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"
          script.async = true
          script.onload = () => resolve()
          script.onerror = () => {
            console.error("Failed to load Mapbox GL JS")
            reject(new Error("Failed to load Mapbox GL JS"))
          }
          document.head.appendChild(script)
        } else {
          // Script tag exists, wait for window.mapboxgl to be available
          const checkLoaded = setInterval(() => {
            if (window.mapboxgl) {
              clearInterval(checkLoaded)
              resolve()
            }
          }, 50)

          // Timeout after 10 seconds
          setTimeout(() => {
            clearInterval(checkLoaded)
            if (!window.mapboxgl) {
              reject(new Error("Mapbox GL JS load timeout"))
            }
          }, 10000)
        }
      })

      return mapboxLoadPromise
    }

    const initializeMap = () => {
      if (!mapContainer.current || !window.mapboxgl) return

      try {
        window.mapboxgl.accessToken = token

        map.current = new window.mapboxgl.Map({
          container: mapContainer.current,
          style: `mapbox://styles/mapbox/${style}`,
          center: [longitude, latitude],
          zoom: zoom,
          interactive: interactive,
          attributionControl: false,
        })

        map.current.on("load", () => {
          setIsLoading(false)
          setTimeout(() => {
            const logoElements = document.querySelectorAll(
              ".mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-bottom-right"
            )
            logoElements.forEach((el: Element) => {
              if (el instanceof HTMLElement) {
                el.style.display = "none"
                el.style.visibility = "hidden"
                el.style.opacity = "0"
              }
            })
            // Also hide parent containers
            const ctrlContainers = document.querySelectorAll(".mapboxgl-ctrl")
            ctrlContainers.forEach((el: Element) => {
              if (
                el instanceof HTMLElement &&
                el.querySelector(".mapboxgl-ctrl-logo")
              ) {
                el.style.display = "none"
              }
            })
          }, 100)

          const el = document.createElement("div")
          el.className = "custom-marker"
          el.style.width = "24px"
          el.style.height = "24px"
          el.innerHTML = `
            <div style="position: relative; height: 100%; width: 100%;">
              <div class="animate-marker" style="position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; border-radius: 50%; background-color: ${markerColor};"></div>
              <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; background-color: ${markerColor}; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);"></div>
            </div>
          `

          new window.mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .addTo(map.current)
        })
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }

    // Ensure Mapbox is loaded before initializing
    loadMapbox()
      .then(() => {
        initializeMap()
      })
      .catch((error) => {
        console.error("Failed to load Mapbox:", error)
        setIsLoading(false)
      })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [latitude, longitude, zoom, token, markerColor, interactive, style])

  const handleClick = () => {
    if (clickForDirections) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
      window.open(directionsUrl, "_blank", "noopener,noreferrer")
    } else if (googleMapsUrl) {
      window.open(googleMapsUrl, "_blank", "noopener,noreferrer")
    }
  }

  // Show error message if no token
  if (!token) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">Mapbox token not configured</p>
      </div>
    )
  }

  return (
    <>
      <div
        className={`bg-muted relative overflow-hidden rounded-xl border-none ${
          clickForDirections || googleMapsUrl ? "cursor-pointer" : ""
        } ${className}`}
        onClick={handleClick}
      >
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-muted-foreground flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span className="text-sm">Loading map...</span>
            </div>
          </div>
        )}
        <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
        {children ||
          (label && <MapboxPointerLabel label={label} href={labelHref} />)}
      </div>
      <style jsx>{`
        @keyframes marker {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(6);
            opacity: 0;
          }
        }

        :global(.animate-marker) {
          animation: marker 4s ease-out infinite;
        }

        :global(.mapboxgl-ctrl-logo),
        :global(.mapboxgl-ctrl-attrib),
        :global(.mapboxgl-ctrl-bottom-left),
        :global(.mapboxgl-ctrl-bottom-right),
        :global(.mapboxgl-compact) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>
    </>
  )
}
