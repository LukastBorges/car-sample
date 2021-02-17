import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00984a',
      light: '#50ca77',
      dark: '#00691f',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e65100',
      light: '#ffaa51',
      dark: '#ba4a00',
      contrastText: '#000000'
    }
  },
  typography: {
    fontFamily: 'Overpass, sans-serif'
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#ffffff'
      }
    }
  }
})
