import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255, 255, 255, 9%)'
  },
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '120px 100px 100px calc(60% - 424px) 60px',
    marginLeft: '20%',
    gap: '16px',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '120px 100px 100px 0px 60px',
      gap: '8px',
      marginLeft: '2%'
    }
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

  return (
    <AppBar position="sticky" color="transparent" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className={classes.logo}>
          LOGO
        </Typography>
        <Link href="/" className={classes.link} color="secondary" underline="none">
          Veiculos
        </Link>
        <Link href="/reservas" className={classes.link} color="secondary" underline="none">
          Reservas
        </Link>
        <aside className={classes.login}></aside>
      </Toolbar>
    </AppBar>
  )
}

export default Header
