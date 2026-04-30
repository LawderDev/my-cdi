import { useEffect, useState } from 'react'

const CLOCK_TICK_MS = 1000
const CLOCK_LOCALE = 'fr-FR'

const CLOCK_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit'
}

export interface UseClockReturn {
  time: string
}

function formatNow(): string {
  return new Intl.DateTimeFormat(CLOCK_LOCALE, CLOCK_FORMAT_OPTIONS).format(new Date())
}

export function useClock(): UseClockReturn {
  const [time, setTime] = useState<string>(formatNow)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatNow())
    }, CLOCK_TICK_MS)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return { time }
}
