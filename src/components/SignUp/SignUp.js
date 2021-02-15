import { useCallback, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/button'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { signUp, getUser } from '../../services/api'

const useStyles = makeStyles({
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const SignUp = (props) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [newUser, setNewUser] = useState(true)
  const cpf = useRef('')

  const onSubmit = async (data) => {
    const newData = { ...data, cpf: cpf.current }

    delete newData.confirmPassword

    try {
      const response = await signUp(newData)

      setNewUser(false)
      window.localStorage.setItem('user', JSON.stringify(response))
      props.setMode(0)
    } catch (e) {
      console.error(e)
    }
  }

  const setCPFValue = ({ value }) => {
    cpf.current = value
  }

  const checkUserExists = useCallback(async () => {
    if (!cpf.current) return

    const response = await getUser({ cpf: cpf.current })

    response.length ? setNewUser(false) : setNewUser(true)
  }, [])

  return (
    <div>
      <Typography variant="h6" color="primary">
        Cadastrar novo usuário
      </Typography>
      <Typography variant="caption" color="secondary">
        Comece digitando seu CPF para verificar se já existe um cadastro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <NumberFormat
          id="user-cpf"
          name="cpf"
          inputRef={register({ required: true })}
          customInput={TextField}
          label="CPF"
          variant="filled"
          helperText={!newUser ? 'Usuário já cadastrado' : ''}
          onValueChange={setCPFValue}
          onBlur={checkUserExists}
          error={!newUser}
          format="###.###.###-##"
          autoComplete="off"
          isNumericString
          required
        />
        <TextField
          id="user-name"
          name="name"
          inputRef={register({ required: true })}
          label="Nome"
          variant="filled"
          autoComplete="off"
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
          required
        />
        <TextField
          id="user-password-confirmation"
          name="confirmPassword"
          inputRef={register({ required: true })}
          label="Confirmar senha"
          variant="filled"
          type="password"
          autoComplete="new-password"
          required
        />
        <div className={classes.actionButtons}>
          <Button color="primary" type="submit" variant="outlined">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}

SignUp.propTypes = {
  setUser: PropTypes.func,
  setMode: PropTypes.func
}

export default SignUp
