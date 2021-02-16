import { useCallback, useContext, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { getUser, signIn } from '../../services/api'
import { RootContext } from '../../contexts/RootContext'

const useStyles = makeStyles({
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const SignIn = () => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [newUser, setNewUser] = useState(false)
  const [errorMsg, setMsg] = useState('')
  const { dispatch } = useContext(RootContext)
  const cpf = useRef('')
  const user = useRef(null)

  const onSubmit = async (data) => {
    const newData = { ...data, cpf: cpf.current }

    try {
      const response = await signIn(newData)

      window.localStorage.setItem('user', JSON.stringify(user.current))
      window.localStorage.setItem('accessToken', JSON.stringify(response.accessToken))

      dispatch({ type: 'update', key: 'user', value: user.current })
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

    try {
      const response = await getUser({ cpf: cpf.current })

      setNewUser(!response[0])
      user.current = response[0]
    } catch (e) {
      console.info(e)
    }
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

export default SignIn
