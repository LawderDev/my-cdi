import { createTheme, Theme } from '@mui/material/styles'

// Thème MUI personnalisé
export const theme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C4DFF'
    },
    secondary: {
      main: '#D7DCEC'
    },
    background: {
      default: '#111936',
      paper: '#212946'
    },
    text: {
      primary: '#D7DCEC',
      secondary: '#D7DCEC'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
})

export default theme
