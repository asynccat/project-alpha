/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-sort-props */
import React from 'react'
import { useFormik } from 'formik'
import { CardActions, Button, TextField} from '@material-ui/core'
import * as Yup from 'yup'
import {useSelector} from 'react-redux'

import {useStyles, useStyleModal, getModalStyle} from './ProfilePreferencesPage.styles'
import {RootState} from '../../reducers/index'
import Modal from '@material-ui/core/Modal'


export default function EmailChangeForm (): React.ReactElement {
    const user = useSelector((state: RootState) => state.operatePreferencesDataReducer)

    const classes = useStyles()
    const modalClass = useStyleModal()
    
    const validationSchema = Yup.object({
      email: Yup.string()
      .required('Enter your new Email')
      .email('This is not email')
      .notOneOf([(user.email)], 'New email must differ')
    })
    
    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)
  
    const handleOpen = () => {
      setOpen(true)
    }
  
    const handleClose = () => {
      setOpen(false)
    }
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        email: user? user.email : '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        if (values.email && !values.password) {
          handleOpen()
        }
        if (values.email && values.password) {
          console.log('The data is collected', values)
          handleClose()         
        }
      }
    })

    const body = (
      <div  style={modalStyle} className={modalClass.paper}>
        <h3 id="simple-modal-title">
          You are going to change sensitive information. 
          Please confirm by entering password
        </h3>
        <form className="modal" onSubmit={formik.handleSubmit} >
          <TextField id="password" className={classes.textfields} onChange={formik.handleChange}
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
                        variant="outlined" />
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