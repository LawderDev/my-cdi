import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { MONO_FONT_FAMILY } from '@ui/theme'

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
    <Typography
      component="span"
      sx={{ fontFamily: MONO_FONT_FAMILY, fontSize: '12px', color: 'var(--text-dim)' }}
    >
      {`v${version}`}
    </Typography>
  )
}
