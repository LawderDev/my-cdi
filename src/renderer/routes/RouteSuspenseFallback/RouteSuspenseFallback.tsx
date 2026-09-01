import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export function RouteSuspenseFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 4
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  )
}
