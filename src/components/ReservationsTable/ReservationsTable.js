import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { formatCurrency, formatDateString } from '../../utils/utils'

const useStyles = makeStyles({
  root: {
    margin: '24px 0px'
  },
  table: {
    minWidth: 300,
    width: '100%',
    '& tr > th': {
      fontWeight: 700
    }
  },
  textInfo: {
    margin: '16px 0px'
  }
})

const ReservationsTable = (props) => {
  const classes = useStyles()

  return props.data.length ? (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Veiculo</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell>Periodo da reserva</TableCell>
            <TableCell>Data da reserva</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {row.brand} {row.model}
              </TableCell>
              <TableCell>{row.carPlate}</TableCell>
              <TableCell>
                {formatDateString(row.startDate)} - {formatDateString(row.endDate)}
              </TableCell>
              <TableCell>{formatDateString(row.timestamp)}</TableCell>
              <TableCell>{formatCurrency(row.totalValue)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography className={classes.textInfo} variant="body2">
      Não há reservas.
    </Typography>
  )
}

ReservationsTable.propTypes = {
  data: PropTypes.array
}

export default ReservationsTable
