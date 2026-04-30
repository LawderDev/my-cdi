import { useEffect, useState } from 'react'

const CLASSES = 'font-mono text-xs text-text-dim'

export function AppVersion() {
  const [version, setVersion] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    async function loadVersion() {
      const value = await window.electronAPI.getAppVersion()
      if (!cancelled) {
        setVersion(value)
      }
    }
    void loadVersion()
    return () => {
      cancelled = true
    }
  }, [])

  if (!version) {
    return null
  }
  return <span className={CLASSES}>{`v${version}`}</span>
}
