/* eslint-disable react/display-name */
import { useContext, useEffect, useState, useRef } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

import AccountCircle from '@material-ui/icons/AccountCircle'

import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp'
import { RootContext } from '../../contexts/RootContext'

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'rgba(255, 255, 255, 80%)',
    width: '300px',
    padding: '16px 24px',
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      '& > div:not(:last-child)': {
        marginBottom: '16px'
      }
    }
  },
  link: {
    position: 'absolute',
    bottom: 24
  },
  link2: {
    display: 'flex',
    margin: '0px auto'
  },
  logout: {
    textAlign: 'center',
    '& p': {
      margin: '16px 0px'
    }
  }
})

const mapFlow = {
  0: (setMode, classStyle) => (
    <>
      <SignIn />
      <Link
        id="sign-up"
        className={classStyle}
        component="button"
        variant="body2"
        onClick={() => setMode(1)}
        type="button"
      >
        Fazer cadastro
      </Link>
    </>
  ),
  1: (setMode, classStyle) => (
    <>
      <SignUp setMode={setMode} />
      <Link
        id="sign-in"
        className={classStyle}
        component="button"
        variant="body2"
        onClick={() => setMode(0)}
        type="button"
      >
        Fazer login
      </Link>
    </>
  )
}

const Login = () => {
  const classes = useStyles()
  const anchorEl = useRef(null)
  const { user, triggerLogin, dispatch } = useContext(RootContext)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(0)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    setMode(0)
    dispatch({ type: 'update', key: 'user', value: null })
    window.localStorage.setItem('user', null)
    window.localStorage.setItem('accessToken', null)
  }

  useEffect(() => {
    dispatch({ type: 'update', key: 'triggerLogin', value: false })
    triggerLogin && handleOpen()
  }, [triggerLogin, dispatch])

  useEffect(() => {
    const localUser = window.localStorage.getItem('user')
    const parsedUser = JSON.parse(localUser)

    parsedUser && dispatch({ type: 'update', key: 'user', value: parsedUser })
  }, [dispatch])

  return (
    <div>
      <IconButton
        ref={anchorEl}
        id="account-button"
        data-testid="account-button"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
        color={user ? 'primary' : 'default'}
        size="small"
      >
        <AccountCircle />
      </IconButton>
      <Popover
        id="login"
        className={classes.root}
        open={open}
        anchorEl={anchorEl.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          className: classes.paper
        }}
      >
        {user ? (
          <div className={classes.logout}>
            <Typography variant="h6" color="textPrimary">
              Seja bem vindo
            </Typography>
            <Typography variant="body1" component="p">
              {user.name}
            </Typography>
            <Link
              className={classes.link2}
              component="button"
              variant="body2"
              onClick={handleLogout}
              type="button"
            >
              Fazer logout
            </Link>
          </div>
        ) : (
          mapFlow[mode](setMode, classes.link)
        )}
      </Popover>
    </div>
  )
}

export default Login
