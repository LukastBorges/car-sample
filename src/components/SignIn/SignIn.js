import { useCallback, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { getUser, signIn } from '../../services/api'

const useStyles = makeStyles({
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const SignIn = (props) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [newUser, setNewUser] = useState(false)
  const [errorMsg, setMsg] = useState('')
  const cpf = useRef('')
  const user = useRef(null)

  const onSubmit = async (data) => {
    const newData = { ...data, cpf: cpf.current }

    try {
      const response = await signIn(newData)

      window.localStorage.setItem('user', JSON.stringify(user.current))
      window.localStorage.setItem('token', JSON.stringify(response))
      props.setUser(user.current)
      setNewUser(false)
      setMsg('')
    } catch (e) {
      setMsg('Email e/ou senha inválido')
    }
  }

  const setCPFValue = ({ value }) => {
    cpf.current = value
  }

  const checkUserExists = useCallback(async () => {
    if (!cpf.current) {
      setNewUser(false)
      return
    }

    const response = await getUser({ cpf: cpf.current })

    setNewUser(!response[0])
    user.current = response[0]
  }, [])

  return (
    <>
      <Typography variant="h6" color="primary">
        Efetuar login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <NumberFormat
          id="user-cpf"
          name="cpf"
          inputRef={register({ required: true })}
          customInput={TextField}
          label="CPF"
          variant="filled"
          helperText={newUser ? 'Usuário não cadastrado' : ''}
          onValueChange={setCPFValue}
          onBlur={checkUserExists}
          error={newUser}
          format="###.###.###-##"
          autoComplete="off"
          isNumericString
          required
        />
        <TextField
          id="user-email"
          name="email"
          inputRef={register({ required: true })}
          label="Email"
          variant="filled"
          autoComplete="off"
          required
        />
        <TextField
          id="user-password"
          name="password"
          inputRef={register({ required: true })}
          label="Senha"
          variant="filled"
          type="password"
          error={!!errorMsg}
          helperText={errorMsg}
          required
        />
        <div className={classes.actionButtons}>
          <Button color="primary" type="submit" variant="outlined">
            Login
          </Button>
        </div>
      </form>
    </>
  )
}

SignIn.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
}

export default SignIn
