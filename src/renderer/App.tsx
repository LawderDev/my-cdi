import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@shared/ui/theme'
import { AppRoutes } from './routes'

import '@shared/i18n/config'
import '@shared/ui/styles/global.css'

const MS_PER_SECOND = 1000
const QUERY_STALE_TIME_SECONDS = 60
const QUERY_STALE_TIME_MS = QUERY_STALE_TIME_SECONDS * MS_PER_SECOND
const QUERY_RETRY_COUNT = 1

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      retry: QUERY_RETRY_COUNT
    }
  }
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
