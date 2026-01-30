import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { theme } from '@renderer/lib/theme'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
  currentPage: 'journal' | 'statistics' | 'students'
  onPageChange: (page: 'journal' | 'statistics' | 'students') => void
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const { t } = useTranslation()
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: theme.palette.background.default }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: theme.palette.text.primary }}
        >
          MyCdi
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            variant={currentPage === 'journal' ? 'outlined' : 'text'}
            onClick={() => onPageChange('journal')}
            sx={{
              color: theme.palette.text.primary,
              borderColor: currentPage === 'journal' ? theme.palette.primary.main : 'transparent',
              '&:hover': {
                backgroundColor: `rgba(124, 77, 255, 0.1)`,
                color: theme.palette.primary.main
              }
            }}
          >
            Journal
          </Button>

          <Button
            color="inherit"
            variant={currentPage === 'statistics' ? 'outlined' : 'text'}
            onClick={() => onPageChange('statistics')}
            sx={{
              color: theme.palette.text.primary,
              borderColor:
                currentPage === 'statistics' ? theme.palette.primary.main : 'transparent',
              '&:hover': {
                backgroundColor: `rgba(124, 77, 255, 0.1)`,
                color: theme.palette.primary.main
              }
            }}
          >
            {t('navBar.statistics')}
          </Button>
          <Button
            color="inherit"
            variant={currentPage === 'students' ? 'outlined' : 'text'}
            onClick={() => onPageChange('students')}
            sx={{
              color: theme.palette.text.primary,
              borderColor: currentPage === 'students' ? theme.palette.primary.main : 'transparent',
              '&:hover': {
                backgroundColor: `rgba(124, 77, 255, 0.1)`,
                color: theme.palette.primary.main
              }
            }}
          >
            {t('navBar.students')}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
