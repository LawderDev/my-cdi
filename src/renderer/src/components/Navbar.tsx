import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'

// Icônes simples en SVG
const JournalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
)

const StatsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
)

const SchoolIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
  </svg>
)

interface NavbarProps {
  currentPage: 'journal' | 'statistics'
  onPageChange: (page: 'journal' | 'statistics') => void
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="cdi-logo"
          sx={{ mr: 2 }}
        >
          <SchoolIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestion CDI
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<JournalIcon />}
            variant={currentPage === 'journal' ? 'outlined' : 'text'}
            onClick={() => onPageChange('journal')}
            sx={{
              borderColor: currentPage === 'journal' ? 'white' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Journal
          </Button>

          <Button
            color="inherit"
            startIcon={<StatsIcon />}
            variant={currentPage === 'statistics' ? 'outlined' : 'text'}
            onClick={() => onPageChange('statistics')}
            sx={{
              borderColor: currentPage === 'statistics' ? 'white' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Statistiques
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
