import React, {useCallback} from 'react'
import { useFormik } from 'formik'
import { CardActions, Button, TextField} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import Modal from '@material-ui/core/Modal'

import {updateUserEmail,
  userPreferencesRequestFailed} from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'
import {useStyleModal } from './EmailChangeForm.styles'
import {RootState} from '../../reducers/index'
import {validationSchema} from '../../utils/ValidationSchemes'


export default function EmailChangeForm (): React.ReactElement {
  const user = useSelector((state: RootState) => state.operatePreferencesDataReducer)
  const dispatch = useDispatch()

  const classes = useStyles()
  const modalClass = useStyleModal()
  
  const [open, setOpen] = React.useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user? user.email : '',
      password: '',
    },
    validationSchema: validationSchema.validationEmail,
    onSubmit: (values) => {
      if (values.email && !values.password) {
        handleOpen()
      }
      if (values.email && values.password) {
        try {
          dispatch(updateUserEmail(values))
      } catch (error) {
          dispatch(userPreferencesRequestFailed(error))
      }
        handleClose()         
      }
    }
  })

  const body = (
    <div  className={modalClass.paper} >
      <h3 id="simple-modal-title">
        You are going to change sensitive information. 
        Please confirm by entering password
      </h3>
      <form className="modal" onSubmit={formik.handleSubmit} >
        <TextField className={classes.textfields} id="password" onChange={formik.handleChange}
            variant="outlined" />
        <Button color="primary" type="submit" variant="contained"  >Submit</Button>
      </form>
    </div>
  )

  return (
    <form className="emailButton" onSubmit={formik.handleSubmit}>
      <TextField className={classes.textfields} error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email} 
          id="email"
          label="email" name="email"  onChange={formik.handleChange}
          value={formik.values.email}
          variant="outlined" 
          />
      <CardActions className={classes.actionButton}>
        <Button  color="primary" data-testid="sbmtEmail" 
          type="submit" variant="contained" >
          change email
        </Button>
      </CardActions>
      <Modal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        onClose={handleClose}
        open={open}
      >
        {body}
      </Modal>
    </form>
  )
}