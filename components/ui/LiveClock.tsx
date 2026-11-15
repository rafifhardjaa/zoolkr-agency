'use client'

import { useEffect, useState } from 'react'

const WIB_TIME_ZONE = 'Asia/Jakarta'

const timeFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

const formatTime = timeFormatter(WIB_TIME_ZONE)

const PLACEHOLDER = '--:--'

/**
 * Live studio clock. Renders a stable placeholder on the server, then syncs to
 * the browser clock after mount so hydration stays deterministic.
 * Shows only the WIB time (no label), updating every second.
 */
export function LiveClock({
  className,
}: {
  className?: string
}): React.JSX.Element {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const time = now ? formatTime.format(now) : PLACEHOLDER

  return (
    <span className={['clock', className].filter(Boolean).join(' ')}>
      <span className="clock-time">{time}</span>
    </span>
  )
}
