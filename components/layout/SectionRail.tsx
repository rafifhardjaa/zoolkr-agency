'use client'

import { useEffect, useState } from 'react'
import type { RailItem } from '@/content/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function SectionRail({
  sections,
  label,
}: {
  sections: RailItem[]
  label: string
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const [overFooter, setOverFooter] = useState(false)
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

  // The footer is dark and outside the rail's index, so the rail steps aside
  // once the footer top rises into the rail's band.
  useEffect(() => {
    const footer = document.querySelector('footer')
    const rail = document.querySelector('.section-rail')
    if (!footer || !rail) return

    const update = () =>
      setOverFooter(
        footer.getBoundingClientRect().top < rail.getBoundingClientRect().bottom
      )

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <nav
      className="section-rail"
      aria-label={label}
      data-idle={active === sections[0]?.id || overFooter ? 'true' : undefined}
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
