import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import Navbar from './components/Navbar'
import JournalPage from './pages/JournalPage'
import StatisticsPage from './pages/StatisticsPage'

// Thème MUI personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    },
    background: {
      default: '#f5f5f5'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
})

type PageType = 'journal' | 'statistics'

function App(): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState<PageType>('journal')

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page)
  }

  const renderCurrentPage = () => {
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
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
        {renderCurrentPage()}
      </Box>
    </ThemeProvider>
  )
}

export default App
