import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#311b92',
      light: '#6746c3',
      dark: '#000063',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#212121',
      light: '#484848',
      dark: '#000000',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Overpass, sans-serif'
  }
})
