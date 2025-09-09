import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import { theme } from './theme'
import Navbar from './components/Navbar'
import JournalPage from './pages/JournalPage'
import StatisticsPage from './pages/StatisticsPage'

type PageType = 'journal' | 'statistics'

function App(): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState<PageType>('journal')

  const handlePageChange = (page: PageType): void => {
    setCurrentPage(page)
  }

  const renderCurrentPage = (): React.ReactNode => {
    switch (currentPage) {
      case 'journal':
        return <JournalPage />
      case 'statistics':
        return <StatisticsPage />
      default:
        return <JournalPage />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ height: '100vh', width: '100vw', backgroundColor: theme.palette.background.default }}
      >
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
        {renderCurrentPage()}
      </Box>
    </ThemeProvider>
  )
}

export default App
