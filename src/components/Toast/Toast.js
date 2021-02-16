import { useContext, useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { RootContext } from '../../contexts/RootContext'

const Toast = () => {
  const { toast } = useContext(RootContext)
  const [open, setOpen] = useState(false)

  const handleOpen = (status) => {
    setOpen(status)
  }

  useEffect(() => {
    toast.msg && handleOpen(true)
  }, [toast])

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => handleOpen(false)}>
      <Alert onClose={() => handleOpen(false)} severity={toast.type}>
        {toast.msg}
      </Alert>
    </Snackbar>
  )
}

export default Toast
