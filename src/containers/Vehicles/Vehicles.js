import { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { getVehicles } from '../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '16px 0px'
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '16px'
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
    justifyContent: 'space-evenly'
  }
}))

const Vehicles = () => {
  const classes = useStyles()
  const [cars, setCars] = useState([])

  useEffect(() => {
    try {
      getVehicles().then((response) => {
        setCars(response)
      })
    } catch (e) {
      // TODO: add user feedback
    }
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.filters}>
        <p className={classes.filterText}>Filtro: </p>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="category-filter-label">Categoria</InputLabel>
          <Select labelId="category-filter-select" id="category-filter-select" onChange={() => {}}>
            <MenuItem value="">
              <em> - </em>
            </MenuItem>
            <MenuItem value="basic">Básico</MenuItem>
            <MenuItem value="complete">Completo</MenuItem>
            <MenuItem value="luxury">Luxo</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.container}>
        {cars.map((item) => (
          <div key={item.id}>{item.model}</div>
        ))}
      </div>
    </div>
  )
}

export default Vehicles
