import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import Login from '../Login/Login'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0, 152, 74, 0.21)'
  },
  toolbar: {
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: '140px 100px 100px calc(80% - 512px) 60px',
    marginLeft: '20%',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '120px 100px 100px calc(100% - 512px) 60px',
      gap: '8px',
      marginLeft: '2%'
    }
  },
  logo: {
    fontStyle: 'italic',
    color: theme.palette.primary.dark
  },
  link: {
    fontSize: '16px',
    transition: 'color 500ms cubic-bezier(0.77, 0, 0.175, 1)',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  login: {
    gridColumn: '5'
  }
}))

const Header = () => {
  const classes = useStyles()
  const { pathname } = useLocation()

  return (
    <AppBar position="sticky" color="transparent" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className={classes.logo}>
          LocAqui
        </Typography>
        <Link
          href="/"
          className={classes.link}
          color={pathname === '/' ? 'primary' : 'textPrimary'}
          underline="none"
        >
          Veiculos
        </Link>
        <Link
          href="/reservas"
          className={classes.link}
          color={pathname === '/reservas' ? 'primary' : 'textPrimary'}
          underline="none"
        >
          Reservas
        </Link>
        <aside className={classes.login}>
          <Login />
        </aside>
      </Toolbar>
    </AppBar>
  )
}

export default Header
