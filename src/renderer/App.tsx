import { HashRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/fr'
import { ErrorBoundary } from '@ui/components/ErrorBoundary'
import { createAppTheme } from '@ui/theme'
import { useThemePreference } from '@settings/api/useThemePreference'
import { AppRoutes } from './routes'

import '@shared/i18n/config'
import '@shared/ui/styles/global.css'

const MS_PER_SECOND = 1000
const QUERY_STALE_TIME_SECONDS = 60
const QUERY_STALE_TIME_MS = QUERY_STALE_TIME_SECONDS * MS_PER_SECOND
const QUERY_RETRY_COUNT = 1

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: QUERY_STALE_TIME_MS, retry: QUERY_RETRY_COUNT } }
})

function AppSurface() {
  const preference = useThemePreference()
  const appTheme = createAppTheme(preference.data)

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <ErrorBoundary>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </ErrorBoundary>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppSurface />
    </QueryClientProvider>
  )
}
