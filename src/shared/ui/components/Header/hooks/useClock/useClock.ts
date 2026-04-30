import { useEffect, useState } from 'react'

const CLOCK_TICK_MS = 1000
const CLOCK_LOCALE = 'fr-FR'
const NOON_HOUR = 12

const CLOCK_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit'
}

export type ClockPeriod = 'matin' | 'aprem'

export interface UseClockReturn {
  time: string
  period: ClockPeriod
}

function formatNow(): string {
  return new Intl.DateTimeFormat(CLOCK_LOCALE, CLOCK_FORMAT_OPTIONS).format(new Date())
}

function currentPeriod(): ClockPeriod {
  return new Date().getHours() < NOON_HOUR ? 'matin' : 'aprem'
}

export function useClock(): UseClockReturn {
  const [time, setTime] = useState<string>(formatNow)
  const [period, setPeriod] = useState<ClockPeriod>(currentPeriod)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatNow())
      setPeriod(currentPeriod())
    }, CLOCK_TICK_MS)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return { time, period }
}
