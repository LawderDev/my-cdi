import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes, since data is local and doesn't change often
      retry: 1 // Retry once on failure
    }
  }
})
