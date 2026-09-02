import CircularProgress from '@mui/material/CircularProgress'
import type { LoaderProps } from './types/LoaderProps'
import { LoaderMessage, LoaderRoot } from './Loader.styles'

export const LOADER_SIZE_PX = 32

export function Loader({ message, className }: LoaderProps) {
  return (
    <LoaderRoot className={className} role="status" aria-busy="true">
      <CircularProgress size={LOADER_SIZE_PX} color="primary" />
      {message ? <LoaderMessage variant="body2">{message}</LoaderMessage> : null}
    </LoaderRoot>
  )
}
