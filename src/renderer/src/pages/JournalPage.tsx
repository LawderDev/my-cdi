import React from 'react'
import { Container, Typography, Paper, Box } from '@mui/material'

const JournalPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Journal des Fréquentations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gérez les entrées et sorties des élèves au CDI
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
          backgroundColor: '#f5f5f5'
        }}
      >
        <Box textAlign="center">
          <Typography variant="h6" color="text.secondary">
            Page en cours de développement
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Les fonctionnalités de gestion des fréquentations seront bientôt disponibles
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default JournalPage
