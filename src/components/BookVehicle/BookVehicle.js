import { useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { differenceInHours, addHours } from 'date-fns'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { saveReservation } from '../../services/api'
import { formatCurrency } from '../../utils/utils'
import { toReservationPayload } from '../../utils/factories'
import { RootContext } from '../../contexts/RootContext'

const useStyles = makeStyles({
  paper: {
    width: '50%',
    padding: '8px 16px',
    textAlign: 'center',
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      '& > div, button': {
        margin: '8px 24px'
      }
    }
  },
  image: {
    width: '50%',
    margin: '8px auto'
  },
  textField: {
    margin: '16px 8px'
  },
  snackbar: {
    position: 'fixed',
    bottom: 0
  }
})

const CURRENT_DATE = new Date().toISOString().slice(0, 16)
const FUTURE_DATE = addHours(new Date(), 4).toISOString().slice(0, 16)

const BookVehicle = (props) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(4 * props.car.hourCost)
  const [loading, setLoading] = useState(false)
  const { user, dispatch } = useContext(RootContext)
  const state = useRef({ startDate: CURRENT_DATE, endDate: FUTURE_DATE })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDateChange = (e) => {
    state.current[e.target.name] = e.target.value
    const startDate = new Date(state.current.startDate)
    const endDate = new Date(state.current.endDate)

    setValue(differenceInHours(endDate, startDate) * props.car.hourCost)
  }

  const onSubmit = async (data) => {
    const accessToken = window.localStorage.getItem('accessToken')

    if (accessToken && user) {
      try {
        setLoading(true)
        const payload = toReservationPayload({ ...user, ...data, ...props.car, value })

        await saveReservation(payload)

        handleClose()
        dispatch({
          type: 'update',
          key: 'toast',
          value: { type: 'success', msg: 'Reserva efetuada com sucesso!' }
        })
      } catch (e) {
        dispatch({ type: 'update', key: 'toast', value: { type: 'error', msg: e.message } })
      } finally {
        setLoading(false)
      }
    } else {
      dispatch({ type: 'update', key: 'triggerLogin', value: true })
    }
  }

  return (
    <>
      <Button color="primary" variant="outlined" onClick={handleOpen}>
        Reservar
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="reservation-dialog"
        open={open}
        PaperProps={{
          className: classes.paper
        }}
      >
        <DialogTitle id="simple-dialog-title">Reserva de veículo</DialogTitle>
        <img src={props.car.url} alt={`Foto ${props.car.mode}`} className={classes.image} />
        <Typography variant="body1">
          {props.car.brand} - {props.car.model} - {props.car.year} - Porta-malas:{' '}
          {props.car.trunkCapacity}L - {formatCurrency(props.car.hourCost)}/hora
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div>
            <TextField
              id="start-date"
              name="startDate"
              inputRef={register({ required: true })}
              label="Inicio da reserva"
              type="datetime-local"
              defaultValue={CURRENT_DATE}
              onChange={handleDateChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              required
            />
            <TextField
              id="iend-date"
              name="endDate"
              inputRef={register({ required: true })}
              label="Fim da reserva"
              type="datetime-local"
              defaultValue={FUTURE_DATE}
              onChange={handleDateChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              required
            />
          </div>
          <Typography variant="body1">Valor total: {formatCurrency(value)}</Typography>

          <Button color="primary" variant="outlined" type="submit">
            Efetuar reserva
          </Button>
        </form>
        {loading && <LinearProgress />}
      </Dialog>
    </>
  )
}

BookVehicle.propTypes = {
  car: PropTypes.object.isRequired
}

export default BookVehicle
