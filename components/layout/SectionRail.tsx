'use client'

import { useEffect, useState } from 'react'
import type { RailItem } from '@/content/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { onLayoutChange, subscribeScroll } from '@/lib/scrollFeed'

export function SectionRail({
  sections,
  label,
}: {
  sections: RailItem[]
  label: string
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const [overBand, setOverBand] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        setActive(visible[visible.length - 1].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [sections])

  // Full-bleed dark bands (the ticker, the footer) have no right margin for the
  // rail and invert its contrast, so the rail steps aside while they pass
  // through its band. Both boxes are cached so the frame loop never reads
  // layout; the band offsets are document-space, the rail is fixed.
  useEffect(() => {
    const rail = document.querySelector<HTMLElement>('.section-rail')
    if (!rail) return

    const bands = Array.from(
      document.querySelectorAll<HTMLElement>('.ticker, footer')
    )
    if (bands.length === 0) return

    let railTop = 0
    let railBottom = 0
    let bandRects: Array<{ top: number; bottom: number }> = []

    const refresh = () => {
      const railBox = rail.getBoundingClientRect()
      railTop = railBox.top
      railBottom = railBox.bottom
      bandRects = bands.map((band) => {
        const box = band.getBoundingClientRect()
        return { top: box.top + window.scrollY, bottom: box.bottom + window.scrollY }
      })
    }

    refresh()

    const unsubscribeLayout = onLayoutChange(refresh)
    const unsubscribeScroll = subscribeScroll((state) => {
      const overBand = bandRects.some(
        (band) => band.top - state.y < railBottom && band.bottom - state.y > railTop
      )
      setOverBand((previous) => (previous === overBand ? previous : overBand))
    })

    return () => {
      unsubscribeScroll()
      unsubscribeLayout()
    }
  }, [])

  return (
    <nav
      className="section-rail"
      aria-label={label}
      data-idle={active === sections[0]?.id || overBand ? 'true' : undefined}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          aria-current={active === section.id ? 'true' : undefined}
          onClick={() =>
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
          }
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}
