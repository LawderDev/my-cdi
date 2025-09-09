import React from 'react'
import { Container, Typography, Paper, Box } from '@mui/material'
import { theme } from '../theme'

const StatisticsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          Statistiques CDI
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary, opacity: 0.8 }}>
          Visualisez les données de fréquentation et d&apos;utilisation du CDI
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 4,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Box textAlign="center">
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            Page en cours de développement
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary, opacity: 0.7, mt: 1 }}
          >
            Les statistiques et graphiques seront bientôt disponibles
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default StatisticsPage
