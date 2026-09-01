import CircularProgress from '@mui/material/CircularProgress'
import { FallbackRoot } from './RouteSuspenseFallback.styles'

export function RouteSuspenseFallback() {
  return (
    <FallbackRoot>
      <CircularProgress color="primary" />
    </FallbackRoot>
  )
}
