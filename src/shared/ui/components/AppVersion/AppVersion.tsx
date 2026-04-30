import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

const VERSION_OPACITY = 0.7

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
  return (
    <Typography variant="caption" color="text.secondary" sx={{ opacity: VERSION_OPACITY }}>
      {`v${version}`}
    </Typography>
  )
}
