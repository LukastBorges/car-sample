import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import BookVehicle from '../BookVehicle/BookVehicle'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    margin: '24px',
    padding: '8px 16px',
    height: '320px',
    minWidth: '300px',
    transition: `all 300ms ${theme.transitions.easing.sharp}`,
    willChange: 'box-shadow',
    overflow: 'visible',
    boxShadow: '12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.3)',
    '&:hover': {
      overflow: 'hidden',
      boxShadow: '6px 6px 8px 0 rgba(0, 0, 0, 0.25), -4px -4px 6px 0 rgba(255, 255, 255, 0.3)',
      backgroundColor: 'ghostwhite',
      '& $image': {
        transform: 'scale(0.85)'
      },
      '& $textBody': {
        transform: 'translateY(8px)',
        visibility: 'visible'
      },
      '& $actionButton': {
        transform: 'translateY(24px)',
        visibility: 'visible'
      }
    }
  },
  title: {
    fontWeight: 600,
    marginTop: '12px',
    textAlign: 'center'
  },
  image: {
    display: 'flex',
    margin: '0px auto',
    transition: `transform 300ms ${theme.transitions.easing.sharp}`,
    transform: 'translateY(48px)',
    willChange: 'transform',
    width: '300px'
  },
  textBody: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    visibility: 'hidden',
    maxWidth: '400px',
    transition: `transform 300ms ${theme.transitions.easing.sharp}`,
    transform: 'translateY(136px)',
    willChange: 'transform',
    '& p': {
      marginRight: '8px'
    }
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'center',
    visibility: 'hidden',
    transition: `transform 300ms ${theme.transitions.easing.sharp}`,
    transform: 'translateY(136px)'
  }
}))

const mapCategory = {
  0: 'Basico',
  1: 'Completo',
  2: 'Luxo'
}

const VehicleCard = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={0}>
      <Typography variant="h6" className={classes.title}>
        {props.car.brand} {props.car.model}
      </Typography>
      <img src={props.car.url} alt={`Foto ${props.car.mode}`} className={classes.image} />
      <div className={classes.textBody}>
        <Typography variant="body1">{props.car.brand}</Typography>
        <Typography variant="body1">{props.car.model}</Typography>
        <Typography variant="body1">{props.car.year}</Typography>
        <Typography variant="body1">{mapCategory[props.car.category]}</Typography>
        <Typography variant="body1">Porta-malas: {props.car.trunkCapacity}L</Typography>
        <Typography variant="body1">R${props.car.hourCost}/hora</Typography>
      </div>
      <div className={classes.actionButton}>
        <BookVehicle car={props.car} />
      </div>
    </Card>
  )
}

VehicleCard.propTypes = {
  car: PropTypes.object.isRequired
}

export default VehicleCard
