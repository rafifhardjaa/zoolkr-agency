'use client'

import { useEffect, useRef } from 'react'

interface HeroVideoProps {
  label: string
}

export function HeroVideo({ label }: HeroVideoProps) {
  const desktopRef = useRef<HTMLVideoElement>(null)
  const mobileRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const sizeQuery = window.matchMedia('(max-width: 767px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const videos = [desktopRef.current, mobileRef.current]

    const markReady = (event: Event) => {
      if (event.currentTarget instanceof HTMLVideoElement) {
        event.currentTarget.dataset.ready = 'true'
      }
    }

    const activate = () => {
      const active = sizeQuery.matches ? mobileRef.current : desktopRef.current
      const idle = sizeQuery.matches ? desktopRef.current : mobileRef.current

      idle?.pause()
      if (!active) return

      if (motionQuery.matches) {
        // Reduced motion keeps the poster still; the WebM/MP4 never downloads.
        active.pause()
        return
      }

      active.load()
      void active.play().catch(() => {
        // Autoplay can be refused; the poster stays visible until playback starts.
      })
    }

    for (const video of videos) {
      video?.addEventListener('playing', markReady)
    }

    activate()
    sizeQuery.addEventListener('change', activate)
    motionQuery.addEventListener('change', activate)

    return () => {
      sizeQuery.removeEventListener('change', activate)
      motionQuery.removeEventListener('change', activate)
      for (const video of videos) {
        video?.removeEventListener('playing', markReady)
        video?.pause()
      }
    }
  }, [])

  return (
    <>
      <video
        ref={desktopRef}
        className="hero-media hero-media-desktop"
        width={1920}
        height={1392}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
      >
        <source src="/videos/hero-banner.webm" type="video/webm" />
        <source src="/videos/hero-banner.mp4" type="video/mp4" />
      </video>

      <video
        ref={mobileRef}
        className="hero-media hero-media-mobile"
        width={1280}
        height={928}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
      >
        <source src="/videos/hero-banner-mobile.webm" type="video/webm" />
        <source src="/videos/hero-banner-mobile.mp4" type="video/mp4" />
      </video>
    </>
  )
}
