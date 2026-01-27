import React, { useState } from 'react'
import { Box } from '@mui/material'
import { theme } from '../lib/theme'
import Navbar from '../components/Navbar'
import JournalPage from './routes/JournalPage'
import StatisticsPage from './routes/StatisticsPage'
import StudentsPage from './routes/StudentsPage'
import { Provider } from './provider'

type PageType = 'journal' | 'statistics' | 'students'

function App(): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState<PageType>('journal')

  const handlePageChange = (page: PageType): void => {
    setCurrentPage(page)
  }

  const renderCurrentPage = (): React.ReactNode => {
    switch (currentPage) {
      case 'journal':
        return <JournalPage />
      case 'students':
        return <StudentsPage />
      case 'statistics':
        return <StatisticsPage />
      default:
        return <JournalPage />
    }
  }

  return (
    <Provider>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.default,
          overflow: 'scroll'
        }}
      >
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
        {renderCurrentPage()}
      </Box>
    </Provider>
  )
}

export default App
