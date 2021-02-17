import { useContext, useEffect, useState } from 'react'
import { orderBy } from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { getReservations } from '../../services/api'
import { RootContext } from '../../contexts/RootContext'
import ReservationsTable from '../../components/ReservationsTable/ReservationsTable'

const useStyles = makeStyles({
  root: {
    margin: '24px auto',
    width: '100%'
  }
})

const Reservations = () => {
  const classes = useStyles()
  const [data, setData] = useState({ currentReservations: [], pastReservations: [] })
  const { dispatch } = useContext(RootContext)

  useEffect(() => {
    try {
      getReservations().then((response) => {
        const currentReservations = []
        const pastReservations = []
        const sortedData = orderBy(response, 'timestamp', 'desc')

        sortedData.forEach((item) => {
          if (new Date(item.endDate) < new Date()) {
            pastReservations.push(item)
            return
          }
          currentReservations.push(item)
        })

        setData({ currentReservations, pastReservations })
      })
    } catch (e) {
      dispatch({ type: 'update', key: 'toast', value: { type: 'error', msg: e.message } })
    }
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Typography variant="h5">Reservas atuais</Typography>
      <ReservationsTable data={data.currentReservations} />
      <Typography variant="h5">Reservas passadas</Typography>
      <ReservationsTable data={data.pastReservations} />
    </div>
  )
}

export default Reservations
