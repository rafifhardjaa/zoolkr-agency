import { useEffect, useState } from 'react'
import { onLayoutChange, subscribeScroll } from '@/lib/scrollFeed'

// The bar overlays the pinned hero while the hero stage is on screen, then
// takes over as a fixed bar once the hero has scrolled past. Scrolling back
// up returns it to the overlay style (Zando reference behavior).
export function useNavSticky(pathname: string): { isStuck: boolean } {
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const track = document.querySelector<HTMLElement>('.hero-track')

    // Subpages have no hero to clear, so the bar is there from the start.
    if (!track) {
      setIsStuck(true)
      return
    }

    let bottom = track.getBoundingClientRect().bottom + window.scrollY

    const refresh = () => {
      bottom = track.getBoundingClientRect().bottom + window.scrollY
    }

    setIsStuck(bottom - window.scrollY <= 0)

    const unsubscribeLayout = onLayoutChange(refresh)
    const unsubscribeScroll = subscribeScroll((state) => {
      const stuck = bottom - state.y <= 0
      setIsStuck((previous) => (previous === stuck ? previous : stuck))
    })

    return () => {
      unsubscribeScroll()
      unsubscribeLayout()
    }
  }, [pathname])

  return { isStuck }
}
