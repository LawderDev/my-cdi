import Typography from '@mui/material/Typography'
import { MONO_FONT_FAMILY } from '@ui/theme'

interface AppVersionProps {
  version: string
}

export function AppVersion({ version }: AppVersionProps) {
  if (!version) {
    return null
  }
  return (
    <Typography
      component="span"
      sx={{ fontFamily: MONO_FONT_FAMILY, fontSize: '12px', color: 'var(--text-dim)' }}
    >
      {`version ${version}`}
    </Typography>
  )
}
