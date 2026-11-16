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

  return (
    <nav className="section-rail" aria-label={label}>
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
