import { useCallback, useContext, useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { getVehicles } from '../../services/api'
import VehicleCard from '../../components/VehicleCard/VehicleCard'
import { RootContext } from '../../contexts/RootContext'

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
  const { dispatch } = useContext(RootContext)

  const handleFilter = useCallback(
    async (e) => {
      try {
        const filter = e?.target.value ? { [e.target.name]: e.target.value } : null
        const response = await getVehicles(filter)

        setCars(response)
      } catch (e) {
        dispatch({ type: 'update', key: 'toast', value: { type: 'error', msg: e.message } })
      }
    },
    [dispatch]
  )

  useEffect(() => {
    handleFilter()
  }, [handleFilter])

  return (
    <div className={classes.root}>
      <div className={classes.filters}>
        <p className={classes.filterText}>Filtro: </p>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="category-filter-label">Categoria</InputLabel>
          <Select
            name="category"
            labelId="category-filter-label"
            id="category-filter-select"
            onChange={handleFilter}
            defaultValue=""
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
    </div>
  )
}

export default Vehicles
