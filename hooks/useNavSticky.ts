import { useEffect, useRef, useState } from 'react'

// The bar overlays the pinned hero while the hero stage is on screen, then
// takes over as a fixed bar once the hero has scrolled past. Scrolling back
// up returns it to the overlay style (Zando reference behavior).
export function useNavSticky(pathname: string): { isStuck: boolean } {
  const [isStuck, setIsStuck] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const track = document.querySelector<HTMLElement>('.hero-track')

    // Subpages have no hero to clear, so the bar is there from the start.
    if (!track) {
      setIsStuck(true)
      return
    }

    const update = () => {
      rafRef.current = null
      // The pinned hero is still on screen while its track bottom sits
      // below the viewport top; once it clears, the bar takes over.
      setIsStuck(track.getBoundingClientRect().bottom <= 0)
    }

    const schedule = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [pathname])

  return { isStuck }
}