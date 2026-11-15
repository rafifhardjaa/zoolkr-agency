import { useEffect, useRef, useState } from 'react'

export function useScrollReveal<T extends HTMLElement>(options?: {
  threshold?: number
  rootMargin?: string
  once?: boolean
}): { ref: React.RefObject<T | null>; isVisible: boolean } {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (options?.once !== false) {
            observer.disconnect()
          }
        } else if (options?.once === false) {
          setIsVisible(false)
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
      },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [options?.rootMargin, options?.once, options?.threshold])

  return { ref, isVisible }
}
