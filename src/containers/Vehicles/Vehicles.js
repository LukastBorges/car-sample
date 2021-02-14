import { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar'

import { getVehicles } from '../../services/api'
import VehicleCard from '../../components/VehicleCard/VehicleCard'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '16px 0px'
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '16px',
    padding: '16px 24px'
  },
  filterText: {
    margin: 'auto 16px auto 0px'
  },
  formControl: {
    minWidth: '120px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}))

const Vehicles = () => {
  const classes = useStyles()
  const [cars, setCars] = useState([])
  const [open, setOpen] = useState(false)

  const handleFilter = async (e) => {
    try {
      const filter = e?.target.value ? { [e.target.name]: e.target.value } : null
      const response = await getVehicles(filter)

      setCars(response)
    } catch (e) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    handleFilter()
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.filters}>
        <p className={classes.filterText}>Filtro: </p>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="category-filter-label">Categoria</InputLabel>
          <Select
            name="category"
            labelId="category-filter-select"
            id="category-filter-select"
            onChange={handleFilter}
          >
            <MenuItem value="">
              <em> - </em>
            </MenuItem>
            <MenuItem value="0">Básico</MenuItem>
            <MenuItem value="1">Completo</MenuItem>
            <MenuItem value="2">Luxo</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.container}>
        {cars.map((item) => (
          <VehicleCard key={item.id} car={item} />
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Algo deu errado ao crregar os veiculos, tente novamente em instantes.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Vehicles
